angular.module('com.module.access').config(['$stateProvider', function ($stateProvider) {
  'use strict';
  $stateProvider
    .state('app.admin', {
      url: '/admin',
      controller:'adminController',
      templateUrl: 'js/app/admin/views/admin.html'
    })
    .state('app.admin.books', {
      url: '/books',
      templateUrl: 'js/app/admin/views/books.html',
      controller: 'adminBooksController',
      resolve: {
        allBooks: [
          'adminService', function (adminService) {
            return adminService.getBooks();
          }]
      },
      data: {
        title: 'Books'
      }
    }).state('app.admin.users', {
      url: '/users',
      templateUrl: 'js/app/admin/views/users.html',
      controller: 'adminUsersController',
      resolve: {
        allUsers: [
          'adminService', function (adminService) {
            return adminService.getUsers();
          }]
      },
      data: {
        title: 'Users'
      }
    }).state('app.admin.support', {
      url: '/users',
      templateUrl: 'js/app/admin/views/support.html',
      controller: 'adminSupportController',
      resolve: {
        allSupports: [
          'adminService', function (adminService) {
            return adminService.getSupports();
          }]
      },
      data: {
        title: 'Users'
      }
    });
}]);
