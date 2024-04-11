const {Builder, By, Key, until} = require('selenium-webdriver');

function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'tie';
    } else if (playerMove === 'rock') {
        if (computerMove === 'scissors') {
            return 'player';
        } else {
            return 'computer';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else {
        if (computerMove === 'paper') {
            return 'player';
        } else {
            return 'computer';
        }
    }
}

async function testSelection() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Test Case 2: Choose 'Rock'
        await driver.findElement(By.id('rock')).click();
        let playerMove = await driver.wait(until.elementLocated(By.id('player-move')), 10000).getText();
        if (playerMove.includes('rock')) {
            console.log('Testing Rock Selection: PASSED');
        } else {
            console.error('Testing Rock Selection: FAILED');
        }

        // Test Case 3: Choose 'Paper'
        await driver.findElement(By.id('paper')).click();
        playerMove = await driver.wait(until.elementLocated(By.id('player-move')), 10000).getText();
        if (playerMove.includes('paper')) {
            console.log('Testing Paper Selection: PASSED');
        } else {
            console.error('Testing Paper Selection: FAILED');
        }

        // Test Case 4: Choose "Scissors"
        await driver.findElement(By.id('scissors')).click();
        playerMove = await driver.wait(until.elementLocated(By.id('player-move')), 10000).getText();
        if (playerMove.includes("scissors")) {
            console.log('Testing Scissors Selection: PASSED');
        } else {
            console.error('Testing Scissors Selection: FAILED');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testSelection().catch(console.error);

async function testLogicString() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Test Case 2: Update Logic String
        await driver.findElement(By.id('rock')).click();
        let computerMove = await driver.wait(until.elementLocated(By.id('computer-move')), 10000).getText();
        let logicStr = await driver.wait(until.elementLocated(By.id('logic')), 10000).getText();

        if (((computerMove === 'scissors') && (logicStr === 'Rock beats Scissors!')) 
        || ((computerMove === 'paper') && (logicStr === 'Paper beats Rock!')) 
        || ((computerMove === 'rock') && (logicStr === "It's a tie!"))) {
            console.log('Testing Logic String Update: PASSED');
        } else {
            console.log('Testing Logic String Update: FAILED');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testLogicString().catch(console.error);

async function testLeaderString() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Test Case 2: Update Leader String
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();

        let playerScore = await driver.wait(until.elementLocated(By.id('player-score')), 10000).getText();
        let computerScore = await driver.wait(until.elementLocated(By.id('computer-score')), 10000).getText();
        let leaderStr = await driver.wait(until.elementLocated(By.id('curr-leader')), 10000).getText();
        
        if (((playerScore > computerScore) && (leaderStr === "You're in the lead!")) || 
        ((computerScore > playerScore) && (leaderStr === 'The computer is in the lead!')) ||
        ((computerScore == playerScore) && (leaderStr === 'Tie game!'))) {
            console.log('Testing Leader String Update: PASSED');
        } else {
            console.log('Testing Leader String: FAILED');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testLeaderString().catch(console.error);

async function testScoreColorChange() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Play some rounds
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();

        // Check scores
        let playerScore = await driver.wait(until.elementLocated(By.id('player-score')), 10000).getText();
        let computerScore = await driver.wait(until.elementLocated(By.id('computer-score')), 10000).getText();
        let playerScoreColor = await driver.wait(until.elementLocated(By.id('player-score')), 10000).getCssValue('color');
        let computerScoreColor = await driver.wait(until.elementLocated(By.id('computer-score')), 10000).getCssValue('color');

        // Check colors
        if ((playerScore > computerScore && playerScoreColor === 'rgb(255, 0, 0)' && computerScoreColor === 'rgb(0, 0, 0)') ||
        (computerScore > playerScore && computerScoreColor === 'rgb(255, 0, 0)' &&  playerScoreColor === 'rgb(0, 0, 0)') || 
        (playerScore === computerScore && playerScoreColor === 'rgb(0, 0, 0)' && computerScoreColor === 'rgb(0, 0, 0)')) {
            console.log('Testing Score Color Changes: PASSED');
        } else {
            console.log('Testing Score Color Changes: FAILED');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testScoreColorChange().catch(console.error);

async function testWinnerColorChange() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Play some rounds
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();

        // Extract moves to determine winner of round
        let playerMove = await driver.wait(until.elementLocated(By.id('player-move')), 10000).getText();
        let playerMoveColor = await driver.wait(until.elementLocated(By.id('player-move')), 10000).getCssValue('color');
        let computerMove = await driver.wait(until.elementLocated(By.id('computer-move')), 10000).getText();
        let computerMoveColor = await driver.wait(until.elementLocated(By.id('computer-move')), 10000).getCssValue('color');
        let winner = determineWinner(playerMove, computerMove);

        // Check colors
        if ((winner === 'player' && playerMoveColor === 'rgb(255, 0, 0)' && computerMoveColor === 'rgb(0, 0, 0)') ||
        (winner === 'computer' && computerMoveColor === 'rgb(255, 0, 0)' && playerMoveColor === 'rgb(0, 0, 0)') ||
        (winner === 'tie' && computerMoveColor === 'rgb(0, 0, 0)' && playerMoveColor === 'rgb(0, 0, 0)')) {
            console.log('Testing Move Color Changes: PASSED');
        } else {
            console.log('Testing Move Color Changes: FAILED');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testWinnerColorChange().catch(console.error);

async function testRoundsPlayed() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Test Case 1: Open the game
        await driver.get('http://localhost:3000');

        // Play 20 rounds
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('scissors')).click();
        await driver.findElement(By.id('rock')).click();
        await driver.findElement(By.id('paper')).click();
        await driver.findElement(By.id('paper')).click();

        let computerScore = await driver.wait(until.elementLocated(By.id('computer-score')), 1000).getText();
        let playerScore = await driver.wait(until.elementLocated(By.id('player-score')), 1000).getText();
        let ties = await driver.wait(until.elementLocated(By.id('num-ties')), 1000).getText();
        let rounds = parseInt(computerScore) + parseInt(playerScore) + parseInt(ties);

        if (rounds === 20) {
            console.log('Testing num rounds played: PASSED');
        } else {
            console.log('Testing num rounds played: FAILED');
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}
testRoundsPlayed().catch(console.error);


