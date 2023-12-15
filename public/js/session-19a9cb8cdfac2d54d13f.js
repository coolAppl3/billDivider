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

/***/ "./src/js/session.js":
/*!***************************!*\
  !*** ./src/js/session.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\n//# sourceURL=webpack://webpack-starter/./src/js/session.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Roboto\", sans-serif;\n  font-size: 62.5%;\n}\n\nbody {\n  font-family: \"Roboto\", sans-serif;\n  font-size: 1.6rem;\n  font-weight: 400;\n  line-height: 1.4;\n  background: #1A1A1A;\n  color: #FAF8FF;\n  position: relative;\n  z-index: 2;\n}\n\n.container {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  height: 100%;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1.2;\n  font-weight: 400;\n}\n\nbutton, input, textarea {\n  background: transparent;\n  border: 1px solid #FAF8FF;\n  font-size: 1.6rem;\n  font-weight: 400;\n  color: #FAF8FF;\n}\n\nul, li {\n  list-style: none;\n  text-decoration: none;\n}\n\nimg {\n  height: 100%;\n  width: 100%;\n  object-fit: cover;\n}\n\na {\n  text-decoration: none;\n  color: #FAF8FF;\n}\n\n.btn {\n  display: block;\n  min-width: fit-content;\n  padding: 0 2.4rem;\n  line-height: 40px;\n  font-weight: bold !important;\n  font-size: 1.6rem;\n  text-align: center;\n  border-radius: 3px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition: filter 200ms;\n}\n\n.btn.btn:hover {\n  filter: brightness(0.7);\n}\n.btn.btn-main {\n  background: #1A1A1A;\n  border-color: #1A1A1A;\n  color: #FAF8FF;\n}\n.btn.btn-secondary {\n  background: #2C2C32;\n  border-color: #2C2C32;\n  color: #FAF8FF;\n}\n.btn.btn-light {\n  background: #FAF8FF;\n  border-color: #FAF8FF;\n  color: #1A1A1A;\n}\n.btn.btn-light {\n  background: #FAF8FF;\n  border-color: #FAF8FF;\n  color: #1A1A1A;\n}\n.btn.btn-cta {\n  background: #8685EF;\n  border-color: #8685EF;\n  color: #1A1A1A;\n}\n.btn.btn-border-main {\n  background: transparent;\n  border-color: #1A1A1A;\n  color: #1A1A1A;\n}\n.btn.btn-border-secondary {\n  background: transparent;\n  border-color: #2C2C32;\n  color: #2C2C32;\n}\n.btn.btn-border-light {\n  background: transparent;\n  border-color: #FAF8FF;\n  color: #FAF8FF;\n}\n.btn.btn-border-cta {\n  background: transparent;\n  border-color: #8685EF;\n  color: #8685EF;\n}\n\n.text-main {\n  color: #1A1A1A;\n}\n.text-secondary {\n  color: #2C2C32;\n}\n.text-light {\n  color: #FAF8FF;\n}\n.text-cta {\n  color: #8685EF;\n}\n\n.bg-main {\n  background: #1A1A1A;\n}\n.bg-secondary {\n  background: #2C2C32;\n}\n.bg-light {\n  background: #FAF8FF;\n}\n.bg-cta {\n  background: #8685EF;\n}\n\n.img-div {\n  display: flex;\n  overflow: hidden;\n}\n\n.btn-div {\n  display: flex;\n  height: fit-content;\n}\n\n.nav-push-div {\n  display: block;\n  height: 6rem;\n  width: 100%;\n}\n\n.content-t {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 1.2;\n  margin-bottom: 1rem;\n}\n.content-p {\n  font-size: 1.6rem;\n  font-weight: 500;\n  line-height: 1.4;\n  margin-bottom: 2rem;\n  color: #CECCD5;\n}\n.content-90 {\n  max-width: 90%;\n}\n.content-80 {\n  max-width: 80%;\n}\n.content-60 {\n  max-width: 60%;\n}\n.content-50 {\n  max-width: 50%;\n}\n\n.section-p {\n  padding: 5rem 0;\n}\n\n.main-nav {\n  height: 6rem;\n  max-height: 6rem;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 10;\n}\n.main-nav .container {\n  position: relative;\n}\n.main-nav-container {\n  height: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.main-nav-container svg {\n  color: #FAF8FF;\n  margin-bottom: 2px;\n  margin-right: 5px;\n  font-weight: bold;\n}\n.main-nav-container .logo {\n  position: relative;\n  font-size: 3rem;\n  font-weight: 400;\n  margin-right: auto;\n}\n.main-nav-container .logo a {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 11;\n}\n.main-nav-container .links-container {\n  display: flex;\n  align-items: center;\n}\n.main-nav-container .links-container .btn-div:last-child {\n  margin-left: 1rem;\n}\n.main-nav-container #user-menu-btn {\n  margin-left: 2rem;\n  border: 2px solid #FAF8FF;\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n  min-height: 40px;\n  min-width: 40px;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  transition: background 200ms, color 200ms, border-color 200ms;\n}\n.main-nav-container #user-menu-btn.hidden {\n  display: none;\n}\n.main-nav-container #user-menu-btn .user-menu-options {\n  position: absolute;\n  top: 6rem;\n  right: 0;\n  background: #0D0D0D;\n  display: none;\n}\n.main-nav-container #user-menu-btn .user-menu-options::after {\n  content: \"\";\n  position: absolute;\n  top: -6.5px;\n  right: 35px;\n  width: 0px;\n  height: 0px;\n  border-style: solid;\n  border-width: 0px 5px 7px 5px;\n  border-color: transparent transparent #0D0D0D transparent;\n}\n.main-nav-container #user-menu-btn .user-menu-options li {\n  display: block;\n}\n.main-nav-container #user-menu-btn .user-menu-options li a {\n  width: 100%;\n  height: 100%;\n  padding: 1rem 4rem;\n  display: block;\n  font-size: 1.4rem;\n  transition: background 200ms;\n}\n.main-nav-container #user-menu-btn .user-menu-options li a:hover {\n  background: #333;\n}\n\n.hero {\n  height: calc(100vh - 6rem);\n  max-height: calc(100vh - 6rem);\n  height: calc(100svh - 6rem);\n  max-height: calc(100svh - 6rem);\n  overflow: hidden;\n}\n.hero .container {\n  display: flex;\n}\n.hero-container {\n  margin: auto 0;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.hero-container .svg-div {\n  grid-column: span 1;\n  margin: auto 0;\n  text-align: end;\n}\n.hero-container-content {\n  grid-column: span 2;\n  margin: auto 0;\n}\n.hero-container-content .content-t {\n  font-size: 4.2rem;\n}\n.hero-container-content .btn-container {\n  display: flex;\n  align-items: center;\n}\n.hero-container-content .btn-container .btn-div:first-child {\n  margin-right: 1rem;\n}\n\n.sign-up {\n  height: 100vh;\n  max-height: 100vh;\n  height: 100svh;\n  max-height: 100svh;\n}\n.sign-up-container {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sign-up-container-form {\n  padding: 4rem 2rem;\n  background: #2C2C32;\n  border-radius: 5px;\n  width: 35rem;\n  max-width: 35rem;\n  position: relative;\n}\n.sign-up-container-form .content-t {\n  font-size: 2.6rem;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 5px;\n}\n.sign-up-container-form .h-line {\n  height: 1px;\n  width: calc(100% + 4rem);\n  background: rgba(200, 200, 200, 0.15);\n  margin: 4rem 0 3rem;\n  transform: translateX(-2rem);\n}\n.sign-up-container-form .content-p {\n  font-size: 1.4rem;\n  font-weight: 400;\n  text-align: center;\n}\n.sign-up-container-form .form-group {\n  margin-bottom: 2rem;\n}\n.sign-up-container-form .form-group label {\n  display: block;\n  font-size: 1.4rem;\n  margin-bottom: 4px;\n  font-weight: 500;\n}\n.sign-up-container-form .form-group input {\n  width: 100%;\n  border: 1px solid rgba(200, 200, 200, 0.35);\n  border-radius: 3px;\n  line-height: 28px;\n  outline: none;\n  padding: 0 1rem;\n  font-weight: 400;\n  font-size: 1.4rem;\n}\n.sign-up-container-form .btn-div {\n  margin-bottom: 2rem;\n}\n.sign-up-container-form .btn-div .btn {\n  width: 100%;\n}\n.sign-up-container-form div + p {\n  display: block;\n  margin: 0 auto 3rem;\n  font-size: 1.2rem;\n  color: rgba(200, 200, 200, 0.85);\n}\n.sign-up-container-form div + p a {\n  text-decoration: underline;\n  transition: color 200ms, opacity 200ms;\n  opacity: 0.9;\n}\n.sign-up-container-form div + p a:hover {\n  color: #8685EF;\n  opacity: 1;\n}\n.sign-up-container-form #return-btn {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  font-size: 1.4rem;\n  font-weight: bold;\n  padding: 1rem;\n  cursor: pointer;\n  transition: color 200ms;\n  width: fit-content;\n}\n.sign-up-container-form #return-btn:hover {\n  color: rgba(200, 200, 200, 0.85);\n}\n.sign-up-container-form #return-btn i {\n  color: #8685EF;\n}\n\n.sign-in {\n  height: 100vh;\n  max-height: 100vh;\n  height: 100svh;\n  max-height: 100svh;\n}\n.sign-in-container {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sign-in-container-form {\n  padding: 4rem 2rem;\n  background: #2C2C32;\n  border-radius: 5px;\n  width: 35rem;\n  max-width: 35rem;\n  position: relative;\n}\n.sign-in-container-form .content-t {\n  font-size: 2.6rem;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 0;\n}\n.sign-in-container-form .h-line {\n  height: 1px;\n  width: calc(100% + 4rem);\n  background: rgba(200, 200, 200, 0.15);\n  margin: 4rem 0 3rem;\n  transform: translateX(-2rem);\n}\n.sign-in-container-form .form-group {\n  margin-bottom: 2rem;\n}\n.sign-in-container-form .form-group label {\n  display: block;\n  font-size: 1.4rem;\n  margin-bottom: 4px;\n  font-weight: 500;\n}\n.sign-in-container-form .form-group input {\n  width: 100%;\n  border: 1px solid rgba(200, 200, 200, 0.35);\n  border-radius: 3px;\n  line-height: 28px;\n  outline: none;\n  padding: 0 1rem;\n  font-weight: 400;\n  font-size: 1.4rem;\n}\n.sign-in-container-form .btn-div {\n  margin-bottom: 2rem;\n}\n.sign-in-container-form .btn-div .btn {\n  width: 100%;\n}\n.sign-in-container-form div + p {\n  display: block;\n  margin: 0 auto 3rem;\n  font-size: 1.2rem;\n  color: rgba(200, 200, 200, 0.85);\n}\n.sign-in-container-form div + p a {\n  text-decoration: underline;\n  transition: color 200ms, opacity 200ms;\n  opacity: 0.9;\n}\n.sign-in-container-form div + p a:hover {\n  color: #8685EF;\n  opacity: 1;\n}\n.sign-in-container-form #return-btn {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  font-size: 1.4rem;\n  font-weight: bold;\n  padding: 1rem;\n  cursor: pointer;\n  transition: color 200ms;\n  width: fit-content;\n}\n.sign-in-container-form #return-btn:hover {\n  color: rgba(200, 200, 200, 0.85);\n}\n.sign-in-container-form #return-btn i {\n  color: #8685EF;\n}\n\n@media (max-width: 830px) {\n  .container {\n    padding: 0 1rem;\n  }\n  .hero-container {\n    grid-template-columns: repeat(1, 1fr);\n  }\n  .hero-container-content {\n    grid-column: span 1;\n    margin-top: auto;\n  }\n  .hero-container .svg-div {\n    display: none;\n  }\n}\n@media (max-width: 430px) {\n  .container {\n    padding: 0 1rem;\n  }\n  .main-nav .logo {\n    font-size: 2.2rem;\n    font-weight: bold;\n  }\n  .main-nav .links-container .btn {\n    font-size: 1.3rem;\n    line-height: 30px;\n    padding: 0 1.8rem;\n  }\n  .hero-container {\n    grid-template-columns: repeat(1, 1fr);\n  }\n  .hero-container-content {\n    grid-column: span 1;\n    margin-top: auto;\n  }\n  .hero-container-content .content-t {\n    font-size: 2.4rem;\n    font-weight: bold;\n  }\n  .hero-container-content .content-p {\n    max-width: 100%;\n  }\n  .hero-container .svg-div {\n    display: none;\n  }\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack-starter/./src/scss/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://webpack-starter/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://webpack-starter/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://webpack-starter/./src/scss/main.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://webpack-starter/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/session.js");
/******/ 	
/******/ })()
;