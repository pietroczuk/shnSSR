# shnSSR - start again with online shop
Redesing SPA SSR online shop - still under construcion

[Online demo](http://beta3.shineposters.com)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Completly redesing architecure. First MVP created with js, react incl. hooks and split chunks. Meantime it was time to learn typescript, so i decided to again go all the way and transform all to typescript incl. redux. From that point i was happy to continue develop. For future it will be great SPA shop for personal commercial use. It's full customisable via api (multicurrency, multilanguage, paths etc). I never want to go back to Woo or others.


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