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
var playGame = document.querySelector(".play-game")
var questionCounter = 0;
var quizScore = 0;
var userAnswer = "";

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
    //removes the descriptor already in main
    document.querySelector("#game-description").remove()    
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
    }
    var answerButton = document.querySelector("main")
    answerButton.addEventListener("click", function(event){
        userAnswer = event.target
        if(userAnswer === "button"){
            checkAnswers()
        }
    })
}

function checkAnswers(){
    var correct = myQuestions[questionCounter].correctAnswer

    if(userAnswer.value === correct){
        questionCounter++
        console.log(questionCounter)
    }
}

//function to start game when play button is clicked
function init(){
    buildQuiz()
}

