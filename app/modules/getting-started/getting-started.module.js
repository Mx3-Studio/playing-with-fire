angular.module('app.gettingStarted', [])

  .controller('GettingStartedController', gettingStarted);

  function gettingStarted ($state) {
    var vm = this;
    vm.title = $state.$current.title;
    vm.section = $state.$current.section;
    vm.next = $state.$current.next;
    vm.previous = $state.$current.previous;
  }
