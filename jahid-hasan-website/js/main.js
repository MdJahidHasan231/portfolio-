/* Shared script for all pages */
const $ = s => document.querySelector(s);

// Fill contact details from config.js
document.querySelectorAll("[data-wa]").forEach(e => e.textContent = "+" + WHATSAPP);
document.querySelectorAll("[data-email]").forEach(e => e.textContent = EMAIL);

// Scroll reveal + counters
const io = new IntersectionObserver(entries => entries.forEach(x => {
  if (x.isIntersecting) {
    x.target.classList.add("on");
    if (x.target.dataset.n) count(x.target);
    io.unobserve(x.target);
  }
}), { threshold: .15 });
document.querySelectorAll(".rv,.stat b").forEach(e => io.observe(e));

// 3D tilt on cards
document.querySelectorAll(".card").forEach(c => {
  c.onmousemove = e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 14}deg)`;
    c.style.setProperty("--x", x * 100 + "%");
    c.style.setProperty("--y", y * 100 + "%");
  };
  c.onmouseleave = () => c.style.transform = "";
});

// 3D tilt on hero photo
const f = $("#frame");
if (f) {
  const st = f.parentElement;
  st.onmousemove = e => {
    const r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    f.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
  };
  st.onmouseleave = () => f.style.transform = "";
}

// Contact form -> WhatsApp
const send = $("#send");
if (send) send.onclick = () => {
  const t = `Hi Jahid, I'm ${$("#cn").value}. Website: ${$("#cw").value || "N/A"}. ${$("#cm").value}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`, "_blank");
};

function count(el) {
  const n = +el.dataset.n, s = el.dataset.s;
  let i = 0;
  const t = setInterval(() => { i += Math.ceil(n / 50); if (i >= n) { i = n; clearInterval(t); } el.textContent = i + s; }, 30);
}
