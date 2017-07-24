angular
    .module('myApp', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/placeholder.html',
                controller: 'bookCtrl'
            })
            .when('/details/:itemId', {
                templateUrl: '/views/card.html',
                controller: 'bookCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }) // end config
    .constant('firebaseConfig', {
        apiKey: "AIzaSyAJ-AjaHE06TBsCX6BAT5fwZBjP7HWyi4w",
        authDomain: "navigation-9515b.firebaseapp.com",
        databaseURL: "https://navigation-9515b.firebaseio.com",
        projectId: "navigation-9515b",
        storageBucket: "",
        messagingSenderId: "716308237517"
    })
    .run(function (firebaseConfig) {
        firebase.initializeApp(firebaseConfig)
    }) // end run
    .controller('bookCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, $http) {
        var dbRef = firebase.database().ref().child('books')
        var bookId = $routeParams.itemId
        $scope.itemId = bookId
        $scope.book = bookId ? $firebaseObject(dbRef.child(bookId)) : null;
        $scope.bookList = $firebaseArray(dbRef)
        this.getBlankBook = function () {
            ({
                title: '',
                author: '',
                description: '',
                date: '',
                publisher: '',
                image: ''
            })
        }
        $scope.newBook = this.getBlankBook()
        $scope.addBook = () => {
            $scope.bookList.$add($scope.newBook)
            $scope.newBook = this.getBlankBook()
        }
        $scope.saveBook = () => {
            $scope.book.$save()
            $scope.editTitle=false
            $scope.editAuthor=false
            $scope.editDesc=false
            $scope.editDate=false
            $scope.editPub=false
        }
        $scope.isEditing = () => {
            return $scope.editTitle || $scope.editAuthor || $scope.editDesc || $scope.editDate || $scope.editPub
        }
        $scope.removeBook = (book) => {
            if (confirm('You really want to delete this book')) {
                $scope.bookList.$remove($scope.bookList.$indexFor(book.$id))
            }
        }
        $scope.clearFields = () => {
            if(confirm('Are you sure you want to remove all these fields?')) {
                $scope.newBook = this.getBlankBook()
            }
        }
    }) // end controller
