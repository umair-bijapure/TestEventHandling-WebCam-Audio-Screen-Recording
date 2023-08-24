const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const { MONGODB_URI } = process.env;
console.log(MONGODB_URI,"is it comming inside of databse folder")

exports.connect = () => {
	console.log("Connecting to the database")
	mongoose
		.connect('mongodb://127.0.0.1:27017/testCollection', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log("Successfully connected to TalkValley database");
		})
		.catch((error) => {
			console.log("database connection failed. exiting now...");
			console.error(error);
			process.exit(1);
		});
};