<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const items = [
  {
    title: 'Продуманный дизайн офиса',
    text:
      'Офис разрабатывается под вашу стратегию продаж и профиль клиента — подбираем оптимальное сочетание оборудования и программного обеспечения ещё до старта монтажа.',
    tags: ['Анализ аудитории', 'Подбор оборудования', 'Концепция шоурума'],
  },
  {
    title: 'Настройка офиса',
    text:
      'Поставляем и устанавливаем оборудование, настраиваем программное обеспечение, обеспечиваем техническое сопровождение и поддержку 24/7.',
    tags: ['Монтаж за 3 дня', 'Поддержка 24/7', 'Обучение команды'],
  },
  {
    title: 'Цифровой двойник',
    text:
      'Превращаем строительный проект в интерактивную 3D-голограмму: вид фасадов, планировки квартир, вид из окон с конкретного этажа — всё до начала строительства.',
    tags: ['BIM/AutoCAD/Рендеры', 'Быстрое обновление', 'Все проекты в одном устройстве'],
  },
  {
    title: 'Запуск и поддержка',
    text:
      'Готовим AI-презентации, обучаем менеджеров по продажам адаптивным сценариям показа и создаём интерактивные материалы для каждого проекта.',
    tags: ['AI-презентация', 'Обучение продавцов', 'Контент-обновления'],
  },
]

/**
 * @param {number} index
 */
function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="proc" id="process" aria-labelledby="proc-heading">
    <div class="proc__inner">
      <h2 id="proc-heading" class="proc__heading">
        Интерактивный бизнес-процесс, обеспечивающий
        <span class="proc__accent">высокую конверсию</span>, включает в себя:
      </h2>

      <ul class="proc__list" role="list">
        <li v-for="(item, index) in items" :key="item.title" class="proc-item">
          <div class="proc-item__card" :class="{ 'proc-item__card--open': openIndex === index }">
            <button
              type="button"
              class="proc-item__trigger"
              :aria-expanded="openIndex === index"
              :aria-controls="`proc-panel-${index}`"
              :id="`proc-trigger-${index}`"
              @click="toggle(index)"
            >
              <span class="proc-item__left">
                <span class="proc-item__num" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="proc-item__label">{{ item.title }}</span>
              </span>
              <span class="proc-item__chevron" :class="{ 'proc-item__chevron--open': openIndex === index }">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              :id="`proc-panel-${index}`"
              class="proc-item__panel"
              role="region"
              :aria-labelledby="`proc-trigger-${index}`"
              :hidden="openIndex !== index"
            >
              <p class="proc-item__text">{{ item.text }}</p>
              <ul class="proc-item__tags" aria-label="Ключевые направления">
                <li v-for="tag in item.tags" :key="tag" class="proc-item__tag">{{ tag }}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.proc {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  background: var(--page-bg, #1f1f1f);
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
  padding: var(--site-section-pad-y) 0;
}

.proc__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.proc__heading {
  margin: 0 0 clamp(28px, 4vw, 40px);
  max-width: min(56rem, 100%);
  font-size: clamp(20px, 1.5vw + 0.75rem, 32px);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
  text-align: left;
  text-wrap: balance;
}

.proc__accent {
  color: var(--home-accent);
}

.proc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}

.proc-item {
  margin: 0;
}

/* Вариант 2 — Minimal Neon Line (accordion_block_variants.html) */
.proc-item__card {
  --proc-accent: var(--home-accent, #2a6ed8);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.proc-item__card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 14px;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--proc-accent) 95%, transparent),
    color-mix(in srgb, var(--proc-accent) 16%, transparent)
  );
  opacity: 0.85;
  pointer-events: none;
}

.proc-item__card:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--proc-accent) 28%, rgba(255, 255, 255, 0.07));
}

.proc-item__card--open {
  border-color: color-mix(in srgb, var(--proc-accent) 34%, rgba(255, 255, 255, 0.07));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 12px 28px rgba(0, 0, 0, 0.18);
}

.proc-item__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  padding: 20px 22px 20px 24px;
  border: none;
  border-radius: 22px;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  text-align: left;
  color: #f4f6f8;
  font: inherit;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.25s ease;
}

.proc-item__trigger:focus:not(:focus-visible) {
  outline: none;
}

.proc-item__trigger:focus-visible {
  outline: 2px solid var(--proc-accent);
  outline-offset: 2px;
}

.proc-item__trigger:active {
  color: #f4f6f8;
}

.proc-item__left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
}

.proc-item__num {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.proc-item__label {
  flex: 1 1 auto;
  min-width: 0;
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #f4f6f8;
}

.proc-item__chevron {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--proc-accent) 88%, #fff),
    color-mix(in srgb, var(--proc-accent) 72%, #000)
  );
  box-shadow: 0 10px 24px color-mix(in srgb, var(--proc-accent) 26%, transparent);
  transition: transform 0.25s ease;
}

.proc-item__chevron--open {
  transform: rotate(180deg);
}

.proc-item__panel {
  padding: 0 22px 18px 78px;
}

.proc-item__panel[hidden] {
  display: none;
}

.proc-item__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(244, 246, 248, 0.72);
}

.proc-item__tags {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.proc-item__tag {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid color-mix(in srgb, var(--proc-accent) 38%, rgba(255, 255, 255, 0.12));
}

@media (max-width: 720px) {
  .proc-item__trigger {
    padding: 18px 16px 18px 20px;
    gap: 14px;
  }

  .proc-item__panel {
    padding: 0 16px 16px 16px;
  }

  .proc-item__label {
    font-size: 18px;
  }

  .proc-item__num {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    font-size: 12px;
  }

  .proc-item__chevron {
    width: 36px;
    height: 36px;
  }
}
</style>
