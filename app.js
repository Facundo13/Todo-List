const form = document.getElementById('form');
const input = document.getElementById('input-form');
const listTask = document.getElementById('list-task');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
let tasks = {
    1629323606908:{
        id: 1629323606908,
        text: 'Tarea #1',
        state: false
    },
    1629323669162:{
        id:1629323669162,
        text: 'Tarea #2',
        state: false
    }
};

document.addEventListener('DOMContentLoaded', ()=>{
    createList();
})

listTask.addEventListener('click', e => {
    if (e.path[0].classList.contains('text-success') ){
        tasks[e.target.dataset.id].state = true;
        createList();
        console.log(tasks);
    }
    if (e.path[0].classList.contains('text-danger') ){
        delete tasks[e.target.dataset.id]
        createList();
        console.log(tasks);
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
    listTask.innerHTML = '';
    Object.values(tasks).forEach(task => {
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = task.text;

        

        clone.querySelectorAll('.fas')[0].dataset.id = task.id;
        clone.querySelectorAll('.fas')[1].dataset.id = task.id;
        fragment.appendChild(clone);
    })
    listTask.append(fragment);
}