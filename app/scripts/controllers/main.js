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

// class for adding comments
var Comment = function(name,points) {
	this.name=name || "";
	this.points=points || 0;
	this.regex=regex;
}

var CommentsObj = [];
$.getJSON("scripts/controllers/comments.json", function(json) {
		CommentsObj = json;
    console.log('objects loaded',json.length); // this will show the info it in firebug console
});

/**
 * @ngdoc function
 * @name essayMarkupV1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the essayMarkupV1App
 */
angular.module('essayMarkupV1App')
  .controller('MainCtrl', function ($scope, Data, Grade) {
  	//shared data
    $scope.text = Data.text;
    $scope.comments = CommentsObj;
    $scope.myComments = [];
    //TODO array of obj should have id
    //TODO from obj display 
    //format comments
    //TODO provide way to add comments
    $scope.addComment = function(comment, idx) {
    	// selected category not getting refreshed
    	var addedComment = $scope.comments.splice(comment.id,1);
    	console.log(addedComment,comment.id);
    	$scope.myComments.push(addedComment[idx]);

    	console.log(addedComment.selectedCategory);

    	var foundCategory = findByName($scope.categories,addedComment.selectedCategory);
    	console.log(foundCategory);
    	foundCategory.value-=$scope.decreaseBy;
    	// console.log($scope.myComments);
    }
    $scope.removeFeedback = function(idx) {
    	$scope.feedback.splice(idx,1);
    }
    //TODO comments can be added and deducted from the score 
    //TODO comments added are removed and added to another section
    //TODO comments are added back
    $scope.removeComment = function(comment, idx) {
    	// problem if on same screen it doesn't get removed
    	console.log($scope.myComments)
    	var removedComment = $scope.myComments.splice(idx,1);

			var foundCategory = findByName($scope.categories,addedComment.selectedCategory);    	
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
  $scope.feedback = ["feedback here"];
  $scope.totalPoints = 300;
  $scope.catLen = 5;
  $scope.getDefValue = function() {return $scope.totalPoints/$scope.catLen};
  $scope.defValue = $scope.getDefValue();
  $scope.getDecreaseBy = function() {return Math.ceil(($scope.totalPoints/$scope.catLen)*.1)};
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

  $scope.categories = [
    {'name': 'Grammar and Spelling',
     'value':$scope.defValue,
     'errors':[
      {'re':/(\si\s)/g,'comment':'"I" should always be capitalized, but an error was found in your essay where it was not capitalized.'},
// its problems
      {'re':/(\bits going\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bits supposed\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bits time to\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bits there\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bby it's\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bfor it's\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\blost it's\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},
      {'re':/(\bits'\b)/gi,'comment':'Make sure to use its appriroately, it\'s is a contraction of it and is while its shows possession.'},

// effect vs affect
      {'re':/(\ban? effect\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.'},
      {'re':/(\b\w+ effects (the|an|a)\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.'},
// piece vs peace
      {'re':/(\bpeaces? of \w+)/gi,'comment':'Remember, piece refers to a part of something while peace is a state of calmness.'},
// their vs there
      {'re':/(\bTheir are \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.'},
      {'re':/(\bis there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.'},
      {'re':/(\bits theres\w+)/gi,'comment':'Remember, their is for possession while there is for making statements.'},
      {'re':/(\bto there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.'},

// compound words
      {'re':/(\bbed room\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.'},
      {'re':/(\bsnow flake\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.'},

// mechanics issues
      {'re':/(\ba [aeio]\w+)/gi,'comment':'Remember, use an before words that begin with vowels.'},
      {'re':/(\w{4,}\.\s* [a-z]\w+)/g,'comment':'Capitalization is a problem in this essay.'},
      {'re':/(\w+[A-Z]\w{4,})/g,'comment':'Avoid all caps in your essay, even if you are citing a web source.'},

// subject verb agreement
      {'re':/(\bdifferences are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\beveryone were\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\beveryone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\banyone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bsomeone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\banyone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bherd are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bpack are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bswarm are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bflock are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bgroup are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bbunch are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(\bcrowd are\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},

// whose as contraction
      {'re':/(\bwho's money\b)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},
      {'re':/(\bwho's life\b)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},

// fewer vs less
      {'re':/(\b\w+ less \w+[eni]s\b)/g,'comment':'Use less when your writing about a continous quantity and fewer when you are writing about multiple items.'},

// too vs to
      {'re':/(\b\w+ to many \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},
      {'re':/(\b\w+ to few \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},
      {'re':/(\b\w+ to small \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},
      {'re':/(\b\w+ to big \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},
      {'re':/(\b\w+ to little \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.'},

     ],
   },
    {'name': 'Ideas and Content',
     'value': $scope.defValue,
     'errors':[
      {'re':/(\bstuffs?\b)/gi,'comment':'Your language is at times not specific which causes some of your ideas to fall flat. Use clear transitions and specific language instead of "stuff" to capture your main points.'},
      {'re':/(\bthings?\b)/gi,'comment':'Make sure to use specific language instead of "thing" to capture your main points.'},
     ],
   },
    {'name': 'Organization',
     'value': $scope.defValue,
     'errors':[
      {'re':/(\bi think)/gi,'comment':'Get into the habbit of organizing your thoughts without using I think.'},
     ],
   },
    {'name': 'Style and Word Choice',
     'value': $scope.defValue,
     'errors':[
     {'re':/(i believe)/gi,'comment':'Some style and word choice errors.'},
     {'re':/(a\s*lot)/gi,'comment':'Rather than using vague language such as "alot", you such be more specific with your example and overall language.',},
     {'re':/(\bvery\s*\w+)/gi,'comment':'Try to find words or specific adjectives that capture what exactly you are trying to say instead of using two word phrases with modifiers like "very" to hold up weak adjectives.',},

     ],
   },
    {'name': 'Documentation and Evidence',
     'value': $scope.defValue,
     'errors':[
     //{'re':/()/gi,'comment':'Some Documentation errors.'},
     {'re':/(Wikipedia)/gi,'comment':'Avoid citing wikipedia directly and instead only reference the sources that wikipedia points to.'},
     ],
   },
  ];
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
      $scope.feedback.push($scope.randomComplement());
    } 
    else if ($scope.getTotal()>$scope.totalPoints*.6) {
      $scope.feedback.push($scope.randomGoodJob());
    } else {
      $scope.feedback.push($scope.randomNeedsWork());
      console.log($scope.randomNeedsWork(),$scope.feedback)
    };
    return
  }
  $scope.gradeCategory = function (str,category,errors) {
    for (var i = errors.length - 1; i >= 0; i--) {
      var err = errors[i];
      var re = err.re;
      var comment = err.comment;

      //find matches
      var matches = str.match(re);

      // iterate over matches
      if (matches) {
        // append comments
        $scope.feedback.push(comment+' (EX: '+matches[0]+')');
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
      $scope.feedback.push("You could have included more citations and evidence to support your claims for this assignment");
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
      $scope.feedback.push('You could have included more critical thinking and reflection on the topic');
      // get category object
  }

  };
  $scope.resetValues = function () {
    for (var i = $scope.categories.length - 1; i >= 0; i--) {
      $scope.categories[i].value=$scope.defValue;          
    };
    // reset feedback
    $scope.feedback = ["Comments on your essay,"];
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

   // Grade Button
  $scope.grade = function () {
  	// defualt return for now
  	return $scope.gradeEssay();


    console.log($scope.text);
    $scope.removeHighlights();
    // $scope.text = $scope.text.toggleClass('hello');
    var error = /\bis\b/g;
    // grab and highlight error
    var highlightEls = $scope.highlightError(error);
    highlightEls.forEach( function(id,highlightEl) {
	    $scope.text = $scope.text.replace(error,highlightEl);
    });
  };
  $scope.removeHighlights = function () {
  	$scope.text = $scope.text.replace(/<span class="error">(.+?)<\/span>/g,'$1');
    console.log($scope.text);
  };


  $scope.highlightError = function (error) {
  	var res = $scope.text.match(error);
  	// will highlight all errors soon
  	var el=[];
  	res.forEach( function (idx, obj) {
  		console.log(idx,obj);
	    el.push('<span class="error">'+res+'</span>');
  	})
    return el;
  };




    //TODO comments when added take away grade

    //TODO associate comment with item in text

    //TODO categories shown at bottom with grade

    //TODO after student types, submit report



    $scope.filter = "";
  });
