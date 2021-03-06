/*
--- Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


/*
// Teacher solution

// Using IIFE for number 7 challenge

(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    
    };
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i =0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    };
    
    Question.prototype.checkAnswer = function(answer){
        if (answer === this.correct){
            console.log('Correct answer!');
        }else{
            console.log('Wrong answer. Try again :)')
        }
    }
    
    var q1 = new Question('Is JavaScript the coolest programming language in the world?'
    , ['Yes', 'No'], 0);
    var q2 = new Question('What the name of this course\'s teacher?'
    , ['John', 'Micheal', 'Jonas'], 2);
    var q3 = new Question('What does best describe coding?'
    , ['Boring', 'Hard', 'Fun','Tedious'], 2);
    
    var questions = [q1, q2, q3];
    
    var randomNumber = Math.floor(Math.random() * questions.length);
    
    questions[randomNumber].displayQuestion();
    
    var answer = parseInt(prompt('Please select the correct answer.'));
    
    questions[randomNumber].checkAnswer(answer);
    
})();
*/





/*
--- Expert level ---
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this.
*/

// Teacher solution -> Expert level

(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    
    };
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i =0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    };
    
    Question.prototype.checkAnswer = function(answer, callback){

        var score;
        if (answer === this.correct){
            console.log('Correct answer!');
            score = callback(true);
        }else{
            console.log('Wrong answer. Try again :)')
            score = callback(false);
        }

        this.displayScore(score);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your current score is: ' + score);
        console.log('--------------------------');
    }
    
    var q1 = new Question('Is JavaScript the coolest programming language in the world?'
    , ['Yes', 'No'], 0);
    var q2 = new Question('What the name of this course\'s teacher?'
    , ['John', 'Micheal', 'Jonas'], 2);
    var q3 = new Question('What does best describe coding?'
    , ['Boring', 'Hard', 'Fun','Tedious'], 2);
    
    var questions = [q1, q2, q3];


    // Using Closures concept to save the score
    function scoreCalc(){
        var score = 0;
        return function(correct){
            if(correct){
                score++;
            }
            return score;
        }
    }
    var keepScore = scoreCalc();

    function nextQuestion(){
       
    
        var randomNumber = Math.floor(Math.random() * questions.length);
        
        questions[randomNumber].displayQuestion();
        
        var answer = prompt('Please select the correct answer.');
        
        if(answer !== 'exit'){
            questions[randomNumber].checkAnswer(parseInt(answer), keepScore);
            nextQuestion()
        }
       
    }
    
    nextQuestion();
    
})();

/*
// Iyad solution


var score = 0;
var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;

    this.showQuestion = function (){
        console.log(this.question);
        for(var i = 0; i < answers.length; i++){
            console.log( i + ': ' + answers[i]);
        }
        var correctAnswerNumber = prompt('Please select the correct answer (type the number).');

        if(correctAnswerNumber == 'exit'){
            console.log('Thank you!')
        }else if(correctAnswerNumber == this.correctAnswer){
            console.log('Nice job!')
            score++;
            console.log('Your score is ' + score);
            showRandom();
        }else{
            console.log('Wrong answer!')
            if(score === 0){

            }else{
                score--;
            }
            
            console.log('Your score is ' + score);
            showRandom()
        }
    }
}

showRandom();

function showRandom(){
    var firstQuestion = new Question('How old is John?', [30,40], 0);
    var secondQuestion = new Question('What is the instructor name?', ['John','Jonas','Mary'], 1);
    var thirdQuestion = new Question('JavaScript is cool?', ['Yes','No'], 0);

    var arrayOfQuestions = [firstQuestion, secondQuestion, thirdQuestion];
    
    var randomNumber = Math.floor(Math.random() * 3 )
    arrayOfQuestions[randomNumber].showQuestion();
}
*/




