const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
   type Query {
      hello: String
      bye: String
      greet(name: String): String
   }
`);

const root = {
   hello: () => 'Hello world!',
   bye: () => 'Goodbye world!',
   greet: (args) => `Hello ${args.name}!`
};

const app = express();
app.use('/graphql', graphqlHTTP({
   schema: schema,
   rootValue: root,
   graphiql: true
}));


module.exports = app;