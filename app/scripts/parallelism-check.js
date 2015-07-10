var helper = require('./helper.js');

// create new variable
var fb = new helper.FeedbackItem();
// parallelism
fb.comment = 'When two or more ideas are parallel, they are easier to grasp when expressed in parallel grammatical form. Please work on this for the future.';
fb.name='faulty parallelism';
fb.category = 'Grammar and Spelling';
fb.grade = function(text) {
	// balance phrases with phrases

	// balance ideas in series
	// symptoms: withdrawal, rebeliousness, restleness, and they are depressed.

	// check if there are key words to show items in series
		// if not key words, but multiple items
		// suggest user use comma to seperate them first

	// key words:
		// include
		// are
	// check first word
	// if noun
		// make sure next word is noun
	// if verb
		// check next word after comma is verb
	// if phrase (noun + verb)
		// make sure rest are noun + verb
		//check tense and person agreement




	// balance single words with single words

	// balance clauses with clauses
	fb.text = text;
	console.log(fb.text)

	var sents = fb.sentences();
	var words = fb.taggedWords(sents.textOnly);
	var errs = [];
	words.forEach( function(sent, id) {		
		// for each sentence
		var tagSent = sent.map(function(word) {
			return word[1]}).join(' ');
		// pattern find
		// console.log(tagSent, id)
		var patt2 = /(VB.+CC\sVBG)/g // finds verb and not gerund after CC
		var match = tagSent.match(patt2);
		if (match) {
			errs.push(sents.raw[id])			
		}
		
	});

	return errs

	// var allWords = [];
	// sents.textOnly.forEach( function(text) {
	// 	var words = new pos.Lexer().lex(text);
	// 	var taggedWords = new pos.Tagger().tag(words);
	// 	allWords.push(taggedWords);
	// });
	// return allWords;
}


var practice = "Caching each module \
(this is so true) on load reduces the number \
of redundant file reads and can speed up your \
application significantly (Donald, 2013). \
In addition, sharing module instances \
allows for singleton-like modules that \
can keep state across a project (p 20).\"\
There can be only one,\" says Mr. Highlander.\
It is also known that we should try to live and die alone.\
They are not good and being well."
;

console.log(fb.grade(practice),fb.name,fb.comment);

//tests
