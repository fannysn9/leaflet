const leaflets = [
    {
        title: "ASI Eksklusif",
        description: "Informasi mengenai pentingnya memberikan ASI secara eksklusif untuk kesehatan bayi.",
        images: ["assets/asi-eksklusif/ASI eksklusif.jpg"]
    },
    {
        title: "Buku Saku Anak Sehat",
        description: "Buku panduan saku 'Aku Sehat Siap Berpetualang' untuk anak-anak.",
        images: ["assets/buku-saku/Buku Saku.jpg"]
    },
    {
        title: "DHF (Demam Berdarah)",
        description: "Informasi pencegahan dan penanganan penyakit Demam Berdarah Dengue (DHF).",
        images: ["assets/dhf/DHF.jpg"]
    },
    {
        title: "Gizi Sehat bagi Lansia",
        description: "Panduan dan tips menjaga gizi sehat untuk para lanjut usia.",
        images: ["assets/gizi-lansia/Gizi lansia.jpg"]
    },
    {
        title: "Hepatitis C",
        description: "Penjelasan tentang penyakit Hepatitis C, cara penularan, gejala, dan pencegahannya.",
        images: ["assets/hepatitis/Hepatitis.jpg"]
    },
    {
        title: "Osteoporosis",
        description: "Informasi mengenai penyakit pengeroposan tulang (Osteoporosis) dan cara pencegahannya.",
        images: ["assets/osteoporosis/Osteoporosis.jpg"]
    },
    {
        title: "Pijat Bayi",
        description: "Panduan dan manfaat melakukan pijat bayi (baby massage) untuk pertumbuhan optimal.",
        images: ["assets/pijat-bayi/pijat bayi.jpg"]
    },
    {
        title: "Penyakit Jantung Koroner (PJK)",
        description: "Penjelasan mengenai penyakit jantung koroner (PJK) dan faktor risikonya.",
        images: ["assets/pjk/PJK.jpg"]
    },
    {
        title: "Stunting",
        description: "Informasi penting tentang stunting, penyebab, dan cara penanganannya.",
        images: ["assets/stunting/Stunting.jpg"]
    },
    {
        title: "Thalassemia",
        description: "Penjelasan lengkap mengenai penyakit genetik Thalassemia.",
        images: ["assets/thalasemia/Thalassemia.jpg"]
    }
];

const leafletContainer = document.getElementById('leaflet-cards');
const modalBodyContent = document.getElementById('modal-body-content');
const photoModalLabel = document.getElementById('photoModalLabel');

// Fungsi untuk menampilkan kartu leaflet
function createLeafletCards() {
    leafletContainer.innerHTML = '';
    leaflets.forEach((leaflet, index) => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title fw-bold">${leaflet.title}</h5>
                        <p class="card-text">${leaflet.description}</p>
                    </div>
                    <div class="mt-3">
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#photoModal" data-leaflet-index="${index}">
                            <i class="fas fa-eye me-1"></i> Lihat Foto
                        </button>
                        <a href="index.html?leaflet=${encodeURIComponent(leaflet.title)}" class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-copy me-1"></i> Ajukan Permintaan
                        </a>
                    </div>
                </div>
            </div>
        `;
        leafletContainer.appendChild(card);
    });
}

// Panggil fungsi untuk membuat kartu saat halaman dimuat
createLeafletCards();

// Tambahkan event listener untuk tombol "Lihat Foto"
leafletContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-leaflet-index]');
    if (button) {
        const index = button.getAttribute('data-leaflet-index');
        const leaflet = leaflets[index];
        
        // Bersihkan konten modal sebelumnya
        modalBodyContent.innerHTML = '';
        photoModalLabel.textContent = `Foto Leaflet: ${leaflet.title}`;

        // Jika leaflet memiliki foto, tambahkan ke modal
        if (leaflet.images && leaflet.images.length > 0) {
            leaflet.images.forEach(imagePath => {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = leaflet.title;
                img.className = 'img-fluid mb-2 rounded shadow-sm';
                modalBodyContent.appendChild(img);
            });
        } else {
            modalBodyContent.innerHTML = '<p class="text-muted">Tidak ada foto tersedia untuk leaflet ini.</p>';
        }
    }
});
