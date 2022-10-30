//side bar show/hide
extend_sidebar.addEventListener('click', (event) => {
    document.getElementById('sidebar_menu').classList.toggle('hidden')
})


//events on sidebar
sidebar_menu.addEventListener('click', (event) => {
    //close and open workspaces
    if(event.target.classList.contains('toggle_spaces')){
        event.target.parentElement.getElementsByClassName('toggle_spaces_list')[0].classList.toggle('hidden')
    }else if(event.target.parentElement.classList.contains('toggle_spaces')){
        event.target.parentElement.parentElement.getElementsByClassName('toggle_spaces_list')[0].classList.toggle('hidden')
    }
    //open create list modal
    if(event.target.classList.contains('toggle_create_list_modal')){
        active_space = event.target.parentElement.parentElement.id
        console.log(active_space)
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
//submit create space on enter
name_create_space.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        console.log('clicked')
        submit_create_space.click();
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

        if (event.target.classList.contains('task_category_toggle')) {
            hover_item.classList.remove('hidden')
            hover_item.style.top = (event.target.offsetTop-60)+'px'
            hover_item.style.left = event.target.offsetLeft+'px'
            hover_item_content.innerText = 'this tech'
        }
    })

    list_of_tasks[i].addEventListener('mouseout', (event) => {
        row = define_hovered_row(event.target)
        if (event.target.matches('.table_row,.table_row *')) {
            row.getElementsByClassName('row_hidden_icons')[0].classList.add('hidden')
            row.getElementsByClassName('row_hidden_icons')[1].classList.add('hidden')
            row.getElementsByClassName('row_hidden_icons')[2].classList.add('hidden')
        }

        if (event.target.classList.contains('task_category_toggle')) {
            hover_item.classList.add('hidden')
        }
    })


    list_of_tasks[i].addEventListener('click', (event) => {
        if(event.target.classList.contains('add_task_in_list')){
            alert('create')
        }

        if(event.target.classList.contains('toggle_types_modal')){
            console.log('ggg')
            selected_task_type = event.target.parentElement.parentElement.id
            if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
                selected_task_parent_task=event.target.parentElement.parentElement.parentElement.previousElementSibling.id
            }
            types_modal.classList.remove('hidden')
            types_modal_content.style.top = (event.target.offsetTop+40)+'px'
            types_modal_content.style.left = event.target.offsetLeft+'px'
        }





        if(event.target.classList.contains('task_category_toggle')){
            selected_task = event.target.parentElement.parentElement.id
            if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
                selected_task_parent_task=event.target.parentElement.parentElement.parentElement.previousElementSibling.id
            }
            categories_modal.classList.remove('hidden')
            categories_modal_content.style.top = (event.target.offsetTop+40)+'px'
            categories_modal_content.style.left = event.target.offsetLeft+'px'
        }else{
            selected_task = event.target.parentElement.parentElement.parentElement.id
            if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
                selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.id
            }
            categories_modal.classList.remove('hidden')
            categories_modal_content.style.top = (event.target.offsetTop+40)+'px'
            categories_modal_content.style.left = event.target.offsetLeft+'px'
        }
    })
}









