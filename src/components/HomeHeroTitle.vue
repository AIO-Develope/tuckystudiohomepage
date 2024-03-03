<template>
  <section class="section hero" id="home">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-4">
          <img src="@/assets/tucky_logo.png" class="img-fluid hero-image" alt="hero banner">
        </div>
        <div class="col-md-5">
          <div class="hero-content">
            <h2 class="hero-title">Tucky Studio</h2>
            <p class="section-text">
              Are you passionate about coding, bot development, and all things related to software development? Look no further! Our Discord community is the ultimate destination for enthusiasts, learners, and seasoned developers alike.
            </p>
            <ul class="list-inline hero-list mt-4">
              <li class="list-inline-item hero-item fly-in" style="animation-delay: 0s;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle text-success align-middle mr-1" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                <span class="list-item align-middle mr-2">Coding Help</span>
              </li>
              <li class="list-inline-item hero-item fly-in" style="animation-delay: 0.2s;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle text-success align-middle mr-1" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                <span class="list-item align-middle mr-2">Bot Projects</span>
              </li>
              <li class="list-inline-item hero-item fly-in" style="animation-delay: 0.4s;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle text-success align-middle mr-1" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                <span class="list-item align-middle mr-2">Support Server</span>
              </li>
            </ul>
            <button class="btn btn-outline-primary btn-lg mt-3" @click="joinDiscord">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-item {
  margin-left: 5px;
  margin-right: 9px;
}
.hero {
  padding-top: 100px;
  padding-bottom: 150px;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hero-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.7));
}

.hero-content {
  padding: 0 20px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color-1);
}

.section-text {
  font-size: 1.2rem;
  font-weight: lighter;
  color: var(--text-color-2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.fly-in {
  animation: flyInAnimation 0.8s ease forwards;
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes flyInAnimation {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script>
export default {
  name: 'HeroSection',
  methods: {
    joinDiscord() {
      window.open('https://discord.gg/uDWCwMNjEA', '_blank');
    }
  }
}

</script>