<template>
  <div class="about">
    <h2>About Us</h2>
    <p>
      Welcome to Task Manager! We are dedicated to helping individuals and teams
      stay organized and efficient. Our application allows you to manage your
      tasks, set deadlines, and track your progress.
    </p>
    <p>
      Whether you're working on personal projects or collaborating with a team,
      Task Manager is designed to simplify task management and enhance
      productivity.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about {
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
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}
</style>
