//side bar show/hide
extend_sidebar.addEventListener('click', (event) => {
    document.getElementById('sidebar_menu').classList.toggle('hidden')
})

//open and close workspaces
sidebar_menu.addEventListener('click', (event) => {
    if(event.target.classList.contains('toggle_spaces')){
        event.target.parentElement.getElementsByClassName('toggle_spaces_list')[0].classList.toggle('hidden')
    }else if(event.target.parentElement.classList.contains('toggle_spaces')){
        event.target.parentElement.parentElement.getElementsByClassName('toggle_spaces_list')[0].classList.toggle('hidden')
    }



    if(event.target.classList.contains('toggle_create_list_modal')){
        active_workspace = event.target.id
        create_list_modal.classList.toggle('hidden')
        if(!create_list_modal.classList.contains('hidden')){
            document.getElementById('name_create_list').focus()
        }
    }
})





//submit create list on enter
name_create_list.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submit_create_list.click();
    }
});



















// show and hide icons on table row on hover
var row
const list_of_tasks = document.getElementsByClassName('list_of_tasks')
for( let i = 0; i < list_of_tasks.length; i++ ) {
    list_of_tasks[i].addEventListener('mouseover', (event) => {
        row = define_hovered_row(event.target)
        if (event.target.matches('.table_row,.table_row *')) {
            row.getElementsByClassName('row_hidden_icons')[0].classList.remove('hidden')
            row.getElementsByClassName('row_hidden_icons')[1].classList.remove('hidden')
            row.getElementsByClassName('row_hidden_icons')[2].classList.remove('hidden')
        }
    })

    list_of_tasks[i].addEventListener('mouseout', (event) => {
        row = define_hovered_row(event.target)
        if (event.target.matches('.table_row,.table_row *')) {
            row.getElementsByClassName('row_hidden_icons')[0].classList.add('hidden')
            row.getElementsByClassName('row_hidden_icons')[1].classList.add('hidden')
            row.getElementsByClassName('row_hidden_icons')[2].classList.add('hidden')
        }
    })


    list_of_tasks[i].addEventListener('click', (event) => {
        if(event.target.classList.contains('add_task_in_list')){
            alert('create')
        }
    })
}




