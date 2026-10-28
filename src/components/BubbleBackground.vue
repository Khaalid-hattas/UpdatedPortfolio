<script setup>
const bubbles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 61) % 112 - 6}%`,
  size: `${18 + ((index * 29) % 70)}px`,
  delay: `${-((index * 17) % 240) / 10}s`,
  duration: `${14 + ((index * 11) % 18)}s`,
  drift: `${-8 + ((index * 23) % 17)}vw`,
  opacity: (0.16 + ((index * 13) % 35) / 100).toFixed(2),
}))
</script>

<template>
  <div class="bubble-background" aria-hidden="true">
    <span
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        '--bubble-left': bubble.left,
        '--bubble-size': bubble.size,
        '--bubble-delay': bubble.delay,
        '--bubble-duration': bubble.duration,
        '--bubble-drift': bubble.drift,
        '--bubble-opacity': bubble.opacity,
      }"
    ></span>
  </div>
</template>
