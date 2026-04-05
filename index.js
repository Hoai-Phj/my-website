function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => el.textContent = count);
}

document.addEventListener('DOMContentLoaded', function() {
    const userLogin = JSON.parse(localStorage.getItem('loggedInUser'));
    const userInfo = document.getElementById('userInfo');
    
    if (userLogin) {
        userInfo.innerHTML = `你好, ${userLogin.name} 👤 | <a href="#" onclick="logout(); return false;">登出</a>`;
    } else {
        userInfo.innerHTML = '<a href="登入.html">會員登入</a>';
    }

    updateCartCount();
});