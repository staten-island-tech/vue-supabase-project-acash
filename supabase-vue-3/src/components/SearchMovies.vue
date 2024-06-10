<template>
    <div class="container">
      <input 
        type="text" 
        v-model="searchQuery" 
        @keyup.enter="searchMovies" 
        placeholder="Search movie here" 
        class="search-bar"
      />
      <button @click="searchMovies" class="search-button">Search</button>
      <div v-if="isLoading" class="loading-text">Loading...</div>
      <div v-else-if="movies.length === 0" class="no-results">No results found.</div>
      <div class="movies-container" v-else>
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <img :src="getPosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster"/>
          <h2 class="movie-title">{{ movie.title }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchMovies',
    data() {
      return {
        movies: [],
        searchQuery: '',
        isLoading: false
      };
    },
    methods: {
      async searchMovies() {
        if (!this.searchQuery.trim()) {
          return;
        }
        this.isLoading = true;
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=26906062d4fd4de4f857063554f6f6d3&query=${this.searchQuery}`);
          const data = await response.json();
          this.movies = data.results;
          this.isLoading = false;
        } catch (error) {
          console.error('Error searching for movies:', error);
          this.isLoading = false;
        }
      },
      getPosterUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .search-bar {
    padding: 10px;
    width: 300px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #fff200;
    color: rgb(0, 0, 0);
    cursor: pointer;
    margin-left: 10px;
  }
  
  .search-button:hover {
    background-color: #fff200;
  }
  
  .loading-text {
    font-size: 16px;
    margin-top: 20px;
  }
  
  .no-results {
    font-size: 16px;
    margin-top: 20px;
    color: #ff0000;
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
  