import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const login = document.getElementById('login');
const password = document.getElementById('password')
const addButton = document.getElementById('add_user')
const to_register = document.getElementById('to_register')

function proverka(a, b, but){
    if (a.value.replaceAll(' ', '') != '' && b.value.replaceAll(' ', '') != ''){
            but.classList.add('active');
        }
}

function check(a){
    if (a.value == ''){
        a.style.border = "1px solid red";
    }
}

login.addEventListener('focusout', () => {
    proverka(login, password, addButton)
});
password.addEventListener('focusout', () => {
    proverka(login, password, addButton)
})

addButton.addEventListener('click', () => {
    check(login)
    check(password)
})

addButton.addEventListener('click', () => {
    loginn()
})

to_register.addEventListener('click', () => {
    window.location.href='register.html'
})

async function loginn(){
    await axios.post('http://localhost:3000/login', {
        username: login.value,
        password: password.value})
      .then(function (response) {
        if (response.status == "200"){
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href='index.html'
        }})
      .catch(function (error) {
        error = document.createElement('p');
        error.textContent = 'Неверный логин или пароль';
        error.classList.add('error')
        addButton.insertAdjacentElement('beforebegin', error);
      });
}


