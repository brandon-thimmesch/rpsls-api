const utils = require('../lib/utils');

const rock = '🗿';
const paper = '📄';
const scissors = '✂️';
const lizard = '🦎';
const spock = '🖖';

/**
 * @api {get} /emoji/signs GetSignsAsEmojis
 * @apiGroup Game
 * @apiHeader {String} x-access-token A valid JSON Web Token
 * @apiSuccess {Object} signs An object with the selected emojis for RPSLS
 */
const getSignsAsEmojis = (req, res) => {
	utils.respond(null, res, {
		signs: {rock, paper, scissors, lizard, spock}
	});
}

/**
 * @api {post} /emoji/play/:sign TakeTurnEmoji
 * @apiGroup Game
 * @apiHeader {String} x-access-token A valid JSON Web Token
 * @apiSuccess {Object} results An object containing the user choice, the bot's choice, whether the user won, and if it was a tie
 */
// const takeTurnEmoji = (req, res) => {
// 	let userChoice = req.params.sign;
// 	let userWon = didWin(userChoice, true)

// 	utils.respond(null, res, {userChoice, botChoice, userWon})
// }

/**
 * @api {post} /play/:sign TakeTurn
 * @apiGroup Game
 * @apiHeader {String} x-access-token A valid JSON Web Token
 * @apiSuccess {Object} results An object containing the user choice, the bot's choice, whether the user won, and if it was a tie
 */
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
	takeTurn
}