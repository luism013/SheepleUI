(function() {

    var app = angular.module('AppChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'loginCtrl'
        }).when('/user/gchats', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).when('/user/contacts', {
            templateUrl: 'pages/contacts.html',
            controller: 'ContactsController',
            controllerAs : 'contactCtrl'
        }).when('/newChat', {
            templateUrl: 'pages/newChat.html',
            controller: 'NewChatController',
            controllerAs : 'newChatCtrl'
        }).when('/profile', {
            templateUrl: 'pages/profile.html',
            controller: 'ProfileController',
            controllerAs : 'profileCtrl'
        }).when('/msg/gchat/1', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

    app.service('currUser', function () {

            this.setUser = function(user) {
                localStorage.setItem('currentUser',JSON.stringify(user));
                return;
            }
            this.getUser = function() {
                return JSON.parse(localStorage.getItem('currentUser'));
            }
            this.deleteUser = function() {
                localStorage.removeItem('currentUser');
            }
});

})();
