<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <h1><router-link to="/">Task Manager</router-link></h1>
      </div>
      <div class="header-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about-us">About</router-link></li>
          <li><router-link to="/contact-us">Contact</router-link></li>
        </ul>
      </div>
    </header>
    <router-view></router-view>
    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Task Manager. All Rights Reserved.</p>
        <div class="footer-links">
          <router-link to="/privacy-policy">Privacy Policy</router-link>
          <router-link to="/terms">Terms Of Service</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

.logo a:hover {
  color: #f0f0f0;
}

.header-nav ul {
  list-style-type: none;
  display: flex;
  gap: 30px;
}

.header-nav a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.header-nav a:hover {
  color: #f39c12;
}

.footer {
  background-color: #34495e;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer p {
  font-size: 14px;
  margin-bottom: 15px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.footer-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #f39c12;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .header-nav ul {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .footer-links {
    flex-direction: column;
  }
}
</style>