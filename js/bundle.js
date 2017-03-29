/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// get mock data
fetch('data.json').then(function (response) {
    return response.json();
}).then(function (json) {
    buildCharts(json);
});

function buildCharts(data) {
    // loop thru sites
    data.map(function (site) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        console.log('Site Name: ' + site.name);

        var vals = [];
        var labels = [];

        // loop thru equip for each site
        // fill array w/ site's equipment
        for (var e in site.eq) {
            console.log(e + ' : ' + site.eq[e] + '%');

            vals.push(site.eq[e]);
            labels.push(e);
        }

        // add site name to each chart
        var parentEl = document.querySelector('#gauge' + site.id);
        var el = '<small>Job Site:</small><h4>' + site.name + '</h4>';
        parentEl.insertAdjacentHTML('afterend', el);

        // get ratios to fill gauge graphs all the way
        var sum = vals.reduce(function (acc, val) {
            return acc + val;
        });
        var diff = 100 - sum / vals.length;
        var valRatios = vals.map(function (val) {
            return (val + diff) / vals.length;
        });

        // guage charts
        var pieData = {
            labels: labels,
            series: valRatios
        };

        var pieOpts = {
            donut: true,
            donutWidth: 40,
            startAngle: 210,
            total: 120,
            showLabel: true
        };

        new Chartist.Pie('#gauge' + site.id, pieData, pieOpts);
    });
}

/***/ })
/******/ ]);