<script setup>
import PageHeader from './PageHeader.vue'
import cvUrl from './CV/CURRICULUM VITAE of khaalid Hattas updated-1-2.pdf?url'

defineEmits(['navigate'])

const skillGroups = [
  { name: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Bootstrap'] },
  { name: 'Backend & Data', skills: ['ASP.NET', 'Python', 'SQL'] },
  { name: 'Design', skills: ['Photoshop'] },
]

const journey = [
  {
    title: '2024: Udemy',
    text: ' full-stack Udemy course struggled to finish due to a lack of basics. After improving my fundamentals, I restarted the course and found it much easier to understand.',
  },
  {
    title: '2025 -  College of Cape town',
    text: 'was a student and studied a fullstack course, focusing on full-stack development using ASP.NET and SQL Server.',
  },

  {
    title: '2026: LifeChoices Academy',
    text: 'Started a coding course at LifeChoices Academy, expanding my knowledge in web development, software development, teamwork, and industry best practices. This experience has strengthened my technical skills and prepared me for a career in the growing technology industry.',
  },
]
</script>

<template>
  <PageHeader
    title="About Me"
    subtitle="Get to know more about my journey and skills as a web developer"
  />

  <section id="about" class="section about-page">
    <div class="container">
      <div class="two-column">
        <div class="photo-wrap">
          <img src="/images/myimage.jpg" alt="Khaalid Hattas" />
        </div>

        <div>
          <h2>Who I Am</h2>
          <p>
            Hello! I'm <strong>Khaalid Hattas</strong> — a passionate and detail-oriented web
            developer who enjoys creating dynamic, visually appealing, and user-friendly websites.
            My focus is on building clean and efficient code that brings creative ideas to life.
          </p>
          <p>
            I’ve worked on multiple web-based projects using a variety of technologies and design
            tools, ranging from front-end development to back-end database integration. My goal is
            to continuously grow as a developer and build digital experiences that make an impact.
          </p>

          <div class="skills">
            <h4>Technical Skills</h4>
            <div v-for="group in skillGroups" :key="group.name">
              <strong>{{ group.name }}</strong>
              <span v-for="skill in group.skills" :key="skill" class="badge">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline">
        <h3 class="text-center">My Journey</h3>
        <div v-for="item in journey" :key="item.title" class="timeline-item">
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </div>
      </div>

      <section class="cv-section" aria-labelledby="cv-title">
        <div class="cv-copy">
          <p class="eyebrow">Career snapshot</p>
          <h3 id="cv-title">Curriculum Vitae</h3>
          <p>
            Explore my experience, education, technical skills, and the projects I have worked on.
            You can view my CV here or download a copy for later.
          </p>
          <div class="cv-actions">
            <a
              :href="cvUrl"
              class="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Open CV
            </a>
            <a
              :href="cvUrl"
              class="btn btn-outline-primary"
              download
            >
              Download PDF
            </a>
          </div>
        </div>

        <div class="cv-preview">
          <iframe
            :src="`${cvUrl}#toolbar=0`"
            title="Khaalid Hattas Curriculum Vitae"
          ></iframe>
        </div>
      </section>

      <div class="text-center connect">
        <a
          href="#/contact"
          class="btn btn-primary btn-lg"
          @click="$emit('navigate', 'contact')"
        >
          Let's Connect
        </a>
      </div>
    </div>
  </section>
</template>
