<script setup lang="ts">
import { OBJECT_TYPE_FILTERS, DEVICE_FILTERS } from '../constants/projectsPage'
import type { ProjectDeviceId, ProjectObjectTypeId } from '../types/projectsPage'

defineProps<{
  searchQuery: string
  selectedObjectTypeId: ProjectObjectTypeId | null
  selectedDeviceId: ProjectDeviceId | null
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'toggle-object-type': [id: ProjectObjectTypeId]
  'toggle-device': [id: ProjectDeviceId]
}>()
</script>

<template>
  <aside class="proj-filters" aria-label="Фильтры проектов">
    <div class="proj-filters__block">
      <h2 class="proj-filters__heading">Поиск</h2>
      <label class="proj-filters__sr-only" for="projects-search">Клиент</label>
      <input
        id="projects-search"
        class="proj-filters__input"
        type="search"
        autocomplete="off"
        placeholder="Клиент"
        :value="searchQuery"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="proj-filters__block">
      <h2 class="proj-filters__heading">Тип объекта</h2>
      <ul class="proj-filters__list" role="list">
        <li v-for="opt in OBJECT_TYPE_FILTERS" :key="opt.id" class="proj-filters__item">
          <button
            type="button"
            class="proj-filters__chip"
            :class="{ 'proj-filters__chip--active': selectedObjectTypeId === opt.id }"
            @click="emit('toggle-object-type', opt.id)"
          >
            {{ opt.label }}
          </button>
        </li>
      </ul>
    </div>

    <div class="proj-filters__block">
      <h2 class="proj-filters__heading">Устройства</h2>
      <ul class="proj-filters__list" role="list">
        <li
          v-for="opt in DEVICE_FILTERS"
          :key="opt.id"
          class="proj-filters__item"
          :class="{ 'proj-filters__item--indent': opt.indent }"
        >
          <button
            type="button"
            class="proj-filters__chip"
            :class="{ 'proj-filters__chip--active': selectedDeviceId === opt.id }"
            @click="emit('toggle-device', opt.id)"
          >
            {{ opt.label }}
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.proj-filters {
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 40px);
}

.proj-filters__block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.proj-filters__heading {
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--home-accent, #2a6ed8);
}

.proj-filters__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.proj-filters__input {
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.proj-filters__input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.proj-filters__input:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.proj-filters__input:focus-visible {
  border-color: var(--home-accent, #2a6ed8);
  background: rgba(0, 0, 0, 0.35);
}

.proj-filters__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.proj-filters__item--indent {
  padding-left: 10px;
}

.proj-filters__chip {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  line-height: 1.35;
  cursor: pointer;
  transition:
    background 0.12s ease,
    color 0.12s ease;
}

.proj-filters__chip:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.proj-filters__chip--active {
  color: var(--home-accent, #2a6ed8);
  font-weight: 700;
  background: rgba(47, 143, 255, 0.1);
}

.proj-filters__chip:focus-visible {
  outline: 2px solid var(--home-accent, #2a6ed8);
  outline-offset: 2px;
}
</style>
