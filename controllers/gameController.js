const utils = require('../lib/utils');

const rock = '🗿';
const paper = '📄';
const scissors = '✂️';
const lizard = '🦎';
const spock = '🖖';

const getSignsAsEmojis = (req, res) => {
	utils.respond(null, res, {
		signs: {rock, paper, scissors, lizard, spock}
	});
}

const takeTurnEmoji = (req, res) => {
	let userChoice = req.params.sign;
	let userWon = didWin(userChoice, true)
	console.log(userChoice);

	// Decode unicode from user

	// "=ÿ"
	// "=Ä"
	// "U+2702"
	// ">\u008e"
	// "=\u0096"

	utils.respond(null, res, {userChoice, botChoice, userWon})
}

const takeTurn = (req, res) => {
	const results = didWin(req.params.sign, false);
	if (results.error) {
		utils.respond(results.error, res);
	} else {
		utils.respond(null, res, results)
	}
}

// Helpers
const didWin = (userChoice, useEmojis) => {
	const emojiSigns = [rock, paper, scissors, lizard, spock];
	const signs = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

	if (!signs.includes(userChoice) && !emojiSigns.includes(userChoice)) {
		return {error: 'Invalid move choice provided.'}
	}

	const rockWinConditions = [scissors, lizard, 'scissors', 'lizard'];
	const paperWinConditions = [rock, spock, 'rock', 'spock'];
	const scissorsWinConditions = [paper, lizard, 'paper', 'lizard'];
	const lizardWinConditions = [spock, paper, 'spock', 'paper'];
	const spockWinConditions = [scissors, rock, 'scissors', 'rock'];

	const botChoice = useEmojis ? emojiSigns[Math.floor(Math.random() * 5)] : signs[Math.floor(Math.random() * 5)];

	if (userChoice == botChoice) return {userWon: false, userChoice, botChoice, isTie: true};
	else if (userChoice === rock || userChoice === 'rock') return {userWon: rockWinConditions.includes(botChoice), userChoice, botChoice, isTie: false};
	else if (userChoice === paper || userChoice === 'paper') return {userWon: paperWinConditions.includes(botChoice), userChoice, botChoice, isTie: false};
	else if (userChoice === scissors || userChoice === 'scissors') return {userWon: scissorsWinConditions.includes(botChoice), userChoice, botChoice, isTie: false};
	else if (userChoice === lizard || userChoice === 'lizard') return {userWon: lizardWinConditions.includes(botChoice), userChoice, botChoice, isTie: false};
	else if (userChoice === spock || userChoice === 'spock') return {userWon: spockWinConditions.includes(botChoice), userChoice, botChoice, isTie: false};
	else if (userChoice == botChoice) return {userWon: false, userChoice, botChoice, isTie: true};
}

module.exports = {
	getSignsAsEmojis,
	takeTurnEmoji,
	takeTurn
}