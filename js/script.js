const btn = document.getElementById("theme-toggle"); //darkmode toggle
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

document.getElementById(
  //location and last modified
  "location"
).textContent = `Location: ${window.location.href}`;
document.getElementById(
  "last-modified"
).textContent = `Last Modified: ${new Date(
  document.lastModified
).toLocaleString()}`;
