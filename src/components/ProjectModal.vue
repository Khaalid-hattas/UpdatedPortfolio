<script setup>
defineProps({ type: String })
defineEmits(['close'])

const photoshopWork = [
  { image: 'SAFEHAVENSHELTERcopy.jpg', alt: 'Safe Haven Shelter poster design', tags: 'Poster Design · Typography' },
  { image: 'sandmancopy.jpg', alt: 'Sandman logo concept', tags: 'Logo Design · Brand Identity' },
  { image: 'weddingphotoeditedCopy copy.jpg', alt: 'Edited wedding photograph', tags: 'Digital Art · Photo Manipulation' },
  { image: 'SUNECOLOGOcopy.jpg', alt: 'Suneco logo design', tags: 'Logo · Branding' },
  { image: 'HOMEPAGEmockupcopy.jpg', alt: 'Website homepage mockup', tags: 'UI Mockup · Web Concept' },
  { image: 'PRICING.MOCKUPS copy.jpg', alt: 'Website pricing page mockup', tags: 'Web Layout · Visual Design' },
  { image: 'ABOUTUScopy.jpg', alt: 'Website about page design', tags: 'Corporate Design · Typography' },
  { image: 'GALLERYcopy.jpg', alt: 'Website gallery page design', tags: 'Gallery · Layout' },
  { image: 'CONTACTUScopy.jpg', alt: 'Website contact page design', tags: 'Contact Design · UI' },
]
</script>

<template>
  <div class="modal-backdrop" role="presentation" @click.self="$emit('close')">
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button class="modal-close" aria-label="Close project details" @click="$emit('close')">×</button>

      <h2 id="project-modal-title">
        {{ type === 'photoshop' ? 'Photoshop Creations Gallery' : 'ASP.NET Projects · GameBlink' }}
      </h2>

      <template v-if="type === 'photoshop'">
        <div v-for="item in photoshopWork" :key="item.image">
          <img :src="`/images/${item.image}`" :alt="item.alt" />
          <p class="tags">{{ item.tags }}</p>
        </div>
      </template>

      <template v-else>
        <img src="/images/gameblinkabout.png" alt="GameBlink application homepage" />
        <p class="tags">Full Stack · ASP.NET · SQL Server</p>
        <p>
          <strong>GameBlink</strong> is a dynamic ASP.NET web application designed for gamers to
          explore, manage, and interact with game listings. It combines SQL Server database
          integration with a responsive Bootstrap interface.
        </p>
        <ul>
          <li>Developed using ASP.NET and C#</li>
          <li>Connected to SQL Server for data storage</li>
          <li>Responsive frontend built with Bootstrap</li>
          <li>Deployed through IIS for local testing</li>
        </ul>
        <img src="/images/gameblinkhome.png" alt="GameBlink admin dashboard" />
        <p class="tags">Admin Dashboard · User Management</p>
        <a class="btn-gradient" href="https://github.com/141800764-ux/GameBlink.git" target="_blank" rel="noopener noreferrer">
          View Project on GitHub
        </a>
      </template>
    </div>
  </div>
</template>
