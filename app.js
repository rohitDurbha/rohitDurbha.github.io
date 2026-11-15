
(() => {
  const root = document.documentElement;
  const cv = document.getElementById('field');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;

  /* ---------- build the page from content.js ---------- */
  const S = window.SITE;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cells = (fill, of) => '<div class="cells" style="grid-template-columns:repeat(' + of + ',1fr)">' +
    Array.from({ length: of }, (_, i) => '<i' + (i < fill ? ' class="on"' : '') + '></i>').join('') + '</div>';
  const stat = s => '<div class="stat"><dd>' + esc(s.value) + '</dd><dt>' + esc(s.label) + '</dt>' + (s.fill != null ? cells(s.fill, s.of || 20) : '') + '</div>';
  const slot = (fig, accent, cls) => '<div class="slot' + (cls ? ' ' + cls : '') + '" data-fig="' + esc(fig) + '" data-accent="' + esc(accent) + '" aria-hidden="true"></div>';
  const ext = 'target="_blank" rel="noopener"';

  (function render() {
    const h = [];
    h.push('<section class="entry hero"><div class="copy"><h1 data-morph="pointer">' + esc(S.name) + '</h1>' +
      '<p class="lede">' + esc(S.hero.lede) + '</p><p>' + esc(S.hero.intro) + '</p><div class="actions">' +
      '<a class="btn" href="#' + esc(S.entries[0].id) + '"><span class="glyph"></span>See the work</a>' +
      '<a class="btn tri-first" href="' + esc(S.resume) + '" ' + ext + '><span class="glyph tri"></span>Read my resume</a>' +
      '</div></div>' + slot(S.hero.figure, S.hero.accent) + '</section>');

    S.entries.forEach((e, i) => {
      const research = e.kind === 'research';
      h.push('<section class="entry' + (i % 2 === 0 ? ' flip' : '') + '" id="' + esc(e.id) + '" style="--accent:var(--' + esc(e.accent) + ')"><div class="copy">' +
        '<p class="tagline"><span class="glyph' + (research ? ' tri' : '') + '"></span>' + (research ? 'Research' : 'Build') + ' entry ' + String(i + 1).padStart(3, '0') + '</p>' +
        '<h2 data-morph>' + esc(e.title) + '</h2><p>' + esc(e.body) + '</p>' +
        (e.stats && e.stats.length ? '<dl class="stats">' + e.stats.map(stat).join('') + '</dl>' : '') +
        (e.stack ? '<p class="stack">' + esc(e.stack) + '</p>' : '') +
        (e.link ? '<a href="' + esc(e.link.url) + '" ' + ext + '>' + esc(e.link.label) + '</a>' : '') +
        '</div>' + slot(e.figure, e.accent) + '</section>');
    });

    if (S.more && S.more.items.length) {
      h.push('<section class="more" id="more"><h2 data-morph>' + esc(S.more.title) + '</h2><ul class="rows">' +
        S.more.items.map(m => '<li><a href="' + esc(m.url) + '" ' + ext + '><span class="glyph"></span><span class="name">' + esc(m.name) + '</span><span class="what">' + esc(m.what) + '</span></a></li>').join('') +
        '</ul></section>');
    }

    const w = S.work;
    h.push('<section class="work" id="' + esc(w.id) + '" style="--accent:var(--' + esc(w.accent) + ')">' +
      '<div class="work-head"><p class="tagline"><span class="glyph"></span>' + esc(w.role) + ', ' + esc(w.place) + '</p>' +
      '<h2 data-morph>' + esc(w.company) + '</h2>' +
      '<div class="months">' + cells(w.months, w.months) + '<span>' + esc(w.dates) + '</span></div>' +
      '<p>' + esc(w.intro) + '</p></div>' +
      '<div class="work-grid"><ul class="threads">' +
      w.threads.map((t, i) => '<li class="thread' + (i === 0 ? ' open' : '') + '" data-fig="' + esc(t.figure) + '">' +
        '<button type="button" aria-expanded="' + (i === 0) + '" aria-controls="thread-' + i + '"><span class="val">' + (t.value ? esc(t.value) : '') + '</span><span class="ttl">' + esc(t.title) + '</span><span class="glyph"></span></button>' +
        '<div class="panel" id="thread-' + i + '"><div><div class="inner">' + slot(t.figure, w.accent, 'mslot') +
        '<p>' + esc(t.body) + '</p>' + (t.label ? '<p class="lab">' + esc(t.label) + '</p>' : '') +
        (t.caption ? '<p class="cap"><span class="glyph tri"></span><span>' + esc(t.caption) + '</span></p>' : '') +
        '</div></div></div></li>').join('') +
      '</ul>' + slot(w.threads[0].figure, w.accent, 'wslot') + '</div>' +
      '<div class="work-foot"><div><h3>Toolkit</h3><dl class="kit">' +
      w.toolkit.map(k => '<div><dt>' + esc(k.group) + '</dt><dd>' + esc(k.items) + '</dd></div>').join('') + '</dl></div>' +
      '<div><h3>Education</h3><div class="school">' +
      w.education.map(e => '<p><span class="glyph tri" style="margin-right:.6rem"></span>' + esc(e) + '</p>').join('') + '</div></div></div></section>');

    const o = S.offHours;
    h.push('<section class="entry flip" id="' + esc(o.id) + '" style="--accent:var(--' + esc(o.accent) + ')"><div class="copy"><h2 data-morph>' + esc(o.title) + '</h2>' +
      o.paragraphs.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>' + slot(o.figure, o.accent) + '</section>');

    const c = S.contact, short = u => u.replace(/^https?:\/\/(www\.)?/, '');
    h.push('<section class="entry" id="' + esc(c.id) + '" style="--accent:var(--' + esc(c.accent) + ')"><div class="copy"><h2 data-morph>' + esc(c.title) + '</h2><p>' + esc(c.body) + '</p><div class="contact-links">' +
      '<a href="mailto:' + esc(c.email) + '"><span class="glyph"></span>' + esc(c.email) + '</a>' +
      '<a href="' + esc(c.linkedin) + '" ' + ext + '><span class="glyph"></span>LinkedIn<small>' + esc(short(c.linkedin)) + '</small></a>' +
      '<a href="' + esc(c.github) + '" ' + ext + '><span class="glyph"></span>GitHub<small>' + esc(short(c.github)) + '</small></a>' +
      '<a href="' + esc(S.resume) + '" ' + ext + '><span class="glyph"></span>Resume<small>PDF</small></a>' +
      '</div></div>' + slot(c.figure, c.accent) + '</section>');

    document.getElementById('top').innerHTML = h.join('');
    document.getElementById('me-name').textContent = S.name;
    document.getElementById('foot').textContent = S.name + ', ' + new Date().getFullYear();
    const firstR = S.entries.find(e => e.kind === 'research'), firstB = S.entries.find(e => e.kind === 'build');
    const nav = [];
    if (firstR) nav.push(['Research', firstR.id]);
    if (firstB) nav.push(['Builds', firstB.id]);
    nav.push(['Experience', w.id], [o.title, o.id], ['Contact', c.id]);
    document.getElementById('nav').innerHTML = nav.map(n => '<a href="#' + esc(n[1]) + '">' + esc(n[0]) + '</a>').join('');
  })();

  /* ---------- Bayer matrix ---------- */
  function bayer(n) {
    let m = [[0]];
    for (let s = 1; s < n; s *= 2) {
      const nx = Array.from({ length: s * 2 }, () => []);
      for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
        const v = 4 * m[y][x];
        nx[y][x] = v; nx[y][x + s] = v + 2; nx[y + s][x] = v + 3; nx[y + s][x + s] = v + 1;
      }
      m = nx;
    }
    return m;
  }
  const BM = bayer(8), THR = new Float32Array(64);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) THR[y * 8 + x] = (BM[y][x] + 0.5) / 64;

  /* ---------- hashing and noise ---------- */
  function hash(x, y) {
    let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    let fx = x - xi, fy = y - yi;
    fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }
  const sstep = (a, b, x) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  let seed = 7;
  const rnd = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(TAU * rnd());

  /* ---------- figures: each returns a function of (u, v) in 0..1 ---------- */
  const CL = [[.2, .68], [.38, .3], [.58, .62], [.8, .26], [.84, .74]];
  const PTS = [];
  CL.forEach((c, k) => { for (let i = 0; i < 11; i++) PTS.push([c[0] + gauss() * .055, c[1] + gauss() * .07, rnd() * TAU, k]); });
  const QP = PTS[2], RP = PTS[36];
  const HOT = [[.1, .38, .075], [.43, .64, .09], [.6, .16, .08], [.83, .52, .085]];
  const ROUTE = [[.06, .9], [.2, .74], [.25, .5], [.42, .36], [.6, .42], [.73, .27], [.94, .1]];

  const SEGC = [[.26, .3, .5, .5], [.72, .28, .56, .44], [.3, .74, .44, .56], [.74, .72, .5, .58]];
  const SEGP = [];
  SEGC.forEach(c => { for (let i = 0; i < 13; i++) SEGP.push([c[0] + gauss() * .07, c[1] + gauss() * .075]); });

  const FIGS = {
    signal: (t, a, du, dv) => (u, v) => {
      const y = .5 + .2 * Math.sin(TAU * (1.3 * u - t * .12)) + .07 * Math.sin(TAU * (3.1 * u + t * .07));
      const d = v - y;
      const side = sstep(0, .1, u) * sstep(0, .1, 1 - u);
      if (Math.abs(d) < Math.max(.012, dv * 1.3)) return side > .5 ? 1 : side * 1.6;
      return d > 0 ? .72 * Math.exp(-d * 4.2) * side : 0;
    },
    bars: (t) => {
      const s = .5 - .5 * Math.cos(t * .55);
      return (u, v) => {
        const yv = .96 - v;
        if (yv < 0) return yv > -.012 ? 1 : 0;
        const f = u * 20, i = Math.floor(f), fr = f - i;
        if (fr < .16 || fr > .84) return 0;
        const h = .05 + .85 * Math.exp(-i * .27);
        if (yv < h) return 1;
        const top = h < .74 ? h + (.74 - h) * s : h;
        return yv < top ? .42 : 0;
      };
    },
    scatter: (t, a) => {
      const P = PTS.map(p => [p[0] + .006 * Math.sin(t * .7 + p[2]), p[1] + .006 * Math.cos(t * .6 + p[2])]);
      const q = P[2], r = P[36];
      const sx = (r[0] - q[0]) * a, sy = r[1] - q[1], sl = sx * sx + sy * sy;
      const pulse = .035 + .012 * Math.sin(t * 2.2);
      return (u, v) => {
        let val = 0;
        for (let k = 0; k < CL.length; k++) {
          const dx = (u - CL[k][0]) * a, dy = v - CL[k][1];
          val += .3 * Math.exp(-(dx * dx + dy * dy) / .022);
        }
        for (let i = 0; i < P.length; i++) {
          const dx = (u - P[i][0]) * a, dy = v - P[i][1], d2 = dx * dx + dy * dy;
          if (d2 < .00035) { val = 1; break; }
        }
        if (val < 1) {
          const px = (u - q[0]) * a, py = v - q[1];
          const h = Math.min(1, Math.max(0, (px * sx + py * sy) / sl));
          const ex = px - sx * h, ey = py - sy * h;
          if (ex * ex + ey * ey < .00003 && Math.sin(h * 60 - t * 4) > 0) val = 1;
          const rx = (u - r[0]) * a, ry = v - r[1], rd = Math.sqrt(rx * rx + ry * ry);
          if (Math.abs(rd - pulse) < .005) val = 1;
        }
        return Math.min(1, val);
      };
    },
    boot: (t, a, du) => {
      const k = Math.floor(t / 1.3), fr = sstep(0, 1, t / 1.3 - k);
      const hs = [];
      for (let i = 0; i < 28; i++) {
        const x = (i + .5) / 28, g = Math.exp(-((x - .5) ** 2) / (2 * .135 * .135));
        const j = hash(i, k) + (hash(i, k + 1) - hash(i, k)) * fr;
        hs.push(.84 * g * (.72 + .5 * j) + .02);
      }
      return (u, v) => {
        const yv = .96 - v;
        if (yv < 0) return yv > -.012 ? 1 : 0;
        if ((Math.abs(u - .3) < du || Math.abs(u - .7) < du) && ((v * 22) % 1) > .5) return 1;
        const f = u * 28, i = Math.floor(f), frc = f - i;
        if (i < 0 || i > 27 || frc < .12 || frc > .88) return 0;
        if (yv < hs[i]) return (u > .3 && u < .7) ? .95 : .3;
        return 0;
      };
    },
    grid: (t, a, du, dv) => {
      const s = ((t * .22) % 1.3) - .15;
      return (u, v) => {
        let x = u, y = v;
        if (a > 1) x = (u - .5) * a + .5; else y = (v - .5) / a + .5;
        const band = .28 * Math.exp(-((y - s) ** 2) / .003);
        if (x < 0 || x > 1 || y < 0 || y > 1) return 0;
        if (Math.abs(y - s) < dv * 1.2) return 1;
        const fx = x * 4, fy = y * 4, cx = Math.floor(fx), cy = Math.floor(fy);
        const ox = fx - cx, oy = fy - cy;
        if (ox < .12 || ox > .88 || oy < .12 || oy > .88) return band;
        const k = cy * 4 + cx;
        if (k === 6 || k === 13) return (ox < .2 || ox > .8 || oy < .2 || oy > .8) ? .9 : band * .6;
        return Math.min(1, .8 + band);
      };
    },
    route: (t, a) => {
      const R = ROUTE.map(p => [p[0] * a, p[1]]);
      const seg = []; let total = 0;
      for (let i = 0; i < R.length - 1; i++) {
        const dx = R[i + 1][0] - R[i][0], dy = R[i + 1][1] - R[i][1], l = Math.hypot(dx, dy);
        seg.push([R[i][0], R[i][1], dx, dy, l * l, total, l]); total += l;
      }
      const prog = Math.min(1, ((t * .13) % 1.35)) * total;
      const end = R[R.length - 1];
      return (u, v) => {
        const x = u * a;
        let val = 0;
        for (let i = 0; i < HOT.length; i++) {
          const dx = x - HOT[i][0] * a, dy = v - HOT[i][1];
          val += .78 * Math.exp(-(dx * dx + dy * dy) / (2 * HOT[i][2] * HOT[i][2]));
        }
        for (let i = 0; i < seg.length; i++) {
          const s = seg[i], px = x - s[0], py = v - s[1];
          const h = Math.min(1, Math.max(0, (px * s[2] + py * s[3]) / s[4]));
          const ex = px - s[2] * h, ey = py - s[3] * h;
          if (ex * ex + ey * ey < .00009 && s[5] + h * s[6] <= prog) return 1;
        }
        if (Math.abs(x - R[0][0]) < .028 && Math.abs(v - R[0][1]) < .028) return 1;
        const tx = Math.abs(x - end[0]), ty = v - end[1];
        if (ty > -.035 && ty < .03 && tx < (ty + .035) * .55) return 1;
        return Math.min(.8, val);
      };
    },
    ab: (t) => {
      const lift = .1 + .1 * (.5 - .5 * Math.cos(t * .5)), mc = .36, mt = mc + lift;
      const g = (x, m) => .78 * Math.exp(-((x - m) ** 2) / (2 * .085 * .085));
      return (u, v) => {
        const yv = .96 - v;
        if (yv < 0) return yv > -.012 ? 1 : 0;
        const hc = g(u, mc), ht = g(u, mt);
        if (Math.abs(yv - hc) < .009) return 1;
        if (yv < ht) return yv < hc ? .95 : .62;
        if (yv < hc) return .2;
        return 0;
      };
    },
    season: (t, a, du) => {
      const lift = .2 * (.85 + .15 * Math.sin(t * .6));
      const sea = u => .3 + .1 * Math.sin(TAU * 2.4 * u + t * .25) + .03 * Math.sin(TAU * 5.3 * u);
      return (u, v) => {
        const yv = .96 - v;
        if (yv < 0) return yv > -.012 ? 1 : 0;
        const s = sea(u), act = s + lift * sstep(.54, .64, u);
        if (Math.abs(u - .54) < du && ((v * 22) % 1) > .5) return 1;
        if (Math.abs(yv - act) < .01) return 1;
        if (u > .54) {
          if (Math.abs(yv - s) < .008 && ((u * 34) % 1) > .45) return 1;
          if (yv < act && yv > s) return .9;
        }
        return yv < s ? .26 : 0;
      };
    },
    forecast: (t, a, du) => {
      const base = u => .2 + .36 * u + .05 * Math.sin(TAU * 3 * u) + .02 * Math.sin(TAU * 7 * u + 1);
      const breathe = .85 + .15 * Math.sin(t * .7), p = (t * .1) % 1.25;
      const pts = [];
      for (let k = 0; k < 9; k++) {
        const pu = .59 + k * .045, w = (pu - .55) * .5;
        if ((pu - .55) / .45 < p) pts.push([pu, base(pu) + (hash(k, 3) - .5) * 1.1 * w]);
      }
      return (u, v) => {
        const yv = .96 - v;
        if (yv < 0) return yv > -.012 ? 1 : 0;
        const b = base(u);
        if (Math.abs(u - .55) < du && ((v * 22) % 1) > .5) return 1;
        if (u < .55) return Math.abs(yv - b) < .01 ? 1 : (yv < b ? .26 : 0);
        for (let i = 0; i < pts.length; i++) if (Math.abs((u - pts[i][0]) * a) < .016 && Math.abs(yv - pts[i][1]) < .016) return 1;
        const w = (u - .55) * .5 * breathe + .012, d = Math.abs(yv - b);
        if (d < .008 && ((u * 40) % 1) > .5) return 1;
        if (d < w) return .5 - .32 * (d / w);
        return yv < b ? .12 : 0;
      };
    },
    segments: (t, a) => {
      const e = sstep(0, 1, Math.min(1, ((t * .12) % 1.4) / .8));
      const C = SEGC.map(c => [(c[0] + (c[2] - c[0]) * (1 - e)) * a, c[1] + (c[3] - c[1]) * (1 - e)]);
      const P = SEGP.map(p => [p[0] * a, p[1]]);
      const LV = [.2, .32, .44, .56];
      return (u, v) => {
        const x = u * a;
        for (let i = 0; i < P.length; i++) { const dx = x - P[i][0], dy = v - P[i][1]; if (dx * dx + dy * dy < .00024) return 1; }
        let d1 = 9, d2 = 9, k = 0;
        for (let i = 0; i < 4; i++) {
          const dx = x - C[i][0], dy = v - C[i][1], d = dx * dx + dy * dy;
          if (d < d1) { d2 = d1; d1 = d; k = i; } else if (d < d2) d2 = d;
        }
        const cx = Math.abs(x - C[k][0]), cy = Math.abs(v - C[k][1]);
        if ((cx < .034 && cy < .007) || (cy < .034 && cx < .007)) return 1;
        if (Math.sqrt(d2) - Math.sqrt(d1) < .014) return 0;
        return LV[k] * Math.exp(-d1 / .075);
      };
    },
    turnaround: (t, a, du) => {
      const ph = (t * .11) % 1.3;
      const rows = [];
      for (let i = 0; i < 5; i++) {
        const L = .5 + .38 * hash(i, 2), e = sstep(0, 1, ph * 1.7 - i * .13);
        rows.push([.1 + i * .175, L, L * (1 - .25 * e)]);
      }
      return (u, v) => {
        if (Math.abs(u - .06) < du * 1.2 && v > .03 && v < .95) return 1;
        const x = u - .07;
        if (x < 0) return 0;
        for (let i = 0; i < 5; i++) {
          const dy = v - rows[i][0];
          if (dy > -.045 && dy < -.02) return x < rows[i][1] ? .4 : 0;
          if (dy > -.005 && dy < .07) return x < rows[i][2] ? .97 : (x < rows[i][1] ? .1 : 0);
        }
        return 0;
      };
    },
    trails: (t, a) => {
      const ph = (t * .05) % 1, len = .12 + 2.4 * sstep(0, .85, ph), fade = 1 - sstep(.88, 1, ph);
      return (u, v) => {
        const hy = .86 + .035 * Math.sin(u * 9) + .018 * Math.sin(u * 23 + 1);
        if (v > hy) return .55;
        const dx = (u - .5) * a, dy = v - .6, r = Math.sqrt(dx * dx + dy * dy);
        if (r < .006) return 1;
        const f = r / .017, ring = Math.floor(f);
        if (f - ring > .42) return 0;
        const h = hash(ring, 11);
        if (h > .62) return 0;
        let ang = Math.atan2(dy, dx) - hash(ring, 5) * TAU - t * .04;
        ang = ((ang % TAU) + TAU) % TAU;
        return ang < len * (.5 + hash(ring, 9)) ? (.3 + .7 * hash(ring, 3)) * fade : 0;
      };
    }
  };

  /* ---------- theme colors ---------- */
  const NAMES = ['dot', 'star', 'lilac', 'mint', 'peach', 'sky', 'butter', 'rose'];
  const cur = NAMES.map(() => [0, 0, 0]), tgt = NAMES.map(() => [0, 0, 0]);
  let dark = 0, darkT = 0, colorsReady = false;
  function isDark() {
    const a = root.getAttribute('data-theme');
    return a ? a === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function readColors() {
    const cs = getComputedStyle(root);
    NAMES.forEach((n, i) => {
      const h = cs.getPropertyValue('--' + n).trim().replace('#', '');
      tgt[i] = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      if (!colorsReady) cur[i] = tgt[i].slice();
    });
    darkT = isDark() ? 1 : 0;
    if (!colorsReady) dark = darkT;
    colorsReady = true;
    const lab = document.getElementById('theme-label'), g = document.querySelector('#theme .glyph');
    lab.textContent = darkT ? 'Light' : 'Dark';
    g.classList.toggle('tri', !!darkT);
    document.getElementById('theme').setAttribute('aria-label', darkT ? 'Switch to light theme' : 'Switch to dark theme');
    dirty = true;
  }
  document.getElementById('theme').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('rd-theme', next); } catch (e) {}
  });
  try { const s = localStorage.getItem('rd-theme'); if (s === 'dark' || s === 'light') root.setAttribute('data-theme', s); } catch (e) {}
  new MutationObserver(readColors).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readColors);

  /* ---------- canvas state ---------- */
  let W, H, PX, img, buf, val, col, dirty = true;
  function resize() {
    /* size the canvas from the real viewport so drawing lines up with the page on phones */
    const vw = document.documentElement.clientWidth || innerWidth, vhh = innerHeight;
    const px = vw < 720 ? 3 : 4, w = Math.ceil(vw / px), h = Math.ceil(vhh / px);
    if (w === W && h === H && px === PX) return;
    PX = px; W = w; H = h;
    cv.width = W; cv.height = H;
    cv.style.width = W * PX + 'px'; cv.style.height = H * PX + 'px';
    img = ctx.createImageData(W, H);
    buf = new Uint32Array(img.data.buffer);
    val = new Float32Array(W * H); col = new Uint8Array(W * H);
    dirty = true;
  }
  addEventListener('resize', resize);
  if (window.visualViewport) visualViewport.addEventListener('resize', resize);

  const slots = [...document.querySelectorAll('.slot')].map((el, i) => ({ el, fig: el.dataset.fig, ci: Math.max(0, NAMES.indexOf(el.dataset.accent)), hero: i === 0, sw: 1, next: null }));
  const morphs = [...document.querySelectorAll('[data-morph]')].map(el => ({ el, v: 25, pointer: el.dataset.morph === 'pointer' }));
  const copies = [...document.querySelectorAll('.copy, .rows, .work-head, .threads, .work-foot')];
  const readout = document.getElementById('readout');
  const navLinks = [...document.querySelectorAll('header nav a')];

  let mx = -9999, my = -9999, mxs = -9999, mys = -9999, mAmt = 0, mAmtT = 0;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; mAmtT = 1; dirty = true; }, { passive: true });
  addEventListener('pointerleave', () => { mAmtT = 0; });
  const touchEnd = e => { if (e.pointerType !== 'mouse') mAmtT = 0; };
  addEventListener('pointerup', touchEnd, { passive: true });
  addEventListener('pointercancel', touchEnd, { passive: true });
  document.addEventListener('mouseleave', () => { mAmtT = 0; });
  addEventListener('scroll', () => { dirty = true; }, { passive: true });

  const t0 = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    if (reduce && !dirty) return;
    dirty = false;
    const t = reduce ? 8 : (now - t0) / 1000;
    const load = reduce ? 1 : sstep(0, 1, (t - .25) / 2.6);
    const vh = innerHeight;

    /* ease theme colors and pointer */
    for (let i = 0; i < NAMES.length; i++) for (let c = 0; c < 3; c++) cur[i][c] += (tgt[i][c] - cur[i][c]) * (reduce ? 1 : .07);
    dark += (darkT - dark) * (reduce ? 1 : .07);
    if (mxs < -999) { mxs = mx; mys = my; }
    mxs += (mx - mxs) * .18; mys += (my - mys) * .18; mAmt += (mAmtT - mAmt) * .08;
    const pal = cur.map(c => (255 << 24) | (Math.round(c[2]) << 16) | (Math.round(c[1]) << 8) | Math.round(c[0]));
    const pmx = mxs / PX, pmy = mys / PX, PR = 34, PR2 = PR * PR;
    const flick = Math.floor(t * 14);

    /* base field: drifting cloud in light, stars in dark */
    const amp = .2 - .1 * dark, drift = t * .018, sy = scrollY / PX * .35;
    for (let y = 0, i = 0; y < H; y++) {
      for (let x = 0; x < W; x++, i++) {
        const n = vnoise(x * .011 + drift, (y + sy) * .011) * .65 + vnoise(x * .031 - drift, (y + sy) * .031 + 9) * .35;
        let b = amp * sstep(.42, .9, n), c = 0;
        if (dark > .02) {
          const h = hash(x, y + Math.floor(sy));
          if (h > .9962) { const tw = .45 + .55 * (.5 + .5 * Math.sin(t * 1.4 + h * 9000)); if (tw * dark > b) { b = tw * dark; c = 1; } }
        }
        val[i] = b; col[i] = c;
      }
    }

    /* keep the field quiet behind running text */
    for (const el of copies) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const pad = 10 / PX;
      const xa = Math.max(0, Math.floor(r.left / PX - pad)), xb = Math.min(W, Math.ceil(r.right / PX + pad));
      const ya = Math.max(0, Math.floor(r.top / PX - pad)), yb = Math.min(H, Math.ceil(r.bottom / PX + pad));
      for (let y = ya; y < yb; y++) for (let x = xa, i = y * W + xa; x < xb; x++, i++) val[i] = col[i] === 1 ? 0 : val[i] * .3;
    }

    /* figures */
    for (const s of slots) {
      if (s.next) { s.sw -= reduce ? 1 : .07; if (s.sw <= 0) { s.sw = 0; s.fig = s.next; s.next = null; } }
      else if (s.sw < 1) s.sw = Math.min(1, s.sw + (reduce ? 1 : .045));
      const r = s.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh || r.width < 4 || r.height < 4 || !FIGS[s.fig]) continue;
      const cy = (r.top + r.bottom) / 2;
      let res = sstep(0, 1, 1.15 - Math.abs(cy - vh / 2) / (vh * .62));
      if (s.hero) res *= load;
      res *= s.sw;
      const x0 = r.left / PX, y0 = r.top / PX, w = r.width / PX, h = r.height / PX;
      const f = FIGS[s.fig](t, w / h, 1 / w, 1 / h);
      const xa = Math.max(0, Math.floor(x0)), xb = Math.min(W, Math.ceil(x0 + w));
      const ya = Math.max(0, Math.floor(y0)), yb = Math.min(H, Math.ceil(y0 + h));
      for (let y = ya; y < yb; y++) {
        const v = (y - y0) / h;
        for (let x = xa; x < xb; x++) {
          const u = (x - x0) / w;
          let rr = res;
          const dx = x - pmx, dy = y - pmy, d2 = dx * dx + dy * dy;
          if (d2 < PR2) { const m = 1 - d2 / PR2; rr *= 1 - m * m * mAmt; }
          let out = 0;
          if (rr > .01) out = f(u, v) * rr;
          if (rr < .99) {
            const e = Math.min(u, 1 - u, v, 1 - v);
            out += (1 - rr) * hash(x + flick * 131, y - flick * 71) * .5 * sstep(0, .14, e);
          }
          const i = y * W + x;
          if (out > val[i]) { val[i] = out; col[i] = s.ci; }
        }
      }
    }

    /* threshold against the Bayer matrix */
    for (let y = 0, i = 0; y < H; y++) {
      const ro = (y & 7) << 3;
      for (let x = 0; x < W; x++, i++) buf[i] = val[i] > THR[ro | (x & 7)] ? pal[col[i]] : 0;
    }
    ctx.putImageData(img, 0, 0);

    /* headline shapes: square at the bottom of the screen, triangle at the top */
    for (const m of morphs) {
      const r = m.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      let target;
      if (m.pointer) {
        const px = mAmt > .05 ? Math.min(1, Math.max(0, mxs / innerWidth)) : .5 + .5 * Math.sin(t * .5);
        target = 25 + 25 * px;
      } else {
        target = 25 + 25 * Math.min(1, Math.max(0, 1 - ((r.top + r.bottom) / 2) / vh));
      }
      m.v += (target - m.v) * (reduce ? 1 : .12);
      m.el.style.fontVariationSettings = '"ELSH" ' + m.v.toFixed(2);
    }

    /* scroll readout and current nav item */
    const max = document.documentElement.scrollHeight - vh;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    readout.textContent = 'signal ' + String(Math.round(p * 100)).padStart(3, '0') + '%';
    let active = null;
    for (const a of navLinks) {
      const el = document.querySelector(a.getAttribute('href'));
      if (el && el.getBoundingClientRect().top < vh * .5) active = a;
    }
    for (const a of navLinks) a.setAttribute('aria-current', a === active ? 'true' : 'false');
  }

  /* ---------- stat cells ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('i.on').forEach((b, i) => b.animate(
        [{ opacity: .12, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 420, delay: i * 38, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'backwards' }));
      io.unobserve(e.target);
    }), { threshold: .6 });
    document.querySelectorAll('.cells').forEach(c => io.observe(c));
  }

  /* ---------- work threads ---------- */
  const wslot = slots.find(s => s.el.classList.contains('wslot'));
  const threadEls = [...document.querySelectorAll('.thread')];
  threadEls.forEach(li => li.querySelector('button').addEventListener('click', () => {
    if (li.classList.contains('open')) return;
    threadEls.forEach(o => { const on = o === li; o.classList.toggle('open', on); o.querySelector('button').setAttribute('aria-expanded', on); });
    if (wslot && wslot.fig !== li.dataset.fig) wslot.next = li.dataset.fig;
    dirty = true;
  }));
  if (reduce) document.querySelector('.threads').addEventListener('transitionend', () => { dirty = true; });

  readColors();
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { dirty = true; });
  requestAnimationFrame(frame);
})();
