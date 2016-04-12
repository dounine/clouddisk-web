(function () {
	"use strict";
	var dnnApp = angular.module("dnnApp");
	dnnApp.factory("cddService",cddService);
	dnnApp.factory("cddCaptchaService",cddCaptchaService);
	dnnApp.factory("cddFileService",cddFileService);
	dnnApp.factory("cddCaptchaData",cddCaptchaData);
	dnnApp.factory("cddCheckService",cddCheckService);

	dnnApp.constant("imgTypeIcos",
		[{suffixs:["folder"]}
		,{suffixs:["file"]}
		,{suffixs:["png"]}
		,{suffixs:["xls","xlsx","excel"]}
		,{suffixs:["txt"]}]);

	function cddService($http) {
		var service = {
			need_captcha:need_captcha
		};
		return service;

		function need_captcha(account){
			var postDat = {"account":account};
			return $http.post("admin/clouddisk/captcha/needCaptcha",postDat);//用户是否需要验证码http请求
		}
	}
	function cddCheckService($http) {
		var service = {
			clear_request:clear_request
		};
		return service;

		function clear_request(account){
			return $http.get("admin/clouddisk/loginCheck/clear");
		}
	}
	function cddCaptchaService($http) {
		var service = {
			captcha_request:captcha_request//验证
		};
		return service;



		function captcha_request(data) {
			return $http.post("admin/clouddisk/captcha/valid",data);
		}
	}
	function cddCaptchaData() {
		return {
			url:null,
			path:function () {
				return "admin/clouddisk/captcha/read?account=403833139@qq.com&t=" + new Date().getTime()
			}
		}
	}
	function cddFileService($http,imgTypeIcos,$rootScope) {
		var service = {
			list_request:list_request,
			suffix_ico:suffix_ico
		};
		return service;



		function list_request(){
			var postDat = {"path":$rootScope.$stateParams.path};
			return $http.post("admin/clouddisk/file/list",postDat);//文件列表http请求
		}
		function suffix_ico(suffix){//后缀样式选择
			var isItem = null;
			for(var i in imgTypeIcos){
				var item = imgTypeIcos[i];
				for(var j in item.suffixs){
					var value = item.suffixs[j];
					if(value==suffix){
						isItem = item;
						break;
					}
				}
			}
			isItem = isItem || imgTypeIcos[0];
			return "ico-"+isItem.suffixs[0];
		}
	}
})();

