

const cargarPeliculas = async () => {
  try {
    const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24';
    const totalPeliculas = 300;
    const peliculasPorPagina = 20;
    const totalPaginas = Math.ceil(totalPeliculas / peliculasPorPagina);
    let peliculas = [];

    // Obtener películas de tendencia
    const respuestaTendencias = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=es-MX`);
    const datosTendencias = await respuestaTendencias.json();
    datosTendencias.results.forEach(pelicula => {
      peliculas.push(pelicula);
    });

    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-MX&sort_by=popularity.desc&with_genres=27,12&page=${pagina}`);
      const datos = await respuesta.json();
      datos.results.forEach(pelicula => {
        peliculas.push(pelicula);
      });
    }

    const contenedorVideos = document.getElementById('contenedorVideos');
    contenedorVideos.innerHTML = generarHTMLPeliculas(peliculas);

    const contenedorTendencias = document.getElementById('contenedorTendencias');
    contenedorTendencias.innerHTML = generarHTMLPeliculas(peliculas.slice(0, 10)); // Mostrar solo las 10 primeras películas de tendencia

    const playIcons = document.querySelectorAll('.play-icon');
    playIcons.forEach(icon => {
      icon.addEventListener('click', async () => {


        const id = icon.getAttribute('data-id');
        const peliculaData = await obtenerDatosPelicula(id);
        borrarSeleccionAnterior(); // Borra la película o serie seleccionada anteriormente
        guardarPeliculaSeleccionada(peliculaData);

        window.location.href = './pages/pages.html'; // Redireccionar a pages.html
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatosPelicula = async (id) => {
  try {
    const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24';
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX`);
    const datosPelicula = await respuesta.json();
    return {
      title: datosPelicula.title,
      overview: datosPelicula.overview,
      release_date: datosPelicula.release_date,
      runtime: datosPelicula.runtime,
      vote_average: datosPelicula.vote_average,
      poster_path: datosPelicula.poster_path,
      backdrop_path: datosPelicula.backdrop_path
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const guardarPeliculaSeleccionada = (pelicula) => {
  const datosPelicula = {
    title: pelicula.title,
    overview: pelicula.overview,
    release_date: pelicula.release_date,
    runtime: pelicula.runtime,
    vote_average: pelicula.vote_average,
    poster_path: pelicula.poster_path,
    backdrop_path: pelicula.backdrop_path
  };

  localStorage.setItem('peliculaSeleccionada', JSON.stringify(datosPelicula));
};

const obtenerPeliculaSeleccionada = () => {
  const peliculaSeleccionada = localStorage.getItem('peliculaSeleccionada');
  return JSON.parse(peliculaSeleccionada);
};

const generarHTMLPeliculas = (peliculas) => {
  return peliculas.map(pelicula => {
    return `
      <div class="video-wrapper">
        <div class="play-icon" data-id="${pelicula.id}"></div>
        <img class="imgminiatura" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
        <div class="descripcionvideoRepo">
          <h3 class="tiuloMiniaturavideo">${pelicula.title}</h3>
          <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          <span class="rating-value">${pelicula.vote_average}</span>
        </div>
      </div>
    `;
  }).join('');
};
















const cargarSeries = async (totalSeries) => {
  try {
    const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24';
    const seriesPorPagina = 20;
    const totalPaginas = Math.ceil(totalSeries / seriesPorPagina);
    let series = [];

    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const respuesta = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-MX&sort_by=popularity.desc&page=${pagina}`);
      const datos = await respuesta.json();
      datos.results.forEach(serie => {
        series.push(serie);
      });
    }

    const contenedorSeries = document.getElementById('contenedorSeries');
    contenedorSeries.innerHTML = generarHTMLSeries(series);
    const playIcons = document.querySelectorAll('.play-icon');
    playIcons.forEach(icon => {
      icon.addEventListener('click', async () => {


        const id = icon.getAttribute('data-id');
        const serieData = await obtenerDatosSerie(id);
        borrarSeleccionAnterior(); // Borra la película o serie seleccionada anteriormente
        guardarSerieSeleccionada(serieData);

        window.location.href = './pages/pages.html'; // Redireccionar a pages.html
      });
    });

  } catch (error) {
    console.log(error);
  }
};

const obtenerDatosSerie = async (id) => {
  try {
    const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24';
    const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es-MX`);
    const datosSerie = await respuesta.json();
    return {
      title: datosSerie.name,
      overview: datosSerie.overview,
      first_air_date: datosSerie.first_air_date,
      episode_run_time: datosSerie.episode_run_time,
      vote_average: datosSerie.vote_average,
      poster_path: datosSerie.poster_path,
      backdrop_path: datosSerie.backdrop_path
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const guardarSerieSeleccionada = (serie) => {
  const datosSerie = {
    title: serie.title,
    overview: serie.overview,
    first_air_date: serie.first_air_date,
    episode_run_time: serie.episode_run_time,
    vote_average: serie.vote_average,
    poster_path: serie.poster_path,
    backdrop_path: serie.backdrop_path
  };

  localStorage.setItem('serieSeleccionada', JSON.stringify(datosSerie));
};


const generarHTMLSeries = (series) => {
  return series.map(serie => {
    return `
      <div class="video-wrapper">
        <div class="play-icon" data-id="${serie.id}"></div>
        <img class="imgminiatura" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="">
        <div class="descripcionvideoRepo">
          <h3 class="tiuloMiniaturavideo">${serie.name}</h3>
          <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          <span class="rating-value">${serie.vote_average}</span>
        </div>
      </div>
    `;
  }).join('');
};




document.addEventListener('DOMContentLoaded', () => {
  const serieSeleccionada = obtenerSerieSeleccionada();

  if (serieSeleccionada) {
    const { title, overview, first_air_date, episode_run_time, vote_average, poster_path, backdrop_path } = serieSeleccionada;

    const contenedorTitleVideo = document.getElementById('contenedortitlevideo');
    const estructuraHTML = `
      <div class="bloquedescri" style="background-image: url(https://image.tmdb.org/t/p/w500/${backdrop_path});">
        <div class="movie-description peliculaimg-min">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="peliculaDescripcion">
          <div class="genre">Género: Acción, Ficción</div>
        </div>
        <div class="bloq-peli">
          <h1 class="titulo-pelicula">${title}<span class="spntit">HD</span></h1>
          <div class="rating">
            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
            <span class="rating-value">${vote_average}</span>
          </div>
          <div class="video-descripcion">
            <div class="descripcion">
              <p class="descripcionGeneral desc400 actores"> Descripción: ${overview}</p>
              <p class="fechapelicula">Duración de la película: ${episode_run_time} minutos</p>
              <p class="fechapelicula">Fecha de estreno: ${first_air_date}</p>
            </div>
          </div>
          <p class="compartir">
            <span class="actores">Compartir</span>
            <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
          </p>
        </div>
      </div>
      <hr class="linea-roja">
      <h3 class="titulodescripcion titlepages">${title}<span class="spntit">HD</span></h3>
      <div class="pelicula-reproduccion">
        <iframe class="peliyou" width="100%" height="auto"
          src="https://www.youtube.com/embed/lP8zVVk3AwQ?controls=0&amp;start=8" title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    `;

    contenedorTitleVideo.innerHTML = estructuraHTML;
  }
});








const obtenerSerieSeleccionada = () => {

  const serieSeleccionada = localStorage.getItem('serieSeleccionada');
  return JSON.parse(serieSeleccionada);
};






const borrarSeleccionAnterior = () => {
  const serieSeleccionada = localStorage.getItem('serieSeleccionada');
  const peliculaSeleccionada = localStorage.getItem('peliculaSeleccionada');

  if (peliculaSeleccionada && !serieSeleccionada) {
    localStorage.removeItem('serieSeleccionada');
  }

  if (serieSeleccionada && !peliculaSeleccionada) {
    localStorage.removeItem('peliculaSeleccionada');
  }


};


for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  if (value === '{}' || value === 'null' || value === 'undefined') {
    localStorage.removeItem(key);
  }
}














const cargarPeliculasAside = async () => {
  try {
    const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24';
    const totalPeliculasAside = 20; // Número total de películas que quieres mostrar en el aside
    let peliculasAside = [];

    for (let pagina = 1; pagina <= totalPeliculasAside; pagina++) {
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${pagina}`);
      const datos = await respuesta.json();
      datos.results.forEach(pelicula => {
        peliculasAside.push(`
          <li class="seleccion" id="${pelicula.id}">
            <img class="imgaside" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
            <p>${pelicula.title}</p>
          </li>
        `);
      });
    }

    const contenedorPeliculasAside = document.getElementById('peliculasAside');
    contenedorPeliculasAside.innerHTML = peliculasAside.join('');


    const agregarClase = document.getElementById('agregarClase');
const mostrarMas = document.getElementById('mostarMas');

mostrarMas.addEventListener('click', function () {
  agregarClase.classList.toggle('mostrar');
  

});
    // Agregar evento de clic a cada elemento de la lista de películas en el aside
    const elementosPeliculasAside = contenedorPeliculasAside.querySelectorAll('.seleccion');
    elementosPeliculasAside.forEach(elemento => {
      elemento.addEventListener('click', async () => {
        const id = elemento.id;
        const peliculaData = await obtenerDatosPelicula(id);
        mostrarPeliculaSeleccionada(peliculaData);
        agregarClase.classList.remove('mostrar');
     

      });
    });


  } catch (error) {
    console.log(error);
  }
};





const mostrarPeliculaSeleccionada = (pelicula) => {
  const contenedorTitleVideo = document.getElementById('contenedortitlevideo');
  const { title, overview, release_date, runtime, vote_average, poster_path, backdrop_path } = pelicula;


  const estructuraHTML = `
    <div class="bloquedescri" style="background-image: url(https://image.tmdb.org/t/p/w500/${backdrop_path});">
      <div class="movie-description peliculaimg-min">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="peliculaDescripcion">
        <div class="genre">Género: Acción, Ficción</div>
      </div>
      <div class="bloq-peli">
        <h1 class="titulo-pelicula">${title}<span class="spntit">HD</span></h1>
        <div class="rating">
          <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          <span class="rating-value">${vote_average}</span>
        </div>
        <div class="video-descripcion">
          <div class="descripcion">
            <p class="descripcionGeneral desc400 actores"> Descripción: ${overview}</p>
            <p class="fechapelicula">Duración de la película: ${runtime} minutos</p>
            <p class="fechapelicula">Fecha de estreno: ${release_date}</p>
          </div>
        </div>
        <p class="compartir">
          <span class="actores">Compartir</span>
          <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
        </p>
      </div>
    </div>
    <hr class="linea-roja">
    <h3 class="titulodescripcion titlepages">${title}<span class="spntit">HD</span></h3>
    <div class="pelicula-reproduccion">
      <iframe class="peliyou" width="100%" height="auto"
        src="https://www.youtube.com/embed/lP8zVVk3AwQ?controls=0&amp;start=8" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
  `;

  contenedorTitleVideo.innerHTML = estructuraHTML;
};








document.addEventListener('DOMContentLoaded', () => {


  const peliculaSeleccionada = obtenerPeliculaSeleccionada();

  if (peliculaSeleccionada) {
    const { title, overview, release_date, runtime, vote_average, poster_path, backdrop_path } = peliculaSeleccionada;

    const contenedorTitleVideo = document.getElementById('contenedortitlevideo');
    const estructuraHTML = `


      <div class="bloquedescri" style="background-image: url(https://image.tmdb.org/t/p/w500/${backdrop_path});">
        <div class="movie-description peliculaimg-min">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="peliculaDescripcion">
          <div class="genre">Género: Acción, Ficción</div>
        </div>
        <div class="bloq-peli">
          <h1 class="titulo-pelicula">${title}<span class="spntit">HD</span></h1>
          <div class="rating">
            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
            <span class="rating-value">${vote_average}</span>
          </div>
          <div class="video-descripcion">
            <div class="descripcion">
              <p class="descripcionGeneral desc400 actores"> Descripción: ${overview}</p>
              <p class="fechapelicula">Duración de la película: ${runtime} minutos</p>
              <p class="fechapelicula">Fecha de estreno: ${release_date}</p>
            </div>
          </div>
          <p class="compartir">
            <span class="actores">Compartir</span>
            <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
          </p>
        </div>
      </div>
      <hr class="linea-roja">
      <h3 class="titulodescripcion titlepages">${title}<span class="spntit">HD</span></h3>
      <div class="pelicula-reproduccion">
        <iframe class="peliyou" width="100%" height="auto"
          src="https://www.youtube.com/embed/lP8zVVk3AwQ?controls=0&amp;start=8" title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>


    `;
    contenedorTitleVideo.innerHTML = estructuraHTML;
  }

});





































const apiKey = '9e72cf7dd4f0f11a17058e33cd5e7e24'; // Reemplaza 'tu_api_key' con tu clave de API de The Movie Database.

const cargarPeliculaAleatoria = async () => {
  try {
    // Obtener una lista de películas populares
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX`);
    const datos = await respuesta.json();
    const peliculasPopulares = datos.results;

    // Seleccionar una película aleatoria
    const peliculaAleatoria = peliculasPopulares[Math.floor(Math.random() * peliculasPopulares.length)];

    const contenedorLado = document.querySelector('.lado');

    // Llenar los elementos HTML con la información de la película aleatoria
    contenedorLado.innerHTML = `
      <div class="movie-description ladodescription">
          <img src="https://image.tmdb.org/t/p/w500/${peliculaAleatoria.poster_path}" alt="" class="peliculaDescripcion">
          <h1 class="titulo-pelicula">${peliculaAleatoria.title}</h1>
         
          <div class="genre">Género: Acción, Ficción</div>
          <div class="rating">
              <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              <span class="rating-value">${peliculaAleatoria.vote_average}</span>
          </div>
          <div class="buttons">
              <a class="play-button " href="#">Reproducir</a>
              <a class="download-button" href="#">Descargar</a>
          </div>
      </div>

      <div class="videoLado">
          <div class="video-wrapper">
              <video class="videoReproducionPrincipal" src="./videos/john wick.webm" autoplay></video>

              <div class="video-info">
                  <h3 class="tiulolado">${peliculaAleatoria.title}</h3>
                  <p class="parrafolado">${peliculaAleatoria.overview}</p>
              </div>
          </div>

        
        
      </div>
    `;
  } catch (error) {
    console.log(error);
  }
};

// Llamar a la función para cargar una película aleatoria cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
  cargarPeliculaAleatoria();
  cargarPeliculasAside()
  cargarPeliculas();
  cargarSeries(300);
});




document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('myVideo');
  video.play();
});