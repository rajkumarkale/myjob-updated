'use strict';
var app = angular.module('com.module.core');

app.service('CoreService', ['dialogs', 'toaster', function ( dialogs, toaster) {


  this.alert = function (title, text) {
    return dialogs.notify(title,text);
  };

  this.alertSuccess = function (title, text) {
   return  dialogs.notify(title,text);
  };

  this.alertError = function (title, text) {
    return dialogs.error(text);
  };

  this.alertWarning = function (title, text) {
    return dialogs.error(text);
  };

  this.alertInfo = function (title, text) {
    return dialogs.notify(title,text);
  };

  this.confirm = function (title, text, successCb, cancelCb) {
    return dialogs.confirm(title,text).result.then(successCb,cancelCb);
  };

  this._swal = function (config, successCb, cancelCb) {
    return angular.noop(config,successCb,cancelCb);
  };

  this.toastSuccess = function (title, text) {
    return toaster.pop('success', title, text);
  };

  this.toastError = function (title, text) {
    return toaster.pop('error', title, text);
  };

  this.toastWarning = function (title, text) {
    return toaster.pop('warning', title, text);
  };

  this.toastInfo = function (title, text) {
    return toaster.pop('info', title, text);
  };


}]);
