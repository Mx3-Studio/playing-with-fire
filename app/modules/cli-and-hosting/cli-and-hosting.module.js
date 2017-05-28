angular.module('app.cliAndHosting', [])

  .controller('CliAndHostingController', cliAndHosting);

  function cliAndHosting ($state) {
    var vm = this;
    vm.title = $state.$current.title;
    vm.section = $state.$current.section;
    vm.next = $state.$current.next;
    vm.previous = $state.$current.previous;
  }
