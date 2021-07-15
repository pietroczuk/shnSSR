import React from 'react';
import Cookies from 'universal-cookie';
// SEO
import { Helmet } from 'react-helmet';

// import base64 from 'base-64';

// ---------- get page
export const pageTypes = {
    productPage: 'product',
    homePage: 'homepage',
    staticPage: 'staticpage'
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