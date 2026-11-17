// Greedy Hunter: move one square at a time and eat every orb before the
// moves run out. Tap a square next to the hunter, swipe, or use the arrow
// keys (W A S D too). Every board can be won: the moves allowed are never
// fewer than a nearest-orb-first route around it.

const MIN = 5;
const MAX = 12;
const $ = id => document.getElementById(id);

const screens = {start: $('start'), game: $('game')};
const boardEl = $('board');

let size = Number(localStorage.getItem('gh-size')) || 6;
let state = null;
let timer = null;

// ---------- Helpers ----------
const rowOf = i => Math.floor(i / state.n);
const colOf = i => i % state.n;
const distance = (a, b, n) =>
  Math.abs(Math.floor(a / n) - Math.floor(b / n)) + Math.abs((a % n) - (b % n));

const formatTime = ms => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const bestKey = n => `gh-best-${n}`;
const loadBest = n => {
  try {
    return JSON.parse(localStorage.getItem(bestKey(n)));
  } catch (e) {
    return null;
  }
};

// The squares next to the hunter (no wrapping from one row's end to the
// next row's start).
const neighbours = i => {
  const {n} = state;
  const out = [];
  if (rowOf(i) > 0) out.push(i - n);
  if (rowOf(i) < n - 1) out.push(i + n);
  if (colOf(i) > 0) out.push(i - 1);
  if (colOf(i) < n - 1) out.push(i + 1);
  return out;
};

// Moves for a nearest-orb-first route: always enough to win.
const greedyRoute = (start, orbs, n) => {
  let at = start;
  let left = [...orbs];
  let total = 0;
  while (left.length) {
    left.sort((a, b) => distance(at, a, n) - distance(at, b, n));
    total += distance(at, left[0], n);
    at = left.shift();
  }
  return total;
};

// ---------- Start screen ----------
const showSize = () => {
  $('size').textContent = `${size} × ${size}`;
  $('size-hint').textContent = `${size} orbs to find`;
  $('smaller').disabled = size <= MIN;
  $('bigger').disabled = size >= MAX;
  const best = loadBest(size);
  $('best-start').textContent = best
    ? `Your best on ${size} × ${size}: ${formatTime(best.time)}, ${best.moves} moves`
    : '';
};

$('smaller').addEventListener('click', () => {
  size = Math.max(MIN, size - 1);
  showSize();
});
$('bigger').addEventListener('click', () => {
  size = Math.min(MAX, size + 1);
  showSize();
});

const show = name => {
  Object.entries(screens).forEach(([key, el]) => el.classList.toggle('hidden', key !== name));
};

// ---------- A new board ----------
const newGame = () => {
  localStorage.setItem('gh-size', String(size));
  const n = size;
  const cells = [...Array(n * n).keys()];
  for (let i = cells.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const hunter = cells[0];
  const orbs = new Set(cells.slice(1, n + 1));
  const max = Math.max(Math.round((n * n) / 2), greedyRoute(hunter, orbs, n));
  state = {n, hunter, orbs, total: n, eaten: 0, used: 0, max, trail: new Set(), started: 0, over: false};
  clearInterval(timer);
  $('time').textContent = '0:00';
  $('result').classList.add('hidden');
  boardEl.style.setProperty('--n', n);
  boardEl.innerHTML = '';
  for (let i = 0; i < n * n; i += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.dataset.i = i;
    cell.setAttribute('role', 'gridcell');
    cell.addEventListener('click', () => tryMove(i));
    boardEl.appendChild(cell);
  }
  show('game');
  render();
};

// ---------- Drawing ----------
const render = () => {
  const {n, hunter, orbs, eaten, total, used, max, trail} = state;
  const reach = new Set(state.over ? [] : neighbours(hunter));
  [...boardEl.children].forEach((cell, i) => {
    cell.classList.toggle('reach', reach.has(i));
    cell.classList.toggle('trail', trail.has(i) && i !== hunter);
    cell.tabIndex = reach.has(i) ? 0 : -1;
    const want = i === hunter ? 'hunter' : orbs.has(i) ? 'orb' : '';
    if (cell.dataset.has !== want) {
      cell.dataset.has = want;
      cell.innerHTML =
        want === 'hunter'
          ? '<img class="hunter" src="./assets/hunter.png" alt="Hunter" />'
          : want === 'orb'
          ? '<span class="orb" aria-label="Orb"></span>'
          : '';
    }
    cell.setAttribute(
      'aria-label',
      `Row ${Math.floor(i / n) + 1}, column ${(i % n) + 1}${want ? `, ${want}` : ''}`,
    );
  });
  const left = max - used;
  $('orbs').textContent = `${eaten}/${total}`;
  $('moves').textContent = `${left} move${left === 1 ? '' : 's'}`;
  const fill = $('fill');
  fill.style.width = `${(left / max) * 100}%`;
  fill.classList.toggle('low', left / max <= 0.2);
};

// ---------- Moving ----------
const tryMove = to => {
  if (!state || state.over || !neighbours(state.hunter).includes(to)) {
    return;
  }
  if (!state.started) {
    state.started = Date.now();
    timer = setInterval(() => {
      $('time').textContent = formatTime(Date.now() - state.started);
    }, 250);
  }
  state.trail.add(state.hunter);
  state.hunter = to;
  state.used += 1;
  const ate = state.orbs.delete(to);
  if (ate) {
    state.eaten += 1;
    if (navigator.vibrate) navigator.vibrate(18);
  }
  render();
  if (ate) {
    const img = boardEl.children[to].querySelector('.hunter');
    if (img) img.classList.add('chomp');
  }
  if (state.eaten === state.total) {
    finish(true);
  } else if (state.used >= state.max) {
    finish(false);
  }
};

const step = (dr, dc) => {
  if (!state || state.over) return;
  const r = rowOf(state.hunter) + dr;
  const c = colOf(state.hunter) + dc;
  if (r < 0 || c < 0 || r >= state.n || c >= state.n) return;
  tryMove(r * state.n + c);
};

document.addEventListener('keydown', e => {
  if (screens.game.classList.contains('hidden') || !$('result').classList.contains('hidden')) return;
  const keys = {
    ArrowUp: [-1, 0], w: [-1, 0], W: [-1, 0],
    ArrowDown: [1, 0], s: [1, 0], S: [1, 0],
    ArrowLeft: [0, -1], a: [0, -1], A: [0, -1],
    ArrowRight: [0, 1], d: [0, 1], D: [0, 1],
  };
  if (keys[e.key]) {
    e.preventDefault();
    step(...keys[e.key]);
  }
});

// Swipes on the board.
let touch = null;
boardEl.addEventListener('touchstart', e => {
  const t = e.touches[0];
  touch = {x: t.clientX, y: t.clientY};
}, {passive: true});
boardEl.addEventListener('touchend', e => {
  if (!touch) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touch.x;
  const dy = t.clientY - touch.y;
  touch = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 28) return; // a tap: handled by click
  e.preventDefault();
  if (Math.abs(dx) > Math.abs(dy)) step(0, dx > 0 ? 1 : -1);
  else step(dy > 0 ? 1 : -1, 0);
});

// ---------- The end ----------
const finish = won => {
  state.over = true;
  clearInterval(timer);
  const time = state.started ? Date.now() - state.started : 0;
  render();
  $('result-title').textContent = won ? 'Bravo!' : 'Out of moves';
  $('result-text').textContent = won
    ? `You ate all ${state.total} orbs.`
    : `You ate ${state.eaten} of ${state.total} orbs. Try a shorter route.`;
  $('r-orbs').textContent = `${state.eaten}/${state.total}`;
  $('r-time').textContent = formatTime(time);
  $('r-moves').textContent = `${state.used}/${state.max}`;
  let bestText = '';
  if (won) {
    const best = loadBest(state.n);
    if (!best || time < best.time) {
      localStorage.setItem(bestKey(state.n), JSON.stringify({time, moves: state.used}));
      bestText = best ? 'New best time!' : 'Your first win on this board size!';
    } else {
      bestText = `Best on ${state.n} × ${state.n}: ${formatTime(best.time)}`;
    }
  }
  $('r-best').textContent = bestText;
  setTimeout(() => {
    $('result').classList.remove('hidden');
    $('again').focus();
  }, won ? 450 : 300);
};

$('play').addEventListener('click', newGame);
$('again').addEventListener('click', newGame);
$('restart').addEventListener('click', newGame);
const toMenu = () => {
  clearInterval(timer);
  $('result').classList.add('hidden');
  show('start');
  showSize();
};
$('menu').addEventListener('click', toMenu);
$('back').addEventListener('click', toMenu);

showSize();
