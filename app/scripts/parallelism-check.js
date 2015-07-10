var helper = require('./helper.js');
// create new variable
var fb = new helper.FeedbackItem();
// parallelism
fb.comment = 'When two or more ideas are parallel, they are easier to grasp when expressed in parallel grammatical form.';
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

	return fb.sentences(text);
}

var practice = "Caching each module on load reduces the number of redundant file reads and can speed up your application significantly. In addition, sharing module instances allows for singleton-like modules that can keep state across a project.";

console.log(fb.grade(practice));

//tests
