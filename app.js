const form = document.getElementById('form');
const input = document.getElementById('input-form');
const listTask = document.getElementById('list-task');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
let tasks = {};

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('task')){
        tasks = JSON.parse(localStorage.getItem('task'));
    }
    createList();
})

listTask.addEventListener('click', e => {
    if (e.path[0].classList.contains('text-success') ){
        tasks[e.target.dataset.id].state = true;
        createList();
    }
    if (e.path[0].classList.contains('text-danger') ){
        delete tasks[e.target.dataset.id]
        createList();
    }
    if (e.path[0].classList.contains('fa-undo-alt') ){
        tasks[e.target.dataset.id].state = false;
        createList();
    }
    e.stopPropagation();
})

form.addEventListener('submit', e =>{
    e.preventDefault();
    setTarea(e);
})

const setTarea = e =>{
    if (input.value.trim() === ''){
        return;
    }

    const task = {
        id: Date.now(),
        text: input.value.trim(),
        state: false
    }

    tasks[task.id] = task;

    form.reset();
    input.focus();

    createList();
}

const createList = () =>{

    localStorage.setItem('task', JSON.stringify(tasks));

    if(Object.values(tasks).length == 0){
        listTask.innerHTML = `<div class="alert alert-dark text-center">No hay tareas pendientes!</div>`
        return;
    }
    listTask.innerHTML = '';
    Object.values(tasks).forEach(task => {
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = task.text;

        if(task.state){
            clone.querySelector('.alert').classList.replace('alert-warning','alert-success');
            clone.querySelector('.fa-check-circle').classList.replace('fa-check-circle', 'fa-undo-alt');
            clone.querySelector('.fa-undo-alt').classList.remove('text-success');
            clone.querySelector('p').style.textDecoration = 'line-through';
        }

        clone.querySelectorAll('.fas')[0].dataset.id = task.id;
        clone.querySelectorAll('.fas')[1].dataset.id = task.id;
        fragment.appendChild(clone);
    })
    listTask.append(fragment);
}