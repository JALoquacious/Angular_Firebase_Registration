app.controller('CheckInsController', ['$scope', '$rootScope', '$location', '$routeParams',
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
        checkinsList = $firebaseArray(ref);

        $scope.checkins = checkinsList;
        $scope.order = 'firstname';
        $scope.direction = null;
        $scope.query = '';
        $scope.recordId = '';

        $scope.pickRandom = function () {
            let randRecord = Math.round(Math.random() * (checkinsList.length - 1));
            $scope.recordId = checkinsList.$keyAt(randRecord);
        };

        $scope.awardPrize = function (checkin) {
            checkin.show = !checkin.show;

            (checkin.userState == 'expanded') ?
            checkin.userState = '': checkin.userState = 'expanded';
        };

        $scope.givePrize = function (checkin, gift) {
            let refAwards = ref.child(checkin.$id).child('awards');
            let checkinsArray = $firebaseArray(refAwards);

            checkinsArray.$add({
                name: gift,
                date: firebase.database.ServerValue.TIMESTAMP
            });
        };

        $scope.deleteAward = function (checkin, key) {
            let refAward = ref.child(checkin.$id).child('awards').child(key);
            let record = $firebaseObject(refAward);

            record.$remove(key);
        }

        $scope.addCheckin = function () {
            $firebaseArray(ref).$add({
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function () {
                $location.path(
                    `/checkins/${$scope.userId}/${$scope.meetingId}/checkinsList`
                )
            });
        };

        $scope.deleteCheckin = function (id) {
            let refToDelete = ref.child(id);
            let record = $firebaseObject(refToDelete);
            record.$remove(id);
        };
}]);
