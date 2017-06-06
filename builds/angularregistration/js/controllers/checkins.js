app.controller('CheckInsController',
    ['$scope', '$rootScope', '$location', '$routeParams',
     '$firebaseObject', '$firebaseArray',
    function ($scope, $rootScope, $location, $routeParams,
               $firebaseObject, $firebaseArray) {
        
        let ref, checkinsList;
        
        $scope.meetingId = $routeParams.mId;
        $scope.userId = $routeParams.uId;
        
        ref = firebase.database().ref()
            .child('users')
            .child($scope.userId)
            .child('meetings')
            .child($scope.meetingId)
            .child('checkins');
        
        $scope.checkins = $firebaseArray(ref);
        
        $scope.addCheckin = function() {
            $firebaseArray(ref).$add({
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function() {
                $location.path(
                    `/checkins/${$scope.userId}/${$scope.meetingId}/checkinsList`
                )
            });
        };
}]);