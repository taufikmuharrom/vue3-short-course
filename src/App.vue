<template>
  <div class="app-layout">
    <!-- Top Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        <button class="sidebar-toggle" @click="toggleSidebar">
          <span class="hamburger"></span>
          <span class="hamburger"></span>
          <span class="hamburger"></span>
        </button>
        <h1 class="nav-logo">Vue3 Course</h1>
        <div class="nav-actions">
          <!-- You can add additional navbar items here -->
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-header">
        <h2>Navigation</h2>
        <button class="sidebar-close" @click="closeSidebar">&times;</button>
      </div>
      <nav class="sidebar-nav">
        <ul class="sidebar-menu">
          <li v-for="route in navigationRoutes" :key="route.name" class="sidebar-item">
            <router-link :to="route.path" class="sidebar-link" @click="closeSidebar">
              {{ formatRouteName(String(route.name)) }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" :class="{ 'overlay-active': sidebarOpen }" @click="closeSidebar"></div>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'content-shifted': sidebarOpen }">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Sidebar state
const sidebarOpen = ref(false)

// Sidebar methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

// Get navigation routes from router, excluding any routes that shouldn't be in nav
const navigationRoutes = computed(() => {
  return router.getRoutes().filter(route => {
    // Include routes that have a name and aren't hidden
    return route.name && !route.meta?.hideInNav
  })
})

// Format route names for display
const formatRouteName = (name: string) => {
  if (!name) return ''
  
  // Convert kebab-case to Title Case
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style>
/* App Layout */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Top Navbar */
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hamburger {
  width: 20px;
  height: 2px;
  background-color: #ecf0f1;
  transition: all 0.3s ease;
}


/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background-color: #34495e;
  transition: left 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  color: #ecf0f1;
  margin: 0;
  font-size: 1.2rem;
}

.sidebar-close {
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-item {
  margin: 0;
}

.sidebar-link {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.sidebar-link.router-link-active {
  background-color: #2c3e50;
  color: #3498db;
  border-left-color: #3498db;
}

/* Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.overlay-active {
  opacity: 1;
  visibility: visible;
}

/* Main Content */
.main-content {
  margin-top: 80px; /* Account for fixed navbar */
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  transition: margin-left 0.3s ease;
}

/* Desktop: shift content when sidebar is open */
@media (min-width: 769px) {
  .content-shifted {
    margin-left: 280px;
  }
  
  .sidebar-overlay {
    display: none;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .main-content {
    padding: 1rem;
    margin-top: 70px;
  }
  
  .sidebar {
    width: 100%;
    left: -100%;
  }
  
  .sidebar-open {
    left: 0;
  }
}
</style>
