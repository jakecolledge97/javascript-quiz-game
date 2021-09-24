//list of questions for the game
var myQuestions = [{
    question: "What file type is JavaScript?",
    answers: {
        a: ".js",
        b: ".html",
        c: ".css"
    },
    correctAnswer: "a"
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
var questionCounter = 0;
var quizScore = 0;

document.querySelector(".play-game").addEventListener("click", init)

//function that builds the quiz
function buildQuiz(){
    askQuestions()
    askAnswers()         
}

//function to display questions
function askQuestions(){
    var currentQuestion = myQuestions[0].question

    //creates an html element to contain the question
    var askQuestion = document.createElement("p")

    //removes the descriptor already in main
    document.querySelector("#game-description").remove()
    
    //adds the question to the page
    askQuestion.textContent = currentQuestion
    document.querySelector("main").append(askQuestion)
}

//funtions to display answers
function askAnswers(){
    //creates the answer buttons
    var answerListArr = Object.values(myQuestions[0].answers)//turns myQuestions answers into an array
    
    //number of buttons decided by length of answers object
    for(i=0; i < answerListArr.length; i++){
        var listAnswers = document.createElement("button")
        listAnswers.textContent = answerListArr[i]
        document.querySelector("main").append(listAnswers) 
    }
}

function init(){
    buildQuiz()
}