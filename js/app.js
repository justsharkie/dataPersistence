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
    })
    .constant('firebaseConfig', {
        apiKey: "AIzaSyA2snvldJm9sPJT-0FCSnxnPeaB3jQEMTc",
        authDomain: "webapps-9058d.firebaseapp.com",
        databaseURL: "https://webapps-9058d.firebaseio.com",
        projectId: "webapps-9058d",
        storageBucket: "webapps-9058d.appspot.com",
        messagingSenderId: "668287105690"
    })
    .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
    .controller('bookCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, $http) {
        const dbRef = firebase.database().ref().child('books')
        $scope.bookList = $firebaseArray(dbRef)
        this.getBlankBook = () => ({
            title: '',
            author: '',
            description: '',
            date: '',
            publisher: '',
        })
        $scope.newBook = this.getBlankBook()
        $scope.addBook = () => {
            $scope.bookList.$add($scope.newBook);
            $scope.newBook = this.getBlankBook()
        }
        $scope.removeBook = function (book) {
            if (confirm('You really want to delete this book?')) {
                $scope.bookList.$remove(book)
            }
        }
        $scope.saveBook = book => $scope.bookList.$save(book)
        $scope.itemId = $routeParams.itemId
        $scope.clearFields = function () {
            if(confirm('Will this thing just fucking work?')){
                
            }
        }
    })

/*
    .controller('PlaceholderCtrl', function($scope){
        $scope.itemId = [];
        $scope.showAll = false
    })
    .controller('DetailCtrl', function($scope, $routeParams, $http){
        $scope.itemId = $routeParams.itemId
        $http
            .get('/data/books.json')
            .then(function(res){
                $scope.book = res.data.filter(function(row){
                    return row.id === $scope.itemId
                })[0]
            })
    })
    .controller('AllDetailCtrl', function($scope, $http){
        $http
            .get('/data/books.json')
            .then(({data}) => {
                $scope.books = data
            })
    })*/
