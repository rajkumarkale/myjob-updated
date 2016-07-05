/**
 * Created by revathi bandi on 5/11/2016.
 */
angular.module('com.module.user').controller('dashboardController', ['$scope','AuthService','$state',
  function ($scope, AuthService,$state) {
    'use strict';
    $scope.chartSeries = [

      {"name": "Target", "data": [4.9, 5, 4.5, 3, 4,5,4.5,9,5,9,5,3],color:'#81479D',connectNulls: true,
        lineWidth: 2,
        marker: {
          lineWidth:2,
          radius: 0
        }},
      {"name": "Prospect", "data":[3, 2, 2, 3, 5,5,9,2,3,4,6,7], color:'#5398F6',connectNulls: true,
        lineWidth: 2,
        marker: {
          lineWidth:2,
          radius: 0
        }},
      {"name": "Empanelment", "data": [2, 4, 3, 8, 5,6,7,6.5,8,8.5,9,8],color:'#50C471',connectNulls: true,
        lineWidth: 2,
        marker: {
          lineWidth:2,
          radius: 0
        }}
    ];
    $scope.chartConfig = {
      options: {
        chart: {
          type: 'areaspline'
        }, xAxis: {
          categories:  ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
        },
        plotOptions: {
          series: {
            stacking: '',
            marker: {
              states: {
                hover: {
                  radiusPlus: 1,
                  lineWidthPlus: 1
                }
              }
            },
            states: {
              hover: {
                lineWidthPlus: 2
              }
            }
          }
        }
      },
      series: $scope.chartSeries,
      title: {
        text: ''
      },
      credits: {
        enabled: true
      },
      loading: false,
      size: {}
    };

    $scope.reflow = function () {
      $scope.$broadcast('highchartsng.reflow');
    };
$scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openCal=opened;

      if($scope.openCal==='opened1')
      {
        $scope.opened1 = true;
        $scope.opened2 = false;
      }
      else if($scope.openCal==='opened2')
      {
        $scope.opened2 = true;
        $scope.opened1 = false;
      }
    };



  }]);
