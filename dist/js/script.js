const sidebarToggler = document.getElementById("sidebarToggler");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const removeSidebar = document.getElementById("removeSidebar");

// Inisialisasi tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Fungsi untuk mengaktifkan/menonaktifkan tooltip
function toggleTooltips() {
  if (sidebar.classList.contains("expand")) {
    tooltipList.forEach((tooltip) => tooltip.disable()); // Nonaktifkan tooltip
  } else {
    tooltipList.forEach((tooltip) => tooltip.enable()); // Aktifkan tooltip
  }
}

// Event listener untuk tombol toggle sidebar
sidebarToggler.addEventListener("click", function () {
  sidebar.classList.toggle("expand");
  content.classList.toggle("shrink");
  toggleTooltips(); // Cek kondisi tooltip
});

// Event listener untuk tombol remove sidebar
removeSidebar.addEventListener("click", function () {
  sidebar.classList.remove("expand");
  content.classList.remove("shrink");
  toggleTooltips(); // Cek kondisi tooltip
});

// Jalankan toggleTooltips() saat halaman dimuat untuk kondisi awal
toggleTooltips();

// call document

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah navigasi default
    const targetId = this.getAttribute("data-target"); // ID target div
    const url = this.getAttribute("href"); // URL file HTML
    const targetElement = document.getElementById(targetId); // Elemen target

    // Jika div target sudah terisi, kosongkan dan hentikan proses
    if (targetElement.innerHTML.trim() !== "") {
      targetElement.innerHTML = ""; // Hapus konten
      targetElement.classList.remove("open"); // Hapus kelas open untuk menutup dengan transisi
      return; // Keluar dari event handler
    }

    // Muat file HTML ke dalam div target
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        targetElement.innerHTML = html; // Masukkan konten ke div target
        targetElement.classList.add("open"); // Tambahkan kelas open untuk membuka dengan transisi
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        targetElement.innerHTML = "<p>Error loading content.</p>";
      });
  });
});
