/**
 * Created by revathi bandi on 5/11/2016.
 */
angular.module('com.module.user').controller('dashboardController', ['$scope','AuthService','$state','dashBoardService','$cookies','$filter','CoreService',  function ($scope, AuthService,$state,dashBoardService,$cookies,$filter,CoreService) {
    'use strict';
    $scope.chartSeries = [
      {"name": "Target", "data":[1, 2, 4, 3, 4,6,5,4,5,7,8,7],legendIndex: 1, fillOpacity: 0.5, color:'#5398F6',align: 'left',connectNulls: true,
        lineWidth: 0,
        marker: {
          lineWidth:0,
          radius: 0
        }},
      {"name": "Prospect", "data": [4,5, 3, 2, 7, 6,5,6,5,4,2,1],legendIndex: 2,fillOpacity: 0.5,color:'#81479D',align: 'left',connectNulls: true,
        lineWidth: 0,
        marker: {
          lineWidth:0,
          radius: 0
        }},
      {"name": "Empanelment", "data": [1, 2, 3, 3.5, 4,5,6,7,8,5,4,5],legendIndex: 3,fillOpacity: 0.5,color:'#50C471',align: 'left',connectNulls: true,
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
              legendItemClick: function (sc) {
                if(sc.target._i==0 && sc.target.visible==true )
                {
                  return false;}
                else  {return true;}


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
$scope.sumStartDate=new Date();
    $scope.sumEndDate=new Date().setFullYear(new Date().getFullYear()+1);
$scope.getDashboardByRange=function(){
        var st=$filter('date')($scope.start, 'MM/dd/yyyy');
        var date1=Math.round(new Date(st).getTime()/1000);
        var ed=$filter('date')($scope.end, 'MM/dd/yyyy');
        var date2=Math.round(new Date(ed).getTime()/1000);
        if(date1<date2){
            console.log('processing');
            /*$scope.sumStartDate=$scope.start;
            $scope.sumEndDate=$filter('date')($scope.end, 'to MMMM yyyy');*/
          /*$scope.myPromise = possibilityCreateService.getPossibilityByRange(currentPage,numPerPage,date1,date2).then(function(response){
            CoreService.toastSuccess('', 'POSSIBILITY Retrieved Successfully.');
			$scope.data.possibilities = response.data.possibilities;
            console.log($scope.data.possibilities);
			$scope.data.totalItems = response.data.count;
			$scope.data.met=response.data.met;
			$scope.data.notMet=response.data.not_met;
			$scope.data.inactive=response.data.inactive;

		});*/
        }else{
            CoreService.toastError('', 'Satrt date should be less than end date.');
        }
    };
    $scope.userId = JSON.parse($cookies.userData).userDetails._id;
      $scope.getDashboardCount=function(id){
        $scope.myPromise =  dashBoardService.getDashboardCount(id).then(function(response){
              console.log(response);
              $scope.target=response.data.dashboardCount[0].count?response.data.dashboardCount[0].count:0;
               $scope.prospect=response.data.dashboardCount[1].count?response.data.dashboardCount[1].count:0;
                  $scope.empanelment=response.data.dashboardCount[2].count?response.data.dashboardCount[2].count:0;
          });
      };
      $scope.getDashboardCount($scope.userId);
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
