<template>
  <div class="contact-us">
    <h2>Contact Us</h2>
    <p>If you have any questions, feel free to reach out to us using the form below.</p>

    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Your Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Your Email"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Your Message"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      // Here you can add the logic for submitting the form, such as sending the data to an API.
      console.log('Form submitted', this.form);
      alert('Thank you for contacting us! We will get back to you shortly.');
      this.resetForm();
    },
    resetForm() {
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.contact-us {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  height: 73vh; /* Set a minimum height for the content */
}

h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 18px;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  height: 150px;
  resize: vertical;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
