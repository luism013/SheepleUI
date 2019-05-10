angular.module('AppChat').controller('ContactsController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;
        this.currentUser = currUser.getUser();
        this.contactList_id = {};
        this.contacts = [];

        this.loadContacts = function() {
        var reqURL = "http://localhost:5000/Sheeple/contactlists/user/" + thisCtrl.currentUser.user_id;
            console.log("reqURL: " + reqURL);
            // Now issue the http request to the rest API
            $http.get(reqURL).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // passing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.contacts = response.data.ContactList;
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

            $log.error("Contacts Loaded: ", JSON.stringify(thisCtrl.contacts));
        };

        this.addContact = function(firstname, lastname, email, phone) {
            if(email == null && phone == null){
                alert("Email y Phone no pueden estar vacios. Intente nuevamente");
                return;
            }
        var reqURL = "http://localhost:5000/Sheeple/contactlists/"+thisCtrl.currentUser.user_id+"/user";
            console.log("reqURL: " + reqURL);
            var data = {"owner_id": thisCtrl.currentUser.user_id, "first_name": firstname, "last_name": lastname, "email": email, "phone": phone};
            // Now issue the http request to the rest API
            $http.post(reqURL, data).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data.AddedContact));
                    alert(firstname+" ha sido añadido a tu lista de contacto.");
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
        };

        this.showChats = function() {
            $location.path('/user/gchats');
        };

        this.logout = function() {
            currUser.deleteUser();
            localStorage.removeItem('currentChat');
            $location.path('/login');
        };

        this.loadContacts();

}]);