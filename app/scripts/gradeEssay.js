// requirejs(['myHelper.js'])

var FeedbItem = function (cmt, opts) {
  // console.log(cmt, example);
  var self = this;
  self.comment = cmt || '';
  var options = opts;
  if (!options) {
    var options = {
    example:'',
    category:'',
    deduct:null,
    }
  }
  
  self.example = options.example;
  self.category = options.category;
  self.deduct = options.deduct;
  console.log(cmt,options.deduct, options)
}

var average = function(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
  var avg = sum / data.length;
  return avg;
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
  // setup sentences
  findSentences(paper);

	var text = paper.filteredText || '';
	var categories = paper.categories || [];	

  

  // reset to normal values
  resetValues(paper);

  var t = new TextData(paper.text);
  console.log(t)


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
  gradeRepeatedWords(paper);
  gradeKeyWords(paper);
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

var findSentences = function(paper) {
  var re_raw =/(\S.{6,}?[.!?])(?=\s*|$)/gi;
  var abrv_pattern = /([A-Z]{1,3}[a-z]{,3}\.)(?=\s+)/g
  var aside_pattern = /(\(.+?\))/g;
  var cite_pattern = /(\([^(;)]*\d+\))/g;
  var quote_pattern = /(\".+?\")/g;
  var extraSpaces_pattern = /(\s)(?=\s+)/g;
  var spBeforePeriod_pattern = /(\s+)(?=\.)/g;
  var newTxt = paper.text.slice();
  patterns = [abrv_pattern,aside_pattern,quote_pattern,extraSpaces_pattern,spBeforePeriod_pattern]
  patterns.forEach(function(pattern) {
    // process and change text by pattern
    // console.log(newTxt)
    newTxt = newTxt.replace(pattern,'');
  })
  var sents = newTxt.match(re_raw) || [];
  paper.sentences = {
    sents:sents,
    raw:paper.text.match(re_raw),
    aside:paper.text.match(aside_pattern) || [],
    citations:paper.text.match(cite_pattern) || [],
    quotes:paper.text.match(quote_pattern) || [],

  }
  paper.filteredText = paper.sentences.sents.join(' ');
  console.log(paper.filteredText);

}

// grade grammar and common mispellings
var gradeCategory = function (str,category,errors,paper) {
  for (var i = errors.length - 1; i >= 0; i--) {
    var err = errors[i];
    // break if toggled off
    if (!err.on) {break;}
    //find matches
    var matches = str.match(err.re);
    // console.log(err.re,matches)

    // iterate over matches
    if (matches) {
      // console.log(matches, err.comment)
      // append comments
      console.assert(matches[0])
      paper.myFeedback.push(new FeedbItem(
        err.comment,{
          example:matches[0],
          category:category,
          deduct:paper.decreaseBy
        })
      );
      // deduct points
      category.value -= paper.decreaseBy;
    }
  };
}

// grade style
var gradeDocumentation = function (paper) {
  var docID = 4;
  var citesNeeded = Math.floor(paper.sentences.sents.length/6);
  var maxCites = Math.floor(paper.sentences.sents.length*.8)

  var cites = paper.sentences.citations;
  console.log(paper.sentences, cites.length, citesNeeded, maxCites);
  if (cites.length<citesNeeded && paper.categories.length>=docID) {
    paper.categories[docID].value -= paper.decreaseBy;
    // check if less than 0
    if (paper.categories[docID].value<0) {paper.categories[4].value=0}

    var feed = "It seems you have "+cites.length+" citations which are properly formatted (Author, date / page number), but you needed at least "+citesNeeded+". ";
    feed += "It could be that your paranthetical statements are not properly formatted or you are simply not documentating your material enough. "
    feed += "Whichever the case, you need to make sure that for academic essays you are supporting your quotes and paraphrases with citations from the text.";


    paper.myFeedback.push(new FeedbItem(feed,{deduct:paper.decreaseBy,category:paper.categories[docID].name}));
  }

  else if (cites.length>maxCites && paper.categories.length>=docID) {
    paper.categories[docID].value -= paper.decreaseBy;
    var feed = "Most of your essay is full of citations which means you are not contributing your own thoughts to the discussion or adequately commenting on the material your reference. Spend more time ellaborating on that material to receive a better score next time."
    paper.myFeedback.push(new FeedbItem(feed,{deduct:paper.decreaseBy, category:paper.categories[docID].name}));
  } else {
    paper.myComments.push({comment:"You have documented your essay well and provided good support for your cited material."})
  }

}
// search word count
var gradeContent = function (paper) {
  // grade length sentences
  var sentErr = 0;
  var styleID = 3;
  var wordLengths = [];
  var sumLength = 0;


  paper.sentences.sents.forEach( function(sent, id) {
    var words = sent.split(" ") || [];
    // console.log(words.length)
    var example = paper.sentences.raw[id];
    // push here so you can look at differences later
    wordLengths.push(words.length);
    sumLength+=words.length;
    // not working, fix later
    if (words.length<2) {
      // sentErr = 1;
      // paper.myFeedback.push(new FeedbItem("Some of your sentences are too short.", {example:example,deduct:paper.decreaseBy}))
    }
    else if (words.length>40) {
      console.log(words, sent)
      sentErr = 1;
      paper.myFeedback.push(new FeedbItem("Some of your sentences are too long.", {example:example,deduct:paper.decreaseBy}))
    }
  });

  if (sentErr>0 && paper.categories.length>=styleID) {
    paper.myComments.push({comment:"Your sentences could use some work. The ideal legnth is between 15-30 words in a sentence. Sometimes you can make shorter sentences for effect, but you should try to avoid this.", deduct:paper.decreaseBy})
    paper.categories[styleID].value-=paper.decreaseBy;
  }

  //STD
  var avg = sumLength / paper.sentences.sents.length;
  var squareDiffs = wordLengths.map(function(value){
    var diff = value - avg;
    var sqr = diff * diff;
    return sqr;
  });
  var avgSquareDiff = average(squareDiffs);
  var stdDev = Math.sqrt(avgSquareDiff);

  // get diff between sentences
  console.log(wordLengths,stdDev)
  if (stdDev<5 && paper.categories.length>=styleID) {
    paper.categories[styleID].value-=paper.decreaseBy;
    paper.myComments.push({comment:"You should vary the length of your sentences more in your paper. It will make the reader more engaged and create a nice flow to your writing.",deduct:paper.decreaseBy})
  }


  // grade WC
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
    paper.myFeedback.push(new FeedbItem('You could have included more critical thinking and reflection on the topic '+(deduct*paper.categories.length).toFixed(1)+" points deducted from overall grade."));
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
}

var gradeKeyWords = function(paper) {
  console.log(paper.sentences);
  paper.keyWords = (paper.keyWords)?paper.keyWords:'';
  var kws = paper.keyWords.split(",") || [];
  // filter kws, removing empty elements
  kws = $.grep(kws,function(n){ return(n) });
  console.log(paper.keyWords,kws, paper);
  
  var found = 0;
  kws.forEach( function(kw) {
    if (paper.filteredText.indexOf(kw.toLowerCase())) {
      found++;
      var comment = ["Great job discussing "+kw+", this concept is crucial for this essay and you did a nice job in your discussion of it.",
      "You unpacked "+kw+" and made sure to talk about how important this is to your paper and overall argument, good work!",
      "Your discussion of "+kw+" was interesting and insightful, nice!"
      ].randomElement();
      paper.myComments.push({comment:comment})    
    }
  });
  if (found<=0 && kws.length) {
    var ideasID = 1;
    paper.categories[ideasID]-=paper.decreaseBy;
    paper.myComments.push({comment:"You could have discussed the following concepts in more detail: "+kws.join(','),
      deduct:paper.decreaseBy})
  };
}

var gradeRepeatedWords = function(paper) {
  // split text into words
  var words = paper.filteredText.trim().match(/(\w){4,}/g) || [];
  var twoWords = paper.filteredText.trim().match(/(\w+\s+\w+)/g) || [];
  // find repeated phrases
  dict = {}
  // do it for single words then for other words
  words.forEach(function(word) {
    dict[word] = (word in dict && word.length>3) ? dict[word]+1: 1;
  });
  twoWords.forEach(function(words) {
    dict[words] = (words in dict) ? dict[words]+1: 1;
  });

  //repeated too much
  var repeats = [];
  var numberAllowed = Math.ceil(paper.wc/75);
  // console.log(dict)
  for (k in dict) {
    if(dict[k]>numberAllowed) {
      repeats.push(k);
    }

  };
  console.log("allowed repeats: "+numberAllowed)
  var styleID = 3;
  console.log(repeats);
  if (repeats.length) {
    if (paper.categories.length>=styleID ) {
      paper.categories[styleID].value-=paper.decreaseBy;    
      paper.myComments.push({comment:'The following were repeated more than '+numberAllowed+' times. Try not to repeat the following words so much: ('+repeats.join(', ')+')', deduct:paper.decreaseBy})
    }
  } else {
    paper.myComments.push({comment:'Congrats, you have a rich vocabulary and spent great effort varying your word choice. Nice!'})
  }


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
var paper = {
  title:'my title',
  text:"There are many differences between Jonas and the current Giver. The first thing is that, the current Giver is more experienced than Jonas. First, The Giver has received more memories than him; also The Giver was in this position and job much longer than Jonas. In chapter 10, the Giver even says, “I have been the Receiver for a long time. A very, very long time.”  The Giver knows many more memories, than Jonas. So far Jonas has had only like 3 memories sunburn, snow, and sunshine. Obviously, if the Giver wasn’t more experienced than Jonas, how could he transmit memory, for example snow, to Jonas when Jonas doesn’t even know what that is? \nAnother difference about the current Receiver and the current Giver is their age difference. Jonas is a twelve, and the Giver is pretty old. In chapter 10, Jonas said, “I can see that you are very old.” Also, using context clues, most likely on the front cover of the book there is an old man which most likely is the current Giver. Another thing is that the Giver said that long time ago when he was once twelve he felt the same way Jonas did when he came to this training.\nLastly, Jonas is definitely immature than the current Giver who is mature. Jonas was a little frustrated when he learned about the colors and how he wishes he could choose what tunic to wear red or yellow. On the other hand the Giver is patiently and curiously looking at Jonas. The Giver is very mature because, he doesn’t just start shouting out his opinions, or ideas. Probably that’s just because he is older than Jonas. Those are the differences between Jonas and the current Receiver.",
  categories:[],
  myComments:[],  
  myFeedback:[],  
}

console.log(gradeEssay(paper))
