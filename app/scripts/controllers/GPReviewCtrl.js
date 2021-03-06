angular.module('essayMarkupV1App')
  .controller('GPReviewCtrl', function ($scope, $localStorage, Data) {
  	// saving storage ability
    $scope.$storage = $localStorage;
    $scope.id = 0; // parseInt($scope.$storage.sindex) || 0;
    $scope.papers = $scope.$storage.papers.sort() || [];

    // $scope.papers = JSON.parse(localStorage.getItem('papers'));
    // console.log($scope.papers[$scope.id])
    $scope.paper = $scope.$storage.sPaper || {};
    $scope.commments = $scope.$storage.allComments;
    $scope.setPaper = function (paper) {
  		$scope.paper = paper;
  		$scope.$storage.sPaper = paper;
  		console.log($scope.paper);
  	}
  	console.log(Data.getTotal($scope.paper.categories))

  	$scope.saveToPapers = function(paper) {
  		$scope.$storage.sPaper = paper;

  		var id = $scope.papers.indexOf(paper);
  		if(id>-1) {
	  		$scope.$storage.papers[id] = paper;
  		} else {
  			$scope.$storage.push(paper);
  		}
  		$scope.scores = $scope.filteredScores($scope.filterScore);
  	}

    $scope.filterScore="0.8";


  	$scope.average = function() {
  		var sum = 0;
  		$scope.papers.forEach( function(paper) {
  			sum+=$scope.getTotal(paper.categories);  			
  		});
  		return ((sum/$scope.papers.length)/$scope.papers[0].totalPoints)*100;
  	};
  	// removes the first element "headers" and returns it
  	$scope.headers = $scope.papers.shift();
  	$scope.headerKeys = Object.keys($scope.headers).slice(0,5);
  	$scope.headerLinks = function () {
  		var obj ={};
  		$scope.headerKeys.forEach( function(key, id) {
  			// ex: title = 0 // which is enter title in header
  			obj[key] = id;
  		})
  	}

  	$scope.annotatedText = Data.annotatedText;
		$scope.getTotal = function(categories) {
			var sum = 0;
			categories.forEach(function(cat) {
				sum+=cat.value;
			});
			return sum;
		}

		$scope.getGrade = function(myTotal,totalPoints) {
			var percent = (myTotal/totalPoints);
			
			if (percent>=0.9) return 'A';
			if (percent<0.9 && percent>=.8) return 'B';
			if (percent<.8 && percent>=.7) return 'C';
			if (percent<.7 && percent>=.6) return 'D';
			return 'F';
		}

		$scope.roundToOne = function(num) {
			return Math.round( num * 10) / 10;
		}
		


		$scope.filteredScores = function(filter) {
			return $scope.papers.filter( function(paper) {
				var percent = ($scope.getTotal(paper.categories)/paper.totalPoints).toString().match(/^\d+(?:\.\d{0,1})?/)[0];
				// console.log(percent,filter)
				return (percent===filter);
			});
		}

		$scope.numberShown = 10;
		$scope.showMore = function() {
			$scope.numberShown+=5;
		}

		$scope.$watch('filterScore', function() {
			$scope.numberShown = 10;
		});

		$scope.scores = $scope.filteredScores($scope.filterScore);

		// $scope.$watch('$storage.sPaper.categories', function() {
		// 	var sum = 0;
		// 	$scope.$storage.sPaper.categories.forEach(function (cat) {
		// 		sum+=cat.value
		// 	});
		// 	console.log(sum);
		// 	$scope.$storage.sPaper.total=sum;
		// })
		// $scope.getTotal = function(categories) {
		// 	var sum = 0;
		// 	categories.forEach( function(cat) {
		// 		sum+=cat.value;
		// 	})
		// 	return sum;
		// }

		// $scope.removeFeed = function (myFeed, feedback) {
		// 	console.log(feedback);
		// 	var id = feedback.indexOf(myFeed);
		// 	feedback.splice(id,1);
		// }
  	$scope.annotatedText = function(text, feedback) {
  		// console.log(feedback);
  		var newText = text;
  		feedback.forEach( function(obj,id) {
			var comment = obj.comment
			// find examples
  			// get all feedback
  			// find error then display it'
  			if (obj.example.length) {
				var example = new RegExp('('+obj.example+')','gi');
	  			// console.log(example, obj);
	  			// console.log(text.match(example))
				var rplString = '$1</span> <strong>['+(id+1)+']</strong>';
		  		newText = newText.replace(example,'<span class="inline-error">'+rplString);
		  	}
  		});
  		// paragraphs for returns
  		newText = newText.replace('\n','<p>')
		return newText;
  	};

  });
 