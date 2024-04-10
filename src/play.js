class GameRunner {
    constructor(game, htmlUpdater) {
        this.game = game;
        this.htmlUpdater = htmlUpdater;
        this.setupButtonListeners();
    }

    handleButtonClick(playerMove) {
        const computerMove = this.game.getRandomMove();
        this.game.playGame(playerMove, computerMove);
        const updates = this.htmlUpdater.getGameStatusUpdates(this.game);
        this.applyContentChangesToDOM(updates);
        this.applyColorChangesToDOM();
    }

    setupButtonListeners() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.id));
        });
    }

    applyContentChangesToDOM(updates) {
        document.getElementById('player-move').textContent = updates.playerMove;
        document.getElementById('computer-move').textContent = updates.computerMove;
        document.getElementById('player-score').textContent = updates.playerScore;
        document.getElementById('computer-score').textContent = updates.computerScore;
        document.getElementById('num-ties').textContent = updates.ties;
        document.getElementById('logic').textContent = updates.logic
        document.getElementById('curr-leader').textContent = updates.currLeader;
    }

    applyColorChangesToDOM() {
        // Winner Color
        if (this.game.prevWinner === 'player') {
            document.getElementById('player-move').style.color = 'red';
            document.getElementById('computer-move').style.color = 'black';
        } else if (this.game.prevWinner === 'computer') {
            document.getElementById('computer-move').style.color = 'red';
            document.getElementById('player-move').style.color = 'black';
        } else {
            document.getElementById('computer-move').style.color = 'black';
            document.getElementById('player-move').style.color = 'black';
        }

        // Leading Score Color
        if (this.game.currLeader === 'player') {
            document.getElementById('player-score').style.color = 'red';
            document.getElementById('computer-score').style.color = 'black';
        } else if (this.game.currLeader === 'computer') {
            document.getElementById('computer-score').style.color = 'red';
            document.getElementById('player-score').style.color = 'black';
        } else {
            document.getElementById('player-score').style.color = 'black';
            document.getElementById('computer-score').style.color = 'black';
        }
    }  
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const htmlUpdater = new HTMLUpdater(); 
    const gameRunner = new GameRunner(game, htmlUpdater);
});

module.exports = GameRunner;
