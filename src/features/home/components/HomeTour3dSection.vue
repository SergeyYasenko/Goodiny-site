<script setup>
const cards = [
  {
    caption: "Гостиничный комплекс «Аманауз», ГК Семья",
    image: '/image/MainPage/3d-tour1.jpg',
    href: '#',
  },
  {
    caption: "ЖК «Союз», ГК Родина",
    image: '/image/MainPage/3d-tour2.jpg',
    href: '#',
  },
  {
    caption: "ЖК «Академия», ГК АСИ",
    image: '/image/MainPage/3d-tour3.jpg',
    href: '#',
  },
  {
    caption: "Резиденция «Amazonia», ГК Palladium",
    image: '/image/MainPage/3d-tour4.jpg',
    href: '#',
  },
]

const tour3dColumns = [
  { side: 'left', indices: [0, 2] },
  { side: 'right', indices: [1, 3] },
]
</script>

<template>
  <section class="tour3d" id="projects" aria-labelledby="tour3d-heading">
    <div class="tour3d__inner">
      <h2 id="tour3d-heading" class="tour3d__title">3D Тур</h2>

      <div class="tour3d__board">
        <div
          v-for="col in tour3dColumns"
          :key="col.side"
          class="tour3d__col"
          :class="`tour3d__col--${col.side}`"
          role="list"
        >
          <a
            v-for="i in col.indices"
            :key="i"
            role="listitem"
            class="tour-card"
            :class="`tour-card--slot-${i}`"
            :href="cards[i].href"
            :aria-label="`${cards[i].caption} — открыть 3D тур`"
          >
            <div class="tour-card__surface">
              <img
                class="tour-card__img"
                :src="cards[i].image"
                alt=""
                width="600"
                height="700"
                loading="lazy"
              />
              <div class="tour-card__gradient" aria-hidden="true" />
              <div class="tour-card__footer">
                <p class="tour-card__caption">{{ cards[i].caption }}</p>
                <span class="tour-card__icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M5 5L13 13M13 13H9M13 13V9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tour3d {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  background: var(--page-bg, #1f1f1f);
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
  padding: var(--site-section-pad-y) 0;
}

.tour3d__inner {
  width: 100%;
  max-width: var(--home-tour-container-max, 1320px);
  margin-inline: auto;
  box-sizing: border-box;
  padding-inline: var(--home-container-pad-x, 15px);
}

.tour3d__title {
  margin: 0 0 93px;
  font-size: clamp(28px, 2.5vw + 0.5rem, 42px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
}

.tour3d__board {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 0 clamp(14px, 2vw, 20px);
  box-sizing: border-box;
}

.tour3d__col {
  display: flex;
  flex-direction: column;
  gap: 120px;
  min-width: 0;
  flex: 0 1 var(--home-figure-w, 600px);
  max-width: min(var(--home-figure-w, 600px), calc(50% - 16px));
}

.tour3d__col--left {
  align-items: flex-end;
}

.tour3d__col--right {
  --tour-card-stagger: calc(50% * 700 / 600);
  align-items: flex-start;
}

.tour3d__col--right .tour-card:first-child {
  margin-top: var(--tour-card-stagger);
}

.tour-card {
  display: block;
  width: var(--home-figure-w, 600px);
  max-width: 100%;
  min-width: 0;
  border-radius: 24px;
  text-decoration: none;
  color: inherit;
  box-shadow: 12px 12px 0 0 var(--home-accent);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.tour-card:hover {
  transform: translateY(-3px);
  box-shadow: 14px 14px 0 0 var(--home-accent);
}

.tour-card:focus-visible {
  outline: 2px solid var(--home-accent);
  outline-offset: 4px;
}

.tour-card__surface {
  position: relative;
  width: 100%;
  aspect-ratio: 600 / 700;
  border-radius: 24px;
  overflow: hidden;
  background: #2a2a2a;
}

.tour-card__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.tour-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 38%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0.85) 100%
  );
  pointer-events: none;
}

.tour-card__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: clamp(16px, 2.5vw, 24px);
}

.tour-card__caption {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 700;
  line-height: 1.35;
  color: #fff;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.65);
}

.tour-card__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

@media (max-width: 768px) {
  .tour3d__board {
    display: grid;
    grid-template-columns: min(var(--home-figure-w, 600px), 100%);
    justify-content: center;
    row-gap: clamp(40px, 8vw, 56px);
    column-gap: 0;
    padding-inline: 0;
  }

  .tour3d__col--left,
  .tour3d__col--right {
    display: contents;
  }

  .tour-card--slot-0 {
    grid-row: 1;
  }

  .tour-card--slot-1 {
    grid-row: 2;
  }

  .tour-card--slot-2 {
    grid-row: 3;
  }

  .tour-card--slot-3 {
    grid-row: 4;
  }

  .tour3d__board .tour-card.tour-card--slot-0,
  .tour3d__board .tour-card.tour-card--slot-1,
  .tour3d__board .tour-card.tour-card--slot-2,
  .tour3d__board .tour-card.tour-card--slot-3 {
    margin: 0;
  }

  .tour-card {
    width: min(var(--home-figure-w, 600px), 100%);
    max-width: min(var(--home-figure-w, 600px), 100%);
    box-shadow: 10px 12px 0 0 var(--home-accent);
  }
}
</style>
