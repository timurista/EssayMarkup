// require('./helper.js')

var FeedbackItem = function (cmt, example) {
  // console.log(cmt, example);
  var self = this;
  self.comment = cmt || '';
  self.example = example || '';
}

//make sure no value is < 0
var normalizeScores = function(paper) {
  paper.categories.forEach( function(obj) {
    obj.value = obj.value>0? obj.value: 0;
  })
}

// helper for random element
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}
var getWordCount = function (text) {return text.match(/(\w)+/gi).length};


// big grading function
var gradeEssay = function(paper) {
	var text = paper.text || '';
	var categories = paper.categories || [];	

  // reset to normal values
  resetValues(paper);

  // split text into words
  var words = text.trim().match(/(\w){4,}/g);
  var twoWords = text.trim().match(/(\w+\s+\w+)/g);

  // console.log(words);
  console.log(twoWords);
  
  // TODO: find repeated phrases or words

  // word count
  for (i=0 ; i < paper.categories.length ;i++) {
    var category = paper.categories[i];
    console.log(category);
    // grade each category and lower score appropriately

    gradeCategory(text,category,category.errors,paper);
  };
  gradeContent(paper);
  gradeDocumentation(paper);
  gradeTitle(paper);
  normalizeScores(paper);

  paper.total = function() {
  	var sum = 0;
  	paper.categories.forEach( function(cat) {
  		sum+=cat.value;
  	});
  	return sum;
  }();

  //figure out final feedback
  if (paper.total>paper.totalPoints*.8) {
    // console.log(randomComplement())
    paper.myFeedback.push(new FeedbackItem(randomComplement()));
  } 
  else if (paper.total>paper.totalPoints*.6) {
    paper.myFeedback.push(new FeedbackItem(randomGoodJob()));
  } else {
    paper.myFeedback.push(new FeedbackItem(randomNeedsWork()));
 };
 console.log('graded '+paper.studentName,paper.categories)
  return
}

var gradeCategory = function (str,category,errors,paper) {
  for (var i = errors.length - 1; i >= 0; i--) {
    var err = errors[i];
    // break if toggled off
    if (!err.on) {break;}
    //find matches
    var matches = str.match(err.re);

    // iterate over matches
    if (matches) {
      // append comments
      paper.myFeedback.push(new FeedbackItem(err.comment,matches[0]));
      // deduct points
      category.value -= paper.decreaseBy;
    }
  };
}
// grade grammar and common mispellings

// grade style
var gradeDocumentation = function (paper) {
  var docID = 4;
  // var re = /\((.+?)\)/gi;
  var re = /\(\w* \d{4}\)/g;
  var matches = paper.text.match(re)
  if (matches<5 && paper.categories.length>4) {
    paper.categories[docID].value -= paper.decreaseBy;
    // check if less than 0
    if (paper.categories[docID].value<0) {paper.categories[4].value=0}
    paper.myFeedback.push(new FeedbackItem("Are you sure you are supporting your evidence with citations and also citing your information properly? (author, date/page number)? Check over those citations because they need work"));
  }

}
// search word count
var gradeContent = function (paper) {
	paper.wc = getWordCount(paper.text);
  if (paper.wc<paper.minLength) {
    // get score
    var percentDiff = (paper.wc/paper.minLength);
    var deduct = Math.ceil(paper.defValue-(paper.defValue*percentDiff));
    for (var i = paper.categories.length - 1; i >= 0; i--) {
      // deduct points
      if (paper.categories[i].value>0) {
        paper.categories[i].value-=deduct; 
      };
      console.log(paper.categories[i].value, deduct, percentDiff)
    };
    paper.myFeedback.push(new FeedbackItem('You could have included more critical thinking and reflection on the topic'));
    // get category object
}

};

var gradeTitle = function(paper) {
  var category = 0;
  var str = paper.title;
  // make sure it is capitalized

  var errors = [
    {'re':/\b([a-z])+\s*/g,
    'comment':'Every word in your title should be capitalized',
    'name':'Make sure title is capitalized',
    },
    {'re':/[;]+/g,
    'comment':'Do you need to use a semicolon in your title? Is there a better way to make your statement without it?',
    'name':'Make sure title is capitalized',
    },
  ]
  errors.forEach( function(err, id) {
    var matches = str.match(err.re) || [];
    console.log(matches, str, err.re)

    // iterate over matches
    if (matches && paper.categories.length>category) {
      // add comment to general feedback
      paper.myComments.push(new FeedbackItem(err.comment));
      // deduct points
      paper.categories[category].value -= paper.decreaseBy;

      // show error for the title
      paper.title.replace(err.re,'<span class="inline-error">$1</span>');
    }
  })
  // gradeCategory(paper.text,
  //   paper.categories[category],errors,paper);
}


var gradeSpelling = function(paper) {
	// NO EASY SOLUTION, must fix
	// var dictionary = new Typo("en_US");
	// return dictionary.check(paper.text);
	// var element = $('p').text(paper.text);
	// var spellchecker = new $.SpellChecker(element);
	// console.log(spellchecker.check());
}

console.log(gradeSpelling({text:'nutin'}));

var resetValues = function (paper) {
  for (i in paper.categories) {
    paper.categories[i].value=paper.defValue;          
  };
  // reset myFeedback
  paper.myFeedback = [];
};

var randomComplement = function () {
  return ['Great work, you put forth a strong effort here',
  'I enjoyed reading your essay, nice work!','Very strong effort, you clearly grasp the materials in this course.',
  'This was a very strong essay, nice.','It was a pleasure to read this strong paper.','Your paper is very strong.',
  'You had some interesting arguments and ideas here, awesome! :)'].randomElement();
}
var randomGoodJob = function() {
  return ['Overall, a good effort but there are a few errors.','You put forth effort, but this essay lacks in some crucial arreas.',
  'Good, but perhaps more work could have gone into revising this paper or improving it.',
  'Good start, but remember writing takes revision and hard work. Keep at it, you will surely improve!'].randomElement();
}

var randomNeedsWork = function () {
  return ['Unfortunately, there are some serrious flaws in this essay.',
  'You should put forth more effort in this paper.',
  'I know it may seem like your struggling hard now with your writing, but this feedback will help you if you follow it. We can all improve, so keep at it!',].randomElement();
}

var paper = {
  title:'my title',
  text:'some text.',
  categories:[],
  myComments:[],  
}

console.log(gradeEssay(paper))
