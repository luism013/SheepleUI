angular.module('AppChat').controller('DashboardController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;

        this.currentUser = currUser.getUser();
        this.counter  = 0;
        this.numberOfLikes = 0;
        this.numberOfDislikes = 0;
        this.orderedHashtagList = [];
        this.date = "";


        this.showContacts = function() {
            $location.path('/user/contacts');
        };

        this.showDashboard = function() {
            $location.path('/dashboard');
        };

        this.logout = function() {
            currUser.deleteUser();
            localStorage.removeItem('currentChat');
            $location.path('/login');
        };

        this.refresh = function() {
            window.location.reload();
        };

        this.showChats = function() {
            $location.path('/user/gchats');
        };

        this.userInfo = function() {
            var name = "Name: "+this.currentUser.first_name+" "+this.currentUser.last_name;
            var phone = "Phone: "+this.currentUser.phone;
            var email = "Email: "+this.currentUser.email;
            var gender = "Gender: "+this.currentUser.gender;
            var username = "Username: "+this.currentUser.username;
            alert(username+"\n"+name+"\n"+gender+"\n"+email+"\n"+phone);
        };

    }]);