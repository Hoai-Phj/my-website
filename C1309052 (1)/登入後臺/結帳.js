// Lấy thông tin đơn hàng từ URL
function getOrderIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('orderId');
}

function renderOrderSummary() {
    const orderId = getOrderIdFromUrl();
    if (!orderId) {
        document.getElementById('orderSummary').innerHTML = '<p>無效的訂單</p>';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);

    if (!order) {
        document.getElementById('orderSummary').innerHTML = '<p>找不到訂單</p>';
        return;
    }

    let summaryHTML = '<h3>訂單摘要</h3>';
    order.items.forEach(item => {
        summaryHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>NT$ ${parseInt(item.price.replace('NT$ ', '')) * item.quantity}</span>
            </div>
        `;
    });
    summaryHTML += `
        <div class="order-item">
            <span>總計</span>
            <span>NT$ ${order.total}</span>
        </div>
    `;

    document.getElementById('orderSummary').innerHTML = summaryHTML;

    // Điền thông tin khách hàng nếu có
    const userLogin = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userLogin) {
        document.getElementById('name').value = userLogin.name;
        document.getElementById('phone').value = userLogin.phone || '';
        document.getElementById('address').value = userLogin.address || '';
    }
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

function handlePaymentChange() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const bankInfo = document.getElementById('bankInfo');

    if (paymentMethod === 'bank') {
        bankInfo.style.display = 'block';
    } else {
        bankInfo.style.display = 'none';
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const orderId = getOrderIdFromUrl();
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);

    if (!order) {
        alert('訂單無效');
        return;
    }

    // Cập nhật thông tin giao hàng
    order.shippingInfo = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };

    // Cập nhật trạng thái đơn hàng
    order.status = 'confirmed';

    // Lưu lại
    localStorage.setItem('orders', JSON.stringify(orders));

    // Hiển thị thông báo thành công
    alert('訂購成功！我們將盡快處理您的訂單。');

    // Chuyển về trang chủ
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', function() {
    renderOrderSummary();
    updateUserInfo();

    // Thêm event listeners
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', handlePaymentChange);
    });

    document.getElementById('checkoutForm').addEventListener('submit', handleSubmit);
});
