var CATS = [
    {'name': 'Grammar and Spelling',
     'value':60,
     'errors':[
      {'re':/(\s[i]\s)/g,'comment':'"I" should always be capitalized, but an error was found in your essay where it was not capitalized.','name':'I not capitalized'},
// poorly spelled words 

// its problems
      {'re':/(\bits going\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its-its going'},
      {'re':/(\bits supposed\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its'},
      {'re':/(\bits time to\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its'},
      {'re':/(\bits there\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong its'},
      {'re':/(\bby it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s'},
      {'re':/(\bfor it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s'},
      {'re':/(\blost it's\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s'},
      {'re':/(\bits'\b)/gi,'comment':'Make sure to use its appropriately, it\'s is a contraction of it and is while its shows possession.','name':'Wrong it\'s'},

// effect vs affect
      {'re':/(\ban? effect\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.','name':'Effect vs Affect'},
      {'re':/(\b\w+ effects (the|an|a)\b)/gi,'comment':'Remember, effect is a noun and affect is a verb.','name':'Effect vs Affect'},
// piece vs peace
      {'re':/(\bpeaces? of \w+)/gi,'comment':'Remember, piece refers to a part of something while peace is a state of calmness.','name':"Piece vs Peace"},
// their vs there
      {'re':/(\bTheir are \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their'},
      {'re':/(\bis there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their'},
      {'re':/(\bits theres\w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their'},
      {'re':/(\bto there \w+)/gi,'comment':'Remember, their is for possession while there is for making statements.','name':'There vs Their'},

// compound words
      {'re':/(\bbed room\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.','name':'Compound Words'},
      {'re':/(\bsnow flake\b)/gi,'comment':'Compound words such as bedroom and others should be one words not split into two.','name':'Compound Words'},

// mechanics issues
      {'re':/(\ba [aeio]\w+)/gi,'comment':'Remember, use an before words that begin with vowels.','name':'Missing an before vowel'},
      {'re':/(\w{4,}\.\s* [a-z]\w+)/g,'comment':'Capitalization is a problem in this essay.'},
      {'re':/(\w+[A-Z]\w{4,})/g,'comment':'Avoid all caps in your essay, even if you are citing a web source.'},

// Faulty parallelism
      // {'re':/(\w+\swho[a-zA-Z\s,;]+and\s(?!who)\w+)/g,'comment':'Parallelism error: Make sure each each item is balanced in terms of gramatical weight.'},
      {'re':/(\bin.+?,.+?\sor\sin\s\w+)/g,'comment':'You don\t need to include that in when you are introducing a series of related ideas. Remember to keep parallel structures the same.'},

// subject verb agreement
      {'re':/(\bdifferences is\b)/g,'comment':'Remember pluarl subjects take a singular verb.'},
      {'re':/(differences)(?:\s[^\.]+?includes)/g,'comment':'Remember pluarl subjects take a singular verb.'},
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
// mechanics with commas
      {'re':/([a-zA-Z]+,[a-zA-Z]+)/g,'comment':'Always put a space after the comma.'},

// wrong idiom
      {'re':/(\sbeing as\s)/g,'comment':'This is the wrong expression for being, instead just use was instead'},

//introducing clauses
{'re':/(\bFor example[^,]\b)/gi,
     'comment':'Introductory elements need a comma after them',
     'name':'For exmaple needs comma after'},

     ],
   },
    {'name': 'Ideas and Content',
     'value': 60,
     'errors':[
      {'re':/(\bstuffs?\b)/gi,'comment':'Your language is at times not specific which causes some of your ideas to fall flat. Use clear transitions and specific language instead of "stuff" to capture your main points.'},
      {'re':/(\bthings?\b)/gi,'comment':'Make sure to use specific language instead of "thing" to capture your main points.'},
     ],
   },
    {'name': 'Organization',
     'value': 60,
     'errors':[
      {'re':/(\bi think)/gi,'comment':'Get into the habbit of organizing your thoughts without using I think.'},
      // unclear anticident
    {'re':/(\bThis\s(is|was)\s\w+)/g,
     'comment':'What exactly is this referring to here? It is unclear',
     'name':'Unclear Antecedent 1'},
     // repeating phrases
     {'re':/(?:\n|\.\s)\b(\w+\s)(\w+\b)(?:.[^\.]+?\.\s)(?=\1\2)/g,
     'comment':'Please do not repeat how your sentences begin',
     'name':'Unclear Antecedent 1'},
     ],
   },
    {'name': 'Style and Word Choice',
     'value': 60,
     'errors':[
     {'re':/(i believe)/gi,'comment':'Some style and word choice errors.'},
     {'re':/(a\s*lot)/gi,'comment':'Rather than using vague language such as "alot", you such be more specific with your example and overall language.',},
     {'re':/(\bvery\s*\w+)/gi,'comment':'Try to find words or specific adjectives that capture what exactly you are trying to say instead of using two word phrases with modifiers like "very" to hold up weak adjectives.',},
// own
     {'re':/(\bown\s*\w+)/gi,
     'comment':'Do you need to use own here to add emphasis? Might you simply use a possessive pronoun like his, hers, mine, etc.?',
     'name':'Own error'},
//passive voice
     {'re':/(\bwere\s*\w*\s\w+ed)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 1'},
     {'re':/(\bwas\s*\w*\s\w+ed)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 2'},
     {'re':/(\bis being \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 3'},
     {'re':/(\bcan be \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 4'},
     {'re':/(\bhad been \w+en)/gi,
     'comment':'Avoid the use of the passive voice in your writing.',
     'name':'Passive Voice 5'},
// sort of
    {'re':/(\bsort of like \w+)/gi,
     'comment':'Can you say this with fewer words? In a clearer, more succinct way?',
     'name':'Too Colloquial 1'},

// not needed
{'re':/(\bthe fact that\b)/gi,
     'comment':'Can you say this with fewer words? Just use "that" instead?',
     'name':'Unncecessary the fact that 1'},
  

     ],
   },
    {'name': 'Documentation and Evidence',
     'value': 60,
     'errors':[
     //{'re':/()/gi,'comment':'Some Documentation errors.'},
     {'re':/(Wikipedia)/gi,'comment':'Avoid citing wikipedia directly and instead only reference the sources that wikipedia points to.'},
     ],
   },
  ];