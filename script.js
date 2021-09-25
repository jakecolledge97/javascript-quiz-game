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
    correctAnswer: "d"
}]
var playGame = document.querySelector(".play-game")
var timerEl = document.querySelector(".time")
var timeLeft = 60;
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
    var correct = myQuestions[questionCounter].correctAnswer
    console.log(correct)
    if(userAnswer === correct){
        questionCounter++
        quizScore++
    }else{
        questionCounter++
    }
    buildQuiz()
}
function countdown(){
    var timeInterval = setInterval(function() {
        if(timeLeft < 1){
            gameOver()
            clearInterval(timeInterval)
        }
    })
}

//function to start game when play button is clicked
function init(){
    buildQuiz()
}

