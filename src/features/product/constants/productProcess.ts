import type { ProductProcessStep } from '../types/productProcess'

export const PRODUCT_PROCESS_SECTION_TITLE_PREFIX = 'От договора до запуска — '

export const PRODUCT_PROCESS_SECTION_TITLE_ACCENT = '4–6 недель'

export const PRODUCT_PROCESS_STEPS: ProductProcessStep[] = [
  {
    num: '01',
    title: 'Дизайн',
    body:
      'Берем ваши BIM, рендеры или AutoCAD. Нет файлов — создадим с нуля. Вы согласовываете каждый этап.',
    badge: '2–4 нед.',
    accent: 'green',
  },
  {
    num: '02',
    title: 'Настройка',
    body: 'Монтируем оборудование в офисе продаж, настраиваем ПО, обучаем менеджеров.',
    badge: '3 дня',
    accent: 'blue',
  },
  {
    num: '03',
    title: 'Демонстрация',
    body:
      'Покупатель изучает проект в 3D. Без доп. девайсов и очков видит интерьеры и дома.',
    badge: 'с 1го дня',
    accent: 'purple',
  },
  {
    num: '04',
    title: 'Поддержка',
    body: 'Изменились планировки — оперативно обновляем. Техподдержка без ограничений.',
    badge: '∞',
    accent: 'red',
  },
]

export const PRODUCT_PROCESS_CTA_TITLE = 'Обсудим ваш проект?'

export const PRODUCT_PROCESS_CTA_LEAD =
  'Покажем демо, подберем комплект, поставим на бронь. 30 минут — онлайн или у вас в офисе.'
