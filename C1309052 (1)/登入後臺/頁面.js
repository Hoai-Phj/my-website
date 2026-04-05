document.addEventListener('DOMContentLoaded', function() {
    const userLogin = JSON.parse(localStorage.getItem('loggedInUser')); // Lấy thông tin người dùng đã đăng nhập từ localStorage
    console.log('userLogin from localStorage:', userLogin);

    const userLoginElement = document.getElementById('userLogin');
    console.log('userLoginElement:', userLoginElement);
    const registerLink = document.querySelector('a[href="注冊.html"]'); 
    const loginLink = document.querySelector('a[href="登入.html"]');

    if (userLogin) {
        userLoginElement.innerHTML = `你好, ${userLogin.name} 👤 | <a href="登入.html" style="color: inherit;">登出</a>`; 
        userLoginElement.style.fontSize = '40px'; //
        userLoginElement.style.display = 'inline-flex'; 
        userLoginElement.style.alignItems = 'center';
        // Không ẩn link đăng ký/đăng nhập
    }
    else {
        userLoginElement.innerHTML = ""; 
    }
});