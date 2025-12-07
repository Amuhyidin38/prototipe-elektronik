// Data Produk Dummy (Katalog)
const products = [
    {
        id: 1,
        name: "Laptop Pro Gaming X",
        category: "Laptop",
        price: 15000000,
        image: "image/laptop-gaming.jpg",
        specs: ["RAM: 16GB DDR4", "Storage: 512GB SSD", "Processor: Intel i7", "Garansi: 2 Tahun"]
    },
    {
        id: 2,
        name: "Smartphone Ultra 5G",
        category: "Smartphone",
        price: 8500000,
        image: "image/smartphone-5g.jpg",
        specs: ["RAM: 8GB", "Storage: 128GB", "Camera: 64MP", "Battery: 5000mAh"]
    },
    {
        id: 3,
        name: "Headphone Noise Cancel",
        category: "Aksesoris",
        price: 1200000,
        image: "image/headphone.jpg",
        specs: ["Type: Over-ear", "Battery: 30 Hours", "Connection: Bluetooth 5.0"]
    },
    {
        id: 4,
        name: "Ultrabook Slim Book",
        category: "Laptop",
        price: 10000000,
        image: "image/ultrabook.jpg",
        specs: ["RAM: 8GB", "Storage: 256GB SSD", "Weight: 1.2kg", "Screen: 13 Inch"]
    }
];

let cart = [];

// Render Produk saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button onclick="openProductModal(${product.id})">Lihat Detail</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Kategori
function filterCategory(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Fitur Pencarian Cerdas (Sesuai Poin 2)
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Modal Detail Produk
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('modalTitle').innerText = product.name;
    document.getElementById('modalPrice').innerText = `Rp ${product.price.toLocaleString('id-ID')}`;
    document.getElementById('modalImg').src = product.image;
    
    // Render Spesifikasi Teknis
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerText = spec;
        specsList.appendChild(li);
    });

    // Setup tombol tambah ke keranjang
    const btn = document.getElementById('addToCartBtn');
    btn.onclick = () => addToCart(product);

    document.getElementById('productModal').style.display = 'block';
}

// Manajemen Keranjang
function addToCart(product) {
    cart.push(product);
    updateCartUI();
    alert('Produk ditambahkan ke keranjang!');
    closeModal('productModal');
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name}</span>
            <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">X</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    document.getElementById('cartTotal').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Simulasi Checkout (Sesuai Poin 2 & 3: Tidak ada pemrosesan uang sungguhan)
function processCheckout() {
    const name = document.getElementById('buyerName').value;
    const address = document.getElementById('buyerAddress').value;

    if (cart.length === 0) {
        alert("Keranjang Anda kosong!");
        return;
    }
    if (!name || !address) {
        alert("Mohon lengkapi nama dan alamat pengiriman.");
        return;
    }

    // Simulasi Berhasil
    alert(`Terima kasih ${name}!\nPesanan Anda telah dikonfirmasi.\n(Ini hanya simulasi, tidak ada pembayaran yang diproses)`);
    
    // Reset
    cart = [];
    updateCartUI();
    closeModal('cartModal');
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerAddress').value = '';
}

// Utilitas Modal
function toggleCart() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Tutup modal jika klik di luar area
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}