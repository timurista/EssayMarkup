'use strict';

// testing spreadsheets
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s/pubhtml?gid=512563130&single=true';
var pub_key = '1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s';
function init() {
  Tabletop.init( { key: pub_key,
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } ).failure(function(error) {console.log(error)})
}

// TODO allow for editing of essays

angular.module('essayMarkupV1App')
  .controller('GPCtrl', function ($scope) {
  	$scope.papers = JSON.parse(localStorage.getItem('papers')) || [];
  	// console.log($scope.papers[0])
  	$scope.decreaseBy = 1;

  	$scope.replacedText = function(text, feedback) {
  		// console.log(feedback);
  		var newText = text;
  		feedback.forEach( function(obj) {
				var comment = obj.comment
				// find examples
  			// get all feedback
  			// find error then display it'
  			if (obj.example.length) {
					var example = new RegExp('('+obj.example+')','gi');
	  			// console.log(example, obj);
	  			// console.log(text.match(example))
					var rplString = '$1</span> <strong>('+comment+')</strong>';
		  		newText = newText.replace(example,'<span class="inline-error">'+rplString);
		  	}
  		});
  		// paragraphs for returns
  		newText = newText.replace('\n','<p>')
			return newText;
  	}
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

  });
