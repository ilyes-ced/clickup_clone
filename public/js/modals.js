//hide the success modal
close_success_modal.addEventListener('click', (event) => {
    success_modal.classList.add('hidden')
})





//open create space modal
document.getElementById('toggle_create_space_modal').addEventListener('click', (event) => {
    create_space_modal.classList.toggle('hidden')
    if(!create_space_modal.classList.contains('hidden')){
        document.getElementById('name_create_space').focus()
    }
})




//open create task modal
toggle_create_task_modal.addEventListener('click', (event) => {
    create_task_modal.classList.toggle('hidden')
    if(!create_task_modal.classList.contains('hidden')){
        document.getElementById('name_create_task').focus()
    }
})


//close create list modal
create_list_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        create_list_modal.classList.toggle('hidden')
        name_create_list.value=""
    }
})
//close create space modal
create_space_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        create_space_modal.classList.toggle('hidden')
        name_create_space.value=""
    }
})



//close create task modal
create_task_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        create_task_modal.classList.toggle('hidden')
        name_create_task.value=""
    }
})



//close types modal
types_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        types_modal.classList.toggle('hidden')
    }
})

//close categories modal
categories_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        categories_modal.classList.toggle('hidden')
    }
})



//close tags modal
tags_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        tags_modal.classList.toggle('hidden')
    }
})

//close task modal
task_modal.addEventListener('click', (event) => {
    if(event.target == event.currentTarget) {
        task_modal.classList.toggle('hidden')
    }
})


//hide loading animation
window.addEventListener('load', () => {
    document.getElementById('loader_parent').style.display = 'none';
});