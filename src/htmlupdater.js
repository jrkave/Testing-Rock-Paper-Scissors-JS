class HTMLUpdater {
    getGameStatusUpdates(game) {
        return {
            playerScore: game.playerScore,
            computerScore: game.computerScore,
            ties: game.ties,
            logic: this.determineLogicString(game.moves['player'], game.moves['computer']),
            currLeader: this.determineLeaderString(game.currLeader),
            playerMove: game.moves['player'],
            computerMove: game.moves['computer'],
            prevWinner: game.prevWinner,
        };
    }

    determineLogicString(playerMove, computerMove) {
        // Lists possible move combos
        const moveCombo1 = ['rock', 'paper'];
        const moveCombo2 = ['paper', 'scissors'];
        const moveCombo3 = ['rock', 'scissors'];
    
        // Returns string based on combo of moves
        if (playerMove === computerMove) {
            return "It's a tie!";
        } else if (moveCombo1.includes(playerMove) && moveCombo1.includes(computerMove)) {
            return "Paper beats Rock!";
        } else if (moveCombo2.includes(playerMove) && moveCombo2.includes(computerMove)) {
            return "Scissors beats Paper!";
        } else {
            return "Rock beats Scissors!";
        }
    }

    determineLeaderString(currLeader) {
        // console.log('Current leader: ', currLeader);
        if (currLeader === 'tie') {
            return "Tie game!";
        } else if (currLeader === 'player') {
            return "You're in the lead!"
        } else {
            return "The computer is in the lead!"
        }
    }
}

module.exports = HTMLUpdater;