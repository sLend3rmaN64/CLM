const { callomdbAPI } = require("../controllers/movieAPI/omdbapi");
const { getAllMovies, getMovieSearchAndReplace } = require("../controllers/movieDB/movie.dao");

const getMovieFromAPI = async(search, year) => {
    return await callomdbAPI(search, year);
};

const getAllMoviesFromBD = async(page) => {

    return await getAllMovies(page);

}

const getMovieAndReplace = async({ movie, find, replace }) => {
    const searchreplace = {
        movie,
        find,
        replace
    }
    return await getMovieSearchAndReplace(searchreplace);
}

module.exports = { getMovieFromAPI, getAllMoviesFromBD, getMovieAndReplace };