<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import ProjectsPage from './components/ProjectsPage.vue'
import ContactPage from './components/ContactPage.vue'
import ProjectModal from './components/ProjectModal.vue'
import GamePage from './components/GamePage.vue'
import BubbleBackground from './components/BubbleBackground.vue'

const route = ref(window.location.hash.replace('#/', '') || 'game')
const menuOpen = ref(false)
const modal = ref(null)
const isLightMode = ref(localStorage.getItem('portfolio-theme') === 'light')
const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  localStorage.setItem('portfolio-theme', isLightMode.value ? 'light' : 'dark')
}

const navigate = (page) => {
  window.location.hash = `/${page}`
  menuOpen.value = false
  scrollToTop()
}

const syncRoute = () => {
  route.value = window.location.hash.replace('#/', '') || 'game'
  scrollToTop()
}
onMounted(() => window.addEventListener('hashchange', syncRoute))
onUnmounted(() => window.removeEventListener('hashchange', syncRoute))
</script>

<template>
  <GamePage v-if="route === 'game'" @complete="navigate('home')" />

  <template v-else>
    <div class="site-shell" :data-theme="isLightMode ? 'light' : 'dark'">
      <BubbleBackground />
      <NavBar
        :active="route"
        :open="menuOpen"
        :light-mode="isLightMode"
        @navigate="navigate"
        @toggle="menuOpen = !menuOpen"
        @toggle-theme="toggleTheme"
      />
      <main>
        <HomePage v-if="route === 'home'" @navigate="navigate" />
        <AboutPage v-else-if="route === 'about'" @navigate="navigate" />
        <ProjectsPage v-else-if="route === 'projects'" @open-modal="modal = $event" />
        <ContactPage v-else />
      </main>
      <ProjectModal v-if="modal" :type="modal" @close="modal = null" />
      <SiteFooter />
    </div>
  </template>
</template>
