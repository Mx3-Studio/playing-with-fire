angular.module('app.systemSetup', [])

  .controller('SystemSetupController', systemSetup)
  .controller('InstallPrerequisitesController', prerequisites);

  function systemSetup ($state) {
    var vm = this;
    state(vm, $state);
  }

  function prerequisites ($state) {
    var vm = this;
    state(vm, $state);
    vm.operatingSystem = 'mac';
    vm.show = function (env) {
      vm.operatingSystem = env;
    };
  }

  function state (vm, $state) {
    vm.title = $state.$current.title;
    vm.section = $state.$current.section;
    vm.next = $state.$current.next;
    vm.previous = $state.$current.previous;
  }
