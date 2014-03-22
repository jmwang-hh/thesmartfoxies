'use strict';

myApp.controller('AroundMe', ['$scope', function ($scope) {
	$scope.people = [
		{
			displayName: 'Allison Jones',
			image: '/fake-img/Avatars/avatar0.png',
			volumeInfo : {
				imageLinks: {
					smallThumbnail: '/fake-img/Books/00.jpg'
				},
				title: "Bla"
			}
		},
		{
			displayName: 'Geoffrey Smith',
			image: '/fake-img/Avatars/avatar0.png',
			volumeInfo : {
				imageLinks: {
					smallThumbnail: '/fake-img/Books/01.jpg'
				},
				title: "Bla"
			}
		} 
	];
}]);

myApp.
    controller('SearchCtrl', [
        '$scope','$http', function ($scope, $http) {

            $scope.terms = [
                { value: '', text: 'all' },
                { value: 'intitle', text: 'the title' },
                { value: 'inauthor', text: 'the author' },
                { value: 'inpublisher', text: 'the publisher' },
                { value: 'subject', text: 'the category list of the volume' },
                { value: 'isbn', text: 'the ISBN number' },
                { value: 'lccn', text: 'the Library of Congress Control Number' },
                { value: 'oclc', text: 'the Online Computer Library Center number' }
            ];
            $scope.term = $scope.terms[0].value; // default


            $scope.search = function () {
                if ($scope.keyword) {
                    console.log($scope.keyword);

                    console.log($scope.term);
                    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + $scope.keyword;
                    if ($scope.term.length > 0) {
                        url = url + "+" + $scope.term;
                    }
                    console.log(url);
                    $http({ method: 'GET', url: url }).
                    success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log(data);
                        $scope.books = data;
                    }).
                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $scope.books = [];
                    });

                }
                else {
                    $scope.books = [];
                }

            };
        }
    ]);



// myApp.
//     controller('GoogleUserBookshelvesCtrl', [
//         '$scope', '$http', function ($scope, $http) {
// }]);

myApp.
    controller('GoogleUserProfileCtrl', [
        '$scope', '$http','UserService', function ($scope, $http,UserService) {
          
          $scope.bookshelves={
            items:{}
          };

            $scope.test = function () {

                console.log(UserService);
                console.log('UserService');

               // var url = 'https://www.googleapis.com/books/v1/user/' + uid + '/bookshelves/';
               var url='https://www.googleapis.com/books/v1/mylibrary/bookshelves'+"?access_token="+UserService.access_token;

                $http({ method: 'GET', url: url }).
                    success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log(data);
                        $scope.bookshelves=data;
                        
                        for (var i = $scope.bookshelves.items.length - 1; i >= 0; i--) {
                        	(function(i) {
	                        	if ($scope.bookshelves.items[i].volumeCount>0)
	                            {
	                            
	                                var vurl=$scope.bookshelves.items[i].selfLink+"/volumes"+"?access_token="+UserService.access_token;

	
	                                $http({ method: 'GET', url: vurl }).
	                                success(function (data, status, headers, config) {
	                                    console.log(data);
	                                   $scope.bookshelves.items[i].volumes=data;
	                                  
	                                  
	                                }).
	                                error(function (data, status, headers, config) {
	                                    console.log(data);
	                                    // called asynchronously if an error occurs
	                                    // or server returns response with an error status.
	                                    //$scope.books=[];
	                                });
	
	                            }

	                        	
                        	}(i));
                        };
                        //$scope.books=data;
                    }).
                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        //$scope.books=[];
                    });


            };
        }
    ]);


