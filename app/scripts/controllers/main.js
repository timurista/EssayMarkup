'use strict';
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
  console.log(cmt, example);
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
  .controller('MainCtrl', function ($scope, Data, Grade) {

    // instaniate graded papers
    $scope.papers = localStorage.getItem('papers') || [];
    $scope.papers = $scope.papers.length ? JSON.parse($scope.papers):[];
    console.log($scope.papers);

    // instantiate comments
    $scope.comments = JSON.parse(localStorage.getItem('allComments'));
    if ($scope.comments.length<2) {
      // load from file storage
      $.getJSON("scripts/controllers/comments.json", function(json) {
      		$scope.comments = json;
          console.log('objects loaded',json.length); // this will show the info it in firebug console
          localStorage.setItem('allComments', JSON.stringify($scope.comments));
      });
      // save to local storage
      console.log($scope.comments);
    }
    // filter
    $scope.filter = "";
  
    //shared data
    $scope.text = Data.text;
    // Object to hold all comments
    $scope.myComments = [];
    $scope.title = '';
    $scope.studentName = '';
    $scope.studentGroup = '';

    //TODO allow custom functions to be inserted and run
    $scope.sectionNames = [];
    $scope.comments.forEach( function(comment) {
      if ($scope.sectionNames.indexOf(comment.category)<0) {
        $scope.sectionNames.push(comment.category);
      } 
    });
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

      // set selected comment to new ID or to nothing
      // $scope.newComment.selectedComment = $scope.newComment.comments[$scope.selectedCommentID] || '';
    }

    



    //TODO print to other screen option

    //TODO allow saving and caching resources

    //TODO stylize elements

    //TODO mobile small devices layout

    //TODO add custom comment insert

    // Words Seperated by commas or spaces the computer HAS to find somewhere in the text
    $scope.keyWords = '';

    //TODO improve filter
    $scope.filtered = function(text) {
    	return text.indexOf($scope.filter)>-1;
    }
    $scope.filter = "";
    //TODO filter
    $scope.filterItems = function (arr) {
      if ($scope.filter.length>0) {
        return $.grep(arr, function( a ) {
          return a.selectedComment.indexOf($scope.filter)>-1;
        });
      }
      else {return arr;}
    }
    $scope.filteredStuff = $scope.filterItems($scope.comments);

    // $scope.$watch('filter',function() {
    //   $scope.filteredStuff = $scope.filterItems($scope.comments);
    // })


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
  $scope.categories = CATS;
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

  


  // set categories
  // if $scope.categories)




  $scope.getTotal =  function(){
    var total = 0;
    for(var i = 0; i < $scope.categories.length; i++){
        var cat = $scope.categories[i];
        total += cat.value;
    }
    return total;
  };
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

  //grade essay part 1
  $scope.gradeEssay = function () {
    // reset to normal values
    $scope.resetValues();

    // split text into words
    var words = $scope.text.trim().match(/(\w){4,}/g);
    var twoWords = $scope.text.trim().match(/(\w+\s+\w+)/g);
    console.log(words);
    console.log(twoWords);

    console.log($scope.categories);

    // TODO: find repeated phrases or words
    var decreaseBy = 10;

    // word count
    $scope.gradeContent();
    $scope.gradeDocumentation();
    for (var i = $scope.categories.length - 1; i >= 0; i--) {
      var category = $scope.categories[i];
      // grade each category and lower score appropriately
      $scope.gradeCategory($scope.text,category,category.errors);
    };

    //figure out final feedback
    if ($scope.getTotal()>$scope.totalPoints*.8) {
      console.log($scope.randomComplement())
      $scope.feedback.push(new FeedbackItem($scope.randomComplement()));
    } 
    else if ($scope.getTotal()>$scope.totalPoints*.6) {
      $scope.feedback.push(new FeedbackItem($scope.randomGoodJob()));
    } else {
      $scope.feedback.push(new FeedbackItem($scope.randomNeedsWork()));
   };
    return
  }
  $scope.gradeCategory = function (str,category,errors) {
    for (var i = errors.length - 1; i >= 0; i--) {
      var err = errors[i];
      // break if toggled off
      if (!err.on) {break;}


      var re = err.re;
      var comment = err.comment;

      //find matches
      var matches = str.match(re);

      // iterate over matches
      if (matches) {
        // append comments
        $scope.feedback.push(new FeedbackItem(comment,matches[0]));
        // deduct points
        category.value -= $scope.decreaseBy;
      }
    };
  }
  $scope.wordCount = function () {
    return $scope.text.match(/(\w)+/gi).length;
  }

  // grade grammar and common mispellings

  // grade style
  $scope.gradeDocumentation = function (str) {
    var re = /\((.+?)\)/gi;
    var matches = $scope.text.match(re)
    if (matches<5) {
      $scope.categories[4].value -= $scope.decreaseBy;
      // check if less than 0
      if ($scope.categories[4].value<0) {$scope.categories[4].value=0}
      $scope.feedback.push(new FeedbackItem("You could have included more citations and evidence to support your claims for this assignment"));
    }

  }
  // search word count
  $scope.gradeContent = function () {
    if ($scope.wc()<$scope.minLength) {
      // get score
      var percentDiff = ($scope.wc()/$scope.minLength);
      var deduct = Math.ceil($scope.defValue-($scope.defValue*percentDiff));
      for (var i = $scope.categories.length - 1; i >= 0; i--) {
        // deduct points
        if ($scope.categories[i].value>0) {
          $scope.categories[i].value-=deduct; 
        };
      };
      $scope.feedback.push(new FeedbackItem('You could have included more critical thinking and reflection on the topic'));
      // get category object
  }

  };
  $scope.resetValues = function () {
    for (var i = $scope.categories.length - 1; i >= 0; i--) {
      $scope.categories[i].value=$scope.defValue;          
    };
    // reset feedback
    $scope.feedback = [];
  };
  $scope.randomComplement = function () {
    return ['Great work, you put forth a strong effort here',
    'I enjoyed reading your essay, nice work!','Very strong effort, you clearly grasp the materials in this course.',
    'This was a very strong essay, nice.','It was a pleasure to read this strong paper.','Your paper is very strong.'].randomElement();
  }
  $scope.randomGoodJob = function() {
    return ['Overall, a good effort but there are a few errors.','You put forth effort, but this essay lacks in some crucial arreas.',
    'Good, but perhaps more work could have gone into revising this paper or improving it.'].randomElement();
  }

  $scope.randomNeedsWork = function () {
    return ['Unfortunately, there are some serrious flaws in this essay.',
    'You should put forth more effort in this paper.'].randomElement();
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

  // $scope.generateGradedReport = function() {

  // }




  
});