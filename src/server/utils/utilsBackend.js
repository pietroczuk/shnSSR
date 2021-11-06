import Cookies from 'universal-cookie';

// LANGUAGE
export const check_user_language = (cookie_header = null, browser_language = null, languages = null, cookie_key) => {
    let cookie_lang = new Cookies(cookie_header).get(cookie_key);
    if(!languages[cookie_lang]) {
        // browser
        if (browser_language) {
            cookie_lang = browser_language.substring(0, 2);
        }
        if(!languages[cookie_lang]) {
            return Object.keys(languages)[0];
        }
    }
    return cookie_lang;
}

export const language_from_path = (full_path, languages = null) => {
    const path_lng_code = full_path.split('/')[1];
    // const in_config_array = languages.find(lang => lang.code === path_lng_code);
    // if (!in_config_array) {
    // console.log('lang server', path_lng_code, languages[path_lng_code], languages );
    if(!languages[path_lng_code]) {
        // return languages[0].code;
        return Object.keys(languages)[0];
    }
    return path_lng_code;
}

// CURRENCY

export const get_currency_cookie = (cookie_header = null, currencies = null, cookie_key) => {
    const cookie_currency = new Cookies(cookie_header).get(cookie_key);
    if(!currencies[cookie_currency]) {
        return Object.keys(currencies)[0];
    }
    return cookie_currency;
}

// DISPLAY

export const get_display_cookies = (cookie_header = null, display_cookie_key_obj) => {
    const visual = new Cookies(cookie_header).get(display_cookie_key_obj['visual_mode']) === "true" ? true : false;
    const random = new Cookies(cookie_header).get(display_cookie_key_obj['random_variant']) === "true" ? true : false;
    return {showVisual : visual, showRandom: random}
}