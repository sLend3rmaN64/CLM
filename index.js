const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
const movieRouter = require('./routes/movies.routes');

const app = new Koa();

app.use(bodyParser());
app.use(movieRouter.routes()).use(movieRouter.allowedMethods());

app.listen(4001);