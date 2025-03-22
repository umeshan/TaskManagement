<template>
  <div class="terms-of-service">
    <h2>Terms of Service</h2>
    <p>
      Welcome to Task Manager. These terms and conditions outline the rules and
      regulations for the use of our website and services.
    </p>
</div>
</template>

<script>
export default {
  name: 'TermsOfService',
};
</script>

<style scoped>
.terms-of-service {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  height: 73vh; /* Set a minimum height for the content */
  overflow-y: auto;
}

h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

</style>
