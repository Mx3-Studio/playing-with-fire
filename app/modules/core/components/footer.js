(function() {
    "use strict";

    angular.module('app.core')
      .controller('FooterController', FooterController);

    function FooterController() {
      var vm = this;
      vm.year = new Date().getFullYear();
    }

}());
