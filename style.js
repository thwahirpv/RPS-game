const finWinSound = document.getElementById('finWinSound')
const finFailSound = document.getElementById('finFailSound')
const failSound = document.getElementById('failSound')
const winSound = document.getElementById('winSound')
const whoWin = document.getElementById('whoWin')
const starOne = document.getElementById('starOne')
const starTwo = document.getElementById('starTwo')
const starThree = document.getElementById('starThree')
const gameCav = document.getElementById('gameCav')
const gameStartScreen = document.getElementById('gameStart')
const gameOverScreen = document.getElementById('gameOver') 
const computerScoreScreen = document.getElementById('computerScoreScreen')
const playerScoreScreen = document.getElementById('playerScoreScreeen')
const scoreDiv = document.getElementById('result')
const vsDiv = document.getElementById('verses')
const secScoreDiv = document.getElementById('player')
const audioDiv = document.getElementById('audio')

const totalScore = {playerScore : 0, computerScore : 0,
     playerScoreSection : 0, computerScoreSection : 0}

function getComputerChoice() {
    const computerChoice = ['Rock', 'Paper', 'Scissor']
    const randomNumber = Math.floor(Math.random() * computerChoice.length)
    return computerChoice[randomNumber]
}
console.log(getComputerChoice())


function getScore(playerChoiced, computerChoiced) {
    score = 0;

    if(playerChoiced === computerChoiced){
        score = 0
    }
    else if(playerChoiced === 'Rock' && computerChoiced === 'Scissor'){
        score = 1
    }
    else if(playerChoiced === 'Scissor' && computerChoiced === 'Paper'){
        score = 1
    }
    else if(playerChoiced === 'Paper' && computerChoiced === 'Rock'){
        score = 1
    }
    else{
        score = -1
    }
    return score
}


function getPlayerChoice() {
    const playerChoices = document.querySelectorAll('.rpsBtn')

        playerChoices.forEach(playerChoice => {
            playerChoice.onclick = () => rpsOnclick(playerChoice.value)
        })  
}
getPlayerChoice()


function rpsOnclick(playerChoiced) {
    console.log({playerChoiced})
    const computerChoiced = getComputerChoice()
    console.log({computerChoiced})
    const score = getScore(playerChoiced, computerChoiced)
    console.log({score})
    totalScore['playerScore'] += score
    totalScore['computerScore'] += score
    console.log(totalScore['playerScore'])
    getResult(playerChoiced, computerChoiced, score)
}

function getResult(playerChoiced, computerChoiced, score) {
  
    if(score == 0){
        scoreDiv.innerText = ""
        secScoreDiv.innerText = ""
        scoreDiv.innerText = "It's Drew ❗"
        scoreDiv.style.display = "block"
        secScoreDiv.style.display = "none"
}
    
    else if(score == 1) {
        scoreDiv.innerText = 'You Win 🏆'
        winSound.play()
        secScoreDiv.innerText = 'Robot Lose ❌'
        scoreDiv.style.display = "block"
        secScoreDiv.style.display = "block"

        getPlayerScore(score)
}

    else if(score == -1) {
       scoreDiv.innerText = 'Robot Win 🏆'
       failSound.play()
       secScoreDiv.innerText = 'You Lose ❌'
       scoreDiv.style.display = "block"
       secScoreDiv.style.display = "block"

       getPlayerScore(score)
    }

    vsDiv.innerText = `👨 ${playerChoiced} / VS / 🤖 ${computerChoiced}`
    vsDiv.style.display = "block"

    const gameReset = document.getElementById('game-clear')
    gameReset.onclick = () => gameClear(totalScore, scoreDiv, vsDiv, secScoreDiv)
}

function gameClear(totalScore, scoreDiv, vsDiv, secScoreDiv, computerDiv){
    secScoreDiv.innerText = ''
    scoreDiv.innerText = ''
    vsDiv.innerText = ''
    scoreDiv.style.display = "none"
    secScoreDiv.style.display = "none"
    vsDiv.style.display = "none"
    audioDiv.style.display = "none"
    totalScore['playerScoreSection'] = 0
    totalScore['computerScoreSection'] = 0
    playerScoreScreen.innerText = totalScore['playerScoreSection'] = 0 
    computerScoreScreen.innerText = totalScore['computerScoreSection'] = 0
}

function getPlayerScore(score) {
    if(score == 1){
        totalScore['playerScoreSection'] += score 
        playerScoreScreen.innerText =  totalScore['playerScoreSection']

            if( totalScore['playerScoreSection'] == 20){
                restartGame()
            }

    }

    else if(score == -1) {
        totalScore['computerScoreSection'] += 1
        computerScoreScreen.innerText = totalScore['computerScoreSection']

            if(totalScore['computerScoreSection'] == 20) {
                restartGame()
            }
    }
   
}

function startGame() {
    gameStartScreen.style.display = "none"
    gameCav.style.display = "block"
} 

 function restartGame() {
    gameOverScreen.style.position = "absolute"
     gameOverScreen.style.zIndex = "1"
     gameOverScreen.style.display = "flex"

     if(totalScore['playerScoreSection'] == 20){
        whoWin.innerText = "YOU WIN"
        whoWin.style.color = "green"
        finWinSound.play()


        if(totalScore['computerScoreSection'] <= 12) {
             starOne.innerText = '⭐'
             starTwo.innerText = '⭐'
             starThree.innerText = '⭐'
        }
        else if(totalScore['computerScoreSection'] > 12 &&  totalScore['computerScoreSection'] <= 16){
             starOne.innerText = '⭐'
             starThree.innerText = '⭐'
         }
         else if(totalScore['computerScoreSection'] > 16 && totalScore['computerScoreSection'] < 19){
             starTwo.innerText = '⭐'
        }
     }

    else{
         whoWin.innerText = 'YOU FAIL'
         whoWin.style.color = "red"
         starOne.innerText = '❌'
         starTwo.innerText = '❌'
         starThree.innerText = '❌'
         finFailSound.play()
    }
}

function playAgain() {
    gameCav.style.display = "flex"
    gameOverScreen.style.display = "block"

}

