angular.module('AppChat').controller('ProfileController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;
        this.currentUser = currUser.getUser();
        this.ownedChatsList = [];
        this.contacts = [];
        this.editChat = false;
        this.currChat;

        this.loadContacts = function() {
        var reqURL = "http://localhost:5000/Sheeple/contactlists/user/" + thisCtrl.currentUser.user_id;
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.get(reqURL).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.contacts = response.data.Contacts;
                    console.log(thisCtrl.contacts);
                },
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){

                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadOwnedChats = function(){
            // Now create the url with the route to talk with the rest API
            // ---------------------------------------------------------------------------------------
            var reqURL = "http://localhost:5000/Sheeple/groupchats/user/" + thisCtrl.currentUser.user_id;
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.get(reqURL).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.ownedChatsList = response.data.ChatsByOwner;

                },
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){

                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.changeName = function(newName){
            // Now create the url with the route to talk with the rest API
            var reqURL = "http://localhost:5000/MessagingApp/gchat/members/" + thisCtrl.currChat.gchat_id;
            var data = {"gchat_id": thisCtrl.currChat.gchat_id, "gchat_name": newName}
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.put(reqURL, data).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.ownedChatsList = response.data.ChatsByOwner;

                },
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){

                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.deleteChat = function(gc_id){
            // Now create the url with the route to talk with the rest API
            var reqURL = "http://localhost:5000/Sheeple/groupchats/" + gc_id;
            var data = {"gc_id": gc_id}
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.delete(reqURL, data).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.ownedChatsList = response.data.ChatsByOwner;

                },
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){

                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.addMembers = function() {
            for (var i = 0; i < thisCtrl.contacts.length; i++) {
                if ($scope.members[thisCtrl.contacts[i]] == true) {
                    $scope.addMember(thisCtrl.currChat.gchat_id, thisCtrl.contacts[i].user_id);
                }
            }
        };

        $scope.members = {};

        $scope.addMember = function(gc_id, user_id) {
            var reqURL = "http://localhost:5000/Sheeple/groupchats/"+ gc_id+"/"+user_id;
                console.log("reqURL: " + reqURL);
                var data = {'groupchat_id': gc_id, 'user_id': user_id};
                console.log(data);
                // Now issue the http request to the rest API
                $http.post(reqURL, data).then(
                    // Success function
                    function (response) {
                        console.log("data: " + JSON.stringify(response.data));
                    },
                function (response){
                    // This is the error function
                    // If we get here, some error occurred.
                    // Verify which was the cause and show an alert.
                    var status = response.status;
                    if (status == 0){
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 401){
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403){
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404){
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                    });

                $log.error("Users Loaded: ", JSON.stringify());
        };

        this.showChats = function() {
            $location.path('/user/gchats');
        };

        this.showContacts = function() {
            $location.path('/user/contacts');
        };

        this.logout = function() {
            currUser.deleteUser();
            localStorage.removeItem('currentChat');
            $location.path('/login');
        };

        this.loadContacts();
        this.loadOwnedChats();

}]);