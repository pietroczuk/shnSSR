import Cookies from 'universal-cookie';
import { Display } from '../../client/redux/types/display.types';
import { CookiesKeysDisplay, Currency, Language } from '../../client/redux/types/systemConfig.types';
import { CoockieHeader } from '../types/coockieHeader.types';

// LANGUAGE
interface CheckUserLanguage_Args {
    (
        cookie_header: CoockieHeader,
        browser_language: CoockieHeader,
        allLanguages: Language,
        cookie_key: string
    ) : string
}
export const checkUserLanguage : CheckUserLanguage_Args = (cookie_header, browser_language, allLanguages, cookie_key) => {
    let cookie_lang = new Cookies(cookie_header).get(cookie_key);
    if (!allLanguages[cookie_lang]) {
        // browser
        if (browser_language) {
            cookie_lang = browser_language.substring(0, 2);
        }
        if (!allLanguages[cookie_lang]) {
            return allLanguages[Object.keys(allLanguages)[0]]['code'];
        }
    }
    return cookie_lang;
}

export const urlDataFromPath = (full_path: string, allLanguages: Language, isMultilanguage: boolean) => {
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
    if (real_path_arr.length >= pathCriticalIndex) {
        if (!allLanguages[real_path_arr[1]] && allLanguages[Object.keys(allLanguages)[0]]['code']) {
            pathData.languageCode = allLanguages[Object.keys(allLanguages)[0]]['code'];
        } else {
            pathData.languageCode = real_path_arr[1];
        }
        if (!real_path_arr[pathCriticalIndex] && isMultilanguage) {
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
        allCurrencies: Currency,
        cookie_key: string
    ) : string
}

export const getCurrencyCookie : GetCurrencyCookie_Args = (cookie_header, allCurrencies, cookie_key) => {
    const cookie_currency = new Cookies(cookie_header).get(cookie_key);
    if (!allCurrencies[cookie_currency]) {
        return Object.keys(allCurrencies)[0];
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
    const visual = new Cookies(cookie_header).get(display_cookie_key_obj['visualMode']) === "true" ? true : false;
    const random = new Cookies(cookie_header).get(display_cookie_key_obj['randomVariant']) === "true" ? true : false;
    return { showVisual: visual, showRandom: random }
}