// requirejs(['myHelper.js'])

var FeedbItem = function (cmt, example) {
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

  var t = new TextData(paper.text);
  console.log(t)


  // split text into words
  var words = text.trim().match(/(\w){4,}/g);
  var twoWords = text.trim().match(/(\w+\s+\w+)/g);

  // console.log(words);
  // console.log(twoWords);
  
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
    paper.myFeedback.push(new FeedbItem(randomComplement()));
  } 
  else if (paper.total>paper.totalPoints*.6) {
    paper.myFeedback.push(new FeedbItem(randomGoodJob()));
  } else {
    paper.myFeedback.push(new FeedbItem(randomNeedsWork()));
 };

 console.log('graded '+paper.studentName,paper.myFeedback)

  return
}

// grade grammar and common mispellings
var gradeCategory = function (str,category,errors,paper) {
  for (var i = errors.length - 1; i >= 0; i--) {
    var err = errors[i];
    // break if toggled off
    if (!err.on) {break;}
    //find matches
    var matches = str.match(err.re);
    console.log(err.re,matches)

    // iterate over matches
    if (matches) {
      // console.log(matches, err.comment)
      // append comments
      console.assert(matches[0])
      paper.myFeedback.push(new FeedbItem(err.comment,matches[0]));
      // deduct points
      category.value -= paper.decreaseBy;
    }
  };
}

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
    paper.myFeedback.push(new FeedbItem("Are you sure you are supporting your evidence with citations and also citing your information properly? (author, date/page number)? Check over those citations because they need work"));
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
      // console.log(paper.categories[i].value, deduct, percentDiff)
    };
    paper.myFeedback.push(new FeedbItem('You could have included more critical thinking and reflection on the topic'));
    // get category object
}

};

var gradeTitle = function(paper) {
  var category = 0;
  var str = paper.title;
  // make sure it is capitalized

  var errors = [
    // {'re':/\b([a-z])+\s*/g,
    // 'comment':'Every word in your title should be capitalized',
    // 'name':'Make sure title is capitalized',
    // },

  ]
  errors.forEach( function(err, id) {
    var matches = str.match(err.re) || [];
    console.log(matches, str, err.re)

    // iterate over matches
    if (matches && paper.categories.length>category) {
      // add comment to general feedback
      paper.myComments.push(new FeedbItem(err.comment));
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
  // paper.myFeedback = [];
  // include textObject
  // paper.my
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
  text:'The Giver and Jonas are similar in many ways. One similarity that they both share is their pale eyes (pgs. 20 & 61). Everyone else in the community has dark eyes, with the exception of a few (pg. 20). This is a symbol that they both have the ability to “see-beyond” (pg. 63). Another similarity the Giver and Jonas share is the honor and separation from the community. When Jonas is selected to become the Receiver of Memory, he immediately senses that he is different from the rest of the community, and this puts him at unease (pg. 65). Since the Giver is also the Receiver of Memory, he also is different and separate from the community, though he is more used to this. These were some similarities between Jonas and the Giver.Jonas and the Giver are also different in a number of ways. One difference they both have is their reaction to being separate from the community. The Giver is used to this, since he had much more training than Jonas, and does not seem bothered by it (pgs. 103 & 104). On the other hand, Jonas is nervous, because throughout his whole life he has learned that differences were considered to be wrong (pgs. 38 & 65). A second difference between the Giver and Jonas is that they both experienced the “Capacity to See Beyond” but in different ways (pg. 92). When Jonas got his first signs of the Capacity to See Beyond, what he saw was the color red (pg. 94). The Giver, however, explains that his seeing-beyond happened to him in a different way, which he will tell Jonas what it exactly is later (pg. 96). These were some differences between Jonas and the Giver.Though the Giver and Jonas are different in many ways, they are also similar in many ways as well. Jonas and the Giver share physical similarities, and emotional similarities as well. Both have pale eyes, which means they can both see beyond (pg. 20 & 61). The Giver and Jonas are physically separate from the community because they train alone with only each other, and they are not allowed to share it with anybody (pgs. 61 & 68). They are emotionally separate from the community because, since they are not allowed to share their training with anybody, only they know the true pleasures and pains of life and that the world was different “back and back and back” (pgs. 94 – 107). Of course, the Giver and Jonas are different in many ways as well. For example, they “see-beyond” for the first time differently (pg. 92). “Seeing-beyond” for Jonas first happens when he sees a flash of red in an apple, which slowly begins to occur in other objects, such as the audience at the annual Ceremony and Fiona’s hair (pg. 94). However, later in the book, the Giver explains to Jonas that he “hears-beyond” for the first time, and when Jonas asks him what he hears, he says he hears music (pg. 157). In conclusion, the Giver and Jonas share many similarities and differences.',
  categories:[],
  myComments:[],  
  myFeedback:[],  
}

console.log(gradeEssay(paper))
