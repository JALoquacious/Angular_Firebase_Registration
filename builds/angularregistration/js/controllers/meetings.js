app.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
    function ($scope, $rootScope, $firebaseAuth, $firebaseArray) {
        let ref = firebase.database().ref();
        let auth = $firebaseAuth();

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                let meetingsRef = ref
                    .child('users')
                    .child(authUser.uid)
                    .child('meetings');
                let meetingsInfo = $firebaseArray(meetingsRef);

                $scope.meetings = meetingsInfo;

                meetingsInfo.$loaded().then(function (data) {
                    $rootScope.meetingCount = meetingsInfo.length;
                });

                meetingsInfo.$watch(function () {
                    $rootScope.meetingCount = meetingsInfo.length;
                });

                $scope.addMeeting = function () {
                    meetingsInfo.$add({
                        name: $scope.meetingName,
                        date: firebase.database.ServerValue.TIMESTAMP
                    }).then(function () {
                        $scope.meetingName = '';
                    });
                };

                $scope.deleteMeeting = function (key) {
                    meetingsInfo.$remove(key);
                }
            }
        });
}]);
