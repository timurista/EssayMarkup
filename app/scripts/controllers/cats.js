var CATS = [
    {'name': 'Grammar and Spelling',
     'value':60,
     'errors':[
      {'re':/(\s[i]\s)/g,'comment':'"I" should always be capitalized, but an error was found in your essay where it was not capitalized.','name':'I not capitalized','on':true},
// poorly spelled words 

// its problems
      {'re':/(\bits going\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its-its going','on':true},
      {'re':/(\bits supposed\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its','on':true},
      {'re':/(\bits time to\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its','on':true},
      {'re':/(\bits there\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its','on':true},
      {'re':/(\bby it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s','on':true},
      {'re':/(\bfor it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s','on':true},
      {'re':/(\blost it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s','on':true},
      {'re':/(\bits'\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s','on':true},

// effect vs affect
      {'re':/(\ban? effect\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.','name':'Effect vs Affect','on':true},
      {'re':/(\b\w+ effects (the|an|a)\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.','name':'Effect vs Affect','on':true},
// piece vs peace
      {'re':/(\bpeaces? of \w+)/gi,'comment':'Remember, piece refers to a part of something while peace is a state of calmness.','name':"Piece vs Peace",'on':true},
// their vs there
      {'re':/(\bTheir are \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their','on':true},
      {'re':/(\bis there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their','on':true},
      {'re':/(\bits theres\w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their','on':true},
      {'re':/(\bto there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their','on':true},

// compound words
      {'re':/(\bbed room\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.','name':'Compound Words','on':true},
      {'re':/(\bsnow flake\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.','name':'Compound Words','on':true},

// mechanics issues
      {'re':/(\ba [aeio]\w+)/gi,'comment':'Remember, use an before words that begin with vowels.','name':'Missing an before vowel','on':true},
      {'re':/(\w{4,}\.\s* [a-z]\w+)/g,'comment':'Capitalization is a problem in this essay.','on':true},
      {'re':/(\w+[A-Z]\w{4,})/g,'comment':'Avoid all caps in your essay, even if you are citing a web source.','on':true},
      {'re':/(\w+\s{0,1},\s{0,1}[A-Z][a-z]{0,1}\b)/g,'comment':'Remember not to capitalize after a comma.','on':true},


// Faulty parallelism
      // {'re':/(\w+\swho[a-zA-Z\s,;]+and\s(?!who)\w+)/g,'comment':'Parallelism error: Make sure each each item is balanced in terms of gramatical weight.','on':true},
      {'re':/(\bin.+?,.+?\sor\sin\s\w+)/g,'comment':'You don\t need to include that in when you are introducing a series of related ideas. Remember to keep parallel structures the same.','on':true},

// subject verb agreement
      {'re':/(\bdifferences is\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(differences)(?:\s[^\.]+?includes)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\beveryone were\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\beveryone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\banyone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bsomeone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\banyone are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bherd are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bpack are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bswarm are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bflock are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bgroup are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bbunch are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},
      {'re':/(\bcrowd are\b)/g,'comment':'Remember pluarl subjects take a singular verb.','on':true},

// whose as contraction
      {'re':/(\bwho's money\b)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
      {'re':/(\bwho's life\b)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},

// fewer vs less
      {'re':/(\b\w+ less \w+[eni]s\b)/g,'comment':'Use less when your writing about a continous quantity and fewer when you are writing about multiple items.','on':true},

// too vs to
      {'re':/(\b\w+ to many \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
      {'re':/(\b\w+ to few \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
      {'re':/(\b\w+ to small \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
      {'re':/(\b\w+ to big \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
      {'re':/(\b\w+ to little \w+)/g,'comment':'Use too for when you want to say overly or also and to a preposition.','on':true},
// mechanics with commas
      {'re':/([a-zA-Z]+,[a-zA-Z]+)/g,'comment':'Always put a space after the comma.','on':true},

// wrong idiom
      {'re':/(\sbeing as\s)/g,'comment':'This is the wrong expression for being, instead just use was instead','on':true},

//introducing clauses
    {'re':/(\bFor example[^,]\b)/gi,
     'comment':'Introductory elements need a comma after them',
     'name':'For exmaple needs comma after','on':true},

     ],
},
    {'name': 'Ideas and Content',
     'value': 60,
     'errors':[
      {'re':/(\bstuffs?\b)/gi,'comment':'Your language is at times not specific which causes some of your ideas to fall flat. Use clear transitions and specific language instead of "stuff" to capture your main points.','on':true},
      {'re':/(\bthings?\b)/gi,'comment':'Make sure to use specific language instead of "thing" to capture your main points.','on':true},
      {'re':/(\bsort of\b)/gi,'comment':'Can you use a better vocabulary word here? Perhaps a phrase such as "to some degree" or "amost" might work better. But try and find better ways to express your ideas here.','on':true},
     ],
   },
    {'name': 'Organization',
     'value': 60,
     'errors':[
      {'re':/(\bi think)/gi,'comment':'Get into the habbit of organizing your thoughts without using I think.','on':true},
      // unclear anticident
    {'re':/(\bThis\s(is|was)\s\w+)/g,
     'comment':'What exactly is this referring to here? It is unclear',
     'name':'Unclear Antecedent 1','on':true},
     // repeating phrases
     {'re':/(?:\n|\.\s)\b(\w+\s)(\w+\b)(?:.[^\.]+?\.\s)(?=\1\2)/g,
     'comment':'Please do not repeat how your sentences begin',
     'name':'Unclear Antecedent 1','on':true},
     ],
   },
    {'name': 'Style and Word Choice',
     'value': 60,
     'errors':[
     {'re':/(i believe)/gi,'comment':'Some style and word choice errors.','on':true},
     {'re':/(a\s*lot)/gi,'comment':'Rather than using vague language such as "alot", you such be more specific with your example and overall language.','on':true},
     {'re':/(\bvery\s*\w+)/gi,'comment':'Try to find words or specific adjectives that capture what exactly you are trying to say instead of using two word phrases with modifiers like "very" to hold up weak adjectives.','on':true},
// own
     {'re':/(\bown\s*\w+)/gi,
     'comment':'Do you need to use own here to add emphasis? Might you simply use a possessive pronoun like his, hers, mine, etc.?',
     'name':'Own error','on':true},
//passive voice
     {'re':/(\bwere\s*\w*\s\w+ed)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 1','on':true},
     {'re':/(\bwas\s*\w*\s\w+ed)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 2','on':true},
     {'re':/(\bis being \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 3','on':true},
     {'re':/(\bcan be \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 4','on':true},
     {'re':/(\bhad been \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 5','on':true},
// sort of
    {'re':/(\bsort of like \w+)/gi,
     'comment':'Can you say this with fewer words? In a clearer, more succinct way?',
     'name':'Too Colloquial 1','on':true},

// not needed
{'re':/(\bthe fact that\b)/gi,
     'comment':'Can you say this with fewer words? Just use "that" instead?',
     'name':'Unncecessary the fact that 1','on':true},
  

     ],
   },
    {'name': 'Documentation and Evidence',
     'value': 60,
     'errors':[
     //{'re':/()/gi,'comment':'Some Documentation errors.'},
     {'re':/([“"][^A-Z()]+?\..[^()]+?[a-zA-Z]+)/g,'comment':'Remember to support your quotes with citations. Or if you didn\'t mean to use quotes as emphasis, might you consider removing them alltogether? Or putting the material in single-quotes to help readers?','name':'No citations for quotes','on':true},
     {'re':/(Wikipedia)/gi,'comment':'Avoid citing wikipedia directly and instead only reference the sources that wikipedia points to.','on':true},
     ],
   },
  ];