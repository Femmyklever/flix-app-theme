const global = {
    currentPage : window.location.pathname,
    search: {
        type: '',
        term: '',
        page: 1,
        totalPages: 1,
        totalResults: 0
    }
}


// getPopularMovie Data
async function getPopularMovie () {
    const {results} = await getApiData('movie/popular')

    results.forEach((movie) => {
        div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `
        document.querySelector('#popular-movies').appendChild(div)
    })
    
}

// get populat tv
async function getPopularTvShows () {
    const {results} = await getApiData('tv/popular')


    results.forEach((show) => {
        div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
           
          <a href="tv-details.html?id=${show.id}">
            ${show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        
        `
        document.querySelector('#popular-shows').appendChild(div)
    })
    
}

// getMovieDetails

async function getMovieDetails (){
    
    const urlParams = window.location.search
    const movieID = urlParams.split('=')[1]

    const movie = await getApiData(`movie/${movieID}`)
    div = document.createElement('div')
    displayBackgroundImage('movie', movie.backdrop_path)
    div.innerHTML = `
        <div class="details-top">
          <div>
           ${movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`}
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${(movie.vote_average).toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${numberWithCommas(movie.budget)} </li>
            <li><span class="text-secondary">Revenue:</span> ${numberWithCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
            <li><span class="text-secondary">Status:</span> ${movie.release_date}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => company.name).join(', ')}</div>
        </div>
    `
    document.querySelector('#movie-details').appendChild(div)
}


// get Tv details 

async function getTvDetails (){
    
    const urlParams = window.location.search
    const showID = urlParams.split('=')[1]

    const show = await getApiData(`tv/${showID}`)
    div = document.createElement('div')
    displayBackgroundImage('tv', show.backdrop_path)
    div.innerHTML = `
         <div class="details-top">
          <div>
              ${show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${(show.vote_average).toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Next Episode To Air:</span> ${show.next_episode_to_air}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
    `

    document.querySelector('#show-details').appendChild(div)

}

// display nowplaying movie details as slider

async function displaySlider () {
    const {results} = await getApiData('movie/now_playing')

    results.forEach ((movie) => {
        div = document.createElement('div')
        div.classList.add('swiper-slide')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
               ${movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`}
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${(movie.vote_average).toFixed(1)} / 10
            </h4>
            `
            document.querySelector('.swiper-wrapper').appendChild(div)
          initSwiper()
    })
    
}

// swiper for the now playing moviw

function initSwiper (){
    const swiper = new Swiper ('.swiper', {
        slidesPerView : 1,
        spaceBetween: 30,
        loop: true,
        freeMode: true,
        autoplay : {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints : {
            500 : {
                slidesPerView: 2,
                spaceBetween: 30,
            },
             700 : {
                slidesPerView: 3,
                spaceBetween: 30,
            },
             1200 : {
                slidesPerView: 1,
                spaceBetween: 30,
            }
        }
    })
}


// display background image on both movie details on tv details

async function displayBackgroundImage (type, imagePath){
    overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage =`url(https://image.tmdb.org/t/p/w500/${imagePath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';

    if(type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv)
    } else {
         document.querySelector('#show-details').appendChild(overlayDiv)
    }
}

// search movie on Tv shows and Movies

async function search (){
    
  queryString = window.location.search
  
    const urlParams = new URLSearchParams(queryString)
   global.search.type = urlParams.get('type')
   global.search.term = urlParams.get('search-term')

   if(global.search.term !== null && global.search.term !== '') {
     const {results,page,total_pages,total_results} = await getApiData(`search/${global.search.type}`)

    
     global.search.totalResults = total_results
    
   if(results.length === 0){
    showAlert('No search found', 'success')
   }

    displayResult(results)
    
   } else {
    showAlert('Please enter seach term', 'error')
   }
    
}

// display Result 

function displayResult (results) {

    document.querySelector('#search-results-heading').innerHTML = ``
    document.querySelector('#search-results').innerHTML = ``
    document.querySelector('#pagination').innerHTML = ``
    results.forEach((result) => {
        div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
           
          <a href="${global.search.type}-details.html?id=${result.id}">
                ${
                    result.poster_path ? `<img src= "https://image.tmdb.org/t/p/w500${result.poster_path}"
                    class = "card-img-top" alt= "${global.search.type === 'movie' ? result.title : result.show}"/>
                    ` : `<img src= "images/no-image.jpg" class= "img-top"alt="${global.search.type === 'movie' ? result.title : result.show}" />`

                }
          
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.show}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
        
        
        `
         document.querySelector('#search-results-heading').innerHTML = `
         <h2> ${results.length} of ${global.search.totalResults} for ${global.search.term}<h2>
         `       

        document.querySelector('#search-results').appendChild(div)
    })

    displayPagination()
}




// working with the Page number , pagination

function displayPagination () {
    div = document.createElement('div')
    div.classList.add('pagination')
    div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalResults}</div>
    
    `
    document.querySelector('#pagination').appendChild(div)
    if(global.search.page === 1) {
        document.querySelector('#prev').disabled = true
    }
    if(global.search.page === global.search.totalResults){
        document.querySelector('#next').disabled = true
    }

    // add event listener to our next and increment it by 1 , pass in displayResult with result params inside of it

document.querySelector('#next').addEventListener('click', async () => {
    global.search.page ++;
    const {results, total_pages} =  await getApiData(`search/${global.search.type}?query=${global.search.term}&include_adult=false&page={global.search.page}`) 
    
    displayResult(results)
})

document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page --;
    const {results, total_pages} =  await getApiData(`search/${global.search.type}?query=${global.search.term}&include_adult=false&page={global.search.page}`) 
    
    displayResult(results)
})


}


// showAlert function 

function showAlert (message, className){
    alertEl = document.createElement('div')
    alertEl.classList.add('alert', className)
    alertEl.appendChild(document.createTextNode(message))
    document.querySelector('#alert').appendChild(alertEl)

    setTimeout(()=> {
        alertEl.remove()
    },3000)
}

// show and hiide spinner before page loads

function showSpinner (){
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner (){
    document.querySelector('.spinner').classList.remove('show')
}

// highligh nav-links when click

function highlightLinks (){
    document.querySelectorAll('.nav-link').forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
}

// add comma to number

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// getApiData 

async function getApiData (endpoint){
   const apiURL = 'https://api.themoviedb.org/3/'
        showSpinner()
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGI0MGVkYjQzYzFlZTJjM2VlOThjYTIyNWFjMzU3ZCIsInN1YiI6IjY1OGM1MzQ1NWNkMTZlNmUyNGQyN2ZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHR4yyP0_ChGJPs45GCoJZLDh173LHzVBwEREwAEFgo'
        }
     };

     const response = await fetch(`${apiURL}${endpoint}?query=${global.search.term}&include_adult=false&language=en-US&page=${global.search.page}`, options)

     const data = await response.json()
     hideSpinner()
     return data;
}



// using router here to map url with functions, once the url is called, the function invoked

function initApp () {
switch (global.currentPage) {
    case '/':
    case '/index.html':
        // console.log('home');
        getPopularMovie()
        displaySlider()
        break;
    case '/movie-details.html':
        // console.log('movie details');
        getMovieDetails()
        break;
    case '/search.html':
        // console.log('search');
        search()
        break;
    case '/shows.html':
        // console.log('show');
        getPopularTvShows()
        break;
    case '/tv-details.html':
        // console.log('home');
        getTvDetails()
        break;
    default:
        
}
highlightLinks()
}

document.addEventListener('DOMContentLoaded', initApp)