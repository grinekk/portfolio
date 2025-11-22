// Ustaw automatycznie aktualny rok w stopce
var yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}