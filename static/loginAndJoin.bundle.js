/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var inputs = document.getElementsByClassName('input-field');

	var _loop = function _loop(i) {
	  var focus = function focus() {
	    if (!inputs[i].classList.contains('active')) {
	      inputs[i].classList.add('active');
	    }
	  };
	  var blur = function blur() {
	    if (inputs[i].classList.contains('active')) {
	      inputs[i].classList.remove('active');
	    }
	  };
	  inputs[i].lastElementChild.addEventListener('focus', focus);
	  inputs[i].lastElementChild.addEventListener('change', function () {
	    if (inputs[i].lastElementChild.value) {
	      inputs[i].lastElementChild.removeEventListener('blur', blur);
	    } else {
	      inputs[i].lastElementChild.removeEventListener('blur', blur);
	      inputs[i].lastElementChild.addEventListener('blur', blur);
	    }
	  });
	  inputs[i].lastElementChild.addEventListener('blur', blur);
	};

	for (var i = 0; i < inputs.length; i++) {
	  _loop(i);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./theme.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./theme.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body, div, ul, h1, h2, h3, h4, p {\n  padding: 0;\n  margin: 0; }\n\nli {\n  list-style: none; }\n\nli, p, span, input, button, textarea,\nh1, h2, h3, h4 {\n  font-family: 'Roboto'; }\n\ninput, button, textarea {\n  border: none;\n  -webkit-appearance: none;\n  outline: 0;\n  background-color: transparent;\n  -webkit-tap-highlight-color: transparent; }\n\na {\n  text-decoration: none; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%; }\n\n.body {\n  flex: 1; }\n\n.container {\n  margin: 0 auto;\n  max-width: 1280px;\n  width: 90%; }\n  .container .row {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem; }\n\n@media only screen and (min-width: 769px) {\n  .container {\n    width: 85%; } }\n\n@media only screen and (min-width: 993px) {\n  .container {\n    width: 70%; } }\n\n.section {\n  padding-top: 1rem;\n  padding-bottom: 1rem; }\n  .section.no-pad {\n    padding: 0; }\n  .section.no-pad-bot {\n    padding-bottom: 0; }\n  .section.no-pad-top {\n    padding-top: 0; }\n\n.row {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px; }\n  .row:after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .row .col {\n    float: left;\n    box-sizing: border-box;\n    padding: 0 0.75rem;\n    min-height: 1px; }\n    .row .col[class*=\"push-\"], .row .col[class*=\"pull-\"] {\n      position: relative; }\n    .row .col.s1 {\n      width: 8.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s2 {\n      width: 16.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s3 {\n      width: 25%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s4 {\n      width: 33.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s5 {\n      width: 41.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s6 {\n      width: 50%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s7 {\n      width: 58.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s8 {\n      width: 66.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s9 {\n      width: 75%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s10 {\n      width: 83.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s11 {\n      width: 91.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s12 {\n      width: 100%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.offset-s1 {\n      margin-left: 8.33333%; }\n    .row .col.pull-s1 {\n      right: 8.33333%; }\n    .row .col.push-s1 {\n      left: 8.33333%; }\n    .row .col.offset-s2 {\n      margin-left: 16.66667%; }\n    .row .col.pull-s2 {\n      right: 16.66667%; }\n    .row .col.push-s2 {\n      left: 16.66667%; }\n    .row .col.offset-s3 {\n      margin-left: 25%; }\n    .row .col.pull-s3 {\n      right: 25%; }\n    .row .col.push-s3 {\n      left: 25%; }\n    .row .col.offset-s4 {\n      margin-left: 33.33333%; }\n    .row .col.pull-s4 {\n      right: 33.33333%; }\n    .row .col.push-s4 {\n      left: 33.33333%; }\n    .row .col.offset-s5 {\n      margin-left: 41.66667%; }\n    .row .col.pull-s5 {\n      right: 41.66667%; }\n    .row .col.push-s5 {\n      left: 41.66667%; }\n    .row .col.offset-s6 {\n      margin-left: 50%; }\n    .row .col.pull-s6 {\n      right: 50%; }\n    .row .col.push-s6 {\n      left: 50%; }\n    .row .col.offset-s7 {\n      margin-left: 58.33333%; }\n    .row .col.pull-s7 {\n      right: 58.33333%; }\n    .row .col.push-s7 {\n      left: 58.33333%; }\n    .row .col.offset-s8 {\n      margin-left: 66.66667%; }\n    .row .col.pull-s8 {\n      right: 66.66667%; }\n    .row .col.push-s8 {\n      left: 66.66667%; }\n    .row .col.offset-s9 {\n      margin-left: 75%; }\n    .row .col.pull-s9 {\n      right: 75%; }\n    .row .col.push-s9 {\n      left: 75%; }\n    .row .col.offset-s10 {\n      margin-left: 83.33333%; }\n    .row .col.pull-s10 {\n      right: 83.33333%; }\n    .row .col.push-s10 {\n      left: 83.33333%; }\n    .row .col.offset-s11 {\n      margin-left: 91.66667%; }\n    .row .col.pull-s11 {\n      right: 91.66667%; }\n    .row .col.push-s11 {\n      left: 91.66667%; }\n    .row .col.offset-s12 {\n      margin-left: 100%; }\n    .row .col.pull-s12 {\n      right: 100%; }\n    .row .col.push-s12 {\n      left: 100%; }\n    @media only screen and (min-width: 769px) {\n      .row .col.m1 {\n        width: 8.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m2 {\n        width: 16.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m3 {\n        width: 25%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m4 {\n        width: 33.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m5 {\n        width: 41.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m6 {\n        width: 50%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m7 {\n        width: 58.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m8 {\n        width: 66.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m9 {\n        width: 75%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m10 {\n        width: 83.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m11 {\n        width: 91.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m12 {\n        width: 100%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.offset-m1 {\n        margin-left: 8.33333%; }\n      .row .col.pull-m1 {\n        right: 8.33333%; }\n      .row .col.push-m1 {\n        left: 8.33333%; }\n      .row .col.offset-m2 {\n        margin-left: 16.66667%; }\n      .row .col.pull-m2 {\n        right: 16.66667%; }\n      .row .col.push-m2 {\n        left: 16.66667%; }\n      .row .col.offset-m3 {\n        margin-left: 25%; }\n      .row .col.pull-m3 {\n        right: 25%; }\n      .row .col.push-m3 {\n        left: 25%; }\n      .row .col.offset-m4 {\n        margin-left: 33.33333%; }\n      .row .col.pull-m4 {\n        right: 33.33333%; }\n      .row .col.push-m4 {\n        left: 33.33333%; }\n      .row .col.offset-m5 {\n        margin-left: 41.66667%; }\n      .row .col.pull-m5 {\n        right: 41.66667%; }\n      .row .col.push-m5 {\n        left: 41.66667%; }\n      .row .col.offset-m6 {\n        margin-left: 50%; }\n      .row .col.pull-m6 {\n        right: 50%; }\n      .row .col.push-m6 {\n        left: 50%; }\n      .row .col.offset-m7 {\n        margin-left: 58.33333%; }\n      .row .col.pull-m7 {\n        right: 58.33333%; }\n      .row .col.push-m7 {\n        left: 58.33333%; }\n      .row .col.offset-m8 {\n        margin-left: 66.66667%; }\n      .row .col.pull-m8 {\n        right: 66.66667%; }\n      .row .col.push-m8 {\n        left: 66.66667%; }\n      .row .col.offset-m9 {\n        margin-left: 75%; }\n      .row .col.pull-m9 {\n        right: 75%; }\n      .row .col.push-m9 {\n        left: 75%; }\n      .row .col.offset-m10 {\n        margin-left: 83.33333%; }\n      .row .col.pull-m10 {\n        right: 83.33333%; }\n      .row .col.push-m10 {\n        left: 83.33333%; }\n      .row .col.offset-m11 {\n        margin-left: 91.66667%; }\n      .row .col.pull-m11 {\n        right: 91.66667%; }\n      .row .col.push-m11 {\n        left: 91.66667%; }\n      .row .col.offset-m12 {\n        margin-left: 100%; }\n      .row .col.pull-m12 {\n        right: 100%; }\n      .row .col.push-m12 {\n        left: 100%; } }\n    @media only screen and (min-width: 993px) {\n      .row .col.l1 {\n        width: 8.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l2 {\n        width: 16.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l3 {\n        width: 25%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l4 {\n        width: 33.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l5 {\n        width: 41.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l6 {\n        width: 50%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l7 {\n        width: 58.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l8 {\n        width: 66.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l9 {\n        width: 75%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l10 {\n        width: 83.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l11 {\n        width: 91.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l12 {\n        width: 100%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.offset-l1 {\n        margin-left: 8.33333%; }\n      .row .col.pull-l1 {\n        right: 8.33333%; }\n      .row .col.push-l1 {\n        left: 8.33333%; }\n      .row .col.offset-l2 {\n        margin-left: 16.66667%; }\n      .row .col.pull-l2 {\n        right: 16.66667%; }\n      .row .col.push-l2 {\n        left: 16.66667%; }\n      .row .col.offset-l3 {\n        margin-left: 25%; }\n      .row .col.pull-l3 {\n        right: 25%; }\n      .row .col.push-l3 {\n        left: 25%; }\n      .row .col.offset-l4 {\n        margin-left: 33.33333%; }\n      .row .col.pull-l4 {\n        right: 33.33333%; }\n      .row .col.push-l4 {\n        left: 33.33333%; }\n      .row .col.offset-l5 {\n        margin-left: 41.66667%; }\n      .row .col.pull-l5 {\n        right: 41.66667%; }\n      .row .col.push-l5 {\n        left: 41.66667%; }\n      .row .col.offset-l6 {\n        margin-left: 50%; }\n      .row .col.pull-l6 {\n        right: 50%; }\n      .row .col.push-l6 {\n        left: 50%; }\n      .row .col.offset-l7 {\n        margin-left: 58.33333%; }\n      .row .col.pull-l7 {\n        right: 58.33333%; }\n      .row .col.push-l7 {\n        left: 58.33333%; }\n      .row .col.offset-l8 {\n        margin-left: 66.66667%; }\n      .row .col.pull-l8 {\n        right: 66.66667%; }\n      .row .col.push-l8 {\n        left: 66.66667%; }\n      .row .col.offset-l9 {\n        margin-left: 75%; }\n      .row .col.pull-l9 {\n        right: 75%; }\n      .row .col.push-l9 {\n        left: 75%; }\n      .row .col.offset-l10 {\n        margin-left: 83.33333%; }\n      .row .col.pull-l10 {\n        right: 83.33333%; }\n      .row .col.push-l10 {\n        left: 83.33333%; }\n      .row .col.offset-l11 {\n        margin-left: 91.66667%; }\n      .row .col.pull-l11 {\n        right: 91.66667%; }\n      .row .col.push-l11 {\n        left: 91.66667%; }\n      .row .col.offset-l12 {\n        margin-left: 100%; }\n      .row .col.pull-l12 {\n        right: 100%; }\n      .row .col.push-l12 {\n        left: 100%; } }\n\nul.todos {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); }\n  ul.todos i {\n    cursor: pointer; }\n  ul.todos .todo {\n    border-bottom: 1px solid #BDBDBD; }\n    ul.todos .todo input {\n      display: none; }\n    ul.todos .todo > div {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: stretch;\n      justify-content: center; }\n      ul.todos .todo > div.info > div {\n        height: 24px;\n        line-height: 24px;\n        padding: 16px; }\n      ul.todos .todo > div > .toggle {\n        order: 0;\n        flex-grow: 1; }\n      ul.todos .todo > div > .content {\n        order: 1;\n        flex-grow: 9;\n        font-size: 18px; }\n        ul.todos .todo > div > .content input {\n          font-size: 18px; }\n      ul.todos .todo > div > .operate {\n        flex-grow: 2;\n        order: 2;\n        text-align: right; }\n        ul.todos .todo > div > .operate i {\n          padding: 0 4px; }\n          ul.todos .todo > div > .operate i:last-child {\n            display: none; }\n    ul.todos .todo > .detail {\n      display: none;\n      color: #757575; }\n      ul.todos .todo > .detail > div {\n        padding: 16px;\n        flex: 1; }\n      ul.todos .todo > .detail span {\n        vertical-align: super; }\n      ul.todos .todo > .detail ul {\n        display: inline-flex;\n        flex-wrap: wrap;\n        align-items: stretch;\n        justify-content: center; }\n  ul.todos .undone .info {\n    color: #212121;\n    transition: all 0.25s;\n    cursor: default; }\n    ul.todos .undone .info i {\n      transition: all 0.25s;\n      color: transparent;\n      visibility: hidden; }\n    ul.todos .undone .info .toggle i:first-child {\n      display: none; }\n    ul.todos .undone .info:hover {\n      background-color: #D1C4E9;\n      color: #512DA8; }\n      ul.todos .undone .info:hover i {\n        color: #512DA8;\n        visibility: visible; }\n  ul.todos .done .info {\n    color: #212121;\n    transition: all 0.25s;\n    cursor: default; }\n    ul.todos .done .info .content {\n      text-decoration: line-through; }\n    ul.todos .done .info i {\n      transition: all 0.25s;\n      color: transparent;\n      visibility: hidden; }\n    ul.todos .done .info .toggle > i {\n      display: none; }\n      ul.todos .done .info .toggle > i:first-child {\n        display: inline-block;\n        color: #212121;\n        visibility: visible; }\n    ul.todos .done .info:hover {\n      background-color: #D1C4E9;\n      color: #512DA8; }\n      ul.todos .done .info:hover i {\n        visibility: visible;\n        color: #512DA8 !important; }\n  ul.todos .members {\n    flex: 2 !important; }\n    ul.todos .members > i {\n      color: #757575; }\n      ul.todos .members > i:last-of-type {\n        display: none; }\n    ul.todos .members .member {\n      margin: 0 4px; }\n      ul.todos .members .member i {\n        display: none; }\n  ul.todos .spread .info {\n    background-color: #673AB7;\n    color: #FFFFFF; }\n    ul.todos .spread .info .toggle i:first-child {\n      color: #FFFFFF;\n      visibility: visible; }\n    ul.todos .spread .info:hover .toggle i:first-child {\n      color: #512DA8; }\n    ul.todos .spread .info:hover .operate i:nth-child(2) {\n      color: #512DA8; }\n  ul.todos .spread .operate i:nth-child(2) {\n    color: #FFFFFF;\n    visibility: visible !important; }\n  ul.todos .spread .detail {\n    display: flex; }\n  ul.todos .edit .info {\n    background-color: #D1C4E9; }\n    ul.todos .edit .info:hover i {\n      visibility: hidden; }\n    ul.todos .edit .info:hover .operate i:last-child {\n      visibility: visible;\n      display: inline-block !important; }\n  ul.todos .edit .content span {\n    display: none; }\n  ul.todos .edit .content input {\n    display: block;\n    background-color: #FFFFFF;\n    width: 100%; }\n  ul.todos .edit .toggle i {\n    color: #212121 !important; }\n  ul.todos .edit .operate i {\n    visibility: hidden;\n    color: #212121 !important; }\n    ul.todos .edit .operate i:last-child {\n      visibility: visible;\n      display: inline-block !important; }\n  ul.todos .edit .member i {\n    display: inline-block; }\n\n.todo .done {\n  display: none; }\n\n.complete .undone {\n  display: none; }\n\n.nav {\n  color: #FFFFFF;\n  background-color: #673AB7;\n  width: 100%; }\n  .nav a {\n    color: #FFFFFF; }\n  .nav div {\n    overflow: hidden; }\n  .nav h1 {\n    -webkit-font-smoothing: antialiased;\n    font-size: 2.1rem;\n    white-space: nowrap;\n    display: inline-block;\n    line-height: 4rem; }\n    @media only screen and (max-width: 768px) {\n      .nav h1 {\n        font-size: 1.5rem; } }\n  .nav .nav-list {\n    overflow: hidden;\n    float: right; }\n    .nav .nav-list li {\n      line-height: 4rem;\n      transition: all 0.25s;\n      float: left;\n      padding: 0 1rem;\n      cursor: pointer; }\n      .nav .nav-list li span, .nav .nav-list li i {\n        vertical-align: middle; }\n      .nav .nav-list li span {\n        margin-right: 0.5rem; }\n      .nav .nav-list li .new {\n        font-size: 0.8rem;\n        display: inline-block;\n        border-radius: 0.5rem;\n        padding: 0 0.5rem;\n        line-height: 1.5rem;\n        background-color: #FFFFFF;\n        color: #673AB7; }\n      .nav .nav-list li:hover {\n        background-color: #512DA8; }\n\nfooter {\n  padding-top: 2rem;\n  width: 100%;\n  color: #FFFFFF;\n  background-color: #673AB7;\n  -webkit-font-smoothing: antialiased; }\n  footer a {\n    color: #FFFFFF; }\n  footer h3 {\n    margin: 0.82rem 0 0.656rem 0;\n    line-height: 1.1;\n    font-size: 1.64rem; }\n  footer p {\n    font-size: 0.9rem; }\n  footer .footer-right h3 {\n    text-align: right; }\n  footer .footer-right ul li {\n    text-align: right;\n    line-height: 2rem;\n    white-space: nowrap; }\n    footer .footer-right ul li i {\n      font-size: 1.2rem;\n      margin-right: 0.2rem;\n      vertical-align: text-bottom; }\n  @media only screen and (max-width: 768px) {\n    footer .footer-right h3 {\n      text-align: left; }\n    footer .footer-right ul li {\n      text-align: left; } }\n  footer .copyright {\n    width: 100%;\n    background-color: #512DA8;\n    line-height: 4rem; }\n    footer .copyright div {\n      margin-bottom: 0; }\n\n.todo-input {\n  margin-top: 20px; }\n  .todo-input div {\n    position: relative; }\n  .todo-input button {\n    cursor: pointer;\n    height: 100%;\n    top: 0;\n    position: absolute;\n    right: 0; }\n    .todo-input button i {\n      transition: all 0.25s;\n      font-size: 2rem;\n      color: #D1C4E9; }\n    .todo-input button:hover i {\n      color: #673AB7; }\n  .todo-input input {\n    transition: all 0.25s;\n    background-color: transparent;\n    text-align: center;\n    line-height: 3rem;\n    font-weight: 300;\n    font-size: 2rem;\n    width: 100%;\n    color: #673AB7;\n    border-bottom: 2px solid #BDBDBD; }\n    .todo-input input:focus {\n      border-bottom: 2px solid #673AB7;\n      box-shadow: 0 2px 0 0 #673AB7; }\n      .todo-input input:focus::-webkit-input-placeholder {\n        color: #673AB7; }\n      .todo-input input:focus + button i {\n        color: #673AB7; }\n    .todo-input input::-webkit-input-placeholder {\n      font-weight: 300; }\n      @media only screen and (max-width: 768px) {\n        .todo-input input::-webkit-input-placeholder {\n          font-size: 1rem; } }\n\nform .row {\n  text-align: center; }\n\nform .error {\n  margin: 0;\n  line-height: 1rem;\n  color: #512DA8; }\n\nform .title {\n  -webkit-font-smoothing: antialiased;\n  color: #512DA8;\n  font-weight: 300;\n  font-size: 2.56rem;\n  line-height: 110%;\n  margin: 1.78rem 0 1.424rem 0; }\n\nform .input-field {\n  margin-top: 1rem;\n  position: relative; }\n\nform input {\n  box-sizing: border-box;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #BDBDBD;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  margin-bottom: 1rem;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: all 0.5s;\n  font-size: 1rem;\n  color: #512DA8; }\n\nform label {\n  color: #757575;\n  position: absolute;\n  top: 0.8rem;\n  font-size: 1rem;\n  cursor: text;\n  z-index: -1;\n  transition: 0.2s ease-out; }\n\nform .active input {\n  border-bottom: 1px solid #673AB7;\n  box-shadow: 0 1px 0 0 #673AB7; }\n\nform .active label {\n  font-size: 0.8rem;\n  transform: translateY(-140%);\n  -webkit-transform: translateY(-140%); }\n\nform div:last-child {\n  text-align: center; }\n\nform input[type=submit] {\n  padding: 0 1rem;\n  font-size: 1rem;\n  color: #FFFFFF;\n  background-color: #673AB7;\n  width: 4rem;\n  border: 0;\n  margin: 0;\n  cursor: pointer; }\n  form input[type=submit]:hover {\n    background-color: #512DA8; }\n\nform .error {\n  line-height: 3rem;\n  background-color: #D1C4E9;\n  color: #FFFFFF; }\n\n.tab > div {\n  display: flex;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n\n.tab a {\n  transition: all 0.25s;\n  display: inline-block;\n  line-height: 3rem;\n  padding: 0 2rem;\n  color: #673AB7;\n  box-sizing: border-box;\n  border-bottom: 3px solid transparent; }\n  .tab a.active {\n    border-bottom: 3px solid #673AB7; }\n  .tab a:hover {\n    background-color: #D1C4E9; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);