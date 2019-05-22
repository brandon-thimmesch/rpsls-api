const gameController = require('../controllers/gameController');

module.exports = app => {
	app.get('/emoji/signs', (req, res) => {
		gameController.getSignsAsEmojis(req, res);
	});

	// app.post('/play/emoji/:sign', (req, res) => {
	// 	gameController.takeTurnEmoji(req, res);
	// });

	app.post('/play/:sign', (req, res) => {
		gameController.takeTurn(req, res);
	});
};