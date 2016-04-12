(function () {
    'use strict';
    var dnnApp = angular.module("dnnApp");
    dnnApp.directive("sbLoad",function ($parse) {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var fn = $parse(attrs.sbLoad);
                elem.on("load", function (event) {
                    scope.$apply(function() {
                        fn(scope, { $event: event });
                    });
                });
            }
        };
    });
})();
