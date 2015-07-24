
var findByName=function(Objects, Name) {
  for (var i = 0, len = Objects.length; i < len; i++) {
  	console.log(Objects[i].name, Name)
      if (Objects[i].name === Name)
          return Objects[i]; // Return as soon as the object is found
  }
  return null; // The object was not found
};
  // helper for random element
  var randomElement=function (array) {
    return array[Math.floor(Math.random() * array.length)]
  };

  // class for adding comments
  var Comment=function(name,points) {
  	this.name=name || "";
  	this.points=points || 0;
  };

  var Error=function (re,comment) {
  	this.re= re || '';
  	this.comment= comment || 'My Comment';
  };

  var TextData = function(text) {
  	var self = this;
    self.text = text || '';

    self.sentences = function(text) {
      // this checks with positive look ahead and discards it if length of sentence<4 characters I am.
      var re =/(\S.{6,}?[.!?])(?=\s*|$)/gi;
      var abrv_pattern = /([A-Z]{1,}[a-z]*\.)(?=\s+)/g
      var aside_pattern = /(\(.+?\))/g;
      var cite_pattern = /(\([^(;)]*\d+\))/g;
      var quote_pattern = /(\".+?\")/g;
      var extraSpaces_pattern = /(\s)(?=\s+)/g;
      var spBeforePeriod_pattern = /(\s+)(?=\.)/g;


      var process = function(arr,pattern) {
        var array = [];
        // console.log(pattern);
        arr.forEach(function(obj) {
          var match = obj.match(pattern);
          if (match) {
            //push all objects matched into array
            for (var i = 0; i < match.length; i++) {
               array.push(match[i]);
            };
          }
        });
        return array;
      }
      // get sentences
      var getSents = function(txt) {
        return txt.split(re).filter(function(obj) {
          if (obj.length>1){
            return obj;
          }
        });
      }
      // textOnly
      var removeTextByPatterns = function(txt,patterns) {
        var newTxt = txt;
        patterns.forEach(function(pattern) {
          // process and change text by pattern
          // console.log(newTxt)
          newTxt = newTxt.replace(pattern,'');
        })
        return getSents(newTxt);
      };
      // just raw text
      var raw = removeTextByPatterns(self.text,[abrv_pattern]);
      var sents = {
        raw:raw,
        asides:process(raw, aside_pattern),
        citation:process(raw, cite_pattern),
        quotes:process(raw, quote_pattern),
        textOnly:removeTextByPatterns(self.text,
          [abrv_pattern, aside_pattern,cite_pattern,
          extraSpaces_pattern,
          spBeforePeriod_pattern]),
      }
      return sents
    }();
    
}
    // self.taggedWords = function(sents){
    //   var allWords = [];
    //   sents.forEach( function(text) {
    //     var words = new pos.Lexer().lex(text);
    //     var taggedWords = new pos.Tagger().tag(words);
    //     allWords.push(taggedWords);
    //   });
    //   return allWords;
    // }