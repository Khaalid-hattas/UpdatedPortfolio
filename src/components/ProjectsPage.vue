<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import PageHeader from './PageHeader.vue'

defineEmits(['open-modal'])

const projects = [
  {
    image: 'PH.LOGO.jpg',
    alt: 'Photoshop design work',
    title: 'Photoshop Creations',
    text: 'Creative graphic design and digital artwork demonstrating composition, branding, and visual detail.',
    action: 'photoshop',
    button: 'View Gallery',
  },
  {
    image: 'VSCODE.LOGO.jpg',
    alt: 'Frontend development project',
    title: ' Projects',
    text: 'Responsive websites built with HTML, CSS, JavaScript, and Bootstrap, with a focus on clean layouts and intuitive interfaces.',
    action: null,
    button: 'View GitHub',
  },
  {
    image: 'microsoftvisualstudio.jpg',
    alt: 'ASP.NET application project',
    title: 'ASP.NET Applications',
    text: 'Full-stack web projects using ASP.NET, C#, and SQL Server, combining server-side logic with responsive frontend design.',
    action: 'visualstudio',
    button: 'View Case Study',
  },
]

const frontendProjects = [
  {
    title: 'Python Parking System',
    text: 'A parking management system designed for malls and shopping centres.',
    link: 'https://github.com/Khaalid-hattas/python-assignment-511.git',
  },
  {
    title: 'Product Page',
    text: 'A responsive static product page built with HTML and CSS.',
    link: 'https://github.com/Khaalid-hattas/Exercise3-products.git',
  },
  {
    title: 'Python Mini-Toolkit',
    text: 'A small toolkit demonstrating practical Python utilities.',
    link: 'https://github.com/Khaalid-hattas/Python_toolkit.git',
  },
  {
    title: 'Website Project Four',
    text: 'Add a description for another website or application project here.',
    image: '',
    alt: 'Preview of Website Project Four',
    link: '',
  },
  {
    title: 'Website Project Five',
    text: 'Add a description for another website or application project here.',
    image: '',
    alt: 'Preview of Website Project Five',
    link: '',
  },
]

const carouselSlides = [
  {
    image: 'analyticscraper.png',
    alt: 'Add a screenshot for Website Project One',
    title: 'Analytics News Scraper',
    text: 'Site that scrapes live data from the different news sources and displays it in a user-friendly format.',
    tags: ['Vue.js(template)','HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Website', url: 'https://team-alpha-1.onrender.com/' },
      { label: 'GitHub', url: 'https://github.com/Khaalid-hattas/Team-Alpha-python-vue-showcase' },
    ],
  },
  {
    image: 'fitwel.png',
    alt: 'Add a screenshot for Website Project Two',
    title: 'FitWell',
    text: 'A fitness tracking application with workout planning and progress monitoring.',
    tags: [ 'Bootstrap', 'Responsive Design', 'HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Website', url: 'https://fittwell-coach.netlify.app/' },
      { label: 'GitHub', url: 'https://github.com/Khaalid-hattas/fitness-wellness' },
    ],
  },
  {
    image: 'Artisanhub.png',
    alt: 'Add a screenshot for Website Project Three',
    title: 'ArtisanHub',
    text: 'A platform for artisans to showcase and sell their personalised products.',
    tags: ['vue.js', 'HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Website', url: 'https://group6-e-commerce-production.up.railway.app/' },
      { label: 'GitHub', url: 'https://github.com/Khaalid-hattas/Group6-E-COMMERCE.git' },
    ],
  },
]

const currentSlide = ref(0)
let carouselTimer

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const previousSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  carouselTimer = window.setInterval(nextSlide, 7000)
})

onUnmounted(() => {
  window.clearInterval(carouselTimer)
})
</script>

<template>
  <PageHeader title="My Projects" subtitle="A selection of my web development and visual design work" />

  <section class="featured-projects container" aria-labelledby="featured-projects-title">
    <div class="section-heading">
      <h2 id="featured-projects-title">Featured Work</h2>
      <p class="muted">Explore a few highlights from my portfolio.</p>
    </div>

    <div class="project-carousel" aria-live="polite">
      <div class="carousel-slide">
        <img
          v-if="carouselSlides[currentSlide].image"
          :src="`/images/${carouselSlides[currentSlide].image}`"
          :alt="carouselSlides[currentSlide].alt"
        />
        <div v-else class="carousel-image-placeholder" aria-label="Image placeholder">
          Add website image here
        </div>
        <div class="carousel-content">
          <p class="carousel-count">{{ currentSlide + 1 }} / {{ carouselSlides.length }}</p>
          <h3>{{ carouselSlides[currentSlide].title }}</h3>
          <p>{{ carouselSlides[currentSlide].text }}</p>
          <div class="carousel-tags" aria-label="Project technologies">
            <span v-for="tag in carouselSlides[currentSlide].tags" :key="tag" class="tags">
              {{ tag }}
            </span>
          </div>
          <div class="carousel-links">
            <a
              v-for="link in carouselSlides[currentSlide].links"
              :key="link.label"
              class="btn btn-outline-primary"
              :class="{ 'carousel-link-placeholder': !link.url }"
              :href="link.url || '#'"
              :aria-disabled="!link.url"
              :tabindex="link.url ? 0 : -1"
              @click="!link.url && $event.preventDefault()"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>

      <button class="carousel-control previous" type="button" aria-label="Previous project" @click="previousSlide">
        ‹
      </button>
      <button class="carousel-control next" type="button" aria-label="Next project" @click="nextSlide">
        ›
      </button>
    </div>

    <div class="carousel-indicators" aria-label="Choose a featured project">
      <button
        v-for="(slide, index) in carouselSlides"
        :key="slide.title"
        type="button"
        :class="{ active: currentSlide === index }"
        :aria-label="`Show ${slide.title}`"
        :aria-current="currentSlide === index ? 'true' : undefined"
        @click="goToSlide(index)"
      ></button>
    </div>
  </section>

  <section class="project-section container">
    <div
      v-for="(project, index) in projects"
      :key="project.title"
      class="row project align-items-center"
      :class="{ reverse: index === 1 }"
    >
      <div v-if="index === 1" class="project-image-column">
        <div class="project-image">
          <img :src="`/images/${project.image}`" :alt="project.alt" />
        </div>

        <div class="project-extra-slots">
          <div v-for="item in frontendProjects.slice(3)" :key="item.title" class="project-slot">
            <img v-if="item.image" :src="`/images/${item.image}`" :alt="item.alt" class="project-preview" />
            <div v-else class="project-preview-placeholder">Add website preview</div>
            <div class="project-slot-body">
              <h6>{{ item.title }}</h6>
              <p>{{ item.text }}</p>
              <a
                :href="item.link || '#'"
                :class="{ 'project-link-placeholder': !item.link }"
                :aria-disabled="!item.link"
                :tabindex="item.link ? 0 : -1"
                target="_blank"
                rel="noopener noreferrer"
                @click="!item.link && $event.preventDefault()"
              >
                {{ item.link ? 'View on GitHub' : 'Add Project Link' }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="project-image">
        <img :src="`/images/${project.image}`" :alt="project.alt" />
      </div>

      <div class="project-content">
        <h3>{{ project.title }}</h3>
        <p>{{ project.text }}</p>

        <template v-if="index === 1">
          <div v-for="item in frontendProjects.slice(0, 3)" :key="item.title" class="project-slot">
            <h6>{{ item.title }}</h6>
            <p>{{ item.text }}</p>
            <a
              :href="item.link || '#'"
              :class="{ 'project-link-placeholder': !item.link }"
              :aria-disabled="!item.link"
              :tabindex="item.link ? 0 : -1"
              target="_blank"
              rel="noopener noreferrer"
              @click="!item.link && $event.preventDefault()"
            >
              {{ item.link ? 'View on GitHub' : 'Add Project Link' }}
            </a>
          </div>
        </template>

        <button
          v-if="project.action"
          class="btn btn-outline-primary"
          @click="$emit('open-modal', project.action)"
        >
          {{ project.button }}
        </button>
        <a
          v-else
          class="btn btn-outline-primary"
          href="https://github.com/Khaalid-hattas"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ project.button }}
        </a>
      </div>
    </div>
  </section>
</template>
