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
var saveHighscore = document.querySelector(".highscore-form")
var userInitials = saveHighscore.querySelector("#initials")
var timeLeft = 30;
var stopTimer = 0;
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
        document.querySelector("#game-description").style.display = "none"
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
        //checks if all questions have been asked  
        if(questionCounter === 4){
            quizScore++
            stopTimer = 5
            gameOver()
            return
        }else{
            questionCounter++
        }
        quizScore++    
        buildQuiz()
    }else{
        //checks if all questions have been asked
        if(questionCounter === 4){
            stopTimer = 5
            gameOver()
            return
        }else{
            questionCounter++
        }
        timeLeft = timeLeft-5
         
        buildQuiz()
    }
    
}
//function that starts a countdown when play game button is clicked
function countdown(){

    var timeInterval = setInterval(function() {
        if(stopTimer === questionsAmount){
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
    }, 1000);
}
//function finish game
function gameOver(){
    document.querySelector("button").disabled = false; 
    playGame.removeEventListener("click" , init)
    playGame.addEventListener("click", resetGame)
    userInitials.value = ""
    saveHighscore.addEventListener("submit", saveScore)
    playGame.textContent = "Restart"

    document.querySelector(".highscore-form").style.display = "flex"
    
    //removes the previous question
    document.querySelector("main p").remove()
    //removes previous answers button
    var arr = document.querySelectorAll("main button")
    arr.forEach(element => element.remove())

    var userScore = document.createElement("p")
    if(questionCounter === questionsAmount-1){
        userScore.textContent = "Congrats you have finished the quiz. \nYou finished with a score of " + quizScore;
        document.querySelector("main").append(userScore)
    }else{
        userScore.textContent = "Game over, unfortunately you didn't finish the quiz. Your score is " + quizScore;
        document.querySelector("main").append(userScore)
    }

    return
}
//function to save initials and score to local storage
function saveScore(event){
    event.preventDefault()
    //check if user has entered initials
    var userInitials = saveHighscore.querySelector("#initials").value
    if(userInitials === "" || userInitials.length > 2){
        alert("you must enter your initials! eg. JC")
        return
    }
    document.querySelector(".highscore-form").style.display = "none"
    
    
    
    var initialsArr = [];
    var scoresArr = [];
    initialsArr = JSON.parse(localStorage.getItem("initials"));
    scoresArr = JSON.parse(localStorage.getItem("highscores"));
    if(initialsArr == null && scoresArr == null){
        initialsArr = [userInitials];
        scoresArr = [quizScore];
    }else{
        initialsArr.push(userInitials)
        scoresArr.push(quizScore)
    }
    

    
    localStorage.setItem("initials", JSON.stringify(initialsArr));
    localStorage.setItem("highscores", JSON.stringify(scoresArr));  
    
    document.querySelector(".highscore-link").style.display = "flex"

    userInitials.value = ""
}
function resetGame(){
    timeLeft = 30;
    stopTimer = 0;
    questionCounter = 0;
    quizScore = 0;
    timerEl.textContent="Time"
    document.querySelector(".highscore-form").style.display = "none"
    document.querySelector(".highscore-link").style.display = "none"

    //yes this is a dumb way to reset but I was too far gone to care
    playGame.textContent = "Play Game"
    playGame.removeEventListener("click" , resetGame)
    playGame.addEventListener("click", init)
    document.querySelector("main p").remove()
    document.querySelector("#game-description").style.display = "inline-block"


}
//function to start game when play button is clicked
function init(){
    document.querySelector("button").disabled = true; 
    countdown()
    buildQuiz()
}

