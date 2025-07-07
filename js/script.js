// Theme Toggle
const btn = document.getElementById("theme-toggle");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Display location and last modified
document.getElementById(
  "location"
).textContent = `Location: ${window.location.href}`;
document.getElementById(
  "last-modified"
).textContent = `Last Modified: ${new Date(
  document.lastModified
).toLocaleString()}`;
