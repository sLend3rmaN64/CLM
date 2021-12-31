const fetch = require("cross-fetch");
const { insertMovie } = require("../movieDB/movie.dao");
const hostName = "http://www.omdbapi.com/?";
const apiKey = "7ed11d4d";

const callomdbAPI = async(search, year) => {
    try {

        if (year == undefined) {
            requestURL = hostName + `apikey=${apiKey}&t=${search}`;
        } else {
            requestURL = hostName + `apikey=${apiKey}&t=${search}&y=${year}`;
        }

        try {
            var res = await fetch(requestURL);
            if (res.status >= 400) {
                throw new Error("Error desde el Servidor")
            }
            var response = await res.json();

            const objMovie = {
                title: response.Title,
                year: response.Year,
                released: response.Released,
                genre: response.Genre,
                director: response.Director,
                actors: response.Actors,
                plot: response.Plot,
                ratings: response.Ratings
            }

            return await insertMovie(objMovie);

            console.log(response);
        } catch (err) { console.error(err); }

    } catch (error) { console.error(error); }
};

module.exports = { callomdbAPI };