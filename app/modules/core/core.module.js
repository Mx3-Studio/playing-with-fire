angular.module('app.core', [])

.directive('footerDirective', footer)
.directive('sideNavDirective', sideNav);

function footer() {
  return {
    restrict: 'EACM',
    templateUrl: 'app/modules/core/components/views/footer.html',
    controller: 'FooterController',
    controllerAs: 'vm'
  };
}

function sideNav() {
  return {
    restrict: 'EACM',
    templateUrl: 'app/modules/core/components/views/sideNav.html',
    controller: 'SideNavController',
    controllerAs: 'side'
  };
}
