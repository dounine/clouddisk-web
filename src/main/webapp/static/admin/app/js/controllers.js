(function () {
    "use strict";
    var dnnApp = angular.module("dnnApp");

    dnnApp.controller("cddController", cddController);
    dnnApp.controller("cddCaptchaController",cddCaptchaController);
    dnnApp.controller("cddFileController",cddFileController);
    dnnApp.controller("cddCheckController",cddCheckController);//清空失效信息


    function cddController($scope,$rootScope, $http, $cookies) {
        var vm = $scope;
        $rootScope.$state.go("fileList", {path: "/"});
    }
    
    function cddCheckController($scope,cddCheckService) {
        var vm = $scope;
        vm.clear = function () {
            cddCheckService.clear_request().success(function (data,status,conf) {
                $("#exampleModal").modal('show');
            });
        }
    }


    function cddCaptchaController($scope,$rootScope, cddCaptchaService,cddCaptchaData, $cookies, $timeout, $log) {
        var vm = $scope;
        vm.change_captcha = change_captcha;//更换验证码
        vm.captcha_load = captcha_load;//加载验证码
        vm.valid_captcha = valid_captcha;//验证验证码

        inits();

        function inits() {
            vm.disSubmit = true;
            vm.cddCaptchaData = cddCaptchaData;

            vm.$watch("captchaValue",function (newValue,oldValue,scope) {
                if(newValue)
                    vm.disSubmit = false;
                else
                    vm.disSubmit = true;
            });
        }

        function change_captcha() {
            cddCaptchaData.url = cddCaptchaData.path();
        }

        function captcha_load(event) {
            cddCaptchaData.url = null;
        }

        function valid_captcha() {
            var postData = {
                "account": $cookies.clouddisk_account,
                "captchaValue": vm.captchaValue
            };
            vm.disSubmit = true;
            cddCaptchaService.captcha_request(postData).success(function (data, status) {
                if (data.success) {
                    vm.disSubmit = false;
                    $("#exampleModal").modal("hide");//隐藏输入验证码对话框
                    $rootScope.$state.go("fileList", null, {
                        path: "/",
                        reload: true
                    });
                } else {
                    change_captcha();
                    vm.has_error = "has-error";
                    vm.valid_captcha_msg = data.msg;
                    $timeout(function () {
                        vm.valid_captcha_msg = null;
                        vm.captchaValue = null;
                        vm.has_error = null;
                        vm.disSubmit = false;
                    }, 3000);
                }
            });
        }
    }

    function cddFileController($scope, $rootScope, $http, cddFileService, cddService,cddCaptchaService,cddCaptchaData, $cookies) {
        var vm = $scope;
        vm.need_captcha = need_captcha;//检测是否需要验证码
        vm.list_inits = list_inits;//文件列表初始化
        vm.file_img_init = file_img_init;//文件图片初始化
        vm.item_dblclick = item_dblclick;//双击文件
        vm.nav_click = nav_click;//文件导航
        vm.suffix_ico = suffix_ico;//文件图标格式选择
        vm.folder_create = folder_create;//文件夹创建

        inits();

        function inits() {
            vm.navs = [{
                path: "/",
                oriName: "所有文件"
            }];
            vm.cddCaptchaData = cddCaptchaData;
            var folders = $rootScope.$stateParams.path.split("/");
            var folderArr = [];
            angular.forEach(folders, function (value) {
                if (value) {
                    folderArr.push(value);
                    vm.navs.push({
                        "path": "/" + folderArr.join("/") + "/",
                        "oriName": value
                    });
                }
            });
        }

        function need_captcha() {
            cddService.need_captcha($cookies.clouddisk_account).success(function (data, status) {
                if (data) {//需要验证码
                    $("#exampleModal").modal();//显示输入验证码对话框
                    cddCaptchaData.url = cddCaptchaData.path();
                }
            });
        }

        function list_inits() {
            vm.files = [];
            vm.emptyFolder = false;
            cddFileService.list_request().success(function (data, status, headers, config) {
                if(data.cddmsg=="请验证帐户验证码成功后再操作."){
                    need_captcha();
                }else{
                    angular.forEach(data.data, function (value) {
                        if (value.oriName) {
                            vm.files.push(value);
                        }
                    });
                    $scope.emptyFolder = ($scope.files.length == 0);//空文件夹
                    if ($scope.navs.length == 1) {//根文件夹
                        vm.root_path = "root-path";
                    }
                }
            });
        }

        function file_img_init(item) {
            if (item.file.hasThumb) {//是否包含所要读取的图片流的格式
                item.file.imgSrc = "admin/clouddisk/file/readImgStream?imgUrl=" + item.file.thumb;
            }
            return "";
        }

        function item_dblclick(item) {
            if (item.file.isDir) {//文件夹打开
                $rootScope.$state.go("fileList", {path: item.file.path});
            }
        }

        function nav_click(item) {
            $rootScope.$state.go("fileList", {path: item.nav.path});
        }

        function suffix_ico(suffix) {
            return cddFileService.suffix_ico(suffix);
        }

        function folder_create() {

        }
    }
})();

