const currentUrl = window.location.href; // Pega a URL atual
const qrUrl = currentUrl.includes("github.io") 
    ? "https://aistisfi.github.io/qrcode1/selo.html?id=1" 
    : "selo.html?id=1"; // Fallback para desenvolvimento local
new QRCode(document.getElementById("qrcode"), qrUrl);
