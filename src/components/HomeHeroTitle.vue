<template>
    <section class="section hero" id="home">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-4">
            <img src="@/assets/tucky_logo.webp" class="img-fluid hero-image" alt="hero banner">
          </div>
          <div class="col-md-5">
            <div class="hero-content">
              <h2 class="hero-title">Tucky Studio</h2>
              <p class="section-text">
                A community of developers and students where you can interact and make the team. Explore the science-tech related projects and works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
    .hero {
      padding-top: 150px; /* Adjusted padding top */
      padding-bottom: 150px; /* Adjusted padding bottom */
    }
  
    .hero-image {
      width: 100%; /* Make the image fill its container */
      max-width: 300px; /* Limit maximum width */
      height: auto; /* Maintain aspect ratio */
    }
  
    .hero-content {
      padding: 0 20px; /* Adjusted spacing */
    }
  
    .hero-title {
      font-size: 2.5rem; /* Increase font size */
      margin-bottom: 20px; /* Add space below title */
      font-weight: bold; /* Make title bolder */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Change font */
      color: #333; /* Change title color */
    }
  
    .section-text {
      font-size: 1.2rem; /* Increase font size */
      font-weight: bold; /* Make text bolder */
      color: #666; /* Change text color */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Change font */
    }
  </style>
  
  <script>
  export default {
    name: 'HeroSection',
  }
  </script>
  