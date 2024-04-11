const GameRunner = require('../src/play');
const Game = require('../src/game');
const HTMLUpdater = require('../src/htmlupdater');

describe('GameRunner DOM is updated with correct content', () => {
  let game;
  let updater;
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
    updater = new HTMLUpdater();
    gameRunner = new GameRunner(game, updater);
  });

  test('Calls applyContentChangesToDOM', () => {
    const obj = {};
    const contentSpy = jest.spyOn(gameRunner, 'applyContentChangesToDOM');
    gameRunner.applyContentChangesToDOM(obj);
    expect(contentSpy).toHaveBeenCalled();
  });

  test('Calls applyContentChangesToDOM when button is clicked', () => {
    // Set up spies
    const gameSpy = jest.spyOn(game, 'playGame');
    const updaterSpy = jest.spyOn(updater, 'getGameStatusUpdates');
    const contentSpy = jest.spyOn(gameRunner, 'applyContentChangesToDOM');

    const button = document.getElementById('rock');
    button.click();

    expect(gameSpy).toHaveBeenCalled();
    expect(updaterSpy).toHaveBeenCalled();
    expect(contentSpy).toHaveBeenCalled();
  });

  test('applyContentChangesToDOM updates DOM correctly', () => {
    const obj = {
      playerScore: 1,
      computerScore: 0,
      ties: 0,
      logic: "Paper beats Rock!",
      currLeader: "You're in the lead!", 
      playerMove: 'paper',
      computerMove: 'rock',
      prevWinner: 'player'
    };
    gameRunner.applyContentChangesToDOM(obj);

    expect(document.getElementById('player-score').textContent).toBe('1');
    expect(document.getElementById('computer-score').textContent).toBe('0');
    expect(document.getElementById('num-ties').textContent).toBe('0');
    expect(document.getElementById('logic').textContent).toBe('Paper beats Rock!');
    expect(document.getElementById('curr-leader').textContent).toBe("You're in the lead!");
    expect(document.getElementById('player-move').textContent).toBe('paper');
    expect(document.getElementById('computer-move').textContent).toBe('rock');
  });

  test('Calls applyColorChangesToDOM', () => {
    const colorSpy = jest.spyOn(gameRunner, 'applyColorChangesToDOM');
    gameRunner.applyColorChangesToDOM();
    expect(colorSpy).toHaveBeenCalled();
  });

  test('Calls applyColorChangesToDOM when button is clicked', () => {
    const button = document.getElementById('scissors');
    const colorSpy = jest.spyOn(gameRunner, 'applyColorChangesToDOM');
    button.click();
    expect(colorSpy).toHaveBeenCalled();
  });

  test('applyColorChangesToDOM updates DOM correctly', () => {
    gameRunner = new GameRunner(new Game(2, 4, 1, 'computer', 'computer', {'player': 'paper', 'computer':'scissors'}), new HTMLUpdater());
    const spy = jest.spyOn(gameRunner, 'applyColorChangesToDOM');
    gameRunner.handleButtonClick('rock', 'paper');
    
    expect(document.getElementById('player-score').style.color).toBe('black');
    expect(document.getElementById('computer-score').style.color).toBe('red');
    expect(document.getElementById('player-move').style.color).toBe('black');
    expect(document.getElementById('computer-move').style.color).toBe('red');
  });
});

describe('Buttons and corresponding event listeners are set up properly', () => {
  let gameRunner;
  
  beforeEach(() => {
    gameRunner = new GameRunner(new Game(), new HTMLUpdater());
  });

  afterEach(() => {
    jest.clearAllMocks(); 
    jest.restoreAllMocks(); 
  });
  
  test('setupButtonListeners is called once upon GameRunner instantiation', () => {
    const spy = jest.spyOn(GameRunner.prototype, 'setupButtonListeners');
    gameRunner = new GameRunner(new Game(), new HTMLUpdater());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('handleButtonClick is called correctly upon clicks, using button.id', () => {
    const spy = jest.spyOn(gameRunner, 'handleButtonClick');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
      button.click();
    });

    expect(spy).toHaveBeenCalledTimes(3);
    buttons.forEach(button => {
      expect(spy).toHaveBeenCalledWith(button.id);
    });
  });
});
