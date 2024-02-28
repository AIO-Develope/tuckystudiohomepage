<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="container px-4 py-5">
    <h2 class="pb-1 border-bottom">Features</h2>

    <div class="col">
      <div class="row row-cols-1 row-cols-sm-2 g-4">
        <div class="col d-flex flex-column gap-3" v-for="(feature, index) in features" :key="index">
          <div class="feature-container" @mouseover="hoverIcon(index)" @mouseleave="resetIcon()">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-3 rounded-3">
              <i class="fa" :class="[feature.icon, { 'scale-up': isHovered === index }]"></i>
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis fs-6">{{ feature.title }}</h4>
            <p class="text-body-secondary fs-7">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        { title: "Coding Help and Support", description: "Stuck on a coding problem? Our community is here to help! Exchange ideas, seek advice, and collaborate with like-minded individuals who are eager to assist you in overcoming any coding challenges.", icon: "fa fa-support" }, 
        { title: "Bot Development Playground", description: "Dreaming of creating your own Discord bot? Join our dedicated channels for bot development, where you can share your progress, seek feedback, and collaborate with other developers to enhance your bot-building skills.", icon: "fa fa-gear" }, 
        { title: "Coding Courses for All Levels", description: "Elevate your coding skills with our curated coding courses. Whether you're a beginner looking to grasp the basics or an experienced developer aiming to master advanced concepts, we have courses tailored for every level.", icon: "fa fa-tachometer" }, 
        { title: "Designer and Developer Market", description: "Connect with fellow creatives! Our community features a dedicated space for designers and developers to showcase their portfolios, find collaborators, or even explore opportunities for freelance projects. It's the perfect marketplace for talent!", icon: "fa fa-table" }
      ],
      isHovered: null
    };
  },
  methods: {
    hoverIcon(index) {
      this.isHovered = index;
    },
    resetIcon() {
      this.isHovered = null;
    }
  }
};
</script>

<style scoped>
.feature-icon-small {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.scale-up {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.feature-container .feature-icon-small {
  transition: transform 0.3s ease;
}

.feature-container:hover .feature-icon-small {
  transform: scale(1.1);
}
</style>
