angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;

        this.messageList = [];
        this.chatsList = [];
        this.likesList = [];
        this.dislikesList = [];
        this.currentUser = currUser.getUser();
        this.currentChat = {};
        this.searchList = [];

        this.openChat = true;
        this.openSearch = true;

        this.loadChats = function(){
            // Now create the url with the route to talk with the rest API
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
                    thisCtrl.chatsList = response.data.GroupChats;

                    for (var index = 0; index < thisCtrl.chatsList.length; index++) {
                        $scope.getMembers(index);
                    }

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

            $log.error("Message Loaded Load Chats: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadMessages = function(){
            var currChat = localStorage.getItem('currentChat');
            // Now create the url with the route to talk with the rest API
            var reqURL = "http://localhost:5000/Sheeple/posts/groupchat/" + currChat;
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
                    thisCtrl.messageList = response.data.Posts;
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

            $log.error("Message Loaded Load Messages: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadWhoLiked = function(post_id){
            // Now create the url with the route to talk with the rest API
            var reqURL1 = "http://localhost:5000/Sheeple/posts/" + post_id +"/likes";
            console.log("reqURL: " + reqURL1);
            // Now issue the http request to the rest API
            $http.get(reqURL1).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.likesList = response.data.Likes;

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
                    else if (status == 404){ // It means there are no users who like message
                        thisCtrl.likesList = [];
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                });

            $log.error("Message Loaded Load who liked: ", JSON.stringify(thisCtrl.reactList));
        };

        this.loadWhoDisliked = function(post_id){
            // Now create the url with the route to talk with the rest API
            var reqURL1 = "http://localhost:5000/Sheeple/posts/" + post_id + "/dislikes";
            console.log("reqURL: " + reqURL1);
            // Now issue the http request to the rest API
            $http.get(reqURL1).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller

                    /*
                    * Stores the data received from python call. The jsonyfied data
                    */
                    thisCtrl.dislikesList = response.data.Dislikes;

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
                        thisCtrl.dislikesList = []; // It means there are no users who dislike message
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                });

            $log.error("Message Loaded Load who disliked: ", JSON.stringify(thisCtrl.reactList));
        };

        this.postMsg = function(newText){
            var reqURL = "http://localhost:5000/Sheeple/post";
            console.log("reqURL: " + reqURL);
            var data = {'post_content': newText, 'user_id': thisCtrl.currentUser.user_id,
                'gc_id': localStorage.getItem('currentChat'), 'username': thisCtrl.currentUser.username,
                'image_url': 'To be fixed', 'post_date': 'yikes'};
            console.log(data);
            // Now issue the http request to the rest API
            $http.post(reqURL, data).then(
                // Success function
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    //$location.path('/user/gchats');
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

            $log.error("Users Loaded post message: ", JSON.stringify());
        };

        this.likeMsg = function(post_id){
            var reqURL = "http://localhost:5000/Sheeple/posts/reacts/like";
            console.log("reqURL: " + reqURL);
            var data = {'reaction_type': 'like', 'user_id': thisCtrl.currentUser.user_id, 'post_id': post_id};
            console.log(data);
            // Now issue the http request to the rest API
            $http.put(reqURL, data).then(
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

            $log.error("Users Loaded Likes: ", JSON.stringify());
        };

        this.dislikeMsg = function(post_id){
            var reqURL = "http://localhost:5000/Sheeple/posts/reacts/dislike";
            console.log("reqURL: " + reqURL);
            var data = {'reaction_type': 'dislike', 'user_id': thisCtrl.currentUser.user_id, 'post_id': post_id};
            console.log(data);
            // Now issue the http request to the rest API
            $http.put(reqURL, data).then(
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

            $log.error("Users Loaded Dislikes: ", JSON.stringify());
        };


        // this.searchMsg = function(hashtag) {
        //     var currChat = localStorage.getItem('currentChat');
        //     var reqURL1 = "http://localhost:5000/Sheeple/gchat/" + currChat+ "/hashtag/" + hashtag;
        //     console.log("reqURL: " + reqURL1);
        //     // Now issue the http request to the rest API
        //     $http.get(reqURL1).then(
        //         // Success function
        //         function (response) {
        //             console.log("data: " + JSON.stringify(response.data));
        //             // assing the part details to the variable in the controller
        //
        //             /*
        //             * Stores the data received from python call. The jsonyfied data
        //             */
        //             thisCtrl.searchList = response.data.Hashtag;
        //
        //         },
        //     function (response){
        //         // This is the error function
        //         // If we get here, some error occurred.
        //         // Verify which was the cause and show an alert.
        //         var status = response.status;
        //         if (status == 0){
        //             alert("No hay conexion a Internet");
        //         }
        //         else if (status == 401){
        //             alert("Su sesion expiro. Conectese de nuevo.");
        //         }
        //         else if (status == 403){
        //             alert("No esta autorizado a usar el sistema.");
        //         }
        //         else if (status == 404){ // It means there are no users who like message
        //
        //         }
        //         else {
        //             alert("Error interno del sistema.");
        //         }
        //     });
        //
        //     $log.error("Message Loaded: ", JSON.stringify(thisCtrl.reactList));
        // };

        this.currChat = function(gc_id) {
            localStorage.setItem('currentChat', gc_id);
        };

        this.showContacts = function() {
            $location.path('/user/contacts');
        };

        this.newChat = function() {
            $location.path('/newChat');
        };

        this.showProfile = function() {
            $location.path('/profile');
        };

        this.logout = function() {
            currUser.deleteUser();
            localStorage.removeItem('currentChat');
            $location.path('/login');
        };

        this.refresh = function() {
            window.location.reload();
        };

        this.userInfo = function() {
            var name = "Name: "+this.currentUser.first_name+" "+this.currentUser.last_name;
            var phone = "Phone: "+this.currentUser.phone;
            var email = "Email: "+this.currentUser.email;
            var gender = "Gender: "+this.currentUser.gender;
            var username = "Username: "+this.currentUser.username;
            alert(username+"\n"+name+"\n"+gender+"\n"+email+"\n"+phone);
        };

        $scope.getMembers = function(gchat_index) {
            thisCtrl.chatsList[gchat_index].members = [];
            var reqURL = "http://localhost:5000/Sheeple/groupchats/" +thisCtrl.chatsList[gchat_index].gc_id+"/users";
            console.log("reqURL: " + reqURL);
            $http.get(reqURL).then(
                function (response) {
                    console.log("data: " + JSON.stringify(response.data));
                    var chat_members = {};
                    chat_members = response.data.Users;
                    var membersList = [];
                    for (var j = 0; j < chat_members.length; j++) {
                        membersList.push(chat_members[j].username);
                    }
                    thisCtrl.chatsList[gchat_index].members = membersList;
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

            $log.error("Message Loaded Get Members: ", JSON.stringify());
        };

        this.loadChats();
        this.loadMessages();

    }]);