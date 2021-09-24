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

//function that builds the quiz
function buildQuiz(){
    //creates an html element to contain the question
    var askQuestion = document.createElement("p.quiz-question")

    //removes the descriptor already in main
    document.querySelector("#game-description").remove()
    
    //adds the question to the page
    askQuestion.textContent = myQuestions[0].question
    document.querySelector("main").append(askQuestion)    

    //creates the answers list for the game
    var listAnswers = document.createElement("p.quiz-answers")
    listAnswers.textContent = myQuestions[0].answers
    document.querySelector("main").append(listAnswers) 


}





function init(){

}