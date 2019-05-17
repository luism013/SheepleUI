angular.module('AppChat').controller('DashboardController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;

        this.currentUser = currUser.getUser();
        // this.counter  = 0;
        // this.numberOfLikes = 0;
        // this.numberOfDislikes = 0;
        // this.orderedHashtagList = [];
        // this.date = "";


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

        google.charts.setOnLoadCallback(createHashtags);

        function createHashtags() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/hashtags",
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Hashtag');

            data.addColumn('number', 'Total');

            data.addRows(hashtagData(JSON.parse(jsonData)));

            var options = {
                title: 'Trending Hashtags',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Total Hashtags',
                    minValue: 0
                },
                vAxis: {
                    title: 'Hashtag'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('trending_hashtags'));

            googleChart.draw(dt, options);

        }

        function hashtagData(json){
            var response = json.Hashtag;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["hastag_content"]);
                mapped_result.push(response[i]["count"]);
                result.push(dataElement);
            }
            console.log(result);
            return result;
        }


        function createPostsPerDay() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/posts",
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Posts');

            data.addRows(postData(JSON.parse(json)));

            var options = {
                title: 'Post per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Posts',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('postsPerDay'));

            googleChart.draw(dt, options);

        }


        function postData(json){
            var response = json.PostsPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }

        function createRepliesPerDay() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/replies",
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Replies');

            data.addRows(replyData(JSON.parse(json)));

            var options = {
                title: 'Replies per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Replies',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('repliesPerDay'));

            googleChart.draw(dt, options);

        }


        function replyData(json){
            var response = json.RepliesPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(temp));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createLikesPerDay() {
            var likes = "like"
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + likes,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Replies');

            data.addRows(likesData(JSON.parse(json)));

            var options = {
                title: 'Replies per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Replies',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('likesPerDay'));

            googleChart.draw(dt, options);

        }


        function likesData(json){
            var response = json.LikesPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createDislikesPerDay() {
            var dislikes = "dislike"
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + likes,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Dislikes');

            data.addRows(dislikesData(JSON.parse(json)));

            var options = {
                title: 'Dislikes per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Dislikes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('dislikesPerDay'));

            googleChart.draw(dt, options);

        }


        function dislikesData(json){
            var response = json.DislikesPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createMostActivePerDay() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/users",
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Activity');

            data.addRows(userData(JSON.parse(json)));

            var options = {
                title: 'Most Active per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Activity',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('mostActiveUser'));

            googleChart.draw(dt, options);

        }


        function userData(json){
            var response = json.MostActiveUserPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createUserActivity() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/posts/" + currUser ,   //  FIX   THIS
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Posts');

            data.addRows(activityData(JSON.parse(json)));

            var options = {
                title: 'Number of User Posts per Day',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Posts',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('userActivity'));

            googleChart.draw(dt, options);

        }


        function activityData(json){
            var response = json.NumberOfPostsPerDayByXUser;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }



        function createRepliesForPost() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/replies/" + post_id,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Post');
            data.addColumn('number', 'Replies');

            data.addRows(replyForPostData(JSON.parse(json)));

            var options = {
                title: 'Replies for Post',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Replies',
                    minValue: 0
                },
                vAxis: {
                    title: 'Post'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('postsPerDay'));

            googleChart.draw(dt, options);

        }


        function replyForPostData(json){
            var response = json.NumberOfRepliesOfPost;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createLikesForPost() {
            var post_id
            var likes = "like"
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + likes + "/" + post_id,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Post');
            data.addColumn('number', 'Likes');

            data.addRows(likesPostData(JSON.parse(json)));

            var options = {
                title: 'Likes for Post',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Likes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Post'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('likesPerPost'));

            googleChart.draw(dt, options);

        }


        function likesPostData(json){
            var response = json.NumberOfLikes;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createDislikesForPost() {
            var dislikes = "dislike"
            var post_id
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + dislikes + "/" + post_id,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var dt = new google.visualization.DataTable();
            data.addColumn('string', 'Post');
            data.addColumn('number', 'Dislikes');

            data.addRows(dislikesPostData(JSON.parse(json)));

            var options = {
                title: 'Dislikes for Post',
                chartArea: {width: '500px'},
                hAxis: {
                    title: 'Likes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Post'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('dislikesPerPost'));

            googleChart.draw(dt, options);

        }


        function dislikesPostData(json){
            var response = json.NumberOfLikes;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < temp.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_dat"]);
                mapped_result.push(response[i]["Total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }

    }]);