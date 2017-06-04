app.factory('Authentication', ['$rootScope', '$firebaseAuth',

    function ($rootScope, $firebaseAuth) {
        let ref = firebase.database().ref();
        let auth = $firebaseAuth();

        return {
            login: function (user) {
                $rootScope.message = `Welcome, ${$rootScope.user.email}!`;
            },
            register: function (user) {
                auth.$createUserWithEmailAndPassword(
                    user.email,
                    user.password
                ).then(function (regUser) {
                    let regRef = ref.child('users').child(regUser.uid).set({
                        date: firebase.database.ServerValue.TIMESTAMP,
                        regUser: regUser.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    });
                    $rootScope.message = 'Hi ' + user.firstname +
                        '. Thanks for registering!';
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            }
        };
}]);
