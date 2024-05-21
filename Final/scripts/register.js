import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const login = document.getElementById('login');
const password = document.getElementById('password')
const addButton = document.getElementById('add_user')
const repassword = document.getElementById('repassword')
const to_enter = document.getElementById('to_enter')

function proverka(a, b, c, but){
    if (a.value.replaceAll(' ', '') != '' && b.value.replaceAll(' ', '') != '' && b.value == c.value){
            but.classList.add('active');
        }
    else if (b.value != c.value){
            let error = document.createElement('p');
            error.textContent = 'Пароль не совпадает';
            error.classList.add('error')
            addButton.insertAdjacentElement('beforebegin', error);
            b.style.border = "1px solid red";
            c.style.border = "1px solid red";
        }
}

function check(a){
    if (a.value == ''){
        a.style.border = "1px solid red";
    }
}

repassword.addEventListener('focusout', () => {
    proverka(login, password, repassword, addButton)
})

addButton.addEventListener('click', () => {
    check(login)
    check(password)
})

addButton.addEventListener('click', () => {
    register()
    })

to_enter.addEventListener('click', () => {
    window.location.href='enter.html'
})

async function register(){
    await axios.post('http://localhost:3000/register', {
        username: login.value,
        password: password.value
      })
      .then(function (response) {
        if (response.status == "201"){
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href='enter.html'}})
      .catch(function (error) {
        error = document.createElement('p');
        error.textContent = 'Вы уже зарегестрированы';
        error.classList.add('error')
        addButton.insertAdjacentElement('beforebegin', error);
      });
}
