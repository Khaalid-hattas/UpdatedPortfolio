<script setup>
defineEmits(['navigate'])

const projects = [
  {
    image: 'PH.LOGO.jpg',
    title: 'Photoshop Work',
    text: 'Visual design work focused on composition, branding, and digital artwork.',
    button: 'View Work',
  },
  {
    image: 'VSCODE.LOGO.jpg',
    title: 'VS Code Projects',
    text: 'Responsive websites built with HTML, CSS, JavaScript, and Bootstrap.',
    button: 'View Projects',
  },
  {
    image: 'visualstudio22.jpg',
    title: 'ASP.NET Applications',
    text: 'Full-stack applications using ASP.NET, C#, and SQL Server.',
    button: 'View Projects',
  },
]
</script>

<template>
  <section id="hero">
    <div class="container hero-content">
      <h1>Hello, I’m <span class="text-warning">Khaalid Hattas</span></h1>
      <p class="lead">A junior web developer creating responsive, practical, and user-focused digital experiences.</p>
      <a href="#/projects" class="btn btn-light btn-lg" @click="$emit('navigate', 'projects')">
        View My Work
      </a>
    </div>
  </section>

  <section id="about" class="section">
    <div class="container two-column about-home">
      <div class="photo-wrap">
        <img src="/images/myimage.jpg" alt="Portrait of Khaalid Hattas, web developer" />
      </div>
      <div>
        <h2>Building with purpose</h2>
        <p>
          I’m a web developer focused on creating responsive websites and applications that are
          clear, accessible, and easy to use.
        </p>
        <p><strong>Core technologies:</strong> HTML, CSS, JavaScript, Vue, ASP.NET, Python, and SQL.</p>
        <a href="#/about" class="btn btn-primary" @click="$emit('navigate', 'about')">More About Me</a>
        <a href="#/contact" class="btn btn-outline-primary" @click="$emit('navigate', 'contact')">Contact Me</a>
      </div>
    </div>
  </section>

  <section id="projects" class="section bg-light">
    <div class="container">
      <div class="text-center section-heading">
        <h2>Selected Work</h2>
        <p class="muted">A selection of my web development and visual design projects.</p>
      </div>
      <div class="cards">
        <article v-for="project in projects" :key="project.title" class="card project-card">
          <img :src="`/images/${project.image}`" :alt="project.title" />
          <div class="card-body">
            <h3>{{ project.title }}</h3>
            <p>{{ project.text }}</p>
            <a href="#/projects" class="btn btn-outline-primary" @click="$emit('navigate', 'projects')">
              {{ project.button }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="contact" class="section text-center">
    <div class="container">
      <h2>Let’s create something useful</h2>
      <p class="muted">Have an idea or opportunity? I’d be happy to hear from you.</p>
      <a href="#/contact" class="btn btn-primary" @click="$emit('navigate', 'contact')">Start a Conversation</a>
    </div>
  </section>
</template>
