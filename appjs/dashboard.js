angular.module('Sheeple').controller('DashboardController', ['$http', '$log', '$scope', '$location', '$routeParams', 'currUser',
    function($http, $log, $scope, $location, $routeParams, currUser) {
        "use strict";
        var thisCtrl = this;
        this.currentUser = currUser.getUser();

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

        google.charts.load('current', {'packages': ['corechart', 'bar', 'table', 'linechart']});

        google.charts.setOnLoadCallback(createHashtags);
        google.charts.setOnLoadCallback(createPostsPerDay);
        google.charts.setOnLoadCallback(createRepliesPerDay);
        google.charts.setOnLoadCallback(createLikesPerDay)
        google.charts.setOnLoadCallback(createDislikesPerDay);
        google.charts.setOnLoadCallback(createMostActivePerDay);
        google.charts.setOnLoadCallback(createUserActivity);
        // google.charts.setOnLoadCallback(createRepliesForPost);
        google.charts.setOnLoadCallback(createLikesForPost);
        // google.charts.setOnLoadCallback(createDislikesForPost);

        function createHashtags() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/hashtags",
                dataType: "json",
                async: false
            }).responseText;
            // console.log(json);
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Hashtag');
            data.addColumn('number', 'Total');

            data.addRows(hashtagData(JSON.parse(json)));

            var options = {
                title: 'Trending Hashtags',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Total Hashtags',
                    minValue: 0
                },
                vAxis: {
                    title: 'Hashtag'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('trending_hashtags'));

            googleChart.draw(data, options);

        }

        function hashtagData(json){
            var response = json.Hashtag;
            // console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]['Hashtag']);
                mapped_result.push(response[i]['Total']);
                // mapped_result.push(response[i]);
                result.push(mapped_result);
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
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Posts');

            data.addRows(postData(JSON.parse(json)));

            var options = {
                title: 'Post per Day',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Posts',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('postPerDay'));

            googleChart.draw(data, options);

        }


        function postData(json){
            var response = json.PostsPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
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
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Replies');

            data.addRows(replyData(JSON.parse(json)));

            var options = {
                title: 'Replies per Day',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Replies',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('repliesPerDay'));

            googleChart.draw(data, options);

        }


        function replyData(json){
            var response = json.RepliesPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
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

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Likes');

            data.addRows(likesData(JSON.parse(json)));

            var options = {
                title: 'Replies per Day',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Likes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('likesPerDay'));

            googleChart.draw(data, options);

        }


        function likesData(json){
            var response = json.LikesPerDay;
            // console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createDislikesPerDay() {
            var dislikes = "dislike"
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + dislikes,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Dislikes');

            data.addRows(dislikesData(JSON.parse(json)));

            var options = {
                title: 'Dislikes per Day',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Dislikes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Day'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('dislikesPerDay'));

            googleChart.draw(data, options);

        }


        function dislikesData(json){
            var response = json.DislikesPerDay;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
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
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
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

            var googleChart = new google.charts.Bar(document.getElementById('mostActiveUsers'));

            googleChart.draw(data, options);

        }


        function userData(json){
            var response = json.MostActiveUsersPerDay;
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createUserActivity() {
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/posts/" + thisCtrl.currentUser.user_id ,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
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

            googleChart.draw(data, options);

        }


        function activityData(json){
            var response = json.NumberOfPostsPerDayByXUser;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["day"]);
                mapped_result.push(response[i]["total"]);
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
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
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

            googleChart.draw(data, options);

        }


        function replyForPostData(json){
            var response = json.NumberOfRepliesOfPost;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_id"]);
                mapped_result.push(response[i]["total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createLikesForPost() {
            var post_id;
            var likes = "like"
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + likes,
                dataType: "json",
                async: false
            }).responseText;
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Post');
            data.addColumn('number', 'Likes');

            data.addRows(likesPostData(JSON.parse(json)));

            var options = {
                title: 'Likes for Post',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Likes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Post'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('likesPerPost'));

            googleChart.draw(data, options);

        }


        function likesPostData(json){
            var response = json.NumberOfLikes;
            console.log(response)
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_id"]);
                mapped_result.push(response[i]["total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }


        function createDislikesForPost() {
            var dislikes = "dislike";
            var post_id;
            var json = $.ajax({
                url: "http://localhost:5000/Sheeple/dashboard/" + dislikes + "/" + post_id,
                dataType: "json",
                async: false
            }).responseText;
            //console.log(jsonData);
            console.log("json: " + JSON.parse(json));

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Post');
            data.addColumn('number', 'Dislikes');

            data.addRows(dislikesPostData(JSON.parse(json)));

            var options = {
                title: 'Dislikes for Post',
                chartArea: {width: '600px'},
                hAxis: {
                    title: 'Likes',
                    minValue: 0
                },
                vAxis: {
                    title: 'Post'
                }
            };

            var googleChart = new google.charts.Bar(document.getElementById('dislikesPerPost'));

            googleChart.draw(data, options);

        }


        function dislikesPostData(json){
            var response = json.NumberOfDislikes;
            console.log("response: " + JSON.stringify(response));

            var result = [];
            var i;

            for(i=0; i < response.length && i < 10; i++) {
                var mapped_result = [];
                mapped_result.push(response[i]["post_id"]);
                mapped_result.push(response[i]["total"]);
                result.push(mapped_result);
            }
            console.log(result);
            return result;
        }

    }]);