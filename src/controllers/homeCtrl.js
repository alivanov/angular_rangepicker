'use strict';

/* Controllers */
app.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  function($scope, $rootScope) {

    function getDays(d1, d2) {
      var oneDay = 24 * 3600 * 1000;
      for (var d = [], ms = d1 * 1,last = d2 * 1; ms < last; ms += oneDay){
        var day = new Date(ms);
        day = day.getDate();
        d.push(day);
      }
      return d;
    }

    $scope.dt = new Date();
    var RANGE = moment().range(angular.copy($scope.dt), angular.copy($scope.dt));
    $scope.range = RANGE.toDate();

    $scope.changeMonth = function(milliseconds) {
      var monthStart = new Date(milliseconds);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      var monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setMilliseconds(monthEnd.getMilliseconds() - 1);

      var monthRange = moment().range(monthStart, monthEnd);

      var intrersect = RANGE.intersect(monthRange);
      if (intrersect) {
        var arr = intrersect.toDate();
        $scope.days = getDays(arr[0], arr[1]);
      } else {
        $scope.days = [];
      }

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

      if (mode === 'day' && $scope.days && $scope.days.length > 0) {
        var currentDay = date.getDate();
        if ($scope.days.indexOf(currentDay) !== -1) {
          if ($scope.days.indexOf(currentDay) !== -1) {
            return 'full';
          }
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
      RANGE = moment().range(start, end);
      $scope.range = RANGE.toDate();
      $scope.days = getDays($scope.range[0], $scope.range[1]);
      $rootScope.$broadcast('refreshDatepickers');
    });
  }]);
