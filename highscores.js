var highscoreArr = JSON.parse(localStorage.getItem("highscores"));
var initialsArr = JSON.parse(localStorage.getItem("initials"));


for(i=0;i<highscoreArr.length; i++){
    var listArr = document.createElement("li")
    listArr.textContent = initialsArr[i] + " - " + highscoreArr[i]
    document.querySelector("ul").appendChild(listArr)
    document.querySelector("ul").appendChild(listArr)
}

