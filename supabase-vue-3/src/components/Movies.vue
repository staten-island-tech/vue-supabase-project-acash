<template>
  <div class="movies">
    <h2>Movies</h2>
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

    <div class="movie-cards">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie Poster">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
        <button @click="showReviewForm(movie.title)">Write Review</button>
      </div>
    </div>

    <div class="reviews">
      <h2>Reviews</h2>
      <div v-for="review in reviews" :key="review.id" class="review-card">
        <h3>{{ review.Title }}</h3>
        <p>Rating: {{ review.Rating }}</p>
        <p>{{ review.Review }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsers } from '../stores/stores.js';

const movies = ref([]);
const selectedMovie = ref("");
const showForm = ref(false);
const rating = ref(1);
const reviewText = ref('');

const userStore = useUsers();

const fetchMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=26906062d4fd4de4f857063554f6f6d3&page=1');
    const data = await response.json();
    console.log(data)
    movies.value = data.results;
  } catch (error) {
    console.log(error);
  }
};
const fetchReviews = async () => {
  try {
    await userStore.reviewdata();
    reviews.value = userStore.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
  }
};
onMounted(async () => {
  await fetchMovies();
  await fetchReviews();
});

const showReviewForm = (title) => {
  console.log('Showing review form for:', title);
  selectedMovie.value = title;
  showForm.value = true;
};

const submitReview = async () => {
  try {
    await userStore.Reviewing({
      Title: selectedMovie.value,
      Rating: rating.value,
      Review: reviewText.value,
    });
    console.log("Nice Opinion");
    showForm.value = false; 
  } catch (error) {
    console.log( error.message);
  }
};
</script>
