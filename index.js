
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios').default;
const startUrl = 'https://www.imdb.com';
const [endUrl, movieCount] = process.argv.slice(2);
const imdbUrl = endUrl;
const movieNumber = parseInt(movieCount);
if (movieNumber > 50) {
    console.log('Only upto top 50 movies will be shown');
}
console.log('Your result is:');
(async () => {
    const url = await axios.get(imdbUrl);
    const moviesPage = new JSDOM(url.data).window.document;
    const movieList = moviesPage.getElementsByTagName('tr');
    if (movieNumber > movieList.length) {
        console.error('Cannot load more than 50 movies !!!');
    }
    let topMovies = [];
    for (let i = 1; i <= movieNumber; i++) {
        const title = movieList[i].querySelector('td:nth-child(2) a').innerHTML;
        const movie_release_year = movieList[i].querySelector('td:nth-child(2) span').innerHTML.substr(1, 4);
        const imdb_rating = movieList[i].querySelector('td:nth-child(3) strong').innerHTML;
        const movieUrl = startUrl + movieList[i].querySelector('td:nth-child(2)').children[0].href;
        const movieDetail = await axios.get(movieUrl);
        const singleMoviePage = new JSDOM(movieDetail.data).window.document;

        const summary = singleMoviePage.querySelector('.GenresAndPlot__TextContainerBreakpointXS_TO_M-sc-cum89p-0').innerHTML;

        var genreList = singleMoviePage.querySelectorAll('.ipc-chip-list .GenresAndPlot__GenreChip-sc-cum89p-3');
        var genre = [];
        for (var j = 0; j < genreList.length; j++) {
            genre.push(genreList[j].querySelector('.ipc-chip__text').innerHTML);
        }

        topMovies.push({
            title,
			movie_release_year,
			imdb_rating,
			summary,
			genre,
        });
    }
    console.log(topMovies);
	return topMovies;
})();