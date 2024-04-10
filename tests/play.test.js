// Mock Game module
jest.mock('../src/game', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getRandomMove: () => 'scissors',
      playGame: jest.fn(),
      prevWinner: 'player',
      currLeader: 'player',
      getState: () => ({})
    };
  });
});

// Mock HTMLUpdater module
jest.mock('../src/htmlupdater', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getGameStatusUpdates: jest.fn(() => ({
        playerScore: 1,
        computerScore: 0,
        ties: 0,
        logic: "Rock beats Scissors!",
        currLeader: "You're in the lead!",
        playerMove: 'rock',
        computerMove: 'scissors',
        prevWinner: 'player',
      }))
    };
  });
});

const GameRunner = require('../src/play');
const Game = require('../src/game');
const HTMLUpdater = require('../src/htmlupdater');

describe('GameRunner DOM is updated with correct styles and colors', () => {
  let game;
  let htmlUpdater;
  let gameRunner;
  
  beforeEach(() => {

    document.body.innerHTML = `
      <div id="player-move"></div>
      <div id="computer-move"></div>
      <div id="player-score"></div>
      <div id="computer-score"></div>
      <div id="num-ties"></div>
      <div id="logic"></div>
      <div id="curr-leader"></div>
      <button id="rock">Rock</button>
      <button id="paper">Paper</button>
      <button id="scissors">Scissors</button>
    `;

    game = new Game();
    htmlUpdater = new HTMLUpdater();
    gameRunner = new GameRunner(game, htmlUpdater);
    //jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears usage data of all mocks
    jest.restoreAllMocks(); // Restores the original implementations
  });
  

  test('Updates DOM text content correctly on button click', () => {
    const rockButton = document.getElementById('rock');
    rockButton.click();

    expect(document.getElementById('player-move').textContent).toBe('rock');
    expect(document.getElementById('computer-move').textContent).toBe('scissors');
    expect(document.getElementById('player-score').textContent).toBe('1');
    expect(document.getElementById('computer-score').textContent).toBe('0');
    expect(document.getElementById('num-ties').textContent).toBe('0');
    expect(document.getElementById('logic').textContent).toBe("Rock beats Scissors!");
    expect(document.getElementById('curr-leader').textContent).toBe("You're in the lead!");
  });

  test('Updates DOM text color correctly on button click', () => {
    const rockButton = document.getElementById('rock');
    rockButton.click();

    expect(document.getElementById('player-move').style.color).toBe('red');
    expect(document.getElementById('computer-move').style.color).toBe('black');
    expect(document.getElementById('player-score').style.color).toBe('red');
    expect(document.getElementById('computer-score').style.color).toBe('black');
  });
});

describe('Event listeners are set up properly and functions that apply changes are called when necessary', () => {
  let gameRunner;
  
  beforeEach(() => {
    jest.spyOn(GameRunner.prototype, 'setupButtonListeners');
    gameRunner = new GameRunner(new Game(), new HTMLUpdater());
    jest.spyOn(gameRunner, 'applyColorChangesToDOM');
    jest.spyOn(gameRunner, 'applyContentChangesToDOM');
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears usage data of all mocks
    jest.restoreAllMocks(); // Restores the original implementations
  });
  

  test('setupButtonListeners is called once upon GameRunner instantiation', () => {
    expect(GameRunner.prototype.setupButtonListeners).toHaveBeenCalledTimes(1);
  });

  test('Event listeners are correctly added to buttons', () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });

  test('applyColorChangesToDOM is called on button click', () => {
    const rockButton = document.getElementById('rock');
    rockButton.click();
    expect(gameRunner.applyColorChangesToDOM).toHaveBeenCalledTimes(1);
    rockButton.click();
    expect(gameRunner.applyColorChangesToDOM).toHaveBeenCalledTimes(2);
  });

  test('applyContentChangesToDOM is called on button click', () => {
    const scissorsButton = document.getElementById('scissors');
    scissorsButton.click();
    expect(gameRunner.applyContentChangesToDOM).toHaveBeenCalledTimes(1);
    scissorsButton.click();
    expect(gameRunner.applyContentChangesToDOM).toHaveBeenCalledTimes(2);
  });
});
