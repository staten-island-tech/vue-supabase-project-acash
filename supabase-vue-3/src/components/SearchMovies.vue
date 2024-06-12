<template>
  <div class="container">
    <input 
      type="text" 
      v-model="searchQuery" 
      @keyup.enter="searchMovies" 
      placeholder="Search movie here" 
      class="search-bar"
    />
    <div v-if="showForm">
      <h3>Write Review for {{ selectedMovie }}</h3>
      <form @submit.prevent="submitReview">
        <label for="rating">Rating (out of 5):</label>
        <input type="number" id="rating" v-model="rating" min="1" max="5" required>
        <label for="reviewText">Review:</label>
        <textarea id="reviewText" v-model="reviewText" required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
    <button @click="searchMovies" class="search-button">Search</button>
    <div v-if="isLoading" class="loading-text">Loading...</div>
    <div v-else-if="movies.length === 0" class="no-results">No results found.</div>
    <div class="movies-container" v-else>
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <button @click="showReviewForm(movie.title)">Write Review</button>
        <img :src="getPosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster"/>
        <h2 class="movie-title">{{ movie.title }}</h2>
      </div>
    </div>

   
  </div>

  <div class="reviews">
      <h2>Reviews</h2>
      <div v-if="reviews.length === 0">No reviews available.</div>
      <div v-else>
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <h3>{{ review.Title }}</h3>
          <p>Rating: {{ review.Rating }}</p>
          <p>{{ review.Review }}</p>
        </div>
      </div>
    </div>
 
</template>

<script>
import { onMounted, ref } from 'vue';
import { useUsers } from '../stores/stores';

export default {
  name: 'SearchMovies',
  data() {
    return {
      movies: [],
      searchQuery: '',
      isLoading: false,
      selectedMovie: '',
      showForm: false,
      rating: 1,
      reviewText: '',
      reviews: [],
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

    async fetchReviews() {
      const userStore = useUsers();
      try {
        await userStore.reviewdata();
        this.reviews = userStore.reviews;
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },

    async fetchMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=26906062d4fd4de4f857063554f6f6d3&page=1');
        const data = await response.json();
        this.movies = data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  
    showReviewForm(title) {
      this.selectedMovie = title;
      this.showForm = true;
    },
    
    async submitReview() {
      const userStore = useUsers();
      try {
        await userStore.Reviewing({
          Title: this.selectedMovie,
          Rating: this.rating,
          Review: this.reviewText,
        });
        console.log("Review submitted");
        this.showForm = false;
        await this.fetchReviews();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  },


  async mounted() {
    await this.fetchMovies();
    await this.fetchReviews();
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
  gap: 40px;
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