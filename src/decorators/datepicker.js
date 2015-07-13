// [AI]: added per https://github.com/angular-ui/bootstrap/issues/779

/**
 * Decorates the ui-bootstrap datepicker directive's controller to allow
 * refreshing the datepicker view (and rerunning invalid dates function)
 * upon an event trigger: `$scope.$broadcast('refreshDatepickers');`
 *
 * Works with inline and popup. Include this after `ui.bootstrap` js
 */
angular.module('ui.bootstrap.datepicker')
  .config(['$provide', function($provide) {
    $provide.decorator('datepickerDirective', ['$delegate', function($delegate) {
      var directive = $delegate[0];
      var link = directive.link;

      directive.compile = function() {
        return function(scope, element, attrs, ctrls) {
          link.apply(this, arguments);

          var datepickerCtrl = ctrls[0];
          var ngModelCtrl = ctrls[1];

          if (ngModelCtrl) {
            // Listen for 'refreshDatepickers' event...
            scope.$on('refreshDatepickers', function refreshView() {
              datepickerCtrl.refreshView();
            });
          }
          //[AI] http://stackoverflow.com/questions/26928861/angular-ui-bootstrap-datepicker-is-there-a-way-of-detecting-when-the-month
          scope.$watch(function() {
            return ctrls[0].activeDate.getTime();
          }, function(newVal, oldVal) {
            if (scope.datepickerMode == 'day') {
              var miliseconds = newVal;

              var oldValDT = new Date(oldVal);
              var newValDT = new Date(newVal);
              var oldValSTR = oldValDT.getMonth() + '-' + oldValDT.getFullYear();
              var newValSTR = newValDT.getMonth() + '-' + newValDT.getFullYear();
              if (oldValSTR !== newValSTR && scope.$parent.changeMonth) {
                scope.$parent.changeMonth(miliseconds);
              }
            }
          });
        }
      };
      return $delegate;
    }]);
  }]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\" ng-class=\"dt.customClass\">\n" +
    "        <div class=\"pos-rlt\" ng-hide=\"dt.secondary\">" +
    "           <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "        </div>" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

