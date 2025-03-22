<template>
  <div class="contact-us">
    <h2>Contact Us</h2>
    <p>
      If you have any questions, feel free to reach out to us using the form
      below.
    </p>

    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Your Name"
          @blur="validateField('name')"
        />
        <span class="error-message">{{ errors.name || " " }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Your Email"
          @blur="validateField('email')"
        />
        <span class="error-message">{{ errors.email || " " }}</span>
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Your Message"
          @blur="validateField('message')"
        ></textarea>
        <span class="error-message">{{ errors.message || " " }}</span>
      </div>

      <button
        type="submit"
        class="submit-button"
        :class="{ disabled: isSubmitting }"
        :disabled="isSubmitting"
      >
        Submit
      </button>

      <p class="success-message">{{ successMessage || " " }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      errors: {
        name: "",
        email: "",
        message: "",
      },
      successMessage: "",
      isSubmitting: false, // Controls form submission state
    };
  },
  methods: {
    validateField(field) {
      if (!this.form[field]) {
        this.errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      } else {
        this.errors[field] = "";
      }
    },
    submitForm() {
      Object.keys(this.form).forEach((field) => this.validateField(field));

      if (Object.values(this.errors).some((error) => error)) {
        return;
      }

      this.isSubmitting = true;

      this.successMessage =
        "Thank you for contacting us! We will get back to you shortly.";

      this.resetForm();

      setTimeout(() => {
        this.isSubmitting = false;
        this.successMessage = "";
      }, 3000);
    },

    resetForm() {
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.contact-us {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  height: 73vh;
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

.error-message {
  color: red;
  font-size: 14px;
  min-height: 18px;
  margin-top: 5px;
  display: block;
}

.success-message {
  color: green;
  font-size: 16px;
  min-height: 18px;
  margin-top: 15px;
  text-align: center;
  display: block;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4caf50;
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

.submit-button.disabled {
  pointer-events: none;
}
</style>
