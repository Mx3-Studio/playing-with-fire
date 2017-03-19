angular.module('app.core', [])

.directive('footerDirective', footer);

function footer() {
  return {
    restrict: 'E',
    templateUrl: 'app/modules/core/components/footer.html',
    controller: 'FooterController',
    controllerAs: 'vm'
  };
}
