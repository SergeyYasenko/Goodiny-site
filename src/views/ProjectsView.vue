<script setup lang="ts">
import ProjectsFilterSidebar from '../features/projects/components/ProjectsFilterSidebar.vue'
import ProjectsLeadSection from '../features/projects/components/ProjectsLeadSection.vue'
import ProjectsPortfolioCard from '../features/projects/components/ProjectsPortfolioCard.vue'
import { PROJECTS_HERO_TITLE, PROJECTS_HERO_LEAD } from '../features/projects/constants/projectsPage'
import { useProjectsFilter } from '../features/projects/composables/useProjectsFilter'

const {
  searchQuery,
  selectedObjectTypeId,
  selectedDeviceId,
  filteredProjects,
  toggleObjectType,
  toggleDevice,
} = useProjectsFilter()
</script>

<template>
  <div class="projects-page">
    <header v-scroll-reveal class="projects-page__hero">
      <h1 class="projects-page__title">{{ PROJECTS_HERO_TITLE }}</h1>
      <p class="projects-page__lead">{{ PROJECTS_HERO_LEAD }}</p>
    </header>

    <div v-scroll-reveal class="projects-page__layout">
      <ProjectsFilterSidebar
        class="projects-page__sidebar"
        :search-query="searchQuery"
        :selected-object-type-id="selectedObjectTypeId"
        :selected-device-id="selectedDeviceId"
        @update:search-query="searchQuery = $event"
        @toggle-object-type="toggleObjectType"
        @toggle-device="toggleDevice"
      />

      <div class="projects-page__main">
        <p v-if="filteredProjects.length === 0" v-scroll-reveal class="projects-page__empty">
          Нет проектов по выбранным фильтрам. Измените условия поиска.
        </p>
        <div v-else class="projects-page__list" role="list">
          <div
            v-for="(p, index) in filteredProjects"
            :key="p.id"
            v-scroll-reveal="{ delayMs: Math.min(index * 60, 480) }"
            class="projects-page__list-item"
            role="listitem"
          >
            <ProjectsPortfolioCard :project="p" />
          </div>
        </div>
      </div>
    </div>

    <ProjectsLeadSection />
  </div>
</template>

<style scoped>
.projects-page {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding: var(--site-section-pad-y) var(--home-container-pad-x, 15px);
  box-sizing: border-box;
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
}

.projects-page__hero {
  text-align: center;
  margin-bottom: var(--site-section-pad-y);
}

.projects-page__title {
  margin: 0 auto clamp(16px, 3vw, 24px);
  max-width: min(52rem, 100%);
  font-size: clamp(24px, 2.4vw + 0.5rem, 42px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: #fff;
}

.projects-page__lead {
  margin: 0 auto;
  max-width: min(40rem, 100%);
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.projects-page__layout {
  display: grid;
  grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}

.projects-page__sidebar {
  position: sticky;
  top: calc(var(--app-header-offset, 100px) + 16px);
  max-height: calc(100dvh - var(--app-header-offset, 100px) - 24px);
  overflow-y: auto;
  padding-bottom: 8px;
}

.projects-page__main {
  min-width: 0;
}

.projects-page__list {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3.5vw, 32px);
}

.projects-page__list-item {
  margin: 0;
}

.projects-page__empty {
  margin: 0;
  padding: clamp(24px, 4vw, 40px);
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 800px) {
  .projects-page__layout {
    grid-template-columns: 1fr;
  }

  .projects-page__sidebar {
    position: relative;
    top: auto;
    max-height: none;
    overflow: visible;
    padding-bottom: 0;
  }
}
</style>
