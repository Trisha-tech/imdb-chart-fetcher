# imdb-chart-fetcher


Write a command-line script that takes input the chart_url and items_count , where  chart_url is one of IMDb Top Indian Charts: 


● Top Rated Indian Movies ( https://www.imdb.com/india/top-rated-indian-movies ) 

● Top Rated Tamil Movies ( https://www.imdb.com/india/top-rated-tamil-movies )  

● Top Rated Telugu Movies ( https://www.imdb.com/india/top-rated-telugu-movies ) 



OUTPUT:

The script should output a json string of the top items_count number of movie items (with  attributes as listed below) in that particular IMDb chart.  
Following attributes of each movie should be printed:  
● title  
● movie_release_year  
● imdb_rating  
● summary  
● duration  
● genre


STEPS TO RUN:

1.) Clone the repository.
2.) Open the terminal and type the following command:

npm start 'https://www.imdb.com/india/top-rated-indian-movies' 12

where 
a) 'https://www.imdb.com/india/top-rated-indian-movies' is the url of the top rated indian movies.
b) 12 is the number of top movies you want to output (works only upto 50).


SCREENSHOTS:

Top 13 Telugu Movies:
![Screenshot (1674)_LI](https://user-images.githubusercontent.com/55338588/156371930-32df75da-92af-476e-aae1-fa3acca91832.jpg)


Top 25 Tamil Movies:
![Screenshot (1673)_LI](https://user-images.githubusercontent.com/55338588/156372028-38c9beff-7eff-4907-a1bf-fe4353fb5c3c.jpg)


Top 50 Indian Movies:
![Screenshot (1671)_LI](https://user-images.githubusercontent.com/55338588/156372072-45f8b59c-6e85-4112-b730-ae6f3ac0e7d7.jpg)


