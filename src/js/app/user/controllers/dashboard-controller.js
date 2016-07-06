/**
 * Created by revathi bandi on 5/11/2016.
 */
angular.module('com.module.user').controller('dashboardController', ['$scope','AuthService','$state',
  function ($scope, AuthService,$state) {
    'use strict';
    $scope.chartSeries = [
      {"name": "Target", "data":[1, 2, 4, 3, 3.5,6.5,4.5,4.5,5,7,8,7], fillOpacity: 0.5, color:'#5398F6',align: 'left',connectNulls: true,
        lineWidth: 0,
        marker: {
          lineWidth:0,
          radius: 0
        }},
      {"name": "Prospect", "data": [4,4.5, 3, 2.8, 7, 6.5,5,6,5,4,2,1],fillOpacity: 0.5,color:'#81479D',align: 'left',connectNulls: true,
        lineWidth: 0,
        marker: {
          lineWidth:0,
          radius: 0
        }},
      {"name": "Empanelment", "data": [1, 2, 3, 3.5, 4,5,6,7.5,8,3.5,4,5],fillOpacity: 0.5,color:'#50C471',align: 'left',connectNulls: true,
        lineWidth: 0,
        marker: {
          lineWidth:2,
          radius: 0
        }}
    ];
    $scope.chartConfig = {
      options: {
        chart: {
          type: 'areaspline',
          height:500,
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
        },
        xAxis: {
          crosshair: {width:1,color:'black',dashStyle: 'dash',zIndex:5},
          categories:  ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
        },
        yAxis:{
          gridLineColor: 'white',
          lineColor: 'lightgray',
          lineWidth: 1,
          tickColor: 'lightgray',
          tickWidth: 1,
          offset: -10,
          tickInterval: 1,
          title: {
            text: ''
          }
        },
        plotOptions: {
          series: {
            events: {
              legendItemClick: function () {

                var visibility = this.visible ? 'VISIBLE' : 'HIDDEN';

                if (!confirm('The series Data is currently ' +
                    visibility + '. Do you want to change that?')) {
                  return false;
                }
              }
            },
            stacking: '',
            marker: {
              fillColor: 'black',
              states: {
                hover: {
                  radiusPlus: 1,
                  lineWidthPlus: 2
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
