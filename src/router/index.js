import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "TaskManager",
    component: () => import("@/views/TaskManager.vue"), // Lazy load the Privacy page
  },
  {
    path: "/privacy-policy",
    name: "Privacy",
    component: () => import("@/views/static/PrivacyPolicy.vue"), // Lazy load the Privacy page
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("@/views/static/AboutUs.vue"), // Lazy load the Privacy page
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () => import("@/views/static/ContactUs.vue"), // Lazy load the Privacy page
  },
  {
    path: "/terms",
    name: "TermsOfService",
    component: () => import("@/views/static/TermsOfService.vue"), // Lazy load the Privacy page
  },
  {
    path: '/:catchAll(.*)',  // This catches all non-existing paths
    name: 'NotFound',
    component: () => import('@/views/static/NotFound.vue'),  // Optional 404 page
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
