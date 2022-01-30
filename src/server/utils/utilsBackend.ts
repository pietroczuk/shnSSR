import Cookies from 'universal-cookie';
import { Display } from '../../client/redux/types/display.types';
import { CookiesKeysDisplay, Currency, Language } from '../../client/redux/types/systemConfig.types';
import { CoockieHeader } from '../types/coockieHeader.types';

// LANGUAGE
interface CheckUserLanguage_Args {
    (
        cookie_header: CoockieHeader,
        browser_language: CoockieHeader,
        languages: Language,
        cookie_key: string
    ) : string
}
export const checkUserLanguage : CheckUserLanguage_Args = (cookie_header, browser_language, languages, cookie_key) => {
    let cookie_lang = new Cookies(cookie_header).get(cookie_key);
    if (!languages[cookie_lang]) {
        // browser
        if (browser_language !== undefined) {
            cookie_lang = browser_language.substring(0, 2);
        }
        if (!languages[cookie_lang]) {
            return languages[Object.keys(languages)[0]]['code'];
        }
    }
    return cookie_lang;
}

export const urlDataFromPath = (full_path: string, languages: Language, multilanguage: boolean) => {
    const pathData: {
        languageCode: string,
        blankPath: boolean,
        realPath: string,
    } = {
        languageCode: '',
        blankPath: false,
        realPath: ''
    }
    const pathCriticalIndex = 2;
    const real_path_arr = full_path.split('/');
    console.log(real_path_arr);
    if (real_path_arr.length >= pathCriticalIndex) {
        if (!languages[real_path_arr[1]] && languages[Object.keys(languages)[0]]['code']) {
            pathData.languageCode = languages[Object.keys(languages)[0]]['code'];
        } else {
            pathData.languageCode = real_path_arr[1];
        }
        if (!real_path_arr[pathCriticalIndex] && multilanguage) {
            pathData.blankPath = true;
        }
        for (let index = real_path_arr.length - 1; index >= 0; index--) {
            if (real_path_arr[index] && real_path_arr[index] !== '') {
                pathData.realPath = real_path_arr[index];
                break;
            }
        }
    }
    return pathData;
}

// CURRENCY

interface GetCurrencyCookie_Args {
    (
        cookie_header: CoockieHeader,
        currencies: Currency,
        cookie_key: string
    ) : string
}

export const getCurrencyCookie : GetCurrencyCookie_Args = (cookie_header, currencies, cookie_key) => {
    const cookie_currency = new Cookies(cookie_header).get(cookie_key);
    if (!currencies[cookie_currency]) {
        return Object.keys(currencies)[0];
    }
    return cookie_currency;
}

// DISPLAY

interface getDisplayCookies_Args {
    (
        cookie_header: CoockieHeader,
        display_cookie_key_obj: CookiesKeysDisplay
    ): Display
}

export const getDisplayCookies: getDisplayCookies_Args = (cookie_header, display_cookie_key_obj) => {
    const visual = new Cookies(cookie_header).get(display_cookie_key_obj['visual_mode']) === "true" ? true : false;
    const random = new Cookies(cookie_header).get(display_cookie_key_obj['random_variant']) === "true" ? true : false;
    return { showVisual: visual, showRandom: random }
}