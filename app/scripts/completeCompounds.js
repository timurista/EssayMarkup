var helper = require('./helper.js');
// create new variable
var fb = new helper.FeedbackItem();
// parallelism
fb.comment = 'Make sure that if two ideas are parallel they should be expressed in parallel form.';
fb.name='Needed Identifier to Balance Sentence (who, whom, etc.)';
fb.category = 'Grammar and Spelling';
fb.grade = function(text) {
	fb.text = text;
	// returns the filtered sentences for parallelism
	return fb.sentences().textOnly.filter( function(sent) {
		pat = /(who.+or\s(?!who))/g;
		if (sent.match(pat)) {
			return sent;					
		}
	})
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
They are not good and being well. Some of the regulars are acquaintances whom we see at work or live in our community."
;

console.log(fb.grade(practice),fb.name,fb.comment);
