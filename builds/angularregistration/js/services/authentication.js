app.factory('Authentication',
            ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',

    function ($rootScope, $location, $firebaseObject, $firebaseAuth) {
        let ref = firebase.database().ref();
        let auth = $firebaseAuth();
        let methods;

        auth.$onAuthStateChanged(function(authUser) {
            if (authUser) {
                let userRef = ref.child('users').child(authUser.uid);
                $rootScope.currentUser = $firebaseObject(userRef);
            } else {
                $rootScope.currentUser = '';
            }
        });
        
        methods = {
            login: function (user) {
                auth.$signInWithEmailAndPassword(
                    user.email,
                    user.password
                ).then(function (user) {
                    $location.path('/meetings');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            },
            logout: function() {
                return auth.$signOut();
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
                    methods.login(user);
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            },
            requireAuth: function() {
                return auth.$requireSignIn();
            }
        };
        
        return methods;
}]);
