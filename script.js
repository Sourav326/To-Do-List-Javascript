
const addButton = document.querySelector('.add-btn');
addButton.addEventListener('click',handleAdd);

let toDoList = JSON.parse(localStorage.getItem('to-do-list'));
let ul = document.querySelector('.to-do-list');


let editId;
let isEdited = false;



const success = document.querySelector(".success");

//Bind the list item to the list
function createToDo(fliter){
    let li = '';
    let toDoList = JSON.parse(localStorage.getItem('to-do-list'));
    
        if(toDoList && (toDoList.length > 0)){
            toDoList.forEach((toDoList,id) => {
                let isCompleted = toDoList.status == 'completed' ? 'checked' : ''
                li+= `<li id="${id}">
                <div class="list-item">
                    <input type="checkbox" onclick="handleCheckBox(this)" id="${id}" ${isCompleted}>
                    <span class="${isCompleted}">${toDoList.task}</span>
                    <span class="task-status">${toDoList.status}</span>
                </div>
                <div class="actions">
                    <i class="bi bi-pen" title="Edit Task" onclick="editTask(${id},'${toDoList.task}')"></i>
                    <i class="bi bi-trash" title="Delete Task" onclick="deleteTask(${id})"></i>
                </div>
            </li> `
            });
        } else {
            li+= '<p class="no-data">No Task Available in your to do list</p>';
        }
    ul.innerHTML = li;

    success.style.display = "block";
    setTimeout(function(){
        success.style.display = "none";
    },2000,success)
}
createToDo();


//Add the list item to localstorage
function handleAdd(){
    let inputElement = document.querySelector('#task-input');
    let input = inputElement.value;

    if(input === ''){
        const error = document.querySelector(".error");
        error.innerHTML = "Please enter a task! It can't be empty";
        error.style.display = "block";
        setTimeout(function(){
            error.style.display = "none";
        },2000,error)
    } else{

        if(isEdited == false){
            if(!toDoList){
                toDoList = [];
            }
            let data = {
                task:input,
                status:'pending'
            }
            toDoList.push(data);
            success.innerHTML = "New task Added Successfully";
        } else {
            isEdited = false;
            toDoList[editId].task = input;
            success.innerHTML = "Task Updated Successfully";
        }
        inputElement.value = "";
       
        localStorage.setItem("to-do-list",JSON.stringify(toDoList));
        createToDo();
    } 
}


//change the status of the task on checkbox check and uncheck
function handleCheckBox(selected){
    
    const taskName = selected.parentElement.lastElementChild;
    if(selected.checked){
        taskName.classList.add('checked')
        toDoList[selected.id].status = 'completed'
    } else{
        taskName.classList.remove('checked')
        toDoList[selected.id].status = 'pending'
    }
    localStorage.setItem("to-do-list",JSON.stringify(toDoList));
        success.innerHTML = "Task Status Changed Successfully";
    createToDo()
}


// Edit a perticular task
function editTask(id,task){
    editId = id;
    isEdited = true;
    let inputElement = document.querySelector('#task-input');
    inputElement.value = task;
}
// Delete a perticular task
function deleteTask(id){
    toDoList.splice(id,1);
    localStorage.setItem("to-do-list",JSON.stringify(toDoList));
    success.innerHTML = "Task Deleted Successfully";
    createToDo()
}


// Delete all the list items
function clearAll(){
    localStorage.removeItem("to-do-list");
    // createToDo();
    location.reload();
}