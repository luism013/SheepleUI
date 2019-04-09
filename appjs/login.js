angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;
        this.currentUser = {};

        this.checkLogin = function(username, password){
            var reqURL = "http://localhost:5000/Sheeple/login";
                console.log("reqURL: " + reqURL);
                data = {'username': username, 'password': password};
                // Now issue the http request to the rest API
            $http.post(reqURL, data).then(
                    // Success function
                    function (response) {
                        console.log("data: " + JSON.stringify(response.data));
                        thisCtrl.currentUser = response.data.User;
                        currUser.setUser(thisCtrl.currentUser);
                        $location.path('/user/gchats');
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

        this.register = function(firstname, lastname, email, phone, username, password){
            var reqURL = "http://localhost:5000/Sheeple/register";
                console.log("reqURL: " + reqURL);
                data = {'first_name': firstname, 'last_name': lastname, 'email': email,
                            'phone': phone, 'username': username, 'password': password};
                // Now issue the http request to the rest API
                $http.post(reqURL, data).then(
                    // Success function
                    function (response) {
                        console.log("data: " + JSON.stringify(response.data));
                        thisCtrl.currentUser = response.data.User;
                        currUser.setUser(thisCtrl.currentUser);
                        $location.path('/user/gchats');
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
}]);