'use strict';

/* Controllers */
app.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  function($scope, $rootScope) {

    var resetStart = function(dt) {
      var start = angular.copy(dt);
      start.setHours(0, 0, 0, 0);
      return start;
    };

    var resetEnd = function(dt) {
      var end = angular.copy(dt);
      end.setHours(23, 59, 59, 999);
      return end;
    };


    $scope.dt = new Date();
    var RANGE = moment().range(resetStart($scope.dt), resetEnd($scope.dt));
    $scope.range = RANGE.toDate();

    $scope.changeMonth = function(milliseconds) {
      $rootScope.$broadcast('refreshDatepickers');
    };

    $scope.dateOptions = {
      startingDay: 1,
      class: 'datepicker'
    };

    //fires when a datepicker renders & when refreshView() method called
    //we set 'full' class here for days with events to show datepicker's dots
    //(https://github.com/sbutalia/bmc-netmino/issues/65)
    $scope.getDayClass = function(date, mode) {

      if (mode === 'day') {
        date = resetStart(date);
        var when = moment(date);
        if (when.within(RANGE, false)) {
          return 'full';
        }
        return '';
      }
    };

    $scope.$watch('dt', function(newVal, oldVal) {

      var start = oldVal;
      var end = newVal;
      if (end < start) {
        var temp = start;
        start = end;
        end = temp;
      }
      RANGE = moment().range(resetStart(start), resetEnd(end));
      $scope.range = RANGE.toDate();
      $rootScope.$broadcast('refreshDatepickers');
    });
  }]);
