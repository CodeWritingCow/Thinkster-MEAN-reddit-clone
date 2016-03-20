// CONFIGURATION VARIABLES ---------
// manage app settings here (port number, database connection, etc.

module.exports = {
	'port': process.envPORT || 3000, // set port for the app
	'database': 'mongodb://localhost/news',
	'secret': 'SECRET' // IT'S A SECRET!
};