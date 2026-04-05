const formLogin = document.getElementById('formLogin');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const loginError = document.getElementById('loginError');

formLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailElement.value.trim();
    const password = passwordElement.value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!email || !password) {
        loginError.style.display = 'block';
        loginError.textContent = '請輸入Email和密碼。';
        return;
    }

    if (!user) {
        loginError.style.display = 'block';
        loginError.textContent = 'Email或密碼不正確。';
        return;
    }

    loginError.style.display = 'none';
    console.log('Logging in user:', user);
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Lưu thông tin người dùng đã đăng nhập vào localStorage
    console.log('Saved to localStorage');
    window.location.href = '../登入/index.html';
});