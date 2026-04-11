<script setup>
const intro = {
  title: 'Цифровое решение',
  text:
    'Мы создаём цифровой офис продаж, который упрощает выбор квартиры для клиента и ускоряет работу отдела продаж застройщика',
}

const rows = [
  {
    title: 'Виртуальный тур по ЖК',
    subtitle: 'Двор, паркинг, коммерческие помещения, квартиры',
    image: '/image/MainPage/digital-solution1.jpg',
    reverse: false,
  },
  {
    title: 'Демонстрация инфраструктуры',
    subtitle: 'Возможность ознакомиться с инфраструктурой всего района застройки',
    image: '/image/MainPage/digital-solution2.png',
    reverse: true,
  },
  {
    title: 'Инженерный контроль',
    subtitle: 'Цифровой просмотр инженерных систем: фасад, вентиляция, отопление',
    image: '/image/MainPage/digital-solution3.png',
    reverse: false,
  },
]
</script>

<template>
  <section class="viz" id="product" aria-labelledby="viz-heading">
    <div class="viz__inner">
      <h2 id="viz-heading" class="viz__heading">
        Новый уровень <span class="viz__accent">визуализации</span> недвижимости
      </h2>

      <div class="viz__intro">
        <h3 class="viz__intro-title">{{ intro.title }}</h3>
        <p class="viz__intro-text">{{ intro.text }}</p>
      </div>

      <ul class="viz__rows">
        <li
          v-for="(row, i) in rows"
          :key="i"
          class="viz-row"
          :class="{ 'viz-row--reverse': row.reverse }"
        >
          <div class="viz-row__text">
            <h4 class="viz-row__title">{{ row.title }}</h4>
            <p class="viz-row__subtitle">{{ row.subtitle }}</p>
          </div>
          <div class="viz-row__media">
            <div class="viz-pill">
              <img
                class="viz-pill__img"
                :src="row.image"
                alt=""
                width="720"
                height="200"
                loading="lazy"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.viz {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  background: var(--page-bg, #1f1f1f);
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
  padding: var(--site-section-pad-y) 0;
}

.viz__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.viz__heading {
  margin: 0 0 clamp(40px, 5vw, 64px);
  max-width: min(920px, 100%);
  margin-inline: auto;
  font-size: clamp(28px, calc(22px + 2.2vw), 52px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-align: center;
  text-wrap: balance;
}

.viz__accent {
  color: var(--home-accent);
}

.viz__intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
  margin-bottom: clamp(48px, 7vw, 88px);
}

.viz__intro-title {
  margin: 0;
  font-size: clamp(22px, 2.2vw, 36px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--home-accent);
}

.viz__intro-text {
  margin: 0;
  font-size: clamp(15px, 1.25vw, 18px);
  font-weight: 400;
  line-height: 1.55;
  color: #fff;
}

.viz__rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 6vw, 72px);
}

.viz-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(20px, 3.5vw, 40px);
  align-items: center;
}

.viz-row--reverse .viz-row__text {
  order: 2;
}

.viz-row--reverse .viz-row__media {
  order: 1;
}

.viz-row__title {
  margin: 0 0 12px;
  font-size: clamp(18px, 1.5vw, 24px);
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
}

.viz-row__subtitle {
  margin: 0;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
}

.viz-pill {
  position: relative;
  width: 100%;
  aspect-ratio: 18 / 5;
  border-radius: 9999px;
  overflow: hidden;
  margin-inline: 0;
  background: #1a1a1a;
  box-shadow: inset 0 0 28px rgba(0, 0, 0, 0.55);
}

.viz-pill__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 768px) {
  .viz__intro {
    grid-template-columns: 1fr;
  }

  .viz-row {
    grid-template-columns: 1fr;
  }

  .viz-row:not(.viz-row--reverse) .viz-row__text {
    order: 1;
  }

  .viz-row:not(.viz-row--reverse) .viz-row__media {
    order: 2;
  }

  .viz-row--reverse .viz-row__media {
    order: 1;
  }

  .viz-row--reverse .viz-row__text {
    order: 2;
  }
}
</style>
