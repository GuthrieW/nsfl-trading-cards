const Express = require('express');
const Moment = require('moment-timezone');
const HttpStatusCodes = require('http-status-codes');
const Team = require('/nsfl-trading-cards/api/models/Team');

const Router = Express.Router();

Router.get('/team', async (request, response) => {
	try {
		const teams = await Team.find();
		response.status(HttpStatusCodes.OK).json(teams);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});
