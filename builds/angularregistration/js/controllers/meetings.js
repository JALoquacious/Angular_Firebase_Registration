app.controller('MeetingsController', ['$scope', '$firebaseAuth', '$firebaseArray',
    function ($scope, $firebaseAuth, $firebaseArray) {
        let ref = firebase.database().ref();
        let auth = $firebaseAuth();

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                let meetingsRef = ref
                    .child('users')
                    .child(authUser.uid)
                    .child('meetings');
                let meetingsInfo = $firebaseArray(meetingsRef);
                
                $scope.addMeeting = function() {
                    meetingsInfo.$add({
                        name: $scope.meetingName,
                        date: firebase.database.ServerValue.TIMESTAMP
                    }).then(function() {
                        $scope.meetingName = '';
                    });
                };
            }
        });
}]);
