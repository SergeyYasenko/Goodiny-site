<script setup lang="ts">
interface LeaderCard {
  name: string
  role: string
  imageSrc: string
  imageAlt: string
}

const leaders: LeaderCard[] = [
  {
    name: 'Арам Петросян',
    role: 'Основатель и генеральный директор',
    imageSrc: '/image/AboutPage/team1.jpg',
    imageAlt: 'Арам Петросян, основатель и генеральный директор',
  },
  {
    name: 'Анастасия Середа',
    role: 'Операционный менеджер',
    imageSrc: '/image/AboutPage/team2.jpg',
    imageAlt: 'Анастасия Середа, операционный менеджер',
  },
]

const team = {
  title: 'Команда',
  text:
    'Штат из 18 профильных специалистов — от разработчиков Unity и AI до инженеров сборки. Обеспечиваем полный цикл внедрения технологий: от идеи до запуска в вашем офисе продаж.',
  imageSrc: '/image/AboutPage/team3.jpg',
  imageAlt: 'Команда GOODINI',
}
</script>

<template>
  <section class="people" aria-labelledby="people-heading">
    <div class="people__inner">
      <h2 id="people-heading" class="people__title">
        Люди, которые создают будущее
        <span class="people__accent">PropTech.</span>
      </h2>

      <div class="people__grid">
        <article v-for="person in leaders" :key="person.name" class="people-card people-card--leader">
          <div class="people-card__media">
            <img
              class="people-card__img"
              :src="person.imageSrc"
              :alt="person.imageAlt"
              width="600"
              height="720"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="people-card__footer">
            <p class="people-card__name">{{ person.name }}</p>
            <p class="people-card__role">{{ person.role }}</p>
          </div>
        </article>

        <article class="people-card people-card--team">
          <div class="people-card__media people-card__media--wide">
            <img
              class="people-card__img"
              :src="team.imageSrc"
              :alt="team.imageAlt"
              width="1200"
              height="520"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="people-card__footer">
            <p class="people-card__name people-card__name--team">{{ team.title }}</p>
            <p class="people-card__team-text">{{ team.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.people {
  flex-shrink: 0;
  padding: var(--site-section-pad-y) 0;
  color: #fff;
  background: var(--page-bg, #1f1f1f);
}

.people__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.people__title {
  margin: 0 0 clamp(40px, 6vw, 64px);
  max-width: min(920px, 100%);
  margin-inline: auto;
  font-size: clamp(28px, 2.5vw + 0.5rem, 44px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-align: center;
  text-wrap: balance;
  color: #fff;
}

.people__accent {
  color: var(--home-accent, #2a6ed8);
}

.people__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 28px);
  align-items: stretch;
}

.people-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: clamp(20px, 2.5vw, 28px);
  overflow: hidden;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.people-card--team {
  grid-column: 1 / -1;
}

.people-card__media {
  position: relative;
  flex: 0 0 auto;
  aspect-ratio: 3 / 4;
  min-height: min(360px, 55vw);
  background: #141414;
}

.people-card__media--wide {
  aspect-ratio: 21 / 9;
  min-height: min(280px, 42vw);
}

.people-card__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.people-card__footer {
  flex: 1 1 auto;
  padding: clamp(18px, 2.5vw, 26px) clamp(18px, 2.5vw, 28px) clamp(22px, 3vw, 30px);
  background: #d9d9d9;
  color: #1a1a1a;
}

.people-card__name {
  margin: 0 0 8px;
  font-size: clamp(17px, 1.4vw, 22px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.people-card__name--team {
  margin-bottom: 12px;
}

.people-card__role {
  margin: 0;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 500;
  line-height: 1.45;
  color: rgba(26, 26, 26, 0.85);
}

.people-card__team-text {
  margin: 0;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(26, 26, 26, 0.9);
}

@media (max-width: 768px) {
  .people__grid {
    grid-template-columns: 1fr;
  }

  .people-card__media {
    aspect-ratio: 4 / 5;
    min-height: 280px;
  }

  .people-card__media--wide {
    aspect-ratio: 16 / 10;
    min-height: 220px;
  }
}
</style>
