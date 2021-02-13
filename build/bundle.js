/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/Routes.js":
/*!******************************!*\
  !*** ./src/client/Routes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _client_components_rootApp_RootApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/components/rootApp/RootApp */ \"./src/client/components/rootApp/RootApp.js\");\n/* harmony import */ var _client_pages_HomePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../client/pages/HomePage */ \"./src/client/pages/HomePage.js\");\n/* harmony import */ var _client_pages_NotFoundPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client/pages/NotFoundPage */ \"./src/client/pages/NotFoundPage.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n // zamiast klasycznego <router> \n// do SSR, aby mozna bylo pobierac dane przez serwer\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([_objectSpread(_objectSpread({}, _client_components_rootApp_RootApp__WEBPACK_IMPORTED_MODULE_0__.default), {}, {\n  routes: [_objectSpread(_objectSpread({\n    path: '/'\n  }, _client_pages_HomePage__WEBPACK_IMPORTED_MODULE_1__.default), {}, {\n    exact: true\n  }), _objectSpread({}, _client_pages_NotFoundPage__WEBPACK_IMPORTED_MODULE_2__.default)]\n})]); // config:\n// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config\n\n//# sourceURL=webpack://shineposters/./src/client/Routes.js?");

/***/ }),

/***/ "./src/client/components/rootApp/RootApp.js":
/*!**************************************************!*\
  !*** ./src/client/components/rootApp/RootApp.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar RootApp = function RootApp(_ref) {\n  var route = _ref.route;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"aa\"\n  }, (0,react_router_config__WEBPACK_IMPORTED_MODULE_1__.renderRoutes)(route.routes));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  component: RootApp\n});\n\n//# sourceURL=webpack://shineposters/./src/client/components/rootApp/RootApp.js?");

/***/ }),

/***/ "./src/client/pages/HomePage.js":
/*!**************************************!*\
  !*** ./src/client/pages/HomePage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _redux_actions_all_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../redux/actions/all_actions */ \"./src/client/redux/actions/all_actions.js\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar HomePage = function HomePage(props) {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    if (!props.feat) {\n      props.get_global_feat();\n    }\n  }, []);\n\n  var SeoHead = function SeoHead() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_3__.Helmet, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"\".concat(props.feat.length, \" Home page\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n      property: \"og:title\",\n      content: \"My home page\"\n    }));\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, SeoHead(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, \"home component\"), props.feat.map(function (elem, index) {\n    // console.log(elem.title[0].pl);\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n      key: index\n    }, elem.title[0].pl);\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      console.log('cklik me');\n    }\n  }, \"kliknij\"));\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    feat: state.features\n  };\n};\n\nvar loadDataOnInit = function loadDataOnInit(server_store) {\n  var my_promise = server_store.dispatch((0,_redux_actions_all_actions__WEBPACK_IMPORTED_MODULE_2__.get_global_feat)());\n  return my_promise;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  loadDataOnInit: loadDataOnInit,\n  component: (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {\n    get_global_feat: _redux_actions_all_actions__WEBPACK_IMPORTED_MODULE_2__.get_global_feat\n  })(HomePage)\n});\n\n//# sourceURL=webpack://shineposters/./src/client/pages/HomePage.js?");

/***/ }),

/***/ "./src/client/pages/NotFoundPage.js":
/*!******************************************!*\
  !*** ./src/client/pages/NotFoundPage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar NotFoundPage = function NotFoundPage(_ref) {\n  var _ref$staticContext = _ref.staticContext,\n      staticContext = _ref$staticContext === void 0 ? {} : _ref$staticContext;\n  staticContext.notFound = true;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, \"404\");\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  component: NotFoundPage\n});\n\n//# sourceURL=webpack://shineposters/./src/client/pages/NotFoundPage.js?");

/***/ }),

/***/ "./src/client/redux/actions/action_types.js":
/*!**************************************************!*\
  !*** ./src/client/redux/actions/action_types.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"action_types\": () => (/* binding */ action_types)\n/* harmony export */ });\nvar action_types = {\n  GET_GLOBAL_FEAT_TYPE: 'get_global_feat'\n}; // export const GET_GLOBAL_FEAT_TYPE = 'get_global_feat';\n\n//# sourceURL=webpack://shineposters/./src/client/redux/actions/action_types.js?");

/***/ }),

/***/ "./src/client/redux/actions/all_actions.js":
/*!*************************************************!*\
  !*** ./src/client/redux/actions/all_actions.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get_global_feat\": () => (/* binding */ get_global_feat)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/config */ \"./src/client/utils/config.js\");\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action_types */ \"./src/client/redux/actions/action_types.js\");\n\n\n\nvar api = _utils_config__WEBPACK_IMPORTED_MODULE_1__.default.api;\nvar apiUrl = api.url;\n\nvar show_error_message = function show_error_message(msg) {\n  console.log(msg);\n};\n\nvar get_global_feat = function get_global_feat() {\n  return function (dispatch) {\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(apiUrl + api.feat).then(function (res) {\n      return dispatch({\n        type: _action_types__WEBPACK_IMPORTED_MODULE_2__.action_types.GET_GLOBAL_FEAT_TYPE,\n        payload: res\n      });\n    }).catch(function (err) {\n      show_error_message(err);\n    });\n  };\n};\n\n//# sourceURL=webpack://shineposters/./src/client/redux/actions/all_actions.js?");

/***/ }),

/***/ "./src/client/redux/reducers/all_reducers.js":
/*!***************************************************!*\
  !*** ./src/client/redux/reducers/all_reducers.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _feat_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feat_reducer */ \"./src/client/redux/reducers/feat_reducer.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n  features: _feat_reducer__WEBPACK_IMPORTED_MODULE_1__.default\n}));\n\n//# sourceURL=webpack://shineposters/./src/client/redux/reducers/all_reducers.js?");

/***/ }),

/***/ "./src/client/redux/reducers/feat_reducer.js":
/*!***************************************************!*\
  !*** ./src/client/redux/reducers/feat_reducer.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/action_types */ \"./src/client/redux/actions/action_types.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__.action_types.GET_GLOBAL_FEAT_TYPE:\n      if (action.payload.data.feat) {\n        return action.payload.data.feat;\n      }\n\n      return state;\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack://shineposters/./src/client/redux/reducers/feat_reducer.js?");

/***/ }),

/***/ "./src/client/utils/config.js":
/*!************************************!*\
  !*** ./src/client/utils/config.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  api: {\n    'url': 'https://api.shineposters.com/',\n    'page': 'page.php',\n    'category': 'category.php',\n    'colection': 'colection.php',\n    'product': 'product.php',\n    'similarcat': 'similar_list_cat.php',\n    'similarcol': 'similar_list_col.php',\n    'similarvisit': 'similar_list_visit.php',\n    'reviews': 'get_reviews.php',\n    'feat': 'feat.php',\n    'wishlist': 'add_to_wish.php',\n    'checkcart': 'check_actual_cart.php',\n    'addtocart': 'add_to_cart.php',\n    'getlocalcart': 'get_local_cart.php',\n    'getmenu': 'get_menu.php',\n    'search': 'search.php',\n    'countries': 'get_countries.php',\n    'delivery': 'get_delivery.php'\n  }\n});\n\n//# sourceURL=webpack://shineposters/./src/client/utils/config.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_rednderHtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/rednderHtml */ \"./src/server/utils/rednderHtml.js\");\n/* harmony import */ var _utils_serverInitStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/serverInitStore */ \"./src/server/utils/serverInitStore.js\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _client_Routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../client/Routes */ \"./src/client/Routes.js\");\n/* ---------------- Main server file ----------------- */\n// import async await - babel-polyfil\n\n\n\n // routes\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(); // tell where is public files -> dir\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().static('public'));\napp.get('*', function (req, res) {\n  var server_store = (0,_utils_serverInitStore__WEBPACK_IMPORTED_MODULE_3__.default)();\n  var load_data_promises = (0,react_router_config__WEBPACK_IMPORTED_MODULE_4__.matchRoutes)(_client_Routes__WEBPACK_IMPORTED_MODULE_5__.default, req.path).map(function (_ref) {\n    var route = _ref.route;\n    return route.loadDataOnInit ? route.loadDataOnInit(server_store) : null;\n  }).map(function (promise) {\n    // for fail promises, continue fetch data and resolve promises\n    // double primise (outer)\n    if (promise) {\n      return new Promise(function (resolve, reject) {\n        promise.then(resolve).catch(resolve);\n      });\n    }\n  });\n  Promise.all(load_data_promises).then(function () {\n    var server_context = {};\n    var content = (0,_utils_rednderHtml__WEBPACK_IMPORTED_MODULE_2__.default)(req, server_store, server_context);\n\n    if (server_context.url) {\n      return res.redirect(301, server_context.url);\n    }\n\n    if (server_context.notFound) {\n      res.status(404);\n    }\n\n    res.send(content);\n  });\n});\nvar port = 8080;\napp.listen(port, function () {\n  console.log('Listening on port ', port);\n});\n\n//# sourceURL=webpack://shineposters/./src/server/server.js?");

/***/ }),

/***/ "./src/server/utils/rednderHtml.js":
/*!*****************************************!*\
  !*** ./src/server/utils/rednderHtml.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _client_Routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../client/Routes */ \"./src/client/Routes.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n // <Routes/> teraz są jako array []\n// aby mozna bylo pobierac dane\n// musimy inaczej zrenderowac\n\n\n // SEO\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (req, server_store, context) {\n  var content = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_1__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__.Provider, {\n    store: server_store\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.StaticRouter, {\n    location: req.path,\n    context: context\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, (0,react_router_config__WEBPACK_IMPORTED_MODULE_5__.renderRoutes)(_client_Routes__WEBPACK_IMPORTED_MODULE_3__.default)))));\n  var server_helmet = react_helmet__WEBPACK_IMPORTED_MODULE_7__.Helmet.renderStatic();\n  var html = \"\\n        <html>\\n            <head>\\n            \".concat(server_helmet.title.toString(), \"\\n            \").concat(server_helmet.meta.toString(), \"\\n            </head>\\n            <body>\\n                <div id=\\\"root\\\">\").concat(content, \"</div>\\n                <script>\\n                  window.__INITIAL_STATE__ = \").concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_6___default()(server_store.getState()), \";\\n                </script>\\n            </body>\\n            <script src=\\\"bundle.js\\\"></script>\\n        </html>\\n    \");\n  return html;\n});\n\n//# sourceURL=webpack://shineposters/./src/server/utils/rednderHtml.js?");

/***/ }),

/***/ "./src/server/utils/serverInitStore.js":
/*!*********************************************!*\
  !*** ./src/server/utils/serverInitStore.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _client_redux_reducers_all_reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../client/redux/reducers/all_reducers */ \"./src/client/redux/reducers/all_reducers.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var server_store = (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(_client_redux_reducers_all_reducers__WEBPACK_IMPORTED_MODULE_2__.default, {}, (0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)((redux_thunk__WEBPACK_IMPORTED_MODULE_1___default())));\n  return server_store;\n});\n\n//# sourceURL=webpack://shineposters/./src/server/utils/serverInitStore.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");;

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("babel-polyfill");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");;

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");;

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-helmet");;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-redux");;

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("react-router-config");;

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redux");;

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("redux-thunk");;

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("serialize-javascript");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/server/server.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;