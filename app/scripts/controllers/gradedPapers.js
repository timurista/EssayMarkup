'use strict';

// testing spreadsheets
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s/pubhtml?gid=512563130&single=true';
// var pub_key = '1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s';
// function init() {
//   Tabletop.init( { key: pub_key,
//                    callback: function(data, tabletop) { console.log(data) },
//                    simpleSheet: true } ).failure(function(error) {console.log(error)})
// }

// TODO allow for editing of essays

angular.module('essayMarkupV1App')
  .controller('GPCtrl', function ($scope, $localStorage) {
  	$scope.$storage = $localStorage;

  	$scope.papers = JSON.parse(localStorage.getItem('papers')) || [];
  	$scope.thePaper={};
  	
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
		$scope.filterScore="0.8";

		$scope.filteredScores = function(filter) {
			return $scope.papers.filter( function(paper) {
				var percent = (paper.total/paper.totalPoints).toString().match(/^\d+(?:\.\d{0,1})?/)[0];
				// console.log(percent,filter)
				return (percent===filter);
			})
		}

		$scope.removeFeed = function (myFeed, feedback) {
			console.log(feedback);
			var id = feedback.indexOf(myFeed);
			feedback.splice(id,1);
		}

  });
