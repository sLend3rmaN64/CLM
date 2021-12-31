const Router = require("@koa/router");

const { getMovieFromAPI, getAllMoviesFromBD, getMovieAndReplace } = require("../api/movies.api");
const router = new Router({
    prefix: '/movies'
});

router.get('/getmoviesfromapi', async ctx => {
    var error = [];
    if (ctx.header.search == undefined)
        error.push({ "error": "Debe haber título de búsqueda" });
    ctx.body = {
        errores: error
    }
});
router.get('/getmoviesfromapi/:search', async ctx => {

    var error = [];
    var regex = /^[0-9]+$/;
    if (ctx.header.year != undefined) {
        if (ctx.header.year.length > 0) {
            if (ctx.header.year.length != 4)
                error.push({ "error": "Año debe tener una longitud de 4" });
            if (regex.test(ctx.header.year) == false)
                error.push({ "error": "Año debe ser númerico" });
        }
    }

    if (error.length > 0) {
        ctx.body = {
            errores: error
        }
        return;
    }

    ctx.body = await getMovieFromAPI(ctx.params.search, ctx.header.year);
});

router.get('/getmoviesfromdb', async ctx => {

    var error = [];
    var regex = /^[0-9]+$/;

    if (ctx.header.page == undefined)
        ctx.header.page = 1;
    if (ctx.header.page.length == 0)
        ctx.header.page = 1;
    if (ctx.header.page > 100)
        error.push({ "error": "Las páginas deben ser entre 1 y 100" });
    if (regex.test(ctx.header.page) == false)
        error.push({ "error": "Página debe ser númerico" });

    if (error.length > 0) {
        ctx.body = {
            errores: error
        }
        return;
    }

    ctx.body = await getAllMoviesFromBD(ctx.header.page);
});

router.post('/findandreplace', async ctx => {

    var error = [];

    if (ctx.request.body.movie.trim().length == 0)
        error.push({ "error": "Debe indicar una pelicula" });
    if (ctx.request.body.find.trim().length == 0)
        error.push({ "error": "Debe indicar un valor a buscar" });
    if (ctx.request.body.replace.trim().length == 0)
        error.push({ "error": "Debe indicar un valor para reemplazar" });

    if (error.length > 0) {
        ctx.body = {
            errores: error
        }
        return;
    }

    let searchObj = ctx.request.body;
    let response = await getMovieAndReplace(searchObj);

    ctx.response.status = 200;
    ctx.body = response;

});
module.exports = router;