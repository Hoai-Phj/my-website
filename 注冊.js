const formRegister = document.getElementById('formRegister');
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('confirmPassword');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

formRegister.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    // Reset errors
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    let isValid = true;

    if (!name) {
        nameError.style.display = 'block';
        isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    }

    if (!password) {
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            emailError.textContent = 'Email已被使用。';
            emailError.style.display = 'block';
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('注冊成功！請使用您的帳戶登入。');
        window.location.href = '登入.html';
    }
});