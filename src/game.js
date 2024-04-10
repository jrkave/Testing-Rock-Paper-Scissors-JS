class Game {
    constructor(playerScore=0, computerScore=0, ties=0, prevWinner='', currLeader='', moves={'player':'', 'computer':''}) {
        this.playerScore = playerScore;
        this.computerScore = computerScore;
        this.ties = ties;
        this.prevWinner = prevWinner;
        this.currLeader = currLeader;
        this.moves = moves;
    }

    // Generates random value corresponding to computer's move
    getRandomMove() {
        return this.determineMove(Math.floor(Math.random() * 3));
    }

    // Maps numerical value of computer move to 'rock', 'paper', 'scissors'
    determineMove(num) {
        if (num === 0) {
            return 'rock';
        } else if (num === 1) {
            return 'paper';
        } else {
            return 'scissors'
        }
    }

    updateMoves(playerMove, computerMove) {
        this.moves['player'] = playerMove;
        this.moves['computer'] = computerMove;
    }

    updateLeader() {
        if (this.playerScore === this.computerScore) {
            this.currLeader = 'tie';
        } else if (this.playerScore > this.computerScore) {
            this.currLeader = 'player';
        } else {
            this.currLeader = 'computer';
        }
    }

    updateScoresAndWinner(playerMove, computerMove) {
        // Tie
        if (playerMove === computerMove) {
            this.ties += 1;
            this.prevWinner = 'tie';
        }
        // Player played rock
        else if (playerMove === 'rock') {
            // Computer played scissors
            if (computerMove === 'scissors') {
                this.playerScore += 1;
                this.prevWinner = 'player';
            }
            // Computer played paper
            else {
                this.computerScore += 1;
                this.prevWinner = 'computer';
            }
        }
        // Player played paper
        else if (playerMove === 'paper') {
            // Computer played scissors
            if (computerMove === 'scissors') {
                this.computerScore += 1;
                this.prevWinner = 'computer';
            }
            // Computer played rock
            else {
                this.playerScore += 1;
                this.prevWinner = 'player';
            }
        } 
        // Player played scissors
        else {
            // Computer played paper
            if (computerMove === 'paper') {
                this.playerScore += 1;
                this.prevWinner = 'player';
            }
            // Computer played rock
            else {
                this.computerScore += 1;
                this.prevWinner = 'computer';
            }
        }
    }

    // Updates game instance variables
    playGame(playerMove, computerMove) {
        this.updateMoves(playerMove, computerMove);
        this.updateScoresAndWinner(playerMove, computerMove);
        this.updateLeader();
    }

    // Returns game's current state
    getState() {
        return {
            playerScore: this.playerScore,
            computerScore: this.computerScore,
            ties: this.ties,
            prevWinner: this.prevWinner,
            currLeader: this.currLeader,
            moves: this.moves
        };
    }
}

module.exports = Game;