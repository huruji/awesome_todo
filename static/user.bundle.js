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

	__webpack_require__(5);

	__webpack_require__(1);

	var _userEvents = __webpack_require__(6);

	var _parser = __webpack_require__(7);

	var _parser2 = _interopRequireDefault(_parser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $id = function $id(id) {
	  return document.getElementById(id);
	};

	var data = {};

	var eventList = {
	  toggleTodo: {
	    type: 'click',
	    fn: function fn() {
	      (0, _userEvents.toggleTodo)(data, this.parentNode.parentNode.parentNode);
	    }
	  },
	  edit: {
	    type: 'click',
	    fn: function fn() {
	      var _todo = this.parentNode.parentNode.parentNode;
	      if (!_todo.classList.contains('edit')) {
	        _todo.classList.add('edit');
	      }
	    }
	  },
	  spread: {
	    type: 'click',
	    fn: function fn() {
	      var _todo = this.parentNode.parentNode.parentNode;
	      _todo.classList.toggle('spread');
	    }
	  },
	  update: {
	    type: 'click',
	    fn: function fn() {
	      _userEvents.updateTodo.call(this, data);
	    }
	  },
	  remove: {
	    type: 'click',
	    fn: function fn() {
	      (0, _userEvents.removeTodo)(data, this.parentNode.parentNode.parentNode.parentNode);
	    }
	  }
	};

	var ipt = document.getElementById('ipt');
	function submit() {
	  var _value = ipt.firstElementChild.firstElementChild.value;
	  if (!_value) {
	    return;
	  }
	  fetch('/todo', {
	    method: 'POST',
	    body: _value,
	    headers: {
	      'Content-Type': 'text/plain'
	    }
	  }).then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    var todo = {};
	    todo._id = json._id;
	    todo.todo = json.todo;
	    if (json.finish) {
	      todo.finish = 'done';
	    } else {
	      todo.finish = 'undone';
	    }
	    data.todos.push(todo);
	    ipt.firstElementChild.firstElementChild.value = '';
	  });
	}
	ipt.firstElementChild.lastElementChild.addEventListener('click', submit);
	ipt.firstElementChild.firstElementChild.addEventListener('keydown', function (e) {
	  if (e.key === 'Enter') {
	    submit();
	  }
	});

	var statusChange = function statusChange() {
	  var btns = $id('btns').firstElementChild.children;
	  switch (location.hash) {
	    case '#complete':
	      btns[0].classList.remove('active');
	      btns[1].classList.add('active');
	      btns[2].classList.remove('active');
	      if ($id('todo').classList.contains('all')) {
	        $id('todo').classList.remove('all');
	      }
	      if ($id('todo').classList.contains('todo')) {
	        $id('todo').classList.remove('todo');
	      }
	      if (!$id('todo').classList.contains('complete')) {
	        $id('todo').classList.add('complete');
	      }
	      break;
	    case '#todo':
	      btns[0].classList.remove('active');
	      btns[1].classList.remove('active');
	      btns[2].classList.add('active');
	      if ($id('todo').classList.contains('all')) {
	        $id('todo').classList.remove('all');
	      }
	      if ($id('todo').classList.contains('complete')) {
	        $id('todo').classList.remove('complete');
	      }
	      if (!$id('todo').classList.contains('todo')) {
	        $id('todo').classList.add('todo');
	      }
	      break;
	    default:
	      btns[0].classList.add('active');
	      btns[1].classList.remove('active');
	      btns[2].classList.remove('active');
	      if ($id('todo').classList.contains('complete')) {
	        $id('todo').classList.remove('complete');
	      }
	      if ($id('todo').classList.contains('todo')) {
	        $id('todo').classList.remove('todo');
	      }
	      if (!$id('todo').classList.contains('all')) {
	        $id('todo').classList.add('all');
	      }
	  }
	};

	window.addEventListener('load', function () {
	  fetch('/todo').then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    data.todos = [];
	    if (json) {
	      json.forEach(function (todo) {
	        var _thisTodo = {};
	        _thisTodo.todo = todo.todo;
	        _thisTodo._id = todo._id;
	        if (todo.finish) {
	          _thisTodo.finish = 'done';
	        } else {
	          _thisTodo.finish = 'undone';
	        }
	        data.todos.push(_thisTodo);
	      });
	    }
	    new _parser2.default('#todo', data, eventList);
	    statusChange();
	    console.log(data);
	  });
	});
	window.addEventListener('hashchange', statusChange);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function toggleTodo(data, todoEl) {
	  var _i = Array.prototype.indexOf.call(todoEl.parentNode.children, todoEl);
	  var _todo = data.todos[_i];
	  var state = void 0;
	  if (_todo.finish === 'done') {
	    state = 'undone';
	  } else {
	    state = 'done';
	  }
	  fetch('/todo/' + _todo._id, {
	    method: 'PUT',
	    body: JSON.stringify({ finish: state }),
	    headers: {
	      'Content-Type': 'application/json'
	    }
	  }).then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    if (json.finish) {
	      _todo.finish = 'done';
	    } else {
	      _todo.finish = 'undone';
	    }
	  });
	}

	function updateTodo(data) {
	  var _todoEl = this.parentNode.parentNode.parentNode.parentNode;
	  var _i = Array.prototype.indexOf.call(_todoEl.parentNode.children, _todoEl);
	  var _node = this.parentNode.parentNode.parentNode;
	  var _todo = data.todos[_i];
	  var _value = this.parentNode.previousElementSibling.lastElementChild.value;
	  fetch('/todo/' + _todo._id, {
	    method: 'PUT',
	    body: JSON.stringify({ todo: _value }),
	    headers: {
	      'Content-Type': 'application/json'
	    }
	  }).then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    _todo.todo = json.todo;
	    _node.classList.remove('edit');
	  });
	}

	function removeTodo(data, todoEl) {
	  var _i = Array.prototype.indexOf.call(todoEl.parentNode.children, todoEl);
	  var _todo = data.todos[_i];
	  fetch('/todo/' + _todo._id, {
	    method: 'DELETE'
	  }).then(function (res) {
	    if (res) {
	      data.todos.splice(_i, 1);
	    }
	  });
	}

	exports.toggleTodo = toggleTodo;
	exports.updateTodo = updateTodo;
	exports.removeTodo = removeTodo;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _register = __webpack_require__(8);

	var _register2 = _interopRequireDefault(_register);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Parser = function () {
	  function Parser(el, data, elist) {
	    _classCallCheck(this, Parser);

	    this._data = data;
	    this.$register = new _register2.default();
	    this.$el = document.querySelector(el);
	    this.$elist = elist;
	    this.$frag = this.node2Fragment(this.$el);
	    this.scan(this.$frag);
	    this.$el.appendChild(this.$frag);
	    this.$register.build();
	  }

	  _createClass(Parser, [{
	    key: 'node2Fragment',
	    value: function node2Fragment(el) {
	      var fragment = document.createDocumentFragment();
	      var child = el.firstChild;
	      while (child) {
	        fragment.appendChild(child);
	        child = el.firstChild;
	      }
	      return fragment;
	    }
	  }, {
	    key: 'scan',
	    value: function scan(node) {
	      if (node === this.$frag || !node.getAttribute('data-list')) {
	        for (var i = 0; i < node.children.length; i++) {
	          var _thisNode = node.children[i];
	          if (node.path) {
	            _thisNode.path = node.path;
	          }
	          this.parseEvent(_thisNode);
	          this.parseClass(_thisNode);
	          this.parseModel(_thisNode);
	          if (_thisNode.children.length) {
	            this.scan(_thisNode);
	          }
	        }
	      } else {
	        this.parseList(node);
	      }
	    }
	  }, {
	    key: 'parseData',
	    value: function parseData(str, node) {
	      var _this = this;

	      var _list = str.split(':');
	      var _data = void 0,
	          _path = void 0;
	      var p = [];
	      _list.forEach(function (key, index) {
	        if (index === 0) {
	          _data = _this._data[key];
	          p.push(key);
	        } else {
	          _path = node.path[index - 1];
	          p.push(_path);
	          _data = _data[_path][key];
	          p.push(key);
	        }
	      });
	      return {
	        path: p,
	        data: _data
	      };
	    }
	  }, {
	    key: 'parseEvent',
	    value: function parseEvent(node) {
	      var _this2 = this;

	      if (node.getAttribute('data-event')) {
	        (function () {
	          var eventName = node.getAttribute('data-event');
	          var _type = _this2.$elist[eventName].type;
	          var _fn = _this2.$elist[eventName].fn.bind(node);
	          if (_type === 'input') {
	            (function () {
	              var cmp = false;
	              node.addEventListener('compositionstart', function () {
	                cmp = true;
	              });
	              node.addEventListener('compositionend', function () {
	                cmp = false;
	                node.dispatchEvent(new Event('input'));
	              });
	              node.addEventListener('input', function () {
	                if (!cmp) {
	                  _fn();
	                }
	              });
	            })();
	          } else {
	            node.addEventListener(_type, _fn);
	          }
	        })();
	      }
	    }
	  }, {
	    key: 'parseClass',
	    value: function parseClass(node) {
	      if (node.getAttribute('data-class')) {
	        var className = node.getAttribute('data-class');
	        var _data = this.parseData(className, node);
	        if (!node.classList.contains(_data.data)) {
	          node.classList.add(_data.data);
	        }
	        this.$register.regist(this._data, _data.path, function (old, now) {
	          node.classList.remove(old);
	          node.classList.add(now);
	        });
	      }
	    }
	  }, {
	    key: 'parseModel',
	    value: function parseModel(node) {
	      if (node.getAttribute('data-model')) {
	        var modelName = node.getAttribute('data-model');
	        var _data = this.parseData(modelName, node);
	        if (node.tagName === 'INPUT') {
	          node.value = _data.data;
	        } else {
	          node.innerText = _data.data;
	        }
	        this.$register.regist(this._data, _data.path, function (old, now) {
	          if (node.tagName === 'INPUT') {
	            node.value = now;
	          } else {
	            node.innerText = now;
	          }
	        });
	      }
	    }
	  }, {
	    key: 'parseList',
	    value: function parseList(node) {
	      var _this3 = this;

	      var _item = this.parseListItem(node);
	      var _list = node.getAttribute('data-list');
	      var _listData = this.parseData(_list, node);
	      _listData.data.forEach(function (_dataItem, index) {
	        var _copyItem = _item.cloneNode(true);
	        if (node.path) {
	          _copyItem.path = node.path.slice();
	        }
	        if (!_copyItem.path) {
	          _copyItem.path = [];
	        }
	        _copyItem.path.push(index);
	        _this3.scan(_copyItem);
	        node.insertBefore(_copyItem, _item);
	      });
	      node.removeChild(_item);
	      this.$register.regist(this._data, _listData.path, function () {
	        while (node.firstChild) {
	          node.removeChild(node.firstChild);
	        }
	        var _listData = _this3.parseData(_list, node);
	        node.appendChild(_item);
	        _listData.data.forEach(function (_dataItem, index) {
	          var _copyItem = _item.cloneNode(true);
	          if (node.path) {
	            _copyItem.path = node.path.slice();
	          }
	          if (!_copyItem.path) {
	            _copyItem.path = [];
	          }
	          _copyItem.path.push(index);
	          _this3.scan(_copyItem);
	          node.insertBefore(_copyItem, _item);
	        });
	        node.removeChild(_item);
	      });
	    }
	  }, {
	    key: 'parseListItem',
	    value: function parseListItem(node) {
	      var me = this;
	      var target = void 0;
	      !function getItem(node) {
	        for (var i = 0; i < node.children.length; i++) {
	          var _thisNode = node.children[i];
	          if (node.path) {
	            _thisNode.path = node.path.slice();
	          }
	          me.parseEvent(_thisNode);
	          me.parseClass(_thisNode);
	          me.parseModel(_thisNode);
	          if (_thisNode.getAttribute('data-list-item')) {
	            target = _thisNode;
	          } else {
	            getItem(_thisNode);
	          }
	        }
	      }(node);
	      return target;
	    }
	  }]);

	  return Parser;
	}();

	exports.default = Parser;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _observer = __webpack_require__(9);

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Register = function () {
	  function Register() {
	    _classCallCheck(this, Register);

	    this.routes = [];
	  }

	  _createClass(Register, [{
	    key: 'regist',
	    value: function regist(obj, k, fn) {
	      var _i = this.routes.find(function (el) {
	        if ((el.key === k || el.key.toString() === k.toString()) && Object.is(el.obj, obj)) {
	          return el;
	        }
	      });
	      if (_i) {
	        _i.fn.push(fn);
	      } else {
	        this.routes.push({
	          obj: obj,
	          key: k,
	          fn: [fn]
	        });
	      }
	    }
	  }, {
	    key: 'build',
	    value: function build() {
	      this.routes.forEach(function (route) {
	        (0, _observer2.default)(route.obj, route.key, route.fn);
	      });
	    }
	  }]);

	  return Register;
	}();

	exports.default = Register;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function observer(obj, k, callback) {
	  if (Object.prototype.toString.call(k) === '[object Array]') {
	    observePath(obj, k, callback);
	  } else {
	    (function () {
	      var old = obj[k];
	      if (Object.prototype.toString.call(old) === '[object Array]') {
	        observeArray(old, callback);
	      } else if (old.toString() === '[object Object]') {
	        observeAllKey(old, callback);
	      } else {
	        Object.defineProperty(obj, k, {
	          enumerable: true,
	          configurable: true,
	          get: function get() {
	            return old;
	          },
	          set: function set(now) {
	            if (now !== old) {
	              callback.forEach(function (fn) {
	                fn(old, now);
	              });
	            }
	            old = now;
	          }
	        });
	      }
	    })();
	  }
	}

	function observePath(obj, path, callback) {
	  var _path = obj;
	  var _key = void 0;
	  path.forEach(function (p, index) {
	    if (parseInt(p) === p) {
	      p = parseInt(p);
	    }
	    if (index < path.length - 1) {
	      _path = _path[p];
	    } else {
	      _key = p;
	    }
	  });
	  observer(_path, _key, callback);
	}

	function observeArray(arr, callback) {
	  var oam = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
	  var arrayProto = Array.prototype;
	  var hackProto = Object.create(Array.prototype);
	  oam.forEach(function (method) {
	    Object.defineProperty(hackProto, method, {
	      writable: true,
	      enumerable: true,
	      configurable: true,
	      value: function value() {
	        var _arrayProto$method,
	            _this = this;

	        for (var _len = arguments.length, arg = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	          arg[_key2] = arguments[_key2];
	        }

	        var old = arr.slice();
	        var now = (_arrayProto$method = arrayProto[method]).call.apply(_arrayProto$method, [this].concat(arg));
	        callback.forEach(function (fn) {
	          fn.apply(undefined, [old, _this].concat(arg));
	        });
	        return now;
	      }
	    });
	  });
	  arr.__proto__ = hackProto;
	}

	function observeAllKey(obj, callback) {
	  Object.keys(obj).forEach(function (key) {
	    observer(obj, key, callback);
	  });
	}

	exports.default = observer;

/***/ }
/******/ ]);