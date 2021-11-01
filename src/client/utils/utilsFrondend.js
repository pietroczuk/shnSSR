import React from 'react';
import Cookies from 'universal-cookie';
// SEO
import { Helmet } from 'react-helmet';

// import base64 from 'base-64';

// ---------- get page
export const pageTypes = {
    productPage: 'product',
    homePage: 'homepage',
    staticPage: 'staticpage',
    categoryPage: 'category'
}
// ---------- end get page

// --------- coockies
export const setCookie = (type, value) => {
    const cookies = new Cookies();
    const current = new Date();
    const nextYear = current.setFullYear(current.getFullYear() + 1);

    // new Date(Date.now()+2592000)}

    // option expires is invalid
    // console.log('coockies', nextYear);
    cookies.set(type, value, { expires: new Date(nextYear), path: '/' }); // sameSite:true, secure: true});
}
export const getCookie = type => {
    return new Cookies().get(type);
}
// -------- end coockies

// --------- SEO
export const metatags = (page_title, page_description, seo, url, lang, url_prefix) => {
    const title = page_title ? page_title : seo.title;
    const description = page_description ? page_description : seo.description;
    const { og } = seo;
    const url_char = url_prefix ? url_prefix + '/' : '';
    const link = og.url + '/' + lang + '/' + url_char + url;

    return (
        <Helmet
            title={title}
            link={[
                { rel: 'canonical', href: link }
            ]}
            meta={[
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
                    content: og.type,
                },
                {
                    name: 'og:image',
                    content: og.image,
                },
                {
                    name: 'og:url',
                    content: og.url,
                },
                {
                    name: 'og:site_name',
                    content: og.site_name
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

export const prepareSearchCode = search => {
    search = search.substr(1); // remove ? char
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

export const renderHtmlFromJson = json => {
    return json ? json.map((text_object, index) => {
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
        const childText = Array.isArray(text_object.text) ? renderHtmlFromJson(text_object.text, true) : text_object.text;
        switch (text_object.tag) {
            case 'p': return <p key={index} style={styleObject}>{childText}</p>;
            case 'span': return <span key={index} style={styleObject}>{childText}</span>;
            case 'h1': return <h1 key={index} style={styleObject}>{childText}</h1>;
            case 'h2': return <h2 key={index} style={styleObject}>{childText}</h2>;
            case 'h3': return <h3 key={index} style={styleObject}>{childText}</h3>;
            case 'h4': return <h4 key={index} style={styleObject}>{childText}</h4>;
            case 'h5': return <h5 key={index} style={styleObject}>{childText}</h5>;
            case 'h6': return <h6 key={index} style={styleObject}>{childText}</h6>;
            case 'ul': return <ul key={index} style={styleObject}>{childText}</ul>;
            case 'ol': return <ol key={index} style={styleObject}>{childText}</ol>;
            case 'li': return <li key={index} style={styleObject}>{childText}</li>;
            case 'sup': return <sup key={index} style={styleObject}>{childText}</sup>;
            case 'sub': return <sub key={index} style={styleObject}>{childText}</sub>;
            case 'strong': return <strong key={index} style={styleObject}>{childText}</strong>;
            case 'u': return <u key={index} style={styleObject}>{childText}</u>;
            case 'i': return <i key={index} style={styleObject}>{childText}</i>;
            case 's': return <s key={index} style={styleObject}>{childText}</s>;
            case 'a': return <a href={href} target={target} rel={rel} key={index} style={styleObject}>{childText}</a>;
            default:
                return childText;
        }
    }) : '';
}

// ----------- prepare url links in menu based on array slug from config

export const prepUrlFromConfigSlug = (language, slug_urls, url_type, url) => {
    return '/' + language + '/' + slug_urls[url_type] + '/' + url;
}

export const prepareProductLink = (language, slug_prefix, url) => {
    return '/' + language + '/' + slug_prefix + '/' + url;
}

// scroll to top

/**
 * Just scroll to top of main window
 * @param {*} window 
 */

export const scrollToTop = window => {
    if (window !== undefined) {
        window.scrollTo(0, 0);
    }
}

// get search params from url

// export const getSearchParams = () => {
//     const params = [];
//     if (window !== undefined) {
//         console.log(window.location.search);
//     }
//     return params;
// }