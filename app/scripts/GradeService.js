// Grade service for autoGrading

var GradeService = angular.module('GradeService',[])
	.service('Grade', function () {
		this.minLength = 1000;


    this.grade = function (text) {
    	console.log('grading...');
    	console.log(text);
    	return text;
    }
	});