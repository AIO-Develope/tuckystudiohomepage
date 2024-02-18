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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel veniam est voluptate in exercitationem fugiat quasi asperiores neque sequi, amet voluptas harum quae blanditiis laborum quibusdam accusantium odio consequatur veritatis!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 150px;
  padding-bottom: 150px;
  opacity: 0; /* Initially hide the section */
  animation: fadeIn 1s forwards; /* Apply animation on load */
}

@keyframes fadeIn {
  from {
    opacity: 0; /* Start with opacity 0 */
  }
  to {
    opacity: 1; /* End with opacity 1 */
  }
}

.hero-image {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.hero-content {
  padding: 0 20px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.section-text {
  font-size: 1.2rem;
  font-weight: lighter;
  color: #666;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>

<script>
export default {
  name: 'HeroSection',
}
</script>
