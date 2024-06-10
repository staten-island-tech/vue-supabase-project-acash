<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="movies-container">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="getPosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster"/>
      <h2 class="movie-title">{{ movie.title }}</h2>
    </div>
  </div>

  <div class="home-container">
    <h1>Welcome to {{ websiteName }}, a platform for people who love movies.</h1>
    <ul>
      <li>Search for your favorite movies</li>
      <li>Discover new releases</li>
      <li>Explore trending movies</li>
    
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websiteName: 'Our Website',
      movies: [],
    };
  },
  created() {
    this.fetchPopularMovies();
  },
  methods: {
    async fetchPopularMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=26906062d4fd4de4f857063554f6f6d3&page=1');
        const data = await response.json();
        this.movies = data.results;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 50px;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 40px
}

.movie-card {
  border: 1px solid #fff755dc;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  width: 200px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
