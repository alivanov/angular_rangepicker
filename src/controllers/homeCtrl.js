'use strict';

/* Controllers */
app.controller('HomeCtrl', [
  '$scope',
  function($scope) {
    console.log('HOME PAGE CTRL!');

    $scope.dateOptions = {
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.days = [1,3,4,7];
    $scope.dt1 = new Date();
    $scope.dt2 = new Date();

    //fires once a user change a month, but not select a date yet (see public/js/decorators/datepicker.js)
    $scope.changeMonth = function(miliseconds) {
      console.log('month changed', miliseconds);
    };

    //fires when a datepicker renders & when refreshView() method called
    //we set 'full' class here for days with events to show datepicker's dots
    //(https://github.com/sbutalia/bmc-netmino/issues/65)
    $scope.getDayClass = function(date, mode) {

      if (mode === 'day' && $scope.days && $scope.days.length > 0) {
        var currentDay = date.getDate();
        if ($scope.days.indexOf(currentDay) !== -1) {
          return 'full';
        }
      }
      return '';
    };


  }]);
