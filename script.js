//list of questions for the game
var myQuestions = [{
    question: "What file type is JavaScript?",
    answers: {
        a: ".js",
        b: ".html",
        c: ".css"
    },
    correctAnswer: ".js"
},
{
    question: "Which of the following is a valid JavaScript term",
    answers: {
        a:"Variable",
        b:"Constant",
        c:"function",
        d:"All of the above"
    },
    correctAnswer: "All of the above"
},
{
    question: "Which of the following function of Number object returns a string value version of the current number?",
    answers: {
        a:"toString()",
        b:"toFixed()",
        c:"toLocaleString()",
        d:"toPrecision()"
    },
    correctAnswer: "toString()"
},
{
    question: "Which of the following function of String object returns the calling string value converted to lower case?",
    answers: {
        a:"toLocaleLowerCase()",
        b:"toLowerCase()",
        c:"toString()",
        d:"substring()"
    },
    correctAnswer: "toLowerCase()"
},
{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
        a:"<javascript>",
        b:"<js>",
        c:"<script>",
        d:"<code>"
    },
    correctAnswer: "<script>"
}]
var playGame = document.querySelector(".play-game")
var timerEl = document.querySelector(".time")
var timeLeft = 600;
var questionsAmount = myQuestions.length;
var questionCounter = 0;
var quizScore = 0;
var userAnswer;

playGame.addEventListener("click", init)


//function that builds the quiz
function buildQuiz(){
    askQuestions()
    askAnswers()         
}

//function to display questions
function askQuestions(){

    var currentQuestion = myQuestions[questionCounter].question
    //creates an html element to contain the question
    var askQuestion = document.createElement("p")
    //removes the descriptor already in main if its there
    if(questionCounter === 0){
        document.querySelector("#game-description").remove()  
    }else if(questionCounter > 0){
        //removes the previous question
        document.querySelector("main p").remove()
        //removes previous answers button
        var arr = document.querySelectorAll("main button")
        arr.forEach(element => element.remove())
    }
    //adds the question to the page
    askQuestion.textContent = currentQuestion
    document.querySelector("main").append(askQuestion)
    
}

//funtion to display answers
function askAnswers(){
    //creates the answer buttons
    var answerListArr = Object.values(myQuestions[questionCounter].answers)//turns myQuestions answers into an array
    
    //number of buttons decided by length of answers object
    for(i=0; i < answerListArr.length; i++){
        var listAnswers = document.createElement("button")
        listAnswers.textContent = answerListArr[i]
        document.querySelector("main").append(listAnswers) 
        listAnswers.addEventListener("click", function(event){
            var element = event.target;
            userAnswer = element.textContent
            checkAnswers()
        })        
    }
     
}
//function to check answers when clicks and build the next questions
function checkAnswers(){
    //checks if game is over
    var correct = myQuestions[questionCounter].correctAnswer
    if(userAnswer === correct){
        questionCounter++
        quizScore++
        //checks if all questions have been asked
        if(questionCounter === questionsAmount){
            gameOver()
        }        
        buildQuiz()
    }else{
        questionCounter++
        timeLeft = timeLeft-50
        //checks if all questions have been asked
        if(questionCounter === questionsAmount){
            gameOver()
        }  
        buildQuiz()
    }
    
}
//function that starts a countdown when play game button is clicked
function countdown(){

    var timeInterval = setInterval(function() {
        if(questionsAmount === questionCounter){
            clearInterval(timeInterval)
        }
        if(timeLeft < 1){
            timeLeft--
            gameOver()
            clearInterval(timeInterval)
        }else{
            timerEl.textContent = timeLeft
            timeLeft--
        }
    }, 100);
}
//function finish game
function gameOver(){
    //removes the previous question
    document.querySelector("main p").remove()
    //removes previous answers button
    var arr = document.querySelectorAll("main button")
    arr.forEach(element => element.remove())

    var userScore = document.createElement("p")
    if(questionCounter === questionsAmount){
        userScore.textContent = "Congrats you have finished the quiz. \bYou finished with a score of " + quizScore;
        document.querySelector("main").append(userScore)
    }else{
        userScore.textContent = "Game over, unfortunately you didn't finish the quiz. Your score is " + quizScore;
        document.querySelector("main").append(userScore)
    }
    return
}
//function to start game when play button is clicked
function init(){
    document.querySelector("button").disabled = true; 
    countdown()
    buildQuiz()
}

