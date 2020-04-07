import Mongoose from "mongoose";

Mongoose.connect(
	"mongodb+srv://admin:admin@cluster01-2mjsa.mongodb.net/si-alumni?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
)
	.then(() => {
		console.log("Terhubung ke Database");
	})
	.catch((err) => {
		console.log(`Error connected to database: ${err}`);
	});
