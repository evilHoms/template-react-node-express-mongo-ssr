const rootHandler = require('./routes/rootHandler');

module.exports = function routes(app, dbClient) {
  console.log('routes');
  app.get('/', rootHandler);
}
