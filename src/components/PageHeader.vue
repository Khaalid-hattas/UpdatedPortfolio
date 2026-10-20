<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <section id="page-header">
    <div class="container">
      <h1>{{ title }}</h1>
      <p class="lead">{{ subtitle }}</p>
    </div>
  </section>
</template>
