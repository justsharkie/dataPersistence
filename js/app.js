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
    .run(function(firebaseConfig) {
        firebase.initializeApp(firebaseConfig)
    })
    /*.service('storageRefRoot', function () {
        return firebase.storage().ref()
    })
    .service('storageRefImages', function (storageRefRoot) {
        return storageRefRoot.child('images')
    })
    .service('dbRefRoot', function () {
        return firebase.database().ref()
    })*/
    .controller('bookCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, $http) {
        var dbRef = firebase.database().ref().child('books');
        var bookId = $routeParams.itemId;
        $scope.itemId = bookId;
        $scope.book = bookId ? $firebaseObject(dbRef.child(bookId)) : null;
        $scope.bookList = $firebaseArray(dbRef);
        this.getBlankBook = function(){ ({
            title: '',
            author: '',
            description: '',
            date: '',
            publisher: '',
            image: ''
        })}
        $scope.newBook = this.getBlankBook()
        $scope.addBook = function(){
            $scope.bookList.$add($scope.newBook);
            $scope.newBook = this.getBlankBook()
        }
        $scope.removeBook = function (book) {
            if (confirm('You really want to delete this book?')) {
                $scope.bookList.$remove(book);
            }
        }
        $scope.saveBook = function(book){ $scope.bookList.$save(book)}
        $scope.clearFields = function () {
            if (confirm('Are you sure you want to delete everything?')) {
                // BELOW REMOVES ENTIRE DATABASE DATA
                return dbRef.remove()
            }
        }
    })

    /*.controller('ImageCtrl', function (book, storageRefImages, $window) {
        this.handleSelectedFiles = book => {
            let files = book.selectedFiles
            if ((files !== undefined) && files.length) {
                for (let i = 0; i < files.length; i++) {
                    file = files.item(i)
                    this.uploadFile(file, book)
                }
            }
        }

        this.uploadFile = (file, book) => {
            const metadata = {
                contentType: file.type
            };
            let uploadTask = storageRefImages.child(file.name).put(file, metadata);
            uploadTask.on('state_changed', function (snapshot) {
                let uploadProgress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + uploadProgress + '% done');
                if (snapshot.bytesTranferred == snapshot.totalBytes) {
                    setTimeout(() => {
                        uploadProgress = 0;
                        console.log('Upload is complete');
                    }, 500);
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                    default:
                        console.error('UploadTask failed.')
                }
            }, function () {
                let storagePath = uploadTask.snapshot.ref.fullPath
                let downloadURL = uploadTask.snapshot.downloadURL
                book.images.push({
                    storagePath,
                    downloadURL
                })
                $scope.bookList.$save()
            })
        }
    })
    .directive('fileInputModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.bind('change', function () {
                    $parse(attributes.fileInputModel).assign(scope, element[0].files)
                    scope.$apply()
                })
            }
        }
    }])*/
