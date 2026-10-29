/* PSDC ad slots - loads Adsterra (or any) banner code safely inside its own frame.
   - lazy: loads only when the slot scrolls into view
   - isolated: each ad lives in its own iframe, so several ads never clash
   - never used on the test screen (the slot component is simply not rendered there) */
(function () {
  var NS = 'psdc-ad';
  function cfg(slot) {
    var A = window.PSDC_ADS || {}, c = A[slot];
    if (!window.PSDC_ADS_ON || !c || !c.code) return null;
    var code = String(c.code);
    if (code.replace(/\s/g, '').length < 20 || /PASTE/i.test(code)) return null;
    return c;
  }
  function overlaps(box, sel) {
    if (!sel) return false;
    var r = box.getBoundingClientRect(), els = document.querySelectorAll(sel);
    for (var i = 0; i < els.length; i++) {
      var s = els[i].getBoundingClientRect();
      if (s.width && s.right + 16 > r.left && s.left < r.right + 16 && s.bottom + 12 > r.top && s.top - 12 < r.bottom) return true;
    }
    return false;
  }
  window.psdcMountAd = function (el, slot) {
    var c = cfg(slot), dead = false, timers = [], io = null;
    var none = function () { el.style.display = 'none'; el.innerHTML = ''; return function () {}; };
    if (!c) return none();
    var W = c.width || 300, H = c.height || 250, fixed = el.getAttribute('data-fixed') === 'right';
    el.innerHTML = '';
    el.style.display = 'block';
    if (fixed) el.style.cssText += ';position:fixed;right:14px;top:150px;z-index:5;width:' + W + 'px';
    else el.style.cssText += ';margin:36px auto 18px;max-width:100%;text-align:center';

    var label = document.createElement('div');
    label.textContent = W < 200 ? 'Advertisement' : 'Advertisement \u2022 \u0627\u0634\u062A\u06C1\u0627\u0631';
    label.style.cssText = 'font:600 10px/1 Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;opacity:.5;margin:0 0 6px;text-align:center';
    var box = document.createElement('div');
    box.style.cssText = 'position:relative;width:100%;max-width:' + W + 'px;margin:0 auto;height:' + H + 'px;overflow:hidden';
    var inner = document.createElement('div');
    inner.style.cssText = 'position:absolute;top:0;left:0;width:' + W + 'px;height:' + H + 'px;transform-origin:top left';
    var fr = document.createElement('iframe');
    fr.setAttribute('title', 'Advertisement');
    fr.setAttribute('scrolling', 'no');
    fr.setAttribute('frameborder', '0');
    fr.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    if (window.PSDC_ADS_SANDBOX !== false)
      fr.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
    fr.style.cssText = 'border:0;width:' + W + 'px;height:' + H + 'px;background:transparent;display:block';
    inner.appendChild(fr); box.appendChild(inner); el.appendChild(label); el.appendChild(box);

    var loaded = false;
    function layout() {
      if (dead) return;
      if (fixed) {
        var tooSmall = innerWidth < (c.minViewportW || 0) || innerHeight < (c.minViewportH || 0);
        if (tooSmall || overlaps(el, c.avoid)) { el.style.visibility = 'hidden'; return; }
        el.style.visibility = 'visible'; load(); return;
      }
      var avail = el.clientWidth || W, k = Math.min(1, avail / W);
      inner.style.transform = 'scale(' + k + ')';
      box.style.height = Math.round(H * k) + 'px';
      box.style.maxWidth = Math.round(W * k) + 'px';
    }
    function load() {
      if (loaded || dead) return; loaded = true;
      fr.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body>' + c.code + '</body></html>';
    }
    layout();
    window.addEventListener('resize', layout);
    if (fixed) timers.push(setInterval(layout, 1200));
    if (fixed) { /* side ad loads from layout() only when it is really visible */ }
    else if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } }); }, { rootMargin: '250px' });
      io.observe(el);
    } else load();
    return function () { dead = true; window.removeEventListener('resize', layout); timers.forEach(clearInterval); if (io) io.disconnect(); };
  };
  function auto() {
    var list = document.querySelectorAll('[data-' + NS + ']');
    for (var i = 0; i < list.length; i++) window.psdcMountAd(list[i], list[i].getAttribute('data-' + NS));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
})();
