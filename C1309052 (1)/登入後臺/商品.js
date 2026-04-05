const products = [
    {
        name: '極簡筆記本',
        description: '精選純白紙張，適合筆記、手帳或繪畫。',
        price: 'NT$ 390',
        image: '../images/p1.png'
    },
    {
        name: '文青貼紙組',
        description: '多款文青貼紙，讓你的手帳和禮物包裝更有風格。',
        price: 'NT$ 220',
        image: '../images/p2.avif'
    },
    {
        name: '質感便條紙',
        description: '暖色系便條紙，適合書桌備忘與創意筆記。',
        price: 'NT$ 260',
        image: '../images/p3.jpg'
    },
    {
        name: '文具組套',
        description: '包含筆、紙膠帶、便利貼，完美入門文具套。',
        price: 'NT$ 480',
        image: '../images/p4.jpg'
    }
];

function renderProducts() {
    const grid = document.getElementById('productsGrid');

    products.forEach((product, index) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(products[${index}])">加入購物車</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateUserInfo() {
    const userLogin = JSON.parse(localStorage.getItem('loggedInUser'));
    const userInfo = document.getElementById('userInfo');

    if (userLogin) {
        userInfo.innerHTML = `你好, ${userLogin.name} 👤 | <a href="#" onclick="logout(); return false;">登出</a>`;
    } else {
        userInfo.innerHTML = '<a href="登入.html">會員登入</a>';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateUserInfo();
});
