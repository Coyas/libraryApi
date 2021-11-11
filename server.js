const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PASS);
// console.log(process.env.DB_USER);
// console.log(process.env.API_PORT);
// connect to mongoDB 'Atlas'
// process.env.DB_HOST;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@terramdbtest.l0lm7.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.once("open", () => {
	console.log("conectadu na database");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(process.env.API_PORT, () =>
	console.log(`servidor sa ta roda na porta:${process.env.API_PORT}, soo laaaa`)
);
