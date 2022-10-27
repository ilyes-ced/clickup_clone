extend_sidebar.addEventListener('click', (event) => {
    sidebar_menu.classList.toggle('hidden')
})
























const list_of_tasks = document.querySelectorAll('.list_of_tasks')
for( let i = 0; i < list_of_tasks.length; i++ ) { 
    list_of_tasks[i].addEventListener('mouseover', (event) => {
        if(event.target.classList.contains('table_row')){
            event.target.getElementsByClassName('row_hidden_icons')[0].classList.remove('hidden')
            event.target.getElementsByClassName('row_hidden_icons')[1].classList.remove('hidden')
            event.target.getElementsByClassName('row_hidden_icons')[2].classList.remove('hidden')
        }
    })
    list_of_tasks[i].addEventListener('mouseout', (event) => {
        if(event.target.classList.contains('table_row')){
            event.target.getElementsByClassName('row_hidden_icons')[0].classList.add('hidden')
            event.target.getElementsByClassName('row_hidden_icons')[1].classList.add('hidden')
            event.target.getElementsByClassName('row_hidden_icons')[2].classList.add('hidden')
        }
    })
    list_of_tasks[i].addEventListener('dblclick', (event) => {
        if(event.target.classList.contains('table_row')){
            task_modal.classList.remove('hidden')
            console.log(task_modal)
        }
    })
}

//must do it on all class names at same time
console.log(document.querySelector('.list_of_tasks'))


