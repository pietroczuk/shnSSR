# shnSSR - starting again with online shop
Redesing SPA SSR online shop - still develop

[Online demo](http://beta3.shineposters.com)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Completly redesing architecure. First MVP created with js, react incl. hooks and split chunks. Meantime it was time to learn typescript, so i decided to again go all the way and transform all to typescript incl. redux. From that point i was happy to continue develop. For future it will be great SPA shop for personal commercial use. It's full customisable via api (multicurrency, multilanguage, paths, images etc). Dosn't need to hardcoded parameters. Just deploy once and forget. All minor changes, configuration, disable elements are on outside via fetching json API. My custom php api allows to reaorganize returning structure data for great performace and PageSpeed. I try to minimalize re-renders as far as possible.

Most performance expensive functionality and pages are ready for use:
* Category pages
	- change global colors for all products
	- change invidualy colors for single product in grid 
* Product pages
	- 360 view
	- slider responsive to set current product variant
	- custom lazyload images
	- sale countdown (no re-renders, time is initialize on server side to avoid users cheateing)
* Menu (via API)
	- main menu
	- sidebar menu

RWD and mobile design are avaible on previous version avaible here:
* [online](http://beta2.shineposters.com)
* [github](https://github.com/pietroczuk/shn)

Example desktop performance / current version links (mobile need to hide or reorganize elements):
* [category](https://pagespeed.web.dev/report?url=http%3A%2F%2Fbeta3.shineposters.com%2Fpl%2Fc%2Fdla-niej%2F&form_factor=desktop)
* [product page](https://pagespeed.web.dev/report?url=http%3A%2F%2Fbeta3.shineposters.com%2Fpl%2Fp%2Fplakat-when-something-is-important-enought-elon-musk%2F%3F5c7e89a680acee0ad6dffa43&form_factor=desktop)

Most time consuming part (data structure, and architecure states) are ready to go. Now is time to move my designs from previous version to this version. Home page i will do at the end. This is just presentation view so i no need to think about it now. Easy peasy.

Btw. I never want to go back to Woo or others.

All issues and tasks are available on Github Projects Section (frontend and backend):
[Projects section](https://github.com/pietroczuk/shnSSR/projects?type=classic)

###### Product Page
![SHN Product page](https://raw.githubusercontent.com/pietroczuk/pietroczuk/main/images/shn-productpage.jpg)
###### Category with visual images mode + random variants
![SHN Category visual mode](https://raw.githubusercontent.com/pietroczuk/pietroczuk/main/images/shn-categorypage-visualmode.jpg)
###### Category with sample images mode + multilanguages
![SHN Category sample mode with multilanguage](https://raw.githubusercontent.com/pietroczuk/pietroczuk/main/images/shn-categorypage-multilanguage-simplemode.jpg)

## Technologies
Project is created with:
* React 17
* node
* Redux, Redux Toolkit
* Hooks, FC
* Typescript

API:
* Strapi (for nice insert data to Mongo)
* Mongo
* PHP (redesing json's and add server cache for requests)

Sample config (slugs, languages, currencies etc.):

```
{
  "isMulticurrency": true,
  "cookiesKeys": {
    "userCountry": "country",
    "userLanguage": "language",
    "userCurrency": "currency",
    "displayKeys": {
      "visualMode": "visual",
      "randomVariant": "random"
    }
  },
  "localstorageKeys": {
    "wishlist": "shnwish",
    "cart": "shcart",
    "visited": "shnvisit"
  },
  "isMultilanguage": true,
  "specialPagesUrlsArray": {
    "wishlist": "",
    "cart": "",
    "homepage": ""
  },
  "allCurrencies": {
    "pln": {
      "code": "pln",
      "label": "PLN - zł",
      "sign": "zł",
      "isDisplayLeft": false,
      "positionNumber": 10,
      "active": true,
      "default": true
    },
    "eur": {
      "code": "eur",
      "label": "EUR - €",
      "sign": "€",
      "isDisplayLeft": false,
      "positionNumber": 20,
      "active": true,
      "default": false
    },
    "usd": {
      "code": "usd",
      "label": "USD - $",
      "sign": "$",
      "isDisplayLeft": true,
      "positionNumber": 50,
      "active": true,
      "default": false
    },
    "gbp": {
      "code": "gbp",
      "label": "GBP - £",
      "sign": "£",
      "isDisplayLeft": true,
      "positionNumber": 40,
      "active": true,
      "default": false
    }
  },
  "images": {
    "big": "?size=900&sh=7&q=80",
    "smallLess": "?size=300&sh=5&q=80",
    "packFilename": "9fa5d5233853494bad3e52cb215145f0.jpg",
    "small": "?size=300&sh=15&q=80",
    "url": "https://cdn.shineposters.com",
    "medium": "?size=500&sh=7&q=80",
    "packSize": "?size=900&sh=8&q=80",
    "large": "?size=700&sh=7&q=80"
  },
  "api": {
    "cart": "get_cart_product.php",
    "global": "get_global.php",
    "wishlist": "get_wishlist_product.php",
    "search": "-search.php",
    "visited": "get_visited_product.php",
    "similarCategoryProducts": "get_similar_cat_products.php",
    "similarCollectionProducts": "get_similar_col_products.php",
    "product": "get_product.php",
    "url": "https://api.shineposters.com/2021",
    "page": "get_page.php",
    "colection": "-colection.php",
    "checkout_link": "-https://checkout.shineposters.com",
    "countries": "-get_countries.php",
    "delivery": "-get_delivery.php",
    "getlocalcart": "get_local_cart.php",
    "reviews": "-get_reviews.php",
    "addtocart": "add_to_cart.php",
    "category": "get_category.php"
  },
  "allLanguages": {
    "pl": {
      "code": "pl",
      "label": "Polski",
      "flag_image": "pl",
      "position": 10,
      "active": true,
      "default": true
    },
    "en": {
      "code": "en",
      "label": "English",
      "flag_image": "en",
      "position": 20,
      "active": true,
      "default": false
    },
    "de": {
      "code": "de",
      "label": "Deutsch",
      "flag_image": "de",
      "position": 30,
      "active": true,
      "default": false
    }
  },
  "pageTypePrefixUrls": {
    "product": "p",
    "staticpage": "s",
    "category": "c",
    "collection": "col"
  }
}
```
	
## Setup
To run this project, install it locally.

```
$ cd ../shnSSR
$ npm install
```

Start production app server using npm:

```
$ npm run build
```
Optional you can disable devTools in '/src/client/client.tsx' by changing
```
devTools: false
```


Start development app server using npm:

```
$ npm run dev
```
