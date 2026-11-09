export default function build({ THREE, scene, root, cam, RM }) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc9f2dc, 1.15));
  const key = new THREE.DirectionalLight(0xfff4dd, 2.3); key.position.set(4, 7, 8); scene.add(key);
  const std = (c, r = .7) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.8, .4, 56), std(0xb8e05a, 1)); ground.position.y = -.2; root.add(ground);
  const drive = new THREE.Mesh(new THREE.BoxGeometry(3.2, .05, 3.2), std(0xe8efea, .9)); drive.position.set(-1.6, .02, 5.2); root.add(drive);
  // house
  const house = new THREE.Group(); root.add(house);
  const body = new THREE.Mesh(new THREE.BoxGeometry(7.4, 3, 3.4), std(0xfdfbf4)); body.position.set(0, 1.5, 0); house.add(body);
  const sh = new THREE.Shape(); sh.moveTo(-4.1, 0); sh.lineTo(4.1, 0); sh.lineTo(0, 1.9); sh.closePath();
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 3.9, bevelEnabled: false }), std(0xff7f6b)); roof.position.set(0, 3, -1.95); house.add(roof);
  // garage bay sticking out of the front wall, so the open door shows a lit interior
  const O = { x: -1.6, w: 3.2, h: 2.2 }, gz0 = 1.7, gd = 2.0, gz1 = gz0 + gd;
  const warm = new THREE.MeshStandardMaterial({ color: 0xffe9b8, emissive: 0xffc860, emissiveIntensity: .5, roughness: 1 });
  const back = new THREE.Mesh(new THREE.PlaneGeometry(O.w, O.h), warm); back.position.set(O.x, O.h / 2, gz0 + .02); house.add(back);
  [-1, 1].forEach(sd => { const w = new THREE.Mesh(new THREE.BoxGeometry(.18, O.h, gd), std(0xfdfbf4)); w.position.set(O.x + sd * (O.w / 2 + .09), O.h / 2, gz0 + gd / 2); house.add(w); const iw = new THREE.Mesh(new THREE.PlaneGeometry(gd, O.h), warm); iw.rotation.y = -sd * Math.PI / 2; iw.position.set(O.x + sd * O.w / 2 - sd * .005, O.h / 2, gz0 + gd / 2); house.add(iw); });
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(O.w + .36, .2, gd), std(0xfdfbf4)); ceil.position.set(O.x, O.h + .1, gz0 + gd / 2); house.add(ceil);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(O.w + .6, .16, gd + .3), std(0xff7f6b)); cap.position.set(O.x, O.h + .3, gz0 + gd / 2 + .05); house.add(cap);
  const floor = new THREE.Mesh(new THREE.BoxGeometry(O.w, .06, gd), new THREE.MeshStandardMaterial({ color: 0xe9dcc0, roughness: 1 })); floor.position.set(O.x, .03, gz0 + gd / 2); house.add(floor);
  const lampL = new THREE.PointLight(0xffd27a, 8, 7); lampL.position.set(O.x, 1.9, gz0 + 1); house.add(lampL);
  const bench = new THREE.Mesh(new THREE.BoxGeometry(2.2, .12, .5), std(0xb98a5a)); bench.position.set(O.x, .8, gz0 + .35); house.add(bench);
  [-.9, .9].forEach(x => { const l = new THREE.Mesh(new THREE.BoxGeometry(.1, .8, .4), std(0x8a6a44)); l.position.set(O.x + x, .4, gz0 + .35); house.add(l); });
  [[0xff7f6b, -.7], [0x17332d, -.2], [0xb8e05a, .3], [0x8fd3f4, .75]].forEach(([c, x]) => { const t = new THREE.Mesh(new THREE.BoxGeometry(.28, .22, .22), std(c)); t.position.set(O.x + x, .97, gz0 + .35); house.add(t); });
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(O.w + .36, .5, .18), std(0xfdfbf4)); lintel.position.set(O.x, O.h + .25 - .05, gz1 + .02); house.add(lintel);
  const N = 6, ph = O.h / N, panels = [];
  for (let i = 0; i < N; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(O.w - .02, ph - .03, .1), std(i === 3 ? 0xdff6e8 : 0xc9f2dc, .6)); m.position.set(O.x, ph * (i + .5), gz1 - .06); house.add(m); panels.push(m);
    if (i === 4) for (let k = -1; k <= 1; k++) { const w = new THREE.Mesh(new THREE.BoxGeometry(.7, ph * .5, .04), new THREE.MeshStandardMaterial({ color: 0x9fe0ff, emissive: 0x3aa6d8, emissiveIntensity: .2 })); w.position.set(k * .95, 0, .06); m.add(w); } }
  const handle = new THREE.Mesh(new THREE.BoxGeometry(.3, .06, .06), std(0x17332d)); handle.position.set(0, -ph * .1, .08); panels[0].add(handle);
  // front door + window
  const fd = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.8, .1), std(0x17332d)); fd.position.set(2.2, .9, 1.72); house.add(fd);
  const kn = new THREE.Mesh(new THREE.SphereGeometry(.06), std(0xffd447)); kn.position.set(2.5, .9, 1.8); house.add(kn);
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.2, .9, .08), new THREE.MeshStandardMaterial({ color: 0x9fe0ff, roughness: .1, emissive: 0x2e86b0, emissiveIntensity: .2 })); win.position.set(2.2, 2.0, 1.72); win.visible = false; house.add(win);
  const win2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, .8, .08), new THREE.MeshStandardMaterial({ color: 0x9fe0ff, roughness: .1 })); win2.position.set(-2.9, 2.3, 1.72); win2.visible = false; house.add(win2);
  const win3 = new THREE.Mesh(new THREE.BoxGeometry(1.2, .8, .08), new THREE.MeshStandardMaterial({ color: 0x9fe0ff, roughness: .1 })); win3.position.set(2.2, 2.0, 1.72); house.add(win3);
  const chim = new THREE.Mesh(new THREE.BoxGeometry(.6, 1.2, .6), std(0x17332d)); chim.position.set(2.6, 4.1, -.4); house.add(chim);
  // tree + mailbox
  const tree = new THREE.Group(); tree.position.set(4.8, 0, 2.6); root.add(tree);
  const tt = new THREE.Mesh(new THREE.CylinderGeometry(.15, .2, 1.2), std(0x7a5230)); tt.position.y = .6; tree.add(tt);
  const tc = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0x4fb37a, flatShading: true })); tc.position.y = 2; tree.add(tc);
  let open = null;
  return {
    key(e) { if (e.key === ' ') { e.preventDefault(); open = (open === null ? 1 : (open > .5 ? 0 : 1)); } },
    update({ t, dt, p, px, py, rot, RM }) {
      const f = Math.min(1, Math.max(0, p * 1.25 - .1));
      panels.forEach((m, i) => { m.position.y = ph * (i + .5) + f * (O.h + .1); m.visible = m.position.y - ph / 2 < O.h + .05; });
      lampL.intensity = 3 + 8 * f; warm.emissiveIntensity = .15 + .5 * f;
      tc.rotation.y = RM ? 0 : t * .1; tc.scale.setScalar(1 + (RM ? 0 : Math.sin(t * 1.3) * .02));
      root.rotation.y = Math.max(-1, Math.min(1, rot * .5 + px * .25 - .15)); root.rotation.x = py * .04;
      cam.position.x = px * .4; cam.position.y = 4.4 - py * .4; cam.lookAt(0, 1.7, 1);
    }
  };
}
