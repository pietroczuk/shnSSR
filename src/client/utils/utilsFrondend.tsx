import Cookies from 'universal-cookie';
// SEO
import { Helmet } from 'react-helmet';
import { Currency } from '../redux/types/systemConfig.types';
import { Seo } from '../redux/types/publicConfig.types';

// ---------- get page

export const pageTypes = {
    productPage: 'product',
    homePage: 'homepage',
    staticPage: 'staticpage',
    categoryPage: 'category',
    wishlist: 'wishlist',
    cart: 'cart',
    specialPage: 'special',
}
// ---------- end get page

// --------- coockies
export const setCookie = (type: string, value: string) => {
    const cookies = new Cookies();
    const current = new Date();
    const nextYear = current.setFullYear(current.getFullYear() + 1);
    cookies.set(type, value, { expires: new Date(nextYear), path: '/' }); // sameSite:true, secure: true});
}
export const getCookie = (type: string) => {
    return new Cookies().get(type);
}
// -------- end coockies

// --------- SEO
interface metatagsArgs {
    (
        page_title: string | null,
        page_description: string | null,
        seo: Seo,
        url: string,
        lang: string,
        url_prefix: string | null
    ): JSX.Element
}

export const metatags: metatagsArgs = (page_title, page_description, seo, url, lang, url_prefix) => {
    const title = page_title ? page_title : seo.title;
    const description = page_description ? page_description : seo.description;
    const { og } = seo;
    const url_char = url_prefix ? url_prefix + '/' : '';
    const ogUlr = og ? og.url + '/' : '';
    const link = ogUlr + lang + '/' + url_char + url;

    return (
        <Helmet
            title={title}
            link={
                [
                    { rel: 'canonical', href: link }
                ]}
            meta={
                [
                    {
                        name: 'description',
                        content: description,
                    },
                    {
                        name: 'og:title',
                        content: title,
                    },
                    {
                        name: 'og:description',
                        content: description,
                    },
                    {
                        name: 'og:type',
                        content: og ? og.type : '',
                    },
                    {
                        name: 'og:image',
                        content: og ? og.image : '',
                    },
                    {
                        name: 'og:url',
                        content: og ? og.url : '',
                    },
                    {
                        name: 'og:site_name',
                        content: og ? og.site_name : ''
                    },
                ]}
        />
    );
}



// -------- end seo

// -------- variantcode in url / ?serach attribute 
// export const decodeParameters = param => {
//     if(param) {
//         return JSON.parse(base64.decode(param));
//     }
//     return null;
// }

export const prepareSearchCode = (search: string) => {
    search = search.substring(1); // remove ? char
    const query = search.indexOf('&');
    query > 0 ? search = search.substring(0, query) : '';
    return search;
}


// export const prepareAttribLink = (currentVariant, code, feat_id) => {
//     const targetVariant = [];
//     currentVariant.forEach(variant => {
//         targetVariant.push({...variant});
//     });
//     targetVariant.forEach(variant => {
//         if(variant.feature == feat_id) {
//             variant.code = code;
//         }
//     });
//     return targetVariant;
// }
// -------- end variantcode in url / ?serach attribute 


// ----------- static page html

export const renderHtmlFromJson = (json: object | string) => {
    return json ? Array.isArray(json) ? json.map((text_object, index) => {
        const textAlign = text_object.align === 'left' ||
            text_object.align === 'right' ||
            text_object.align === 'center'
            ? text_object.align : 'left';

        const color = /^#[0-9A-F]{6}$/i.test(text_object.color) ? text_object.color : 'inherit';
        const href = text_object.href ? text_object.href : '#';
        const target = text_object.target === "_blank" ? text_object.target : "_self";
        const rel = text_object.rel === "nofollow" ? text_object.rel : "follow";

        const styleObject = {
            textAlign: textAlign,
            color: color,
        }
        const childText: string = Array.isArray(text_object.text) ? renderHtmlFromJson(text_object.text) : text_object.text;
        switch (text_object.tag) {
            case 'p': return <p key={index} style={styleObject} > {childText} </p>;
            case 'span': return <span key={index} style={styleObject} > {childText} </span>;
            case 'h1': return <h1 key={index} style={styleObject} > {childText} </h1>;
            case 'h2': return <h2 key={index} style={styleObject} > {childText} </h2>;
            case 'h3': return <h3 key={index} style={styleObject} > {childText} </h3>;
            case 'h4': return <h4 key={index} style={styleObject} > {childText} </h4>;
            case 'h5': return <h5 key={index} style={styleObject} > {childText} </h5>;
            case 'h6': return <h6 key={index} style={styleObject} > {childText} </h6>;
            case 'ul': return <ul key={index} style={styleObject} > {childText} </ul>;
            case 'ol': return <ol key={index} style={styleObject} > {childText} </ol>;
            case 'li': return <li key={index} style={styleObject} > {childText} </li>;
            case 'sup': return <sup key={index} style={styleObject} > {childText} </sup>;
            case 'sub': return <sub key={index} style={styleObject} > {childText} </sub>;
            case 'strong': return <strong key={index} style={styleObject} > {childText} </strong>;
            case 'u': return <u key={index} style={styleObject} > {childText} </u>;
            case 'i': return <i key={index} style={styleObject} > {childText} </i>;
            case 's': return <s key={index} style={styleObject} > {childText} </s>;
            case 'a': return <a href={href} target={target} rel={rel} key={index} style={styleObject} > {childText} </a>;
            default:
                return childText;
        }
    }) : json : '';
}


// ----------- prepare url links in menu based on array slug from config

interface prepUrlFromConfigSlugArgs {
    (
        language: string,
        slug_urls: {
            [key: string]: string
        } | null,
        url_type: string | undefined,
        slug_prefix: string | null,
        url: string | null,
        multilanguage: boolean,
        search?: string | null
    ): string
}

export const prepUrlFromConfigSlug: prepUrlFromConfigSlugArgs = (language, slug_urls, url_type, slug_prefix, url, multilanguage, search = null) => {
    let url_link = '/';
    language && multilanguage ? url_link += language + '/' : null;
    url_type && slug_urls ? url_link += slug_urls[url_type] + '/' : null;
    slug_prefix ? url_link += slug_prefix + '/' : null;
    url ? url_link += url + '/' : null;
    search ? url_link += '?' + search : null;
    return url_link;
}

// export const prepareLink = (language, slug_prefix, url, multilanguage) => {
//     let url_link = '/';
//     language && multilanguage ? url_link += language + '/' : null;
//     slug_prefix ? url_link += slug_prefix + '/' : null;
//     url ? url_link += url + '/' : null;
//     return url_link;
// }

interface getPriceByCurrencyArgs {
    (
        productPrices: {
            [key: string]: number
        },
        userCurrency: string,
        currency: Currency
    ): string | null
}

export const getPriceByCurrency: getPriceByCurrencyArgs = (productPrices, userCurrency, currency) => {
    const price = productPrices &&
        userCurrency &&
        currency &&
        currency[userCurrency] &&
        currency[userCurrency].sign &&
        productPrices[userCurrency] ? productPrices[userCurrency] : null;
    return price && currency[userCurrency].displayLeft ?
        currency[userCurrency].displayLeft ?
            currency[userCurrency].sign + ' ' + price : price + ' ' + currency[userCurrency].sign : null;
}

/**
 * Just scroll to top of main window
 */

export const scrollToTop = (window: Window) => {
    if (window) {
        window.scrollTo(0, 0);
    }
}


/**
 * Check if object is empty or not
 */
export const isObjectEmpty = (obj: object) => {
    for (const _i in obj) return false;
    return true;
}

export const getObjectLength = (obj: object) => {
    return obj ? Object.keys(obj).length : 0;
}

// get search params from url

// export const getSearchParams = () => {
//     const params = [];
//     if (window !== undefined) {
//         console.log(window.location.search);
//     }
//     return params;
// }

/**
 *  Localstorage 
 */

export const setLocalStorage = (value: object, key: string) => {
    if (typeof window !== 'undefined') {
        if (localStorage) {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
    }
    return false;
};

export const getLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        const storageValue = localStorage ? localStorage.getItem(key) : null;
        // console.log(JSON.parse(storageValue));
        return storageValue ? JSON.parse(storageValue) : storageValue;
    }
    return null;
};
export const clearLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        return true;
    }
    return false;
}

export const cutText = (text: string, cutLenght = 50) => {
    return text && text.length > cutLenght ?
        text.substr(0, cutLenght).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...' :
        text ? text : null;
}

/**
 * find the same value in multiple arrays
 */

export const intersectArray = (arrayOfArrays: Array<any>) => {
    // data = [array1, array2, array3, array4],
    return arrayOfArrays ?
        arrayOfArrays.length > 1 ?
            arrayOfArrays.reduce((a, b) => a.filter((c: any) => b.includes(c))) :
            arrayOfArrays : null;
}