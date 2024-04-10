const Game = require('../src/game');
const HTMLUpdater = require('../src/htmlupdater');

describe('Function that returns a string explaining the logic of the game', () => {
    const updater = new HTMLUpdater();

    test('Rock beats scissors', () => {
        expect(updater.determineLogicString('rock', 'scissors')).toBe('Rock beats Scissors!');
        expect(updater.determineLogicString('scissors', 'rock')).toBe("Rock beats Scissors!");
    });

    test('Paper beats rock', () => {
        expect(updater.determineLogicString('paper', 'rock')).toBe('Paper beats Rock!');
        expect(updater.determineLogicString('rock', 'paper')).toBe("Paper beats Rock!");
    });

    test('Scissors beats paper', () => {
        expect(updater.determineLogicString('scissors', 'paper')).toBe('Scissors beats Paper!');
        expect(updater.determineLogicString('paper', 'scissors')).toBe("Scissors beats Paper!");
    });

    test('Tie with rock', () => {
        expect(updater.determineLogicString('rock', 'rock')).toBe("It's a tie!");
    });

    test('Tie with paper', () => {
        expect(updater.determineLogicString('paper', 'paper')).toBe("It's a tie!");
    });

    test('Tie with scissors', () => {
        expect(updater.determineLogicString('scissors', 'scissors')).toBe("It's a tie!");
    });
});

describe('Function that returns a string containing the current leader of the game', () => {
    const updater = new HTMLUpdater();

    test('Current leader is Player', () => {
        expect(updater.determineLeaderString('player')).toBe("You're in the lead!");
    });

    test('Current leader is Computer', () => {
        expect(updater.determineLeaderString('computer')).toBe('The computer is in the lead!');
    });

    test('Current leader is no one (tie game)', () => {
        expect(updater.determineLeaderString('tie')).toBe('Tie game!');
    });
});

describe('Function that returns an object containing variables to be inserted into the DOM', () => {
    const updater = new HTMLUpdater();

    test('Rock and paper were played, and the Player is in the lead', () => {
        const game = new Game(5, 2, 1, 'computer', 'player', {'player':'rock', 'computer':'paper'});
        obj = updater.getGameStatusUpdates(game);
        expect(obj.playerScore).toBe(5);
        expect(obj.computerScore).toBe(2);
        expect(obj.ties).toBe(1);
        expect(obj.logic).toBe('Paper beats Rock!');
        expect(obj.currLeader).toBe("You're in the lead!");
        expect(obj.playerMove).toBe('rock');
        expect(obj.computerMove).toBe('paper');
        expect(obj.prevWinner).toBe('computer');
    });

    test('Scissors and paper were played, and it is a tie game', () => {
        const game = new Game(2, 2, 1, 'computer', 'tie', {'player':'paper', 'computer':'scissors'});
        obj = updater.getGameStatusUpdates(game);
        expect(obj.playerScore).toBe(2);
        expect(obj.computerScore).toBe(2);
        expect(obj.ties).toBe(1);
        expect(obj.logic).toBe('Scissors beats Paper!');
        expect(obj.currLeader).toBe("Tie game!");
        expect(obj.playerMove).toBe('paper');
        expect(obj.computerMove).toBe('scissors');
        expect(obj.prevWinner).toBe('computer');
    });

    test('Rock and Rock were played, and the Computer is in the lead', () => {
        const game = new Game(2, 3, 1, 'tie', 'computer', {'player':'rock', 'computer':'rock'});
        obj = updater.getGameStatusUpdates(game);
        expect(obj.playerScore).toBe(2);
        expect(obj.computerScore).toBe(3);
        expect(obj.ties).toBe(1);
        expect(obj.logic).toBe("It's a tie!");
        expect(obj.currLeader).toBe("The computer is in the lead!");
        expect(obj.playerMove).toBe('rock');
        expect(obj.computerMove).toBe('rock');
        expect(obj.prevWinner).toBe('tie');
    });
});