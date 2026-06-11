const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

const CELL = 62;
const AMPL = 18;
const SPEED = 0.0025;
let W, H, t = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function pt(c, r) {
  const bx = c * CELL;
  const by = r * CELL;
  const dx = AMPL * Math.sin(0.019 * by + c * 0.55 + t)
           + AMPL * 0.35 * Math.sin(0.032 * by - c * 0.28 + t * 0.65);
  const dy = AMPL * Math.sin(0.019 * bx + r * 0.48 + t * 0.82)
           + AMPL * 0.35 * Math.sin(0.028 * bx - r * 0.36 + t * 1.1);
  return [bx + dx, by + dy];
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  const cols = Math.ceil(W / CELL) + 3;
  const rows = Math.ceil(H / CELL) + 3;

  ctx.strokeStyle = 'rgba(180, 210, 255, 0.055)';
  ctx.lineWidth = 0.75;

  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const [x, y] = pt(c - 1, r - 1);
      c === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    for (let r = 0; r <= rows; r++) {
      const [x, y] = pt(c - 1, r - 1);
      r === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  t += SPEED;
  requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
draw();

const strings = {
  en: {
    title:        'A Telegram Client<br>Built Different',
    sub:          'Fast, clean Android client with a focus on performance and design',
    download:     'Download APK',
    screensLabel: 'Screenshots',
    footer:       'Created by DMTech',
  },
  ru: {
    title:        'Telegram-клиент<br>по-другому',
    sub:          'Быстрый, чистый Android-клиент с упором на производительность и дизайн',
    download:     'Скачать APK',
    screensLabel: 'Скриншоты',
    footer:       'Создан DMTech',
  },
};

let lang = 'en';

function applyLang(l) {
  lang = l;
  const btn = document.getElementById('lang-toggle');
  btn.textContent = l === 'en' ? 'RU' : 'EN';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[l][key] !== undefined) {
      el.innerHTML = strings[l][key];
    }
  });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(lang === 'en' ? 'ru' : 'en');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
