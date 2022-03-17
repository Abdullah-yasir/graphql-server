const app = require('./src/server');

app.listen(3001, () => {
   console.log('GraphQL Server running on port 3001');
})