<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 10%;
  height: 58vh;
}

h1 {
  font-size: 6rem;
  color: #ff4a4a;
}

p {
  font-size: 1.5rem;
  color: #333;
}

a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
}

a:hover {
  background-color: #0056b3;
}
</style>
