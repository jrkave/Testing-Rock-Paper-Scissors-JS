const Game = require('../src/game');

describe('Testing constructor and initial state', () => {
    test('Game initializes with correct default values', () => {
        const game = new Game();
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('');
        expect(game.currLeader).toBe('');
        expect(game.moves['player']).toBe('');
        expect(game.moves['player']).toBe('');
    });

    test('Game initializes correctly using provided arguments', () => {
        const moves = {'player': 'rock', 'computer': 'paper'}
        const game = new Game(5, 2, 1, 'player', 'player', moves);
        expect(game.playerScore).toBe(5);
        expect(game.computerScore).toBe(2);
        expect(game.ties).toBe(1);
        expect(game.prevWinner).toBe('player');
        expect(game.currLeader).toBe('player');
        expect(game.moves['player']).toBe('rock');
        expect(game.moves['computer']).toBe('paper');
    })

    test('getState() returns initial game state accurately', () => {
        const game = new Game();
        const state = game.getState();
        expect(state.playerScore).toBe(0);
        expect(state.computerScore).toBe(0);
        expect(state.ties).toBe(0);
        expect(state.prevWinner).toBe('');
        expect(state.currLeader).toBe('');
        expect(state.moves['player']).toBe('');
        expect(state.moves['computer']).toBe('');
    });
});

describe('Ensuring random computer move is generated correctly', () => {
    test('getRandomMove() always returns a valid computer move', () => {
        const game = new Game();
        const moves = ['rock', 'paper', 'scissors'];
        let value = '';
        for (let i = 0; i < 10; i++) {
            value = game.getRandomMove();
            expect(moves).toContain(value);
        }
    });

    test('determineMove() correctly maps a numerical value to a valid move', () => {
        const game = new Game();
        expect(game.determineMove(0)).toBe('rock');
        expect(game.determineMove(1)).toBe('paper');
        expect(game.determineMove(2)).toBe('scissors');
    });

});

describe('Updating Player and Computer moves', () => {
    const game = new Game();

    test('Player plays rock, Computer plays paper', () => {
        game.updateMoves('rock', 'paper');
        expect(game.moves['player']).toBe('rock');
        expect(game.moves['computer']).toBe('paper');
    });

    test('Player plays scissors, Computer plays rock', () => {
        game.updateMoves('scissors', 'rock');
        expect(game.moves['player']).toBe('scissors');
        expect(game.moves['computer']).toBe('rock');
    });

    test('Player plays paper, Computer plays scissors', () => {
        game.updateMoves('paper', 'scissors');
        expect(game.moves['player']).toBe('paper');
        expect(game.moves['computer']).toBe('scissors');
    });
});

describe('Branch testing to update scores, winner of the last round', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('Player wins with rock against scissors', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('rock', 'scissors');
        expect(game.prevWinner).toBe('player');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
    });

    test('Player loses with rock against paper', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('rock', 'paper');
        expect(game.prevWinner).toBe('computer');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
    });

    test('Player wins with paper against rock', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('paper', 'rock');
        expect(game.prevWinner).toBe('player');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
    });

    test('Player loses with paper against scissors', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('paper', 'scissors');
        expect(game.prevWinner).toBe('computer');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
    });

    test('Player wins with scissors against paper', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('scissors', 'paper');
        expect(game.prevWinner).toBe('player');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
    });

    test('Player loses with scissors against rock', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('scissors', 'rock');
        expect(game.prevWinner).toBe('computer');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
    });

    test('Player ties with Computer using paper', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('paper', 'paper');
        expect(game.prevWinner).toBe('tie');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
    });

    test('Player ties with Computer using rock', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('rock', 'rock');
        expect(game.prevWinner).toBe('tie');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
    });

    test('Player ties with Computer using scissors', () => {
        expect(game.prevWinner).toBe('');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        game.updateScoresAndWinner('scissors', 'scissors');
        expect(game.prevWinner).toBe('tie');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
    });
});

describe('Updating the current leader of the game', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('Player wins with rock against scissors', () => {
        expect(game.currLeader).toBe('');
        game.playGame('rock', 'scissors');
        expect(game.currLeader).toBe('player');
    });

    test('Player wins with paper against rock', () => {
        expect(game.currLeader).toBe('');
        game.playGame('paper', 'rock');
        expect(game.currLeader).toBe('player');
    });

    test('Player loses with paper against scissors', () => {
        expect(game.currLeader).toBe('');
        game.playGame('paper', 'scissors');
        expect(game.currLeader).toBe('computer');
    });
    
    test('Player ties with rock against rock', () => {
        expect(game.currLeader).toBe('');
        game.playGame('rock', 'rock');
        expect(game.currLeader).toBe('tie');
    });

    test('Player takes the lead over Computer', () => {
        game.playGame('paper', 'scissors'); // Player loses
        expect(game.currLeader).toBe('computer');
        game.playGame('paper', 'rock'); // Player wins to tie the game
        expect(game.currLeader).toBe('tie');
        game.playGame('paper', 'rock'); // Player wins again to take the lead
        expect(game.currLeader).toBe('player');
    });

    test('Computer takes the lead over Player', () => {
        game.playGame('rock', 'scissors'); // Computer loses
        expect(game.currLeader).toBe('player');
        game.playGame('scissors', 'rock'); // Computer wins to tie the game
        expect(game.currLeader).toBe('tie');
        game.playGame('scissors', 'rock'); // Computer wins again to take the lead
        expect(game.currLeader).toBe('computer');
    });
});

describe('Testing Game logic for Rock equivalence class', () => {
    // Testing Rock Equivalence Class 
    test('Player wins with rock against scissors', () => {
        const game = new Game();
        game.playGame('rock', 'scissors');
        expect(game.moves['player']).toBe('rock');
        expect(game.moves['computer']).toBe('scissors');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('player');
        expect(game.currLeader).toBe('player');
    });

    test('Player loses with rock against paper', () => {
        const game = new Game();
        game.playGame('rock', 'paper');
        expect(game.moves['player']).toBe('rock');
        expect(game.moves['computer']).toBe('paper');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('computer');
        expect(game.currLeader).toBe('computer');
    });

    test('Game ties with rock against rock', () => {
        const game = new Game();
        game.playGame('rock', 'rock');
        expect(game.moves['player']).toBe('rock');
        expect(game.moves['computer']).toBe('rock');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(1);
        expect(game.prevWinner).toBe('tie');
        expect(game.currLeader).toBe('tie');
    });
});

describe('Testing Game logic for Scissors equivalence class', () => {
    test('Player wins with scissors against paper', () => {
        const game = new Game();
        game.playGame('scissors', 'paper');
        expect(game.moves['player']).toBe('scissors');
        expect(game.moves['computer']).toBe('paper');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('player');
        expect(game.currLeader).toBe('player');
    });

    test('Player loses with scissors against rock', () => {
        const game = new Game();
        game.playGame('scissors', 'rock');
        expect(game.moves['player']).toBe('scissors');
        expect(game.moves['computer']).toBe('rock');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('computer');
        expect(game.currLeader).toBe('computer');
    });

    test('Game ties with scissors against scissors', () => {
        const game = new Game();
        game.playGame('scissors', 'scissors');
        expect(game.moves['player']).toBe('scissors');
        expect(game.moves['computer']).toBe('scissors');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(1);
        expect(game.prevWinner).toBe('tie');
        expect(game.currLeader).toBe('tie');
    });
});

describe('Testing Game logic for Paper equivalence class', () => {
    test('Player wins with paper against rock', () => {
        const game = new Game();
        game.playGame('paper', 'rock');
        expect(game.moves['player']).toBe('paper');
        expect(game.moves['computer']).toBe('rock');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('player');
        expect(game.currLeader).toBe('player');
    });

    test('Player loses with paper against scissors', () => {
        const game = new Game();
        game.playGame('paper', 'scissors');
        expect(game.moves['player']).toBe('paper');
        expect(game.moves['computer']).toBe('scissors');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('computer');
        expect(game.currLeader).toBe('computer');
    });

    test('Game ties with paper against paper', () => {
        const game = new Game();
        game.playGame('paper', 'paper');
        expect(game.moves['player']).toBe('paper');
        expect(game.moves['computer']).toBe('paper');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(1);
        expect(game.prevWinner).toBe('tie');
        expect(game.currLeader).toBe('tie');
    });
});

describe('Testing driver of game to ensure correct integration with update functions', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('Player wins with rock against scissors', () => {
        game.playGame('rock', 'scissors');
        expect(game.playerScore).toBe(1);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('player');
        expect(game.currLeader).toBe('player');
    });

    test('Computer wins with paper against rock', () => {
        game.playGame('rock', 'paper');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(1);
        expect(game.ties).toBe(0);
        expect(game.prevWinner).toBe('computer');
        expect(game.currLeader).toBe('computer');
    });

    test('Game ties with rock against rock', () => {
        game.playGame('rock', 'rock');
        expect(game.playerScore).toBe(0);
        expect(game.computerScore).toBe(0);
        expect(game.ties).toBe(1);
        expect(game.prevWinner).toBe('tie');
        expect(game.currLeader).toBe('tie');
    });
});
