
module.exports = {

  findByName: function(Objects, Name) {
      for (var i = 0, len = Objects.length; i < len; i++) {
      	console.log(Objects[i].name, Name)
          if (Objects[i].name === Name)
              return Objects[i]; // Return as soon as the object is found
      }
      return null; // The object was not found
  },
  // helper for random element
  randomElement:function (array) {
      return array[Math.floor(Math.random() * array.length)]
  },

  // class for adding comments
  Comment: function(name,points) {
  	this.name=name || "";
  	this.points=points || 0;
  },

  Error:function (re,comment) {
  	this.re= re || '';
  	this.comment= comment || 'My Comment';
  },

  FeedbackItem:function(name,comment,category,gradeF) {
    this.name= name || 'name';
    this.comment = comment || '';
    this.category = category || '';
    this.grade = gradeF || null;
    this.sentences = function(text) {
      // var re = /(\S.+?[\!\?\.])/gim
      // uses positive look ahead to check if next item after period is space
      // var re =/(\S.+?[.!?:])(?=\s+|$)/gi;
      // this checks with positive look ahead and discards it if length of sentence<4 characters I am.
      var re =/(\S.{12,}?[.!?])(?=\s+|$)/gi;
      return text.split(re).filter(function(obj) {
        if (obj.length>1){
          return obj;
        }
      });
    }
  }
}

