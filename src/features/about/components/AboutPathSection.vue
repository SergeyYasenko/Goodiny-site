<script setup lang="ts">
interface AboutPathStep {
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

const steps: AboutPathStep[] = [
  {
    title: 'Анализ и стратегия',
    text:
      'Погружаемся в ваш проект, изучаем уникальные торговые предложения (USP) и ставим конкретные задачи для отдела продаж.',
    imageSrc: '/image/AboutPage/way-result1.jpg',
    imageAlt: 'Анализ и стратегия проекта',
  },
  {
    title: 'Разработка двойника',
    text:
      'Создаем высокоточный цифровой двойник объекта на базе Unreal Engine 5 с интерактивной навигацией по этажам.',
    imageSrc: '/image/AboutPage/way-result2.jpg',
    imageAlt: 'Цифровой двойник объекта',
  },
  {
    title: 'Брендинг и настройка',
    text:
      'Адаптируем интерфейс под ваш фирменный стиль, настраиваем интеграцию с CRM и синхронизируем данные с сайтом.',
    imageSrc: '/image/AboutPage/way-result3.jpg',
    imageAlt: 'Брендинг и настройка интерфейса',
  },
  {
    title: 'Запуск и обучение',
    text:
      'Устанавливаем оборудование в вашем офисе и проводим полный инструктаж брокеров по работе с системой.',
    imageSrc: '/image/AboutPage/way-result4.jpg',
    imageAlt: 'Запуск и обучение команды',
  },
]
</script>

<template>
  <section class="path" aria-labelledby="path-heading">
    <div class="path__inner">
      <h2 id="path-heading" class="path__title">Путь к результату</h2>

      <ul class="path__rows" role="list">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="path-row"
          :class="{ 'path-row--reverse': i % 2 === 1 }"
        >
          <div class="path-row__text path-card path-card--text">
            <h3 class="path-card__title">{{ step.title }}</h3>
            <p class="path-card__body">{{ step.text }}</p>
          </div>
          <div class="path-row__media path-card path-card--media">
            <img
              class="path-card__img"
              :src="step.imageSrc"
              :alt="step.imageAlt"
              width="640"
              height="420"
              loading="lazy"
              decoding="async"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.path {
  flex-shrink: 0;
  padding: var(--site-section-pad-y) 0;
  color: #fff;
  background: var(--page-bg, #1f1f1f);
}

.path__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.path__title {
  margin: 0 0 clamp(40px, 6vw, 64px);
  font-size: clamp(28px, 2.5vw + 0.5rem, 44px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fff;
}

.path__rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 4vw, 32px);
}

.path-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 28px);
  align-items: stretch;
}

.path-row--reverse .path-row__text {
  order: 2;
}

.path-row--reverse .path-row__media {
  order: 1;
}

.path-card {
  border-radius: clamp(18px, 2vw, 26px);
  box-sizing: border-box;
  min-width: 0;
}

.path-card--text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(24px, 3.5vw, 40px) clamp(22px, 3vw, 36px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.path-card--media {
  position: relative;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #141414;
  aspect-ratio: 4 / 3;
  min-height: min(280px, 50vw);
}

.path-card__title {
  margin: 0 0 clamp(12px, 2vw, 16px);
  font-size: clamp(18px, 1.5vw, 26px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: #fff;
}

.path-card__body {
  margin: 0;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.path-card__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 768px) {
  .path-row {
    grid-template-columns: 1fr;
  }

  .path-row .path-row__text {
    order: 1;
  }

  .path-row .path-row__media {
    order: 2;
  }

  .path-card--media {
    aspect-ratio: 16 / 10;
    min-height: 200px;
  }
}
</style>
