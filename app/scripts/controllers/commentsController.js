angular.module('essayMarkupV1App')
  .controller('commentsCtrl', function ($scope, $localStorage) {
  	    //instantiate comments using ngstorage
  	$scope.filter='';
    $scope.$storage = $localStorage;
    $scope.$storage = $localStorage.$default({
        allComments: [],        
    });

    // instantiate comments
    $scope.comments = $scope.$storage.allComments;
    if ($scope.$storage.allComments.length<1) {
      $.getJSON("scripts/controllers/comments.json", function(json) {
        // load if the there are no comments
          console.log('objects loaded',json.length); // this will show the info it in firebug console
          $scope.$storage.allComments = json;
          // console.log($scope.$storage);
          // push categories into the comments;
          $scope.comments.forEach( function(comment) {
            if ($scope.sectionNames.indexOf(comment.category)<0) {
              $scope.sectionNames.push(comment.category);
            } 
          });
        });
    }
    console.log($scope.comments);

  }