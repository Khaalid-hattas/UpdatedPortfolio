<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)
const isSending = ref(false)
const status = ref({ type: '', message: '' })

const sendMessage = async () => {
  if (isSending.value) return

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    status.value = {
      type: 'error',
      message: 'Email service is not configured yet. Please try again later.'
    }
    return
  }

  isSending.value = true
  status.value = { type: '', message: '' }

  try {
    await emailjs.sendForm(serviceId, templateId, form.value, publicKey)
    status.value = {
      type: 'success',
      message: 'Thanks! Your message has been sent successfully.'
    }
    form.value.reset()
  } catch (error) {
    console.error('EmailJS error:', error)
    status.value = {
      type: 'error',
      message: 'Your message could not be sent. Please try again.'
    }
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <section id="contact-section" class="section contact-page">
    <div class="container">
      <div class="text-center section-heading">
        <h2>Let’s Work Together</h2>
        <p class="muted">Have a project in mind? Send me a message and let’s discuss it.</p>
      </div>
      <div class="two-column contact-grid">
        <div class="contact-info">
          <h4>Get in Touch</h4>
          <p><strong>Email:</strong> khaalidhattas123@gmail.com</p>
          <p><strong>Phone:</strong> +27 65 925 9446</p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/khaalid-hattas-092869352/" target="_blank" rel="noopener noreferrer">LinkedIn profile</a></p>
          <p><strong>Instagram:</strong> <a href="https://instagram.com/khaalid_hattas123" target="_blank" rel="noopener noreferrer">@khaalid_hattas123</a></p>
          <hr />
          <p>I’m available for junior web development opportunities, collaborations, and freelance projects.</p>
        </div>
        <div class="form-card">
          <form ref="form" @submit.prevent="sendMessage">
            <label for="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Enter your name" required />
            <label for="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" required />
            <label for="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Enter subject" />
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell me about your project" required></textarea>
            <button type="submit" class="btn btn-primary full-width" :disabled="isSending">
              {{ isSending ? 'Sending...' : 'Send Message' }}
            </button>
            <p v-if="status.message" class="form-status" :class="status.type" role="status">
              {{ status.message }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
