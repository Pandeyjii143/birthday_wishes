// ============ Garland (fairy lights) renderer ============
function renderGarland(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const colors = ['#FFA630', '#F4C95D', '#FF6F3C', '#E85C7B', '#FFA630', '#F4C95D'];
  const width = el.clientWidth || window.innerWidth;
  const bulbCount = Math.max(10, Math.round(width / 60));
  const spacing = width / (bulbCount - 1);

  let wireD = `M0,6`;
  const bulbs = [];
  for (let i = 0; i < bulbCount; i++) {
    const x = i * spacing;
    const dip = 22 + Math.sin(i * 0.6) * 4;
    wireD += ` Q${x - spacing / 2},${dip} ${x},6`;
    bulbs.push({ x, y: dip, color: colors[i % colors.length] });
  }

  const bulbSvgs = bulbs.map(b => `
    <g class="bulb" style="color:${b.color}">
      <line x1="${b.x}" y1="6" x2="${b.x}" y2="${b.y}" stroke="rgba(247,239,224,0.25)" stroke-width="1"/>
      <circle cx="${b.x}" cy="${b.y + 4}" r="4.5" fill="${b.color}"/>
    </g>
  `).join('');

  el.innerHTML = `
    <svg viewBox="0 0 ${width} 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${wireD}" fill="none" stroke="rgba(247,239,224,0.3)" stroke-width="1.5"/>
      ${bulbSvgs}
    </svg>
  `;
}

window.addEventListener('resize', () => {
  document.querySelectorAll('.garland').forEach(g => renderGarland(g.id));
});

// ============ Nav active state ============
function markActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ============ Confetti burst ============
function burstConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FFA630', '#F4C95D', '#FF6F3C', '#E85C7B', '#F7EFE0'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 120,
    y: canvas.height * 0.4 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 12 - 4,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 12,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));

  let frame = 0;
  const gravity = 0.35;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (alive && frame < 260) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

// ============ Candle blow interaction ============
function setupCandle() {
  const cake = document.getElementById('cake');
  if (!cake) return;
  cake.addEventListener('click', () => {
    const alreadyBlown = cake.classList.contains('blown');
    cake.classList.toggle('blown');
    if (!alreadyBlown) {
      burstConfetti();
      const msg = document.getElementById('candle-msg');
      if (msg) msg.textContent = 'Make a wish for Rajkumar — done! 🎉';
    } else {
      const msg = document.getElementById('candle-msg');
      if (msg) msg.textContent = 'Click the candle to blow it out and make a wish.';
    }
  });
}

// ============ Guestbook (localStorage) ============
const GB_KEY = 'rajkumar_birthday_guestbook';

function loadGuestbook() {
  try {
    return JSON.parse(localStorage.getItem(GB_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveGuestbook(entries) {
  localStorage.setItem(GB_KEY, JSON.stringify(entries));
}

function renderGuestbook() {
  const list = document.getElementById('gb-list');
  if (!list) return;
  const entries = loadGuestbook();
  if (entries.length === 0) {
    list.innerHTML = '<p class="gb-empty">No messages yet — be the first to leave a birthday wish for Rajkumar!</p>';
    return;
  }
  list.innerHTML = entries
    .slice()
    .reverse()
    .map(
      e => `
      <div class="gb-entry">
        <span class="who">${escapeHtml(e.name)}</span><span class="when">${e.date}</span>
        <p>${escapeHtml(e.message)}</p>
      </div>`
    )
    .join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setupGuestbookForm() {
  const form = document.getElementById('gb-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput = document.getElementById('gb-name');
    const msgInput = document.getElementById('gb-message');
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) return;
    const entries = loadGuestbook();
    entries.push({
      name,
      message,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    saveGuestbook(entries);
    nameInput.value = '';
    msgInput.value = '';
    renderGuestbook();
    burstConfetti();
  });
}

// ============ Init ============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.garland').forEach(g => renderGarland(g.id));
  markActiveNav();
  setupCandle();
  renderGuestbook();
  setupGuestbookForm();
});
