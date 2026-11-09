import { initCommon, initForm, mountStage, $, $$ } from './common.js';
initCommon({ introMs: 3300 });
const form = $('#qform'), sel = new Set();
initForm(form, d => `Hi, I found your sample website and I'd like a free quote.\nName: ${d.name}\nCity: ${d.area || '-'}\nServices: ${d.service || '-'}\nDetails: ${d.details}`);
$$('.ch button').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation(); const v = b.dataset.pick, on = !sel.has(v); on ? sel.add(v) : sel.delete(v); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
  form.elements.service.value = [...sel].join(', '); $('#sel').textContent = sel.size ? [...sel].join(', ') : 'none yet';
}));
const pn = $$('.pn');
pn.forEach(p => { p.addEventListener('click', () => pn.forEach(o => o.classList.toggle('open', o === p))); p.addEventListener('focusin', () => pn.forEach(o => o.classList.toggle('open', o === p))); p.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === p) pn.forEach(o => o.classList.toggle('open', o === p)); }); });
pn[0].classList.add('open');
import('./scene.js').then(m => { const s = mountStage($('#house'), m.default, { cam: [0, 4.4, 17.5], fov: 34, slider: '#dr' }); }).catch(() => $('#house').classList.add('nogl'));
