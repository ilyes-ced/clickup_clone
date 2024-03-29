
active_space = document.getElementsByClassName('toggle_spaces')[0].parentElement.id
active_list = document.getElementsByClassName('list_names')[0].id
document.getElementById('current_active_space_element').innerText = document.getElementById(active_space).firstElementChild.firstElementChild.innerText
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
        console.log(document.getElementById(active_space).firstElementChild.firstElementChild.innerText)
        document.getElementById('current_active_space_element').innerText = document.getElementById(active_space).firstElementChild.firstElementChild.innerText
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






































var row

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

//task_create_select_input_toggle.addEventListener('input', (event) => {
//    event.target.value
//    alert('gg')
//})

document.addEventListener('click', (event) => {
    
    //toggle_in_list_types
    //in_list_types
    //in_list_selected_type
    
    
    if(event.target.id == "submit_create_task"){
        submit_in_list_task()
    }
    

    if(event.target.classList.contains('clicked_type_in_list')){
        toggle_in_list_types.firstElementChild.innerHTML=  '<div class="h-full w-full flex items-center justify-center rounded-tr-md"> '+event.target.innerText+' </div>'
        toggle_in_list_types.firstElementChild.firstElementChild.style.backgroundColor = event.target.style.backgroundColor 
        task_type_toggle_task_modal_value.value = event.target.id
    }

    if(event.target.classList.contains('edit_task')){
        if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            tempo = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = '<input id="changing_task_name" type="text" value="'+event.target.parentElement.firstElementChild.nextElementSibling.innerText+'" class=" bg-transparent">'
        }else{
            tempo = event.target.parentElement.firstElementChild.nextElementSibling.innerHTML = '<input id="changing_task_name" type="text" value="'+event.target.parentElement.firstElementChild.nextElementSibling.innerText+'" class=" bg-transparent">'
        }
        tempo = document.getElementById('changing_task_name')
        // to go to the end of the text in the input
        tempo.selectionStart = tempo.selectionEnd = tempo.value.length;
        tempo.focus()
        tempo.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                tempo.insertAdjacentHTML("beforebegin", tempo.value)
                if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
                    rename_task(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id, event.target.parentElement.parentElement.parentElement.id, tempo.value)
                }else{
                    rename_task(event.target.parentElement.parentElement.parentElement.id, tempo.value)
                }
                tempo.remove()
            }
        })
        //here send request to change      
        tempo.addEventListener('blur', (event) => {
            tempo.insertAdjacentHTML("beforebegin", tempo.value)
            tempo.remove()
        })
    }
    if(event.target.id == "delete_task"){
        delete_task(event.target.parentElement.parentElement.parentElement.parentElement.id)
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.innerText = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.innerText)-1+" tasks"
        event.target.parentElement.parentElement.parentElement.parentElement.remove()
    }
    
    if(event.target.id == "delete_sub_task"){
        delete_sub_task(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id, event.target.parentElement.parentElement.parentElement.id)
        event.target.parentElement.parentElement.parentElement.remove()
    }

    
    
    if(event.target.id == "create_sub_task_input"){
        event.target.insertAdjacentHTML('beforebegin', '<input class="bg-transparent rounded-lg border p-2 outline-none border-[#1e272e] " id="remove_on_error" placeholder="new sub task" type="text">')
        tempo = document.getElementById('remove_on_error')
        tempo.focus()
        tempo.addEventListener('blur', () => {
            tempo.remove()
        })
        tempo.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                console.log('ues')
                
                new_sub_tasks_tempo.innerHTML += `
                    <div class="flex flex-row justify-between p-2 new_sub_tasks_get items-center">
                        <div> ${tempo.value} </div>
                        <div class="text-red-400 p-2 hover:bg-[#1e272e] rounded-full w-8 h-8 cursor-pointer flex items-center justify-center">X</div>
                    </div>
                `
                new_sub_tasks_tempo.classList.add('border')
                tempo.value = ""
            }
        });
    }
    
    if(event.target.id == "task_create_priority_toggle"){
        task_create_priority.classList.toggle('hidden')
    }
    if(event.target.id == "task_create_select_input_toggle"){
        task_create_select_input.classList.toggle('hidden')
    }
    if(event.target.classList.contains('selected_list_to_add_task')){
        task_create_select_input_id.value = event.target.id
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

    if(event.target.classList.contains('toggle_priorities_modal')){
        selected_task = event.target.parentElement.parentElement.id
        //for sub tasks needs fixing
        if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.id
        }
        priorities_modal.classList.remove('hidden')
        priorities_modal_content.style.top = (event.target.offsetTop+30)+'px'
        priorities_modal_content.style.left = event.target.offsetLeft+'px'
    }

    if(event.target.classList.contains('remove_tag')){
        selected_task_parent_task = null
        selected_task = event.target.parentElement.parentElement.parentElement.parentElement.id
        if(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
            selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
        }
        remove_tag(event.target)
    }



    if(event.target.classList.contains('task_category_toggle_task_modal') || event.target.parentElement.classList.contains('task_category_toggle_task_modal')){
        in_list_categories.classList.toggle('hidden')
    }
    if(event.target.classList.contains('selected_category_in_list') ){
        task_category_toggle_task_modal_value.value = event.target.id
        event.target.parentElement.parentElement.parentElement.firstElementChild.style.borderColor = event.target.firstElementChild.style.backgroundColor
        event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.style.backgroundColor = event.target.firstElementChild.style.backgroundColor
        in_list_categories.classList.add('hidden')
    }
    if(event.target.classList.contains('selected_tag_in_list') ){
        if(event.target.parentElement.parentElement.firstElementChild.querySelectorAll('[id$=tag_new]').length == 0){
            event.target.parentElement.parentElement.firstElementChild.innerHTML = ''
            event.target.parentElement.parentElement.firstElementChild.innerHTML += `<div id='tag_new' class=' p-[2px] px-2  rounded-lg flex flex-row items-center'> ${event.target.innerText}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>`
            event.target.parentElement.parentElement.firstElementChild.lastElementChild.style.backgroundColor = event.target.firstElementChild.style.backgroundColor 
        }else{
            event.target.parentElement.parentElement.firstElementChild.innerHTML += `<div class='  p-[2px] px-2  rounded-lg flex flex-row items-center'> ${event.target.innerText}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>`
            event.target.parentElement.parentElement.firstElementChild.lastElementChild.style.backgroundColor = event.target.firstElementChild.style.backgroundColor 
        }
        task_tags_toggle_task_modal_value.value +=  event.target.id + '/'
        //task_tags_toggle_task_modal_value
        //event.target.parentElement.parentElement.firstElementChild.style.backgroundColor = event.target.firstElementChild.style.backgroundColor
    }
    if(event.target.classList.contains('in_list_priority') ){
        event.target.parentElement.classList.add('hidden')
        event.target.parentElement.parentElement.firstElementChild.innerHTML = event.target.innerHTML
        task_priority_toggle_task_modal_value.value = event.target.id
    }
    
    
})

task_progress_toggle_task_modal_value.addEventListener('change', (event) => {
    event.target.parentElement.lastElementChild.innerText = event.target.value
})

























































/*
slist(document.getElementsByClassName("ffgg")[0])



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