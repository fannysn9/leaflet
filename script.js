// Data leaflet
const leafletData = [
    {
        id: 1,
        title: "ASI Eksklusif",
        description: "Informasi mengenai pentingnya memberikan ASI secara eksklusif untuk kesehatan bayi.",
        image: "assets/asi-eksklusif.jpg",
        category: "Bayi & Anak",
        keywords: ["asi", "bayi", "eksklusif", "menyusui", "ibu", "anak"]
    },
    {
        id: 2,
        title: "Buku Saku Anak Sehat",
        description: "Buku panduan saku 'Aku Sehat Siap Berpetualang' untuk anak-anak.",
        image: "assets/buku-saku-anak.jpg",
        category: "Bayi & Anak",
        keywords: ["anak", "buku", "panduan", "sehat", "petualang"]
    },
    {
        id: 3,
        title: "DHF (Demam Berdarah)",
        description: "Informasi pencegahan dan penanganan penyakit Demam Berdarah Dengue (DHF).",
        image: "assets/dhf.jpg",
        category: "Penyakit Menular",
        keywords: ["dhf", "demam", "berdarah", "dengue", "nyamuk", "pencegahan"]
    },
    {
        id: 4,
        title: "Gizi Sehat bagi Lansia",
        description: "Panduan dan tips menjaga gizi sehat untuk para lanjut usia.",
        image: "assets/gizi-lansia.jpg",
        category: "Gizi & Nutrisi",
        keywords: ["gizi", "lansia", "nutrisi", "makanan", "sehat", "usia"]
    },
    {
        id: 5,
        title: "Hepatitis C",
        description: "Penjelasan tentang penyakit Hepatitis C, cara penularan, gejala, dan pencegahannya.",
        image: "assets/hepatitis-c.jpg",
        category: "Penyakit Menular",
        keywords: ["hepatitis", "liver", "hati", "virus", "penularan"]
    },
    {
        id: 6,
        title: "Osteoporosis",
        description: "Informasi mengenai penyakit pengeroposan tulang (Osteoporosis) dan cara pencegahannya.",
        image: "assets/osteoporosis.jpg",
        category: "Penyakit Degeneratif",
        keywords: ["osteoporosis", "tulang", "kalsium", "lansia", "pengeroposan"]
    },
    {
        id: 7,
        title: "Pijat Bayi",
        description: "Panduan dan manfaat melakukan pijat bayi (baby massage) untuk pertumbuhan optimal.",
        image: "assets/pijat-bayi.jpg",
        category: "Bayi & Anak",
        keywords: ["pijat", "bayi", "massage", "pertumbuhan", "stimulasi"]
    },
    {
        id: 8,
        title: "Penyakit Jantung Koroner (PJK)",
        description: "Penjelasan mengenai penyakit jantung koroner (PJK) dan faktor risikonya.",
        image: "assets/pjk.jpg",
        category: "Penyakit Degeneratif",
        keywords: ["jantung", "koroner", "pjk", "kardio", "serangan"]
    },
    {
        id: 9,
        title: "Stunting",
        description: "Informasi penting tentang stunting, penyebab, dan cara penanganannya.",
        image: "assets/stunting.jpg",
        category: "Bayi & Anak",
        keywords: ["stunting", "pertumbuhan", "anak", "gizi", "pendek"]
    }
];

// Variable untuk menyimpan data yang sedang ditampilkan
let currentDisplayedData = [...leafletData];

// Fungsi untuk membuat card HTML
function createCard(leaflet) {
    return `
        <div class="col">
            <div class="leaflet-card" data-id="${leaflet.id}">
                <div class="card-header-custom">
                    <span class="category-badge">${leaflet.category}</span>
                    <h3>${leaflet.title}</h3>
                </div>
                <div class="card-body-custom">
                    <p class="card-description">${leaflet.description}</p>
                    <div class="card-actions">
                        <button class="btn-custom btn-primary-custom" onclick="showPhoto(${leaflet.id})">
                            <i class="fas fa-eye"></i> Lihat Foto
                        </button>
                        <a href="#" class="btn-custom btn-outline-custom" onclick="requestLeaflet(${leaflet.id}); return false;">
                            <i class="fas fa-file-download"></i> Ajukan
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk render cards
function renderCards(data) {
    const container = document.getElementById('leaflet-cards');
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                <h3 style="color: #64748b;">Tidak ada hasil ditemukan</h3>
                <p style="color: #94a3b8;">Coba gunakan kata kunci yang berbeda</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.map(leaflet => createCard(leaflet)).join('');
}

// Fungsi search dengan highlighting
function searchLeaflets(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentDisplayedData = [...leafletData];
        renderCards(currentDisplayedData);
        return;
    }
    
    // Filter berdasarkan title, description, category, dan keywords
    const results = leafletData.filter(leaflet => {
        const titleMatch = leaflet.title.toLowerCase().includes(searchTerm);
        const descMatch = leaflet.description.toLowerCase().includes(searchTerm);
        const categoryMatch = leaflet.category.toLowerCase().includes(searchTerm);
        const keywordMatch = leaflet.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || descMatch || categoryMatch || keywordMatch;
    });
    
    currentDisplayedData = results;
    renderCards(results);
    
    // Tambahkan efek smooth scroll ke hasil
    if (results.length > 0) {
        document.getElementById('leaflet-cards').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Event listener untuk search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    // Real-time search dengan debounce
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchLeaflets(e.target.value);
        }, 300); // Delay 300ms untuk performa lebih baik
    });
    
    // Search saat Enter ditekan
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout);
            searchLeaflets(e.target.value);
        }
    });
    
    // Render initial cards
    renderCards(leafletData);
});

// Fungsi untuk menampilkan foto di modal
function showPhoto(leafletId) {
    const leaflet = leafletData.find(l => l.id === leafletId);
    if (!leaflet) return;
    
    const modalBody = document.getElementById('modal-body-content');
    const modalTitle = document.getElementById('photoModalLabel');
    
    modalTitle.innerHTML = `<i class="fas fa-image me-2"></i>${leaflet.title}`;
    modalBody.innerHTML = `
        <img src="${leaflet.image}" 
             alt="${leaflet.title}" 
             class="img-fluid"
             onerror="this.src='https://via.placeholder.com/800x600?text=Gambar+Tidak+Tersedia'">
        <div class="mt-3">
            <span class="badge bg-primary">${leaflet.category}</span>
            <p class="mt-3 text-muted">${leaflet.description}</p>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('photoModal'));
    modal.show();
}

// Fungsi untuk ajukan permintaan leaflet
function requestLeaflet(leafletId) {
    const leaflet = leafletData.find(l => l.id === leafletId);
    if (!leaflet) return;
    
    // Simulasi pengajuan - bisa diganti dengan request ke server
    alert(`✅ Permintaan leaflet "${leaflet.title}" telah diajukan!\n\nTerima kasih. Leaflet akan segera diproses.`);
    
    // Atau bisa redirect ke form pengajuan
    // window.location.href = `form.html?leaflet=${leafletId}`;
}

// Fungsi untuk filter berdasarkan kategori (opsional)
function filterByCategory(category) {
    if (category === 'all') {
        currentDisplayedData = [...leafletData];
    } else {
        currentDisplayedData = leafletData.filter(l => l.category === category);
    }
    renderCards(currentDisplayedData);
    
    // Update active state pada button
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.btn-filter').classList.add('active');
    
    // Clear search input
    document.getElementById('searchInput').value = '';
    
    // Smooth scroll ke hasil
    document.getElementById('leaflet-cards').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Export functions untuk digunakan di HTML
window.showPhoto = showPhoto;
window.requestLeaflet = requestLeaflet;
window.filterByCategory = filterByCategory;
