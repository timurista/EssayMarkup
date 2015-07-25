angular.module('essayMarkupV1App')
  .controller('autoGradeCtrl', function ($scope, $localStorage, Data) {
  // $scope.paper = Data.paper;
  $scope.$storage = $localStorage;

  $scope.citations  = $scope.$storage.citations || 5;
  $scope.minLength  = $scope.$storage.minLength || 1000;
  $scope.totalPoints = $scope.$storage.totalPoints || 300;
  $scope.decreaseBy = $scope.$storage.decreaseBy || 6;
  $scope.defValue = $scope.$storage.defValue || 60;
  $scope.catLen = $scope.$storage.catLen || 5;
  // $scope.categories = paper.categories || CATS;

  $scope.getDefValue = function(total,len) {
  	return total*1.0/len};

  $scope.getDecreaseBy = function(total,len) {
  	return ((total*1.0/len)*.1)};
  $scope.getWordCount = function (text) {
  	return text.match(/(\w)+/gi).length};

  $scope.getTotal =  function(categories){
    var total = 0;
    for(var i = 0; i < categories.length; i++){
        var cat = categories[i];
        total += cat.value;
    }
    return total;
  };
  $scope.updateValues = function (total, len) {
   $scope.decreaseBy = $scope.getDecreaseBy(total, len);
    $scope.defValue = $scope.getDefValue(total, len);
  };
  $scope.gradeEssay = function (minLength,totalPoints,decreaseBy,defValue, myPaper) {
    // save to localstorage
    $scope.$storage.minLength = minLength;
    $scope.$storage.defValue = $scope.defValue;
    $scope.$storage.decreaseBy = decreaseBy;
    $scope.$storage.totalPoints = totalPoints;
    $scope.$storage.catLen = $scope.catLen;
  	
  	var paper = myPaper || $scope.$storage.sPaper;

  	paper.minLength = minLength;
  	paper.defValue = defValue;
  	paper.decreaseBy = decreaseBy;
  	paper.totalPoints = totalPoints;
  	paper['myFeedback'] = [];
  	paper['myComments'] = [];
  	paper['getTotal'] = $scope.getTotal;
    paper['citationsNeeded'] = $scope.citations;
	console.log(paper);
    gradeEssay(paper);

    // $scope.$storage.sPaper.total = $scope.getTotal($scope.$storage.sPaper.categories);
  }
  $scope.saveGradedPaper = function() {

    $scope.$storage.papers.push($scope.$storage.sPaper);
  }

  $scope.resetGradedPapers = function() {
    if (confirm('This will remove all paper data, are you sure you want to?')) {
      $scope.papers = [];
      $scope.$storage.papers = $scope.papers;
    }

  }

  // get grades from csv file
  $scope.gradePapersFromCSV = function(csv, minLength,totalPoints,decreaseBy,defValue) {
    var myfile = $("#csvfile")[0].files[0];
        
    if(!myfile){
        alert("No file selected.");
        return;
    } else {
      var csv = "";
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        $scope.autoGradeCSVPapers(data,minLength,totalPoints,decreaseBy,defValue);
      };
      reader.readAsText(myfile);
    }
  };
  // ste 2 of the grading
  $scope.autoGradeCSVPapers = function(csv,minLength,totalPoints,decreaseBy,defValue) {
    var arr = CSVToArray(csv,',');
    console.log(arr,arr.length)
    var graded = $scope.gradePapers(arr, minLength,totalPoints,decreaseBy,defValue);
    $scope.$storage.papers = graded;
    console.log('saved all those papers.. heck yeah!');
  }

  $scope.gradePapers = function(arr,minLength,totalPoints,decreaseBy,defValue) {
    var graded = [];
    arr.forEach( function(paper) {
      var paperObj ={
        'timestamp':paper[0],
        'studentName':paper[1],
        'title':paper[2],
        'text':paper[3],
        'documentation':paper[4],
      }
      // if paper has more than 5 entries, we will assume last entry is the student group
      paperObj['studentGroup'] = (paper.length>5)? paper[5]:'Not Displayed';

      paperObj['myFeedback']=[];
      paperObj['myComments']=[];
      paperObj['categories']=$scope.copyObjArray($scope.categories);
      paperObj['totalPoints']=totalPoints;
      paperObj['decreaseBy']=decreaseBy;
      paperObj['total']=0;
      paperObj['defValue']=defValue;
      paperObj['getWC']= $scope.getWordCount(paper[3]);
      paperObj['minLength']= minLength;
      paperObj['keyWords']= $scope.keyWords;
      paperObj['getTotal']= $scope.getTotal;
      paperObj['citationsNeeded']= $scope.citations;

      // grades the essay for the paperObject
      // doesn't not return anything but updates myFeedback
      gradeEssay(paperObj);
      graded.push(paperObj);
    });
    console.log(graded);    
    return graded;

  }
  $scope.copyObjArray = function(arr) {
    var newArr = [];
    arr.forEach( function(obj) {
      newArr.push($.extend({}, obj));

    })
    return newArr;
  }

  });
 