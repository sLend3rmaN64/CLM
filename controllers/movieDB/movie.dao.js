const movies = require('../index').db('clm_dev').collection('movies');
const { returnPromise } = require('../functions');
var ObjectID = require('mongodb').ObjectID;

const insertMovie = async({ title, year, released, genre, director, actors, plot, ratings }) => {
    try {
        var _idvar = "";
        var check = await movies.findOne({ title, year, released });
        if (check == null) {
            const result = await movies.insertOne({ title, year, released, genre, director, actors, plot, ratings })
                .then(
                    result => {
                        _idvar = result.insertedId;
                        console.log(_idvar);
                    });
            return await movies.findOne({ _id: _idvar });

            console.log(check);
        } else { return await check; }

    } catch (err) { console.log(err); }
}

const getAllMovies = async(page) => {

    try {
        var count = 0;
        var size = 5;
        var skip = size * (page - 1);

        count = await movies.count();

        const response = await movies.find().limit(size).skip(skip).sort('_id');

        return response.toArray();

    } catch (err) { console.error(err); }
}

const getMovieSearchAndReplace = async({ movie, find, replace }) => {
    try {
        var check = await movies.findOne({ title: movie });
        if (check != null) {

            check.plot = check.plot.replace(find, replace);

            return await check;

            console.log(check);
        } else { return await "pelicula no encontrada"; }

    } catch (err) { console.log(err); }


}


module.exports = { insertMovie, getAllMovies, getMovieSearchAndReplace };