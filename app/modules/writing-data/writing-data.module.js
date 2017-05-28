angular.module('app.writingData', [])

  .controller('writingDataController', writingData);

  function writingData ($state) {
    var vm = this;

    vm.title = $state.$current.title;
    vm.section = $state.$current.section;
    vm.next = $state.$current.next;
    vm.previous = $state.$current.previous;

  }
