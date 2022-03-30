const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
   type Query {
      products: [Product]
      orders: [Order]
      login(name: String): String
   }

   type Product {
      id: ID!
      name: String!
      price: Float!
      reviews: [Review]
      description: String!
   }

   type Review {
      id: ID!
      text: String!
      rating: Int!
   }

   type Order {
      id: ID!
      date: String!
      items: [OrderItem]
      subtotal: Float!
   }

   type OrderItem {
      id: ID!
      product: Product!
      quantity: Int!
   }
`);

const root = {
   products: [
      {
         id: '1',
         name: 'Product 1',
         description: 'This is a product',
         price: 10,
         reviews: [
            {
               id: '1',
               text: 'This is a great product!',
               rating: 5
            },
            {
               id: '2',
               text: 'This is a bad product!',
               rating: 1
            }
         ]
      },
      {
         id: '2',
         name: 'Product 2',
         description: 'This is a product',
         price: 20,
         reviews: [
            {
               id: '3',
               text: 'This is a great product!',
               rating: 5
            },
            {
               id: '4',
               text: 'This is a bad product!',
               rating: 1
            }
         ]
      }
   ],
   orders: [
      {
         id: '1',
         date: '2018-01-01',
         subtotal: 10,
         items: [
            {
               id: '1',
               product: {
                  id: '1',
                  name: 'Product 1',
                  description: 'This is a product',
                  price: 10,
                  reviews: [
                     {
                        id: '1',
                        text: 'This is a great product!',
                        rating: 5
                     },
                  ]
               },
               quantity: 2
            },
         ]
      },
   ],
   login: (args) => `Hello ${args.name}!`
};

const app = express();
app.use('/graphql', graphqlHTTP({
   schema: schema,
   rootValue: root,
   graphiql: true
}));


module.exports = app;