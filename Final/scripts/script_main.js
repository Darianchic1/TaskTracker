import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const addBacklog = document.getElementById('add_backlog')
const addDevelop = document.getElementById('add_development')
const addApproval = document.getElementById('add_approval')
const addDone = document.getElementById('add_done')
const form = document.getElementById('form')
const send = document.getElementById('send_form')

/*form*/
const user=document.getElementById('user')
const task=document.getElementById('task')
const status_task =document.getElementById('status_task')

/*tasks*/
const backlog = document.getElementById('Backlog');
const inDevelopment = document.getElementById('In development');
const onApproval = document.getElementById('On approval');
const done = document.getElementById('Done');
const show = document.getElementById('show');
const us = document.getElementById('us');

/*number*/
var first = 0
var second = 0
var third = 0
var forth = 0

const orange_num = document.getElementById('orange');
const violet_num = document.getElementById('violet');
const green_num = document.getElementById('green');
const pink_num = document.getElementById('pink');

const change_status = document.querySelectorAll('change_status')
const change_button = document.getElementById('change_button')

let tasks = document.querySelectorAll('task')



orange_num.innerText = first
pink_num.innerText = second
violet_num.innerText = third
green_num.innerText = forth

addBacklog.addEventListener('click', () => {
    form.style.visibility = "visible";
})

addDevelop.addEventListener('click', () => {
    form.style.visibility = "visible";
})

addApproval.addEventListener('click', () => {
    form.style.visibility = "visible";
})

addDone.addEventListener('click', () => {
    form.style.visibility = "visible";
})

status_task.addEventListener('focusout', () => {
    proverka(status_task, send)
});

send.addEventListener('click', () => {
    axios.post("http://localhost:3000/task", {
        username: user.value,
        task: task.value,
        status: status_task.value
    })
    .then((response) => {
        if (response.status == "200"){
            console.log('получилось')
        }
        else {
            let error = document.createElement('p');
        }
    form.style.visibility = "visible";
    });
})

show.addEventListener('click', () => {
    get_tasks()
})

us.addEventListener('focusout', () => {
    proverka(us, show)
});


async function get_tasks() {
    const res = await axios.get(`http://localhost:3000/tasks?username=${us.value}`);
    const json = res.data;
    display(json);
    orange_num.innerText = first
    pink_num.innerText = second
    violet_num.innerText = third
    green_num.innerText = forth
} 

function display(data){
    backlog.innerHTML = ''
    inDevelopment.innerHTML = ''
    onApproval.innerHTML = ''
    done.innerHTML = ''
    let statuses = ['Backlog', 'In development', 'On approval', 'Done']
    data.forEach(element => {
        let task = document.createElement("div");
        task.classList.add('task')
        let statuses_change = statuses.filter(status => status != (element.status));
        task.innerHTML = `
        <div class="delete" id="delete">X</div>
        <h3>${element.task}</h3>
        <div class="change_str">
            <select class="change_status" id="${element.id}">
                <option>${element.status}</option>
                <option>${statuses_change[0]}</option>
                <option>${statuses_change[1]}</option>
                <option>${statuses_change[2]}</option>
            </select>
            <button class="change_button" id="change_button")">&#10003</button>
        </div>
        <img src="statics/Avatars.svg" alt="" class="tasks_participants">
        <img src="statics/Add Button.svg" alt="" class="add_participants">`;
        document.getElementById(`${element.status}`).append(task)
        numbers(element.status)
        let num = Number (`${element.id}`) + 1
        console.log(num)

        document.getElementById(`delete`).addEventListener('click', function() {
            deleteData(element.id)
        });

        task.getElementById(`change_button`).addEventListener('click', function() {
            change(element.id)
        });
    });
};



function numbers(status){
    if (status == 'Backlog'){
        first += 1;
    }
    else if(status == 'In development'){
        second += 1;
    }
    else if(status == 'On approval'){
        third += 1;
    }
    else{
        forth += 1;
    }
}

async function change(id){
    await axios.patch(`http://localhost:3000/task/${id}`, {
        status: document.getElementById(`${id}`).value
    })
        .then(response => get_tasks())
        .catch(error => console.log('yt получилось'));
}


async function deleteData(id){
    const response = await axios.delete(`http://localhost:3000/task/${id}`);
    get_tasks()
};


function proverka(a, but){
    if (a.value.replaceAll(' ', '') != ''){
            but.classList.add('active');
        }
}

function check(a){
    if (a.value == ''){
        a.style.border = "1px solid red";
    }
}

