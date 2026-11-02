/* Mohlala Workshop - one script for all pages. Each feature only runs if its element exists. */

const CONFIG = { recipientEmail: "mohlalaworkshop@gmail.com", workshopLat: -24.7509, workshopLng: 29.82 };

const SERVICES = [
  { id: "routine", name: "Routine servicing", category: "Mechanical", price: 850, desc: "Oil and filter change, fluid top-ups and a full safety check." },
  { id: "engine", name: "Engine diagnostics and overhauls", category: "Mechanical", price: 1500, desc: "Computer diagnostics, fault finding and full engine rebuilds." },
  { id: "brakes", name: "Braking systems", category: "Mechanical", price: 1100, desc: "Pads, discs, brake fluid and handbrake repairs." },
  { id: "gearbox", name: "Transmission and gearbox", category: "Mechanical", price: 2500, desc: "Clutch replacement, gearbox repair and transmission service." },
  { id: "suspension", name: "Suspension and steering", category: "Mechanical", price: 1300, desc: "Shock absorbers, bushes, wheel alignment and steering repairs." },
  { id: "electrical", name: "Auto electrical", category: "Electrical", price: 700, desc: "Wiring faults, batteries, alternators, starters and lights." }
];

// HELPERS
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = n => "R" + n.toLocaleString("en-ZA");
const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const validPhone = v => /^(\+27|0)\d{9}$/.test(v.replace(/\s/g, ""));
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const needed = label => v => v ? "" : `${label} is required.`;

function setError(field, msg) {
  let err = field.parentElement.querySelector(`.error[data-for="${field.id}"]`);
  if (!msg) {
    if (err) err.remove();
    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    return true;
  }


  if (!err) {
    err = document.createElement("span");
    err.className = "error";
    err.dataset.for = field.id;
    err.setAttribute("role", "alert");
    field.insertAdjacentElement("afterend", err);
  }

  
  err.textContent = msg;
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
  return false;
}

function checkFields(form, rules) {
  let ok = true, first = null;
  for (const [id, fn] of Object.entries(rules)) {
    const f = $("#" + id, form);
    if (!f) continue;
    if (!setError(f, fn(f.value.trim(), f))) { ok = false; first = first || f; }
  }
  if (first) first.focus();
  return ok;
}

function showResult(form, html, bad = false) {
  let box = $(".result", form.parentElement);
  if (!box) {
    box = document.createElement("div");
    box.setAttribute("role", "status");
    form.insertAdjacentElement("afterend", box);
  }
  box.className = "result" + (bad ? " bad" : "");
  box.innerHTML = html; // user text must be escaped with esc() before being passed in
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}


/* MOBILE MENU */
const toggle = $(".nav-toggle");
if (toggle) toggle.addEventListener("click", () => {
  const open = $("nav ul").classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});



/* FADE IN ON SCROLL */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: .15 });
  $$(".reveal").forEach(el => io.observe(el));
} else $$(".reveal").forEach(el => el.classList.add("visible"));



/* FAQ */
$$(".accordion-btn").forEach(btn => btn.addEventListener("click", () => {
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  const open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", !open);
  if (panel) panel.classList.toggle("open", !open);
}));



/* LIGHTBOX GALLERY */
$$(".gallery img").forEach(img => {
  img.tabIndex = 0;
  const open = () => {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Enlarged photo");
    const big = document.createElement("img");
    big.src = img.dataset.full || img.src;
    big.alt = img.alt;
    const close = document.createElement("button");
    close.textContent = "\u00D7";
    close.setAttribute("aria-label", "Close photo");
    const onKey = e => { if (e.key === "Escape") end(); };
    const end = () => { box.remove(); document.removeEventListener("keydown", onKey); img.focus(); };
    close.onclick = end;
    box.onclick = e => { if (e.target === box) end(); };
    document.addEventListener("keydown", onKey);
    box.append(big, close);
    document.body.append(box);
    close.focus();
  };
  img.addEventListener("click", open);
  img.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
});



/* SERVICES (search, filter, sort) */
const search = $("#servicesSearch");
if (search) {
  const cat = $("#serviceCategory"), sort = $("#serviceSort"),
        count = $("#serviceCount"), grid = $("#serviceGrid");
  const sorters = {
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price
  };
  const render = () => {
    const q = search.value.trim().toLowerCase();
    const list = SERVICES.filter(s =>
      (cat.value === "all" || s.category === cat.value) &&
      (s.name + " " + s.desc).toLowerCase().includes(q));
    list.sort(sorters[sort.value]);
    grid.replaceChildren();
    list.forEach(s => {
      const card = document.createElement("article");
      card.className = "service-card";
      const h = document.createElement("h3"); h.textContent = s.name;
      const tag = document.createElement("p"); tag.className = "tag"; tag.textContent = s.category;
      const p = document.createElement("p"); p.textContent = s.desc;
      const pr = document.createElement("p"); pr.className = "price"; pr.textContent = "From " + rand(s.price);
      card.append(h, tag, p, pr);
      grid.append(card);
    });
    count.textContent = list.length ? `${list.length} service(s) shown` : "No services match your search. Try a different word.";
  };
  [search, cat, sort].forEach(el => el.addEventListener("input", render));
  render();
}



/* INTERACTIVE MAP (needs Leaflet and a <div id="map">) */
if ($("#map") && window.L) {
  const map = L.map("map").setView([CONFIG.workshopLat, CONFIG.workshopLng], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
  L.marker([CONFIG.workshopLat, CONFIG.workshopLng]).addTo(map).bindPopup("Mohlala Workshop<br>Jane Furse, Limpopo").openPopup();
}



/* ENQUIRY FORM */
const enq = $("#enquiryForm");
if (enq) {
  const date = $("#enqDate");
  date.min = new Date().toISOString().split("T")[0];
  enq.addEventListener("submit", async e => {
    e.preventDefault();
    const ok = checkFields(enq, {
      enqName: v => v.length < 2 ? "Enter your full name (at least 2 characters)." : "",
      enqPhone: v => !v ? "Phone number is required." : validPhone(v) ? "" : "Enter a valid SA number, e.g. 064 638 7161.",
      enqEmail: v => !v || validEmail(v) ? "" : "Enter a valid email, e.g. name@example.com.",
      enqMake: needed("Vehicle make"),
      enqModel: needed("Vehicle model"),
      enqYear: v => !v || (v >= 1980 && v <= 2030) ? "" : "Year must be between 1980 and 2030.",
      enqService: needed("Please choose a service type"),
      enqDate: v => v && new Date(v) < new Date(date.min) ? "Choose today or a future date." : "",
      enqMessage: v => v.length < 10 ? "Describe the problem in at least 10 characters." : ""
    });
    if (!ok) return;
    if (!$("[name=consent]", enq).checked) {
      showResult(enq, "Please tick the consent box so we can contact you.", true);
      return;
    }

    // QUOTE
    const svc = SERVICES.find(s => s.name === $("#enqService").value);
    const year = Number($("#enqYear").value);
    const base = svc ? svc.price : 600;
    const quote = Math.round(base * (year && year < 2005 ? 1.1 : 1));

    // AVAILABILITY
    let avail = "Choose a preferred date and we will confirm availability.";
    if (date.value) {
      const d = new Date(date.value + "T00:00:00"), day = d.getDay();
      const hours = day >= 1 && day <= 4 ? "09:00 - 17:00" : "09:00 - 15:30";
      avail = `We are open on ${d.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })} from ${hours}.`;
    }

    const name = esc($("#enqName").value.trim());
    showResult(enq, `<h3>Thank you, ${name}</h3><p><strong>Estimated cost:</strong> ${rand(quote)} for ${esc($("#enqService").value)} (labour estimate, parts extra).</p><p><strong>Availability:</strong> ${avail}</p><p>We will contact you to confirm the final price.</p>`);

    // AJAX
    if (enq.action.includes("YOUR_FORM_ID")) {
      console.info("Demo mode: set your Formspree ID in the form action to send for real.");
      return;
    }
    try {
      const r = await fetch(enq.action, { method: "POST", body: new FormData(enq), headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(r.status);
      enq.reset();
    } catch {
      showResult(enq, "We could not send your enquiry. Please call or WhatsApp us on 077 942 7343.", true);
    }
  });
}

/* CONTACT FORM */
const con = $("#contactForm");
if (con) {
  con.addEventListener("submit", e => {
    e.preventDefault();
    const ok = checkFields(con, {
      conName: v => v.length < 2 ? "Enter your full name (at least 2 characters)." : "",
      conEmail: v => !v ? "Email address is required." : validEmail(v) ? "" : "Enter a valid email, e.g. name@example.com.",
      conPhone: v => !v || validPhone(v) ? "" : "Enter a valid SA number, e.g. 077 942 7343.",
      conSubject: needed("Please choose a subject"),
      conMessage: v => v.length < 10 ? "Message must be at least 10 characters." : ""
    });
    if (!ok) return;
    const val = id => $("#" + id).value.trim();
    const method = $("[name=reply_method]:checked", con).value;
    const body = `Name: ${val("conName")}\nEmail: ${val("conEmail")}\nPhone: ${val("conPhone") || "not given"}\nPreferred reply: ${method}\n\n${val("conMessage")}`;
    const link = `mailto:${CONFIG.recipientEmail}?subject=${encodeURIComponent(val("conSubject") + " - " + val("conName"))}&body=${encodeURIComponent(body)}`;
    showResult(con, `<p>Your message is ready. If your email app did not open, <a href="${esc(link)}">click here to send it</a>.</p>`);
    window.location.href = link;
  });
}