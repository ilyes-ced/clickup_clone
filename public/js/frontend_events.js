
active_space = document.getElementsByClassName('toggle_spaces')[0].parentElement.id
active_list = document.getElementsByClassName('list_names')[0].id
document.getElementsByClassName('toggle_spaces')[0].classList.add('active_space')
document.getElementsByClassName('list_names')[0].classList.add('active_list')
document.getElementsByClassName('list_tasks_box')[0].classList.remove('hidden')



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
    //set active list
    if(event.target.classList.contains('list_names')){

        document.getElementsByClassName('active_space')[0].classList.remove('active_space')
        document.getElementsByClassName('active_list')[0].classList.remove('active_list')
        document.getElementById('list_tasks_box_'+active_list).classList.add('hidden')
        event.target.classList.add('active_list')
        event.target.parentElement.parentElement.parentElement.firstElementChild.classList.add('active_space')
        active_space = event.target.parentElement.parentElement.parentElement.id
        active_list = event.target.id
        document.getElementById('list_tasks_box_'+active_list).classList.remove('hidden')

        console.log(active_list)
        //list_tasks_box_
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
//const list_of_tasks = document.getElementsByClassName('list_of_tasks')
//for( let i = 0; i < list_of_tasks.length; i++ ) {}

document.addEventListener('dblclick', (event) => {
    if (event.target.matches('.table_row, .table_row *')) {
        row = define_hovered_row(event.target)
        task_modal.classList.remove('hidden')
    }
})




























document.addEventListener('mouseover', (event) => {
    //shows 3 hidden icons on hover
    if (event.target.matches('.table_row, .table_row *')) {
        row = define_hovered_row(event.target)
        row.getElementsByClassName('row_hidden_icons')[0].classList.remove('hidden')
        row.getElementsByClassName('row_hidden_icons')[1].classList.remove('hidden')
        row.getElementsByClassName('row_hidden_icons')[2].classList.remove('hidden')
    }
    //shows category on hover
    if (event.target.classList.contains('task_category_toggle')) {
        hover_item.classList.remove('hidden')
        hover_item.style.top = (event.target.offsetTop-60)+'px'
        hover_item.style.left = event.target.offsetLeft+'px'
        hover_item_content.innerText = 'this tech'
    }

    
})















document.addEventListener('mouseout', (event) => {
    if (event.target.matches('.table_row, .table_row *')) {
        row = define_hovered_row(event.target)
        row.getElementsByClassName('row_hidden_icons')[0].classList.add('hidden')
        row.getElementsByClassName('row_hidden_icons')[1].classList.add('hidden')
        row.getElementsByClassName('row_hidden_icons')[2].classList.add('hidden')
    }

    if (event.target.classList.contains('task_category_toggle')) {
        hover_item.classList.add('hidden')
    }
})















task_create_select_input_toggle.addEventListener('input', (event) => {
    event.target.value
})







document.addEventListener('click', (event) => {
    
    if(event.target.id == "create_sub_task_input"){
        event.target.insertAdjacentHTML('beforebegin', '<input class="bg-blue-600  border border-red-600 " placeholder="new sub task" type="text">')
    }

    if(event.target.id == "task_create_select_input_toggle"){
        task_create_select_input.classList.toggle('hidden')
    }
    if(event.target.classList.contains('selected_list_to_add_task')){
        task_create_select_input_toggle.innerText = event.target.innerText
        task_create_select_input.classList.add('hidden')  
    }
    //show and hide list of tasks 
    if(event.target.classList.contains('toggle_list_of_tasks')){
        event.target.parentElement.getElementsByClassName('list_of_tasks')[0].classList.toggle('hidden')
    }
    //show and hide sub tasks
    if(event.target.classList.contains('toggle_sub_tasks')){
        event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].classList.toggle('hidden')
    }
    //create sub task
    if(event.target.classList.contains('create_sub_task_in_list')){
        event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].classList.remove('hidden')
        //not working when 0 sub tasks
        if(event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].lastElementChild){
            event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].lastElementChild.firstElementChild.firstElementChild.remove()
            event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].lastElementChild.firstElementChild.firstElementChild.insertAdjacentHTML('beforebegin', middle_sub_task)
        }
        event.target.parentElement.parentElement.parentElement.getElementsByClassName('hidden_sub_tasks')[0].insertAdjacentHTML('beforeend', sub_table_element)
        tempo = event.target.parentElement.parentElement.firstElementChild.firstElementChild.style.backgroundColor
        document.getElementById('remove_on_error').firstElementChild.firstElementChild.nextElementSibling.style.borderColor = tempo
        document.getElementById('remove_on_error').firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.backgroundColor = tempo
        //remove_on_error
        new_task_name = document.getElementById('new_task_name')
        selected_task_parent_task = event.target.parentElement.parentElement.parentElement.id
        list_category = event.target.parentElement.parentElement.parentElement.parentElement.id
        new_task_name.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                create_sub_task_in_list()
            }
        })
        new_task_name.focus()
        new_task_name.addEventListener('blur', (event) => {
            document.getElementById('remove_on_error').remove()
            hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.remove()
            hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.insertAdjacentHTML('beforebegin', final_sub_task)
        })
    }


    if(event.target.classList.contains('add_task_in_list')){
        event.target.insertAdjacentHTML('beforebegin', table_element)
        tempo = document.getElementById('remove_on_error').firstElementChild.firstElementChild
        tempo.style.borderColor = 'transparent'
        
        tempo.firstElementChild.style.backgroundColor = event.target.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.style.backgroundColor

        tempo.style.borderColor = 'transparent'
        new_task_name = document.getElementById('new_task_name')
        list_category = event.target.parentElement.id
        new_task_name.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                create_task_in_list()
            }
        });
        new_task_name.focus()
        new_task_name.addEventListener('blur', (event) => {
            document.getElementById('remove_on_error').remove()
        })
    }
    
    //show type modal
    if(event.target.classList.contains('toggle_types_modal')){
        selected_task_type = event.target.parentElement.parentElement.parentElement.id
        if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_type=event.target.parentElement.parentElement.id
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.id
        }
        types_modal.classList.remove('hidden')
        console.log(event.target.offsetTop+40+'/'+event.target.offsetLeft)

        types_modal_content.style.top = (event.target.offsetTop+40)+'px'
        types_modal_content.style.left = event.target.offsetLeft+'px'
    }




    //show category modal
    if(event.target.classList.contains('task_category_toggle')){
        selected_task = event.target.parentElement.parentElement.id
        if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.id
        }
        categories_modal.classList.remove('hidden')
        categories_modal_content.style.top = (event.target.offsetTop+40)+'px'
        categories_modal_content.style.left = event.target.offsetLeft+'px'
    }else if(event.target.parentElement.classList.contains('task_category_toggle')){
        selected_task = event.target.parentElement.parentElement.parentElement.id
        if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
        }
        categories_modal.classList.remove('hidden')
        categories_modal_content.style.top = (event.target.offsetTop+40)+'px'
        categories_modal_content.style.left = event.target.offsetLeft+'px'
    }


    if(event.target.classList.contains('toggle_tags_modal')){
        selected_task = event.target.parentElement.parentElement.id
        //for sub tasks needs fixing
        if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.id
        }
        tags_modal.classList.remove('hidden')
        tags_modal_content.style.top = (event.target.offsetTop+30)+'px'
        tags_modal_content.style.left = event.target.offsetLeft+'px'
    }


    if(event.target.classList.contains('remove_tag')){
        selected_task_parent_task = null
        selected_task = event.target.parentElement.parentElement.parentElement.parentElement.id
        if(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
        }
        remove_tag(event.target)
    }
})




































































/*
slist(document.getElementById("tempo"));



function slist (target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByClassName("table_row"), current = null;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;
    
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = (ev) => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };
    
    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = (ev) => {
      if (i != current) { i.classList.add("active"); }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      i.classList.remove("active");
    };

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};
 
    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (evt) => { evt.preventDefault(); };
 
    // (B7) ON DROP - DO SOMETHING
    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}
*/