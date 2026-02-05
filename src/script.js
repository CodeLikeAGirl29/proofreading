// ====== Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
// ====== Year
$("#year").textContent = String(new Date().getFullYear());
// ====== Before/After toggles
$$(".sample").forEach((sample) => {
  const buttons = $$("button[data-view]", sample);
  const before = $("[data-before]", sample);
  const after = $("[data-after]", sample);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.dataset.view;
      const showBefore = view === "before";
      before.hidden = !showBefore;
      after.hidden = showBefore;
    });
  });
});
// ====== Copy buttons
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}
$("#copyHireMeBtn").addEventListener("click", async () => {
  const text = $("#hireMeBlock").textContent.trim();
  const ok = await copyToClipboard(text);
  alert(ok ? "Copied!" : "Copy failed. Select and copy manually.");
});
$("#copyEmailBtn").addEventListener("click", async () => {
  const template = `Subject: Proofreading request (sample edit)\n\nHi Lindsey,\n\nI’d like a 200–300 word sample edit.\n\nContent type:\nEstimated word count:\nDeadline:\nLink (Google Doc/Word):\nNotes about tone/voice:\n\nThanks!`;
  const ok = await copyToClipboard(template);
  alert(ok ? "Email template copied!" : "Copy failed. Select and copy manually.");
});
// ====== Contact form (mailto)
const YOUR_EMAIL = "lindseykdev@gmail.com";
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = String(fd.get("name") || "").trim();
  const email = String(fd.get("email") || "").trim();
  const type = String(fd.get("type") || "").trim();
  const words = String(fd.get("words") || "").trim();
  const message = String(fd.get("message") || "").trim();
  const subject = encodeURIComponent(`Proofreading request (${type || "Content"})`);
  const body = encodeURIComponent(
    `Hi Lindsey,\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Content type: ${type}\n` +
    `Estimated word count: ${words}\n\n` +
    `Message / link:\n${message}\n\n` +
    `Thanks!`
  );
  const mailto = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  const note = $("#formNote");
  if (YOUR_EMAIL.includes("YOUR_EMAIL")) {
    note.innerHTML =
      'Reminder: Replace <b>YOUR_EMAIL</b> in the code with your real email address.';
  } else {
    note.textContent = "Opening your email app now…";
  }
});