// Giỏ hàng lưu trong localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
    alert(`${product.name} 已加入購物車！`);
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;
    const cart = getCart();
    cart[index].quantity = newQuantity;
    saveCart(cart);
    renderCart();
}

function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (parseInt(item.price.replace('NT$ ', '')) * item.quantity), 0);
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>購物車是空的</h3>
                <p>快去選購一些商品吧！</p>
                <button onclick="window.location.href='商品.html'" class="btn-primary">前往商品頁面</button>
            </div>
        `;
        cartTotal.style.display = 'none';
        document.querySelector('.cart-actions').style.display = 'none';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-price">NT$ ${parseInt(item.price.replace('NT$ ', '')) * item.quantity}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">移除</button>
        </div>
    `).join('');

    cartTotal.innerHTML = `
        <h3>總計</h3>
        <div class="total-price">NT$ ${calculateTotal()}</div>
    `;
    cartTotal.style.display = 'block';
    document.querySelector('.cart-actions').style.display = 'flex';
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => el.textContent = count);
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

function checkout() {
    const userLogin = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!userLogin) {
        alert('請先登入才能結帳！');
        window.location.href = '登入.html';
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }

    // Lưu đơn hàng vào localStorage (mô phỏng database)
    const order = {
        id: Date.now(),
        customer: userLogin,
        items: cart,
        total: calculateTotal(),
        status: 'pending',
        date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Xóa giỏ hàng
    localStorage.removeItem('cart');

    // Chuyển đến trang thanh toán
    window.location.href = '結帳.html?orderId=' + order.id;
}

window.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCount();
    updateUserInfo();

    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    document.getElementById('continueShoppingBtn').addEventListener('click', () => {
        window.location.href = '商品.html';
    });
});
