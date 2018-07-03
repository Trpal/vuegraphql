const express = require('express');
const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const Champion = require('./champion');


const champions = [
	new Champion('paske', 100),
	new Champion('lol', 200)
]

const schema = buildSchema(`
	type Query {
		language: String
		getChampions: [Champion]
		getChampionByName(name: String!): Champion
	}

	type Mutation {
		updateAttackDamage(name: String!, attackDamage: Float): Champion
	}

	type Champion {
		name: String
		attackDamage: Float
	}
`);

const rootValue = {
	language: () => 'GraphQL',

	getChampions: () => champions,

	getChampionByName: ({ name }) => {
		return champions.find(champion => champion.name === name);
	},

	updateAttackDamage: ({ name, attackDamage = 150 }) => {
		const champion = champions.find(champion => champion.name === name);
		champion.attackDamage = attackDamage;

		return champion;
	}
}

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
	rootValue, schema, graphiql: true
}));

app.listen(4000, () => console.log('listening on 4000'));