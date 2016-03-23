// CONFIGURATION VARIABLES ---------
// manage app settings here (port number, database connection, etc.

module.exports = {
	'port': process.envPORT || 3000, // set port for the app
	'database': process.env.MONGOOSE_DATABASE, // secret link to secret database! Stored as an environmental variable.
	// formerly 'database': 'mongodb://localhost/news',
	'secret': process.env.SECRET_KEY // IT'S A SECRET!
};