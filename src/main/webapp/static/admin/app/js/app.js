(function () {
	"use strict";
	var dnnApp = angular.module("dnnApp",
		[
			"ui.router",
			"angular-loading-bar",
			"ngCookies",
			"ngAnimate"
		]);
	dnnApp.run(appRun);
	function appRun($cookies,$rootScope, $state, $stateParams) {
		$cookies.clouddisk_account = "403833139@qq.com";
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.ctx = document.body.getAttribute("ctx");//项目根路径
	}

	dnnApp.config(appConfig);
	function appConfig($httpProvider) {
		$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
		$httpProvider.defaults.transformRequest = function(data){
			if (data === undefined) {
				return data;
			}
			return $.param(data);
		}
	}

	dnnApp.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/index");
		$stateProvider.state("index", {
			url : "/index",
			views : {
				"" : {
					templateUrl : "admin/menu"
				}
			}
		}).state("clouddisk",{
			url : "/clouddisk",
			views : {
				"":{
					templateUrl : "admin/clouddisk/content",
					controller : "cddController"
				}
			}
		}).state("fileList", {
			url : "/fileList?{path}",
			views : {
				"" : {
					templateUrl : "admin/clouddisk/file/content"
				},
				"list@fileList" : {
					templateUrl : "admin/clouddisk/file/list/content",
					controller : "cddFileController"
				},
				"captcha@fileList" : {
					templateUrl :"admin/clouddisk/captcha/content",
					controller : "cddCaptchaController"
				}
			}
		})
	});
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
})();

