(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,r(o.key),o)}}function r(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!=e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:String(n)}const o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var r,o;return r=e,(o=[{key:"get",value:function(e){if(e){var t=this._createCookieMap();if(t){var n=t.get("".concat(e));if(n)return n}}}},{key:"set",value:function(e,t,n){var r=this._setCookieExpiryDate(n);document.cookie=r?"".concat(e,"=").concat(t,"; expires=").concat(r,"; path=/"):"".concat(e,"=").concat(t,"; path=/")}},{key:"remove",value:function(e){document.cookie="".concat(e,"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/")}},{key:"_createCookieMap",value:function(){if(document.cookie){var e,n=document.cookie.split(";"),r=new Map,o=function(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return u=e.done,e},e:function(e){c=!0,a=e},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw a}}}}(n);try{for(o.s();!(e=o.n()).done;){var i=e.value,a=i.split("=")[0].trim(),u=i.split("=")[1].trim();r.set(a,u)}}catch(e){o.e(e)}finally{o.f()}return r}}},{key:"_setCookieExpiryDate",value:function(e){if(e&&"number"==typeof e){var t=(new Date).getTime();return new Date(t+e).toUTCString()}}}])&&n(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),e}();var i=new o;const a=function(){return i.get("loginToken")};function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}function l(e){var t=function(e,t){if("object"!=u(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:String(t)}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"display",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cta";if(!document.querySelector(".confirm-modal")){var n=this._create(e,t);document.body.appendChild(n),n.style.display="block",requestAnimationFrame((function(){requestAnimationFrame((function(){n.style.opacity="1"}))}))}}},{key:"remove",value:function(){document.querySelector(".confirm-modal")&&document.querySelector(".confirm-modal").remove()}},{key:"isExitClick",value:function(e){return!(!e.target.classList.contains("container")&&!e.target.classList.contains("confirm-modal")&&"confirmModalCancelBtn"!==e.target.id)}},{key:"_create",value:function(e,t){var n=document.createElement("div");n.className="confirm-modal";var r=document.createElement("div");r.className="container";var o=document.createElement("div");o.className="confirm-modal-container";var i=this._createConfirmMessage(e),a=this._createBtnContainer(t);return o.appendChild(i),o.appendChild(a),r.appendChild(o),n.appendChild(r),n}},{key:"_createBtnContainer",value:function(e){var t=document.createElement("div");t.className="btn-container";var n=document.createElement("button");n.className="btn btn-border-light",n.id="confirmModalCancelBtn",n.appendChild(document.createTextNode("Cancel"));var r=document.createElement("button");return r.className="btn btn-".concat(e||"cta"),r.id="confirmModalConfirmBtn",r.appendChild(document.createTextNode("Confirm")),t.appendChild(n),t.appendChild(r),t}},{key:"_createConfirmMessage",value:function(e){e||(e="Are you sure?");var t=document.createElement("p");return t.appendChild(document.createTextNode(e)),t}}],n&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();const f=s;function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,y(r.key),r)}}function y(e){var t=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==d(t)?t:String(t)}const p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"display",value:function(){if(!document.querySelector(".loading-modal")){var e=document.createElement("div");e.className="loading-modal";var t=document.createElement("span");t.className="spinner",e.appendChild(t),document.body.appendChild(e)}}},{key:"remove",value:function(){document.querySelector(".loading-modal")&&document.querySelector(".loading-modal").remove()}}],null&&m(t.prototype,null),n&&m(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cta";"string"!=typeof e&&(e="");var n=document.createElement("div");n.className="popup","danger"===t&&(n.style.background="#bd2130",n.style.color="#faf8ff"),"success"===t&&(n.style.background="#28a745");var r=document.createElement("p");r.className="popup-message",r.appendChild(document.createTextNode(e)),document.querySelector(".popup")&&document.querySelector(".popup").remove(),n.appendChild(r),document.body.appendChild(n),requestAnimationFrame((function(){requestAnimationFrame((function(){n.style.transform="translateY(0)"}))})),setTimeout((function(){n.style.transform="translateY(-10rem)",setTimeout((function(){return n.remove()}),200)}),2e3)};function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,g(r.key),r)}}function g(e){var t=function(e,t){if("object"!=b(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==b(t)?t:String(t)}var S=new o,w=new f;function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,E(r.key),r)}}function E(e){var t=function(e,t){if("object"!=C(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==C(t)?t:String(t)}new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._linksContainer=document.querySelector(".links-container"),this._userMenuBtn=document.querySelector("#user-menu-btn"),this._userMenuOptions=document.querySelector(".user-menu-options"),this._logoutBtn=document.querySelector(".user-menu-options").lastElementChild.firstElementChild,this._loadEventListeners()}var t,n;return t=e,(n=[{key:"_loadEventListeners",value:function(){window.addEventListener("DOMContentLoaded",this._displayUserMenuBtn.bind(this)),this._userMenuBtn.addEventListener("click",this._displayUserMenu.bind(this)),this._userMenuBtn.addEventListener("keyup",this._handleUserMenuKeyEvents.bind(this)),this._logoutBtn.addEventListener("click",this._logout.bind(this))}},{key:"_displayUserMenuBtn",value:function(){if(!a())return this._linksContainer.classList.remove("hidden"),void this._userMenuBtn.classList.add("hidden");this._linksContainer.classList.add("hidden"),this._userMenuBtn.classList.remove("hidden")}},{key:"_handleUserMenuKeyEvents",value:function(e){"Enter"===e.key&&this._displayUserMenu()}},{key:"_displayUserMenu",value:function(){this._userMenuOptions.classList.contains("hidden")?this._userMenuOptions.classList.remove("hidden"):this._userMenuOptions.classList.add("hidden")}},{key:"_logout",value:function(e){e.preventDefault(),w.display("Are you sure you want to log out?"),document.querySelector(".confirm-modal").addEventListener("click",(function(e){w.isExitClick(e)?w.remove():"confirmModalConfirmBtn"===e.target.id&&(w.remove(),p.display(),S.remove("loginToken"),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Something went wrong",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"danger";if(!e||"string"!=typeof e)return v("Something went wrong","danger"),void setTimeout((function(){return window.location.href="index.html"}),t);sessionStorage.getItem("unsavedSessionChanges")&&sessionStorage.removeItem("unsavedSessionChanges"),v(n,r),setTimeout((function(){return window.location.href=e}),t)}("index.html",1e3,"Signed out successfully","success"))}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()),new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._heroBtnContainer=document.querySelector(".hero .btn-container"),this._heroSignUpBtn=document.querySelector("#hero-sign-up-btn"),this.loadEventListeners()}var t,n;return t=e,(n=[{key:"loadEventListeners",value:function(){window.addEventListener("DOMContentLoaded",this._displayHeroButtons.bind(this))}},{key:"_displayHeroButtons",value:function(){if(a()){this._heroSignUpBtn.style.display="none";var e=document.createElement("a");e.className="btn btn-light",e.href="history.html",e.appendChild(document.createTextNode("History")),this._heroBtnContainer.appendChild(e)}}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())})();