// helper for random element
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

var gradeEssay = function(paper) {
	var text = paper.text || '';
	var categories = paper.categories.slice() || [];	

  // reset to normal values
  resetValues(paper);

  // split text into words
  var words = text.trim().match(/(\w){4,}/g);
  var twoWords = text.trim().match(/(\w+\s+\w+)/g);
  // console.log(words);
  // console.log(twoWords);
  
  // TODO: find repeated phrases or words

  // word count
  gradeContent(paper);
  gradeDocumentation(paper);
  for (i=0 ; i < categories.length ;i++) {
    var category = categories[i];
    console.log(category);
    // grade each category and lower score appropriately

    gradeCategory(text,category,category.errors,paper);
  };

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
 console.log('graded '+paper.studentName)
  return
}

var gradeCategory = function (str,category,errors,paper) {
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
      paper.myFeedback.push(new FeedbackItem(comment,matches[0]));
      // deduct points
      category.value -= paper.decreaseBy;
    }
  };
}
var wordCount = function (text) {
  return text.match(/(\w)+/gi).length;
}

// grade grammar and common mispellings

// grade style
var gradeDocumentation = function (paper) {
  var re = /\((.+?)\)/gi;
  var matches = paper.text.match(re)
  if (matches<5) {
    paper.categories[4].value -= paper.decreaseBy;
    // check if less than 0
    if (paper.categories[4].value<0) {paper.categories[4].value=0}
    paper.myFeedback.push(new FeedbackItem("You could have included more citations and evidence to support your claims for this assignment"));
  }

}
// search word count
var gradeContent = function (paper) {
  if (paper.wc<paper.minLength) {
    // get score
    var percentDiff = (paper.wc/paper.minLength);
    var deduct = Math.ceil(paper.defValue-(paper.defValue*percentDiff));
    for (var i = paper.categories.length - 1; i >= 0; i--) {
      // deduct points
      if (paper.categories[i].value>0) {
        paper.categories[i].value-=deduct; 
      };
    };
    paper.myFeedback.push(new FeedbackItem('You could have included more critical thinking and reflection on the topic'));
    // get category object
}

};
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
  'This was a very strong essay, nice.','It was a pleasure to read this strong paper.','Your paper is very strong.'].randomElement();
}
var randomGoodJob = function() {
  return ['Overall, a good effort but there are a few errors.','You put forth effort, but this essay lacks in some crucial arreas.',
  'Good, but perhaps more work could have gone into revising this paper or improving it.'].randomElement();
}

var randomNeedsWork = function () {
  return ['Unfortunately, there are some serrious flaws in this essay.',
  'You should put forth more effort in this paper.'].randomElement();
}