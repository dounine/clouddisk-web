define(['angular','app/cddController'], function(angular) {
	'use strict';

	var app = angular.module("dnnApp",["dnnApp.controllers.cdd","angular-loading-bar"]);
	app.run(appRun);
	function appRun($cookies,$rootScope) {
		$cookies.clouddisk_account = "403833139@qq.com";
		$rootScope.ctx = document.body.getAttribute("ctx");//项目根路径
	}

	app.config(appConfig);
	function appConfig($httpProvider,$stateProvider,$urlRouterProvider) {
		$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
		$httpProvider.defaults.transformRequest = function(data){
			if (data === undefined) {
				return data;
			}
			return $.param(data);
		}
	}
	return app;
// dnnApp.directive("sbLoad", ["$parse", function ($parse) {
// 	return {
// 		restrict: "A",
// 		link: function (scope, elem, attrs) {
// 			var fn = $parse(attrs.sbLoad);
// 			elem.on("load", function (event) {
// 				scope.$apply(function() {
// 					fn(scope, { $event: event });
// 				});
// 			});
// 		}
// 	};
// }])
});

