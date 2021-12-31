const fetch = require("cross-fetch");
const hostName = "http://www.omdbapi.com/?";
const apiKey = "7ed11d4d";

const callomdb = async(search, year) => {
    try {
        (
            async() => {
                try {
                    var paginator = false;
                    var page = 1;
                    var count = 0;
                    var resArray = [];
                    while (!paginator) {

                        if (year == undefined) {
                            requestURL = hostName + `apikey=${apiKey}&page=${page}&s=${search}`;
                        } else {
                            requestURL = hostName + `apikey=${apiKey}&page=${page}&s=${search}&y=${year}`;
                        }

                        var res = await fetch(requestURL);
                        if (res.status >= 400) {
                            throw new Error("Error desde el Servidor")
                        }
                        var response = await res.json();
                        page++;
                        count += response.Search.length;
                        resArray = resArray.concat(response.Search);
                        if (count > response.totalResults) { paginator = true; }
                    }
                    console.log(response);
                } catch (err) { console.error(err); }
            }
        )();

    } catch (error) { console.error(error); }
};

module.exports = { callomdbAPI };