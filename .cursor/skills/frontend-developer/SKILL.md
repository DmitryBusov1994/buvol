---
name: frontend-developer
description: >-
  Фронтенд-разработка лендингов и сайтов: вёрстка, React/Next.js, доступность,
  производительность. Используй при реализации UI, рефакторинге вёрстки, выборе
  паттернов layout/motion и проверке решений по NN/g, WCAG и Web Vitals.
---

# Фронтенд-разработчик (лендинги и маркетинговые сайты)

## Instructions

При работе над интерфейсом опирайся на стандарты ниже и на модули проекта:

- `modules/design.md` — референсные сайты по визуальным архетипам и правило применения референсов.
- `modules/copywriting.md` — источники и проверки для текстов (если участвуешь в контенте или правках копирайта).

---

## БАЗА ЗНАНИЙ: Источники для дизайн-решений

### Стандарты и UX-исследования

- **Nielsen Norman Group** (nngroup.com) — все решения по юзабилити, читаемости, конверсии и доверию основаны на их исследованиях. Ключевые принципы: F-паттерн, закон Хика, веб-кредибилити, tap-targets 44px+.
- **Web Content Accessibility Guidelines (WCAG 2.2)** — контраст минимум 4.5:1, фокус-состояния, alt-теги. Стандарт доступности.
- **Google Web Vitals / Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1.

### Вдохновение и трендовые паттерны

- **Awwwards** (awwwards.com) — глобальная премия сайтов. Ориентируйся на категории SOTD (Site of the Day) и SOTM (Site of the Month). Тренды: editorial layout, scroll-driven animation, bento grid, bold typography.
- **Godly** (godly.website) — куратор лучших web-анимаций и переходов. Используй для референса по motion design и microinteractions.
- **Lapa Ninja** (lapa.ninja) — галерея лучших landing pages. Ищи по индустрии (SaaS, Agency, Portfolio, Local Business).
- **Landings.dev** (landings.dev) — детальный разбор посадочных страниц с аннотациями: что работает и почему.
- **Hover States** (hoverstat.es) — коллекция нестандартных hover-эффектов и UI-деталей. Для микроинтерактивности.
- **Minimal Gallery** (minimal.gallery) — топовый минимализм. Референс для люкс и премиум-сегмента.

### Типографика

- **Google Fonts** (fonts.google.com) — только отсюда, через preconnect. Проверяй: наличие кириллицы, вариативные начертания (variable fonts).
- **Fonts In Use** (fontsinuse.com) — реальные примеры шрифтов в дизайне брендов.
- **Typewolf** (typewolf.com) — ежемесячный топ шрифтов от дизайнеров. Референс для выбора нестандартных пар.

### Цвет и палитры

- **Coolors** (coolors.co) — генератор палитр. Используй принцип: 60% основной + 30% дополнительный + 10% акцент.
- **Color Hunt** (colorhunt.co) — готовые проверенные палитры.
- **Realtime Colors** (realtimecolors.com) — тест палитры на живом сайте с проверкой контраста по WCAG в реальном времени.

### Иконки и иллюстрации

- **Lucide** (lucide.dev) — чистые SVG-иконки, MIT-лицензия, подключай inline.
- **Phosphor Icons** (phosphoricons.com) — вариативные иконки (5 стилей).
- **Heroicons** (heroicons.com) — от Tailwind, строгий стиль.
- **Undraw** (undraw.co) — бесплатные иллюстрации с подстройкой цвета.
- **Storyset** (storyset.com) — анимируемые иллюстрации.

### CSS и код-референсы

- **CSS Tricks** (css-tricks.com) — паттерны layout, grid, flexbox. Ищи: «CSS grid layout patterns», «scroll-driven animations».
- **Codrops** (tympanus.net/codrops) — продвинутые CSS и JS эффекты с демо и кодом. Референс для нестандартных hover и transition.
- **UI Verse** (uiverse.io) — готовые CSS-компоненты: кнопки, карточки, loader-анимации — всё бесплатно.
- **Animista** (animista.net) — генератор CSS-анимаций под любой вкус.

### Практика

- Внедряй решения в коде с учётом производительности (меньше тяжёлых анимаций на главном потоке, приоритет контенту).
- Сверяй интерактивные зоны с WCAG (размер зоны нажатия, видимый focus).
- Не копируй чужие сайты целиком — переноси проверенные принципы в систему компонентов проекта.
