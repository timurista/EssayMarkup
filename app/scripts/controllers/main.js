'use strict';
// instantiate object
var loadObj = function(name,defValue) {
  var obj = localStorage.getItem(name) || [];
  if (obj.length) {
    return JSON.parse(obj);
  }
  else {
    localStorage.setItem(name,JSON.stringify(defValue));
    obj = defValue;
    return obj;
  }
}

// find by name
var findByName = function(Objects, Name) {
    for (var i = 0, len = Objects.length; i < len; i++) {
    	console.log(Objects[i].name, Name)
        if (Objects[i].name === Name)
            return Objects[i]; // Return as soon as the object is found
    }
    return null; // The object was not found
}
// helper for random element
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

var toJSONSTRING = function(data) {
  var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
  window.open(url, '_blank');
  window.focus();
}

// class for adding comments
var Comment = function(name,points) {
	this.name=name || '';
	this.points=points || 0;
}

var Error = function (re,comment) {
	this.re= re || '';
	this.comment= comment || 'My Comment';
}

var FeedbackItem = function (cmt, example) {
  // console.log(cmt, example);
  var self = this;
  self.comment = cmt || '';
  self.example = example || '';
}



/**
 * @ngdoc function
 * @name essayMarkupV1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the essayMarkupV1App
 */

angular.module('essayMarkupV1App')
  .controller('MainCtrl', function ($scope, Data, Grade, $localStorage) {
    // saving storage ability
    $scope.$storage = $localStorage;

    //instantiate comments using ngstorage    
    $scope.$storage = $localStorage.$default({
        allComments: [], 
        sPaper: {
          'timestamp':Date.now(),
          'studentName':'',
          'title':'',
          'text':Data.text,
          'documentation':'',
          'studentGroup':'',
          'myFeedback':[],
          'myComments':[],
          'categories':CATS, // a global categories listing
          'totalPoints':300,
          'decreaseBy':6,
          'total':300,
          'defValue':60,
          'getWC':0,
          'minLength':'',
          'keyWords':''
        },

    });

    // instantiate comments
    $scope.comments = $scope.$storage.allComments;
    if ($scope.$storage.allComments.length<1) {
      $.getJSON("scripts/controllers/comments.json", function(json) {
        // load if the there are no comments
          console.log('objects loaded',json.length); // this will show the info it in firebug console
          $scope.$storage.allComments = json;
          console.log($scope.$storage);
          // push categories
          $scope.comments.forEach( function(comment) {
            if ($scope.sectionNames.indexOf(comment.category)<0) {
              $scope.sectionNames.push(comment.category);
            } 
          });
        });
    }

    // load paper
    $scope.myPaper = $scope.$storage.sPaper;

    console.log('Comments',$scope.comments,$scope.$storage.allComments);

    // filter
    $scope.filter = "";

    $scope.categories = CATS;

    $scope.getTotal =  function(categories){
      var total = 0;
      for(var i = 0; i < categories.length; i++){
          var cat = categories[i];
          total += cat.value;
      }
      return total;
    };

  
    //shared data
    $scope.feedback = $scope.myPaper.myFeedback;
    $scope.text = $scope.myPaper.text;
    // Object to hold all comments
    $scope.myComments = $scope.myPaper.myComments;
    $scope.title = $scope.myPaper.title;
    $scope.studentName = $scope.myPaper.studentName;
    $scope.studentGroup = $scope.myPaper.studentGroup;
    $scope.keyWords = $scope.myPaper.keyWords;

    //TODO allow custom functions to be inserted and run
    $scope.sectionNames = [];

    $scope.newComment={};
    $scope.selectedCommentID = 0;
    $scope.newComment.section = $scope.sectionNames[0];
    $scope.newComment.selectedComment='A New Comment';
    $scope.newComment.comments = [$scope.newComment.selectedComment];
    $scope.addAllNewComment = function(comment) {
      $scope.newComment.comments.push(comment);
    }
    $scope.addToComments = function(comment) {
      if ($scope.comments.indexOf(comment)<0) {
        $scope.comments.push(comment);        
      }
      else {
        alert('Warning! Duplicates cannot be saved!');
      }
    }
    $scope.$watch('newComment.selectedComment', function(val) {
      $scope.newComment.comments[$scope.selectedCommentID] = val;
    });
    $scope.setCommentID = function(idx) {
      $scope.selectedCommentID=idx; 
      $scope.newComment.selectedComment=$scope.newComment.comments[idx];
    }
    $scope.removeNewComment = function(idx) {
      $scope.newComment.comments.splice(idx,1);
    }

    //TODO allow saving and caching resources

    //TODO stylize elements

    //TODO mobile small devices layout

    $scope.numberShown = 10;
    $scope.filteredStuff = function(filt) {
      var filtered = $scope.comments.filter(function(obj) {
        return (obj.subsection.toLowerCase().indexOf(filt)>-1);
        return (obj.selectedComment.toLowerCase().indexOf(filt)>-1);
      });
      return filtered.slice(0, $scope.numberShown);
    }
    $scope.showMore = function() {
      $scope.numberShown =( $scope.numberShown<$scope.comments.length) ? $scope.numberShown+5: $scope.comments.length;
    }

    $scope.addComment = function(comment, idx) {
    	// find index for comment, assign it to comment id    	comment.id = $scope.comments.indexOf(comment);
    	// remove comment from list 
    	$scope.comments.splice(comment.id,1);
    	// var comment = comment;
    	console.log(comment,comment.id);
    	$scope.myComments.push(comment);
    	var foundCategory = findByName($scope.categories,comment.selectedCategory);
    	console.log(foundCategory);
    	foundCategory.value-=$scope.decreaseBy;
    	// console.log($scope.myComments);
    }
    $scope.removeFeedback = function(idx) {
    	$scope.feedback.splice(idx,1);
    }

    // remove error
    $scope.removeError = function (category,error) {
    	var catID = $scope.categories.indexOf(category);
    	var errID = $scope.categories[catID].errors.indexOf(error);
    	//remove Error
    	$scope.categories[catID].errors.splice(errID,1);
    }
    // add Error
    $scope.addError = function (category,err) {
    	var Err, catID;

    	try {
    		Err = new Error(err.re,err.comment);
    		Err.re = new RegExp('('+Err.re+')','gi')
    	} catch(e) {
    		Err = new Error();
    	}
    	catID = $scope.categories.indexOf(category);
    	console.log(Err, catID, category);
    	if (catID>-1) {
	    	$scope.categories[catID].errors.unshift(Err);
    	};
    }


    $scope.removeComment = function(comment, idx) {
    	// problem if on same screen it doesn't get removed
    	console.log($scope.myComments)
    	var removedComment = $scope.myComments.splice(idx,1);

			var foundCategory = findByName($scope.categories,comment.selectedCategory);    	
			foundCategory.value+=$scope.decreaseBy;
    	// reinsert comment
    	$scope.comments.splice(comment.id,0,comment);
    }
    // This allows user to switch different tabs
    // involves using ngSwitch

    $scope.thisSection = 1;
    $scope.section = function (id) {
        $scope.thisSection = id;   
    };
    $scope.is = function (id) {
        return $scope.thisSection == id;
    };

    // wrap in function to call service
    $scope.grade = function() {
    	Grade.grade($scope.text);
    };

    // AUTOGRADING

  $scope.minLength = 1000;
  $scope.feedback = [];
  $scope.totalPoints = 300;
  $scope.catLen = 5;
  $scope.getDefValue = function() {return $scope.totalPoints*1.0/$scope.catLen};
  $scope.defValue = $scope.getDefValue();
  $scope.getDecreaseBy = function() {return (($scope.totalPoints*1.0/$scope.catLen)*.1)};
  $scope.decreaseBy = $scope.getDecreaseBy();
  $scope.getWordCount = function () {
  	return $scope.text.match(/(\w)+/gi).length};
  $scope.wc = $scope.getWordCount;
  // if total points changes, update default Value and decreasy by
  $scope.$watch('totalPoints',function() {
  	$scope.decreaseBy = $scope.getDecreaseBy();
  	$scope.defValue = $scope.getDefValue();
  });
    $scope.$watch('defValue',function() {
  	$scope.decreaseBy = $scope.getDecreaseBy();
  	$scope.totalPoints = $scope.defValue*$scope.catLen;
  });

// FEEDBACK CATEGORIES
  $scope.newComment.category = $scope.categories[0].name || null;
  $scope.customErrCategory=$scope.categories[0].name;

  // $scope.categories = JSON.parse(localStorage.getItem('allCategories'));
  //   if (!$scope.categories) {
  //     console.log($scope.categories);
  //     // load from file storage
  //     $scope.categories = CATS;

  //     // save to local storage
  //     localStorage.setItem('allCategories', JSON.stringify($scope.categories));
  //     console.log($scope.categories);
  //   }



  $scope.commentCategory = function (category) {
    if (category.value>$scope.defValue*.666) {
      return ""
    }
    else if (category.value<$scope.defValue*.666 && category.value>$scope.defValue*.4) {
      return "There were some errors here";
    } 
    else{
      return "There were numerous errors";
    };
  }

  // category names
  $scope.categoryNames = function() {
  	var names = [];
  	$scope.categories.forEach( function(cat) {
  		if (names.indexOf(cat.name)<0){
	  		names.push(cat.name);  			
  		}
  	})
  	return names;
  }

  //grade essay
  $scope.gradeEssay = function () {
    // var paper = {
    //     'timestamp':Date.now(),
    //     'studentName':$scope.studentName,
    //     'title':$scope.title,
    //     'text':$scope.text,
    //     'documentation':'None',
    //     'studentGroup':$scope.studentGroup,
    //     'myFeedback':$scope.feedback,
    //     'myComments':$scope.myComments,
    //     'categories':$scope.categories,
    //     'totalPoints':$scope.totalPoints,
    //     'decreaseBy':$scope.decreaseBy,
    //     'total':$scope.getTotal(),
    //     'defValue':$scope.defValue,
    //     'getWC':$scope.wc,
    //     'minLength':$scope.minLength,
    //     'keyWords':$scope.keyWords
    //   }
    gradeEssay($scope.$storage.sPaper);
    $scope.$storage.sPaper.total = $scope.getTotal($scope.$storage.sPaper.categories);
    // assign feedback to value
    // $scope.feedback = $scope.$storage.sPaper.myFeedback;
    // console.log($scope.feedback)
  }

  $scope.addValue = function (category) {
    category.value+=$scope.decreaseBy;
    if (category.value>=$scope.defValue) {category.value=$scope.defValue};
  }
  $scope.lowerValue = function (category) {
    category.value-=$scope.decreaseBy;
    if (category.value<=0) {category.value=0};
  }
  $scope.removeContent = function (index) {
    // console.log($scope.feedback.length);
    $scope.feedback.splice(index,1);
    // console.log($scope.feedback.length);
  }

   // Testing the Regex finder
  $scope.highlightErrors = function (regEx) {
	  	$scope.text = $scope.text.replace(/(<span class="e">|<\/span>)/igm, "");
	    try {
	    	if (regEx.length) {
			    var query = new RegExp("(" + regEx + ")", "gim");
			    $scope.text = $scope.text.replace(query, '<span class="e">$1</span>');
	    	}
			}
			catch(e) {
		  	$scope.text = $scope.text.replace(/(<span class="e">|<\/span>)/igm, "");
			}
	};

  $scope.customError = new Error();

  $scope.$watch('customError.re', function() {
  	try {
	  	$scope.highlightErrors($scope.customError.re);
  	}
  	catch(e) {
  		// $scope.text = $scope.text.replace(/(<span class="e">|<\/span>)/igm, "");
  		$scope.customError = new Error();
  	}
  });

  // as categories change, modify the existing values not to be too low
  $scope.$watch('categories', function() {
  	$scope.categories.forEach( function(obj) {
  		obj.value = (obj.value<0) ? 0: obj.value;
  	});
  });
  $scope.saveGradedPaper = function() {
    var paper = {
      text:$scope.text,
      title:$scope.title,
      myComments:$scope.myComments,
      myFeedback:$scope.feedback,
      categories:$scope.categories,
      studentName:$scope.studentName,
      studentGroup:$scope.studentGroup,
      totalPoints:$scope.totalPoints,
      decreaseBy:$scope.decreaseBy,
    }
    $scope.papers.push(paper);
    localStorage.setItem('papers',JSON.stringify($scope.papers));
  }

  $scope.resetGradedPapers = function() {
    if (confirm('This will remove all paper data, are you sure you want to?')) {
      $scope.papers = [];
      localStorage.setItem('papers',JSON.stringify($scope.papers));
    }

  }

  // get grades from csv file
  $scope.gradePapersFromCSV = function(csv) {
    var myfile = $("#csvfile")[0].files[0];
        
    if(!myfile){
        alert("No file selected.");
        return;
    } else {
      var csv = "";
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        $scope.autoGradeCSVPapers(data);
      };
      reader.readAsText(myfile);
    }
  };
  // ste 2 of the grading
  $scope.autoGradeCSVPapers = function(csv) {
    var arr = CSVToArray(csv,',');
    console.log(arr,arr.length)
    var graded = $scope.gradePapers(arr);
    localStorage.setItem('papers',JSON.stringify($scope.papers.concat(graded)));
    console.log('saved all those papers.. heck yeah!');
  }

  $scope.gradePapers = function(arr) {
    var graded = [];
    arr.forEach( function(paper) {
      var paperObj ={
        'timestamp':paper[0],
        'studentName':paper[1],
        'title':paper[2],
        'text':paper[3],
        'documentation':paper[4],
      }
      // if paper has more than 5 entries, we will assume last entry is the student group
      paperObj['studentGroup'] = (paper.length>5)? paper[5]:'Not Displayed';

      paperObj['myFeedback']=[];
      paperObj['myComments']=[];
      paperObj['categories']=$scope.copyObjArray($scope.categories);
      paperObj['totalPoints']=$scope.totalPoints;
      paperObj['decreaseBy']=$scope.decreaseBy;
      paperObj['total']=0;
      paperObj['defValue']=$scope.defValue;
      paperObj['getWC']=$scope.wc;
      paperObj['minLength']=$scope.minLength;
      paperObj['keyWords']=$scope.keyWords;
      // grades the essay for the paperObject
      // doesn't not return anything but updates myFeedback
      gradeEssay(paperObj);

      graded.push(paperObj);
    });
    console.log(graded);    
    return graded;

  }
  $scope.copyObjArray = function(arr) {
    var newArr = [];
    arr.forEach( function(obj) {
      newArr.push($.extend({}, obj));

    })
    return newArr;
  }


  
});