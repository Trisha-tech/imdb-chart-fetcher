
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios').default;
const startUrl = 'https://www.imdb.com';
const [endUrl, movieCount] = process.argv.slice(2);
const imdbUrl = endUrl;
const movieNumber = parseInt(movieCount);

//Check if length of the movie number greater than 50
if (movieNumber > 50) {
    console.log('Only upto top 50 movies will be shown');
}
console.log(`Top ${movieNumber} Movies are:`);
(async () => {
    //Get Url of the top movies page
    const url = await axios.get(imdbUrl);

    //Get Data of the top movies page
    const moviesPage = new JSDOM(url.data).window.document;
    const movieList = moviesPage.getElementsByTagName('tr');

    //Check if length of the movie list greater than 50
    if (movieNumber > movieList.length) {
        console.error('Cannot load more than 50 movies !!!');
    }

    let topMovies = [];

    for (let i = 1; i <= movieNumber; i++) {
        ////Get Title of the movies
        const title = movieList[i].querySelector('td:nth-child(2) a').innerHTML;

        //Get Release Year of the movies
        const movie_release_year = movieList[i].querySelector('td:nth-child(2) span').innerHTML.substr(1, 4);

        //Get Rating of the movies
        const imdb_rating = movieList[i].querySelector('td:nth-child(3) strong').innerHTML;

        //Get Url of the particular movie page
        const movieUrl = startUrl + movieList[i].querySelector('td:nth-child(2)').children[0].href;
        const movieDetail = await axios.get(movieUrl);

        //Get Data of the particular movie page
        const singleMoviePage = new JSDOM(movieDetail.data).window.document;

        //Get Summary of the movies
        const summary = singleMoviePage.querySelector('.GenresAndPlot__TextContainerBreakpointL-sc-cum89p-1').innerHTML;

        //Get Duration of the movies
        const time = singleMoviePage.querySelector('[data-testid="title-techspecs-section"]');
        const time1 = time.querySelector('ul li div').innerHTML.trim();
        const duration = time1.replace(/[<!-->\s+]/g, '').replace("hours", "h ").replace("minutes", "min");

        //Get Genre of the particular movie page
        var genreList = singleMoviePage.querySelectorAll('.ipc-chip-list .GenresAndPlot__GenreChip-sc-cum89p-3');
        var genre = [];
        for (var j = 0; j < genreList.length; j++) {
            genre.push(genreList[j].querySelector('.ipc-chip__text').innerHTML);
        }

        //Store the answer
        topMovies.push({
            title,
            movie_release_year,
            imdb_rating,
            summary,
            duration,
            genre,
        });
    }
    console.log(topMovies);

    //Return the answer
    return topMovies;
})();