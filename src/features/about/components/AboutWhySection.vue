<script setup lang="ts">
interface WhyCard {
  iconSrc: string
  title: string
  text: string
}

const stats = [
  {
    kind: 'simple',
    value: '5',
    lines: ['лет специализации на', 'PropTech рынке.'],
  },
  {
    kind: 'simple',
    value: '18+',
    lines: ['крупнейших девелоперов', 'выбрали наши решения.'],
  },
  {
    kind: 'simple',
    value: '40+',
    lines: ['проектов реализовано для', 'застройщиков и госструктур.'],
  },
  {
    kind: 'prefixed',
    prefix: 'на',
    value: '30%',
    lines: [
      'увеличение конверсии за счёт внедрения наших технологий',
      'в отдел продаж',
    ],
  },
]

const cards: WhyCard[] = [
  {
    iconSrc: '/icons/rocket-icon.svg',
    title: 'Собственное производство:',
    text:
      'Запатентованные технологии и полный цикл сборки. Создаём кастомные конфигурации оборудования под архитектуру и задачи вашего офиса.',
  },
  {
    iconSrc: '/icons/graph-icon.svg',
    title: 'Уникальное ПО (Digital Twin):',
    text:
      'Наш софт — это не просто картинка, а интерактивный мир с AI-консультантом и сменой времени суток.',
  },
  {
    iconSrc: '/icons/win-cup-icon-1.svg',
    title: 'WOW–эффект:',
    text:
      'Технологии, которые удивляют. Мы создаём эффект полного погружения, превращая презентацию в шоу, которое запоминается и ускоряет принятие решения о покупке.',
  },
]
</script>

<template>
  <section class="why" aria-labelledby="why-heading">
    <div class="why__inner">
      <h1 id="why-heading" class="why__title">
        Почему <span class="why__title-accent">выбирают</span>
      </h1>

      <ul class="why__stats" role="list">
        <li
          v-for="(item, i) in stats"
          :key="i"
          class="why-stat"
          :class="{ 'why-stat--prefixed': item.kind === 'prefixed' }"
        >
          <template v-if="item.kind === 'simple'">
            <span class="why-stat__value">{{ item.value }}</span>
            <p v-for="(line, j) in item.lines" :key="j" class="why-stat__line">{{ line }}</p>
          </template>
          <template v-else>
            <div class="why-stat__value-row">
              <span class="why-stat__prefix">{{ item.prefix }}</span>
              <span class="why-stat__value why-stat__value--large">{{ item.value }}</span>
            </div>
            <p v-for="(line, j) in item.lines" :key="j" class="why-stat__line">{{ line }}</p>
          </template>
        </li>
      </ul>

      <ul class="why__cards" role="list">
        <li v-for="(card, i) in cards" :key="i" class="why-card">
          <div class="why-card__icon" aria-hidden="true">
            <img
              class="why-card__icon-img"
              :src="card.iconSrc"
              alt=""
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 class="why-card__title">{{ card.title }}</h2>
          <p class="why-card__text">{{ card.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.why {
  flex: 1;
  padding: var(--site-section-pad-y) 0;
}

.why__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.why__title {
  margin: 0 0 clamp(40px, 6vw, 64px);
  font-size: clamp(28px, 2.5vw + 0.5rem, 44px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fff;
}

.why__title-accent {
  color: var(--home-accent, #2a6ed8);
}

.why__stats {
  list-style: none;
  margin: 0 0 clamp(48px, 7vw, 80px);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 32px);
  align-items: start;
}

.why-stat {
  text-align: center;
}

.why-stat__value {
  display: block;
  margin-bottom: 12px;
  font-size: clamp(36px, 4vw + 1rem, 56px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--home-accent, #2a6ed8);
}

.why-stat__value-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 6px 8px;
  margin-bottom: 12px;
}

.why-stat__prefix {
  font-size: clamp(16px, 1.4vw, 20px);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1;
}

.why-stat__value--large {
  display: inline;
  margin-bottom: 0;
  font-size: clamp(36px, 4vw + 1rem, 56px);
}

.why-stat__line {
  margin: 0;
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 400;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.88);
}

.why-stat__line + .why-stat__line {
  margin-top: 2px;
}

.why__cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 2.5vw, 28px);
  align-items: stretch;
}

.why-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px) clamp(28px, 3.5vw, 36px);
  border-radius: 20px;
  background: var(--home-accent, #2a6ed8);
  box-shadow: 0 16px 40px rgba(47, 143, 255, 0.22);
  text-align: left;
}

.why-card__icon {
  width: 72px;
  height: 72px;
  margin-bottom: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.why-card__icon-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.why-card__title {
  margin: 0 0 14px;
  width: 100%;
  font-size: clamp(16px, 1.35vw, 18px);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
}

.why-card__text {
  margin: 0;
  width: 100%;
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 900px) {
  .why__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .why__cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .why__stats {
    grid-template-columns: 1fr;
  }
}
</style>
