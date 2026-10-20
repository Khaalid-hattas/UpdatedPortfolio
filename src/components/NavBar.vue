<script setup>
defineProps({ active: String, open: Boolean })
defineEmits(['navigate', 'toggle'])

const pages = ['home', 'about', 'projects', 'contact']
</script>
<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="container nav-inner">
      <a class="navbar-brand" href="#/home" @click="$emit('navigate', 'home')">
        <img src="/images/khaalid-portfolio-logo.jpg" alt="Khaalid Hattas logo" class="navbar-logo" />
        Khaalid’s Web Portfolio
      </a>
      <button
        class="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="open"
        @click="$emit('toggle')"
      >
        ☰
      </button>
      <div class="nav-links" :class="{ open }">
        <a
          v-for="page in pages"
          :key="page"
          :class="{ active: active === page }"
          :href="`#/${page}`"
          :aria-current="active === page ? 'page' : undefined"
          @click="$emit('navigate', page)"
        >
          {{ page[0].toUpperCase() + page.slice(1) }}
        </a>
      </div>
    </div>
  </nav>
</template>
