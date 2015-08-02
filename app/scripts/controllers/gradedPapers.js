'use strict';

// testing spreadsheets
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s/pubhtml?gid=512563130&single=true';
// var pub_key = '1duik-jadW1ROfFFSf73pGS8LKNE-UEDMkJdWgfydN4s';
// function init() {
//   Tabletop.init( { key: pub_key,
//                    callback: function(data, tabletop) { console.log(data) },
//                    simpleSheet: true } ).failure(function(error) {console.log(error)})
// }

angular.module('essayMarkupV1App')
  .controller('GPCtrl', function ($scope, $localStorage, Data) {
  	$scope.$storage = $localStorage;
  	$scope.papers = JSON.parse(localStorage['ngStorage-papers']);

  	$scope.getWC = Data.getWC;
  	$scope.paper = {title:"None"};
  	$scope.setPaper = function(paper) {
  		$scope.paper = paper;
  	}

  	// $scope.papers = $scope.$storage.papers;
  	console.log($scope.papers)

  	$scope.downloadCSV = function() {
  		console.log('Downloading...');

  		var data = {};
  		$scope.papers.forEach( function(paper) {
  			var total = Data.getTotal(paper.categories);
  			if (!(paper.studentName in data)) {
	  			data[paper.studentName] = total;				
  			} else if (total>data[paper.studentName]) {
  				data[paper.studentName]=total;
  			}
  		})

  		// get data from papers
		var csvContent = "data:text/csv;charset=utf-8,";
		var keys = Object.getOwnPropertyNames(data);
		// sort names into order of ascending
		keys.sort();

    var g = $scope.$storage.groups.filter(Boolean);
    for (var i = 0; i < g.length; i++) {

      var csvContent = "data:text/csv;charset=utf-8,";
      var groups = g[i]['data'] || [];
      // console.log(i)

      // loop over each group set content
      console.log(groups);
      if (true) {
        for (var j = 0; j < groups.length; j++) {
          var row = groups[j].slice();
          var name = groups[j][1];
          // look through the keys for matching name
          keys.forEach(function(key){
            if (name==key) {
              // set col 2 to be updated score
              row[2]=data[key];
            }
            // else {
            //   row[2]=0;
            // };
          });
          row[1] = '"'+row[1]+'"';
          csvContent += row.join(',')+'\n';
        }
        console.log(g,g[i].name);
        // console.log('CSV',csvContent);
        // No useful name method
        // var encodedUri = encodeURI(csvContent);
        // window.open(encodedUri);

        //with a name
        var uri = encodeURI(csvContent);
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = g[i]['name']+"_scores.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);


        };
      };

    };

    
  	
  	// $scope.average = function() {
  	// 	var sum = 0;
  	// 	$scope.papers.forEach( function(paper) {
  	// 		sum+=$scope.getTotal(paper.categories);  			
  	// 	});
  	// 	return ((sum/$scope.papers.length)/$scope.papers[0].totalPoints)*100;
  	// };
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
  	$scope.removePoints = function (paper,category) {
  		var id = paper.categories.indexOf(category)
  		// var id = -1;
  		// console.log(category)
  		// for (var i = 0; i < paper.categories.length; i++) {
  		// 	if (paper.categories[i].name.indexOf(category)>-1) {
  		// 		id=i; break;
  		// 	}
  		// };
  		console.log(category,id, paper.categories[id])
  		paper.categories[id].value-=paper.decreaseBy;


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
