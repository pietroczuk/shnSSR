import Cookies from 'universal-cookie';
import { CartProducts } from '../redux/Models/Cart/CartProducts/CartProducts.model';
import { Sale } from '../redux/Models/Product/Sale/Sale.model';
import { AllCurrencies } from '../redux/Models/SystemConfig/AllCurrencies/AllCurrencies.model';
import { PageTypePrefixUrls } from '../redux/Models/SystemConfig/PageTypePrefixUrls/PageTypePrefixUrls.model';

export interface ParamsModel {
    url: string;
    lang: string;
}

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
export const getPageTypeAsString = (pageType: string) => {
    return pageTypes[pageType];
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
        pageTypePrefixUrls: PageTypePrefixUrls,
        url_type: string | undefined | null,
        slug_prefix: string | undefined | null,
        url: string | undefined | null,
        isMultilanguage: boolean,
        search?: string | undefined | null
    ): string
}

export const prepUrlFromConfigSlug: prepUrlFromConfigSlugArgs = (language, pageTypePrefixUrls, url_type, slug_prefix, url, isMultilanguage, search) => {
    let url_link = '/';
    language && isMultilanguage ? url_link += language + '/' : null;
    url_type && pageTypePrefixUrls ? url_link += pageTypePrefixUrls[url_type] + '/' : null;
    slug_prefix ? url_link += slug_prefix + '/' : null;
    url ? url_link += url + '/' : null;
    search ? url_link += '?' + search : null;
    return url_link;
}

// export const prepareLink = (language, slug_prefix, url, isMultilanguage) => {
//     let url_link = '/';
//     language && isMultilanguage ? url_link += language + '/' : null;
//     slug_prefix ? url_link += slug_prefix + '/' : null;
//     url ? url_link += url + '/' : null;
//     return url_link;
// }

/**
 * getting product price based on user currency
 * return only price without currency
 */

interface getPriceByCurrencyArgs {
    (
        productPrices: {
            [key: string]: number
        },
        userCurrency: string,
        allCurrencies: AllCurrencies,
    ): number
}

export const getPriceByCurrency: getPriceByCurrencyArgs = (productPrices, userCurrency, allCurrencies) => {
    const price = productPrices &&
        userCurrency &&
        allCurrencies &&
        allCurrencies[userCurrency] &&
        productPrices[userCurrency] ? productPrices[userCurrency] : null;
    return price;
}
/**
 * format price based on currency possition
 */
interface formatPriceArgs {
    (
        price: number | string,
        userCurrency: string,
        allCurrencies: AllCurrencies,
    ): string
}
export const formatPrice: formatPriceArgs = (price, userCurrency, allCurrencies) => {
    if (allCurrencies && allCurrencies[userCurrency] && price) {
        if (allCurrencies[userCurrency].isDisplayLeft) {
            return allCurrencies[userCurrency].sign + ' ' + price;
        } else {
            return price + ' ' + allCurrencies[userCurrency].sign;
        }
    }
    return '';
}

interface getPromoPriceArgs {
    (
        price: number,
        sale: Sale,
        finalQuantity?: number,
        cutDecimal?: boolean,
    ): number
}

export const getPromoPrice: getPromoPriceArgs = (price, sale, finalQuantity, cutDecimal = true) => {
    const { enable, percent } = sale;
    if (!enable || percent <= 0) return price;

    let newPrice = price;
    newPrice = newPrice - (newPrice * percent / 100);

    newPrice = cutDecimal ? +newPrice.toFixed(0) : +newPrice.toFixed(2);

    if (finalQuantity && finalQuantity > 1) {
        newPrice *= finalQuantity;
    }
    return newPrice;
}
/**
 * calculate total price from products in cart
 */
interface calulateTotalProductPriceArgs {
    (
        products: CartProducts,
        userCurrency: string,
        allCurrencies: AllCurrencies,
    ): number
}

export const calulateTotalProductPrice: calulateTotalProductPriceArgs = (products, currency, allCurrencies) => {
    let total = 0;
    Object.entries(products).forEach(([_key, product]) => {
        const { minPrice, salePrice } = product.productData;
        const salePriceProduct = getPriceByCurrency(salePrice, currency, allCurrencies);
        const price = salePriceProduct ? salePriceProduct : getPriceByCurrency(minPrice, currency, allCurrencies)
        const quantity = product.quantity;
        total += price * quantity;
    })
    return total;
}

/**
 * calculate total save money from products in cart
 */
interface calulateTotalSaveMoneyArgs {
    (
        products: CartProducts,
        userCurrency: string,
        allCurrencies: AllCurrencies,
    ): number
}

export const calulateTotalSaveMoney: calulateTotalSaveMoneyArgs = (products, currency, allCurrencies) => {
    let total = 0;
    Object.entries(products).forEach(([_key, product]) => {
        const { saveMoney } = product.productData;
        const savePriceProduct = getPriceByCurrency(saveMoney, currency, allCurrencies);
        const quantity = product.quantity;
        total += savePriceProduct * quantity;
    })
    return total;
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
        text.substring(0, cutLenght).substring(0, Math.min(text.length, text.lastIndexOf(" "))) + '...' :
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

/**
 * check true sale
 */

interface checkTrueSaleArgs {
    (
        sale: Sale,
        now: number
    ): boolean
}

export const checkTrueSale: checkTrueSaleArgs = (sale, now) => {
    if (!sale.enable) {
        return false;
    }
    const { startSale, stopSale } = sale;

    if (
        (startSale <= now && stopSale >= now) ||
        (startSale <= now && !stopSale) ||
        (!startSale && stopSale >= now)
    ) {
        return true;
    }
    return false;
}

/**
 * check if hex color is to dark
 */
export const isColorDark = (color: string): boolean => {
    const c = color.substring(1);      // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >> 8) & 0xff;  // extract green
    const b = (rgb >> 0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 70) {
        return true;
    }
    return false;
}

/**
 * check if div is on the viewport after Y scroll
 * 
 */

export const isScrolledIntoView = (element: React.MutableRefObject<HTMLDivElement>, offsetTop: number = 0) => {
    const rect = element.current.getBoundingClientRect();
    const elemTop = rect.top + offsetTop;
    const elemBottom = rect.bottom;

    // Only completely visible elements return true:
    // const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}