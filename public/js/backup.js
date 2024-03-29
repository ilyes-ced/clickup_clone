var current_workspace
var current_active_space
var current_active_list
const spaces = document.getElementsByClassName('toggle_spaces')
spaces[0].classList.add('active_space')
const lists = document.getElementsByClassName('list_names')
lists[0].classList.add('active_list')
current_active_space = spaces[0].id
current_active_list = lists[0].id
document.getElementById('active.tasks.list_'+current_active_list).classList.remove('hidden')
for( let i = 0; i < lists.length; i++ ) { 
  lists[i].addEventListener('click', (event) => {
    if(!event.target.classList.contains('active_list')){
      document.getElementById('active.tasks.list_'+current_active_list).classList.add('hidden')
      document.getElementsByClassName('active_list')[0].classList.remove('active_list')
      event.target.classList.add('active_list')
      current_active_list =  document.getElementsByClassName('active_list')[0]
      document.getElementsByClassName('active_space')[0].classList.remove('active_space')
      document.getElementById(current_active_list.parentElement.id.split('_')[1]).classList.add('active_space')
      current_active_space =  document.getElementsByClassName('active_space')[0].id
      current_active_list =  document.getElementsByClassName('active_list')[0].id
      document.getElementById('active.tasks.list_'+current_active_list).classList.remove('hidden')
      console.log(current_active_list+'/////'+current_active_space)
    }
  })
}









const success_modal = document.getElementById('success_modal')





const sidebar_menu = document.getElementById('sidebar_menu')
const extend_sidebar = document.getElementById('extend_sidebar')
extend_sidebar.addEventListener('click', (event) => {
  sidebar_menu.classList.toggle('hidden')
})




const toggle_spaces_list = document.getElementsByClassName('toggle_spaces_list')
const toggle_spaces = document.getElementsByClassName('toggle_spaces')
for( let i = 0; i < toggle_spaces.length; i++ ) { 
  toggle_spaces[i].addEventListener('click', (event) => {
    toggle_spaces_list[i].classList.toggle('hidden')
  })
}






const create_list_modal = document.getElementById('create_list_modal')
const toggle_create_list_modal = document.getElementsByClassName('toggle_create_list_modal')
for( let i = 0; i < toggle_spaces.length; i++ ) { 
  toggle_create_list_modal[i].addEventListener('click', (event) => {
    current_workspace = event.target.getElementsByTagName('input')[0].id.split('_')[1]
    create_list_modal.classList.toggle('hidden')
    if(!create_list_modal.classList.contains('hidden')){
      document.getElementById('name_create_list').focus()
    }
  })
}

// for the modal close button
/*
const close_create_list_modal = document.getElementById('close_create_list_modal')
close_create_list_modal.addEventListener('click', (event) => {
  create_list_modal.classList.toggle('hidden')
})
*/
create_list_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    create_list_modal.classList.toggle('hidden')
    name_create_list.value=""
  }
})












const create_task_modal = document.getElementById('create_task_modal')
const toggle_create_task_modal = document.getElementById('toggle_create_task_modal')
toggle_create_task_modal.addEventListener('click', (event) => {
  create_task_modal.classList.toggle('hidden')
  if(!create_task_modal.classList.contains('hidden')){
    document.getElementById('name_create_task').focus()
  }
})
// for the modal close button
/*
const close_create_task_modal = document.getElementById('close_create_task_modal')
close_create_task_modal.addEventListener('click', (event) => {
  create_task_modal.classList.toggle('hidden')
})
*/
create_task_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    create_task_modal.classList.toggle('hidden')
    name_create_task.value=""
  }
})






const create_space_modal = document.getElementById('create_space_modal')
const toggle_create_space_modal = document.getElementById('toggle_create_space_modal')
toggle_create_space_modal.addEventListener('click', (event) => {
  create_space_modal.classList.toggle('hidden')
  if(!create_space_modal.classList.contains('hidden')){
    document.getElementById('name_create_space').focus()
  }
})
// for the modal close button
/*
const close_create_space_modal = document.getElementById('close_create_space_modal')
close_create_space_modal.addEventListener('click', (event) => {
  create_space_modal.classList.toggle('hidden')
})
*/
create_space_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    create_space_modal.classList.toggle('hidden')
    name_create_space.value=""
  }
})








const table_row = document.getElementsByClassName('table_row')
for( let i = 0; i < table_row.length; i++ ) { 
  table_row[i].addEventListener('mouseover', (event) => {
    var icons =  table_row[i].getElementsByClassName('this_hidden_icons')
    for( let k = 0; k < icons.length; k++ ) { 
      icons[k].classList.remove('hidden')
    }
  })

  table_row[i].addEventListener('mouseout', (event) => {
    var icons =  table_row[i].getElementsByClassName('this_hidden_icons')
    for( let k = 0; k < icons.length; k++ ) { 
      icons[k].classList.add('hidden')
    }
  })  
}










const close_success_modal = document.getElementById('close_success_modal')
close_success_modal.addEventListener('click', (event) => {
  success_modal.classList.add('hidden')
})



const name_create_list = document.getElementById('name_create_list')
const submit_create_list = document.getElementById('submit_create_list')
name_create_list.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      submit_create_list.click();
    }
});



submit_create_list.addEventListener('click', (event) => { 
  const xhttp = new XMLHttpRequest();
  let json = JSON.stringify({
    name: name_create_list.value,
    parent_space: current_workspace
  });
  xhttp.open("POST", "/create_list");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(json);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response) 
      name_create_list.value=""
      if(json.status == 'success'){
        create_list_modal.classList.add('hidden')
        success_modal.classList.remove('hidden')
        setTimeout(()=>{
          success_modal.classList.add('hidden')
        }, 5000);

        document.getElementById("parent.id_"+current_workspace).parentElement.nextElementSibling.insertAdjacentHTML('beforeend', '<div id="'+json.id+'" class="list_names px-10 h-10 flex items-center">'+json.name+'</div>')
       
        success_modal.classList.remove('hidden')
        setTimeout(()=>{
          success_modal.classList.add('hidden')
        }, 5000);
        
      }else if(json.status == 'exists'){
        name_create_list.parentElement.appendChild(document.createTextNode(" This text was added to the DIV."));
      }else{

      }
    }
  };
})












const name_create_space = document.getElementById('name_create_space')
const submit_create_space = document.getElementById('submit_create_space')
name_create_space.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === 13) {
      submit_create_space.click()
    }
});




submit_create_space.addEventListener('click', (event) => { 
  const xhttp = new XMLHttpRequest()
  let json = JSON.stringify({
    name: name_create_space.value,
  });
  xhttp.open("POST", "/create_space");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(json);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response) 
      name_create_space.value=""
      if(json.status == 'success'){
        create_space_modal.classList.add('hidden')


        sidebar_menu.insertAdjacentHTML('beforeend', 

        '<div id="'+json.id+'" class="toggle_spaces p-2 h-12 border-b border-transparent flex justify-between items-center hover:bg-blue-800"> \
        <div  class="text-lg">'+json.name+'</div> \
        <div>V</div> \
    </div> \
    <div id="" class="hidden toggle_spaces_list"> \
        <div class="bg-gray-600 rounded-md m-2 text-center toggle_create_list_modal" id=""> \
            <input type="hidden" id="parent.id_'+json.id+'"> \
            create new list \
        </div> \
        <div id="parent_'+json.id+'"> \
        </div> \
    </div>'
    )
        success_modal.classList.remove('hidden')
        setTimeout(()=>{
          success_modal.classList.add('hidden')
        }, 5000);
        
      }else if(json.status == 'exists'){
        name_create_space.parentElement.appendChild(document.createTextNode(" This text was added to the DIV."));
      }else{

      }
    }
  }
})












const selected_list_to_add_task = document.getElementsByClassName('selected_list_to_add_task')
for( let i = 0; i < selected_list_to_add_task.length; i++ ) { 
  selected_list_to_add_task[i].addEventListener('click', (event) => {
    task_create_select_input_toggle.classList.add('hidden')  
    task_create_select_input.value = event.target.textContent
    task_create_select_input.dataset.id = event.target.id
  })
}



const task_create_select_input = document.getElementById('task_create_select_input')
const task_create_select_input_toggle = document.getElementById('task_create_select_input_toggle')

task_create_select_input.addEventListener('click', (event) => {
    task_create_select_input_toggle.classList.remove('hidden')  
    task_create_select_input.addEventListener('blur', (event) => {
      //task_create_select_input_toggle.classList.add('hidden')  
    })
})








const toggle_sub_tasks = document.getElementsByClassName('toggle_sub_tasks')
const hidden_sub_tasks = document.getElementsByClassName('hidden_sub_tasks')
for( let i = 0; i < toggle_sub_tasks.length; i++ ) { 
  toggle_sub_tasks[i].addEventListener('click', (event) => {
    hidden_sub_tasks[i].classList.toggle('hidden')
  })
}










/*


const toggle_sub_tasks = document.getElementsByClassName('toggle_sub_tasks')
const hidden_sub_tasks = document.getElementsByClassName('hidden_sub_tasks')
for( let i = 0; i < toggle_sub_tasks.length; i++ ) { 
  toggle_sub_tasks[i].addEventListener('click', (event) => {
    hidden_sub_tasks[i].classList.toggle('hidden')
  })
}
*/





const toggle_list_of_tasks = document.getElementsByClassName('toggle_list_of_tasks')
const list_of_tasks = document.getElementsByClassName('list_of_tasks')
const lists_of_tasks_indexes = document.getElementsByClassName('lists_of_tasks_indexes')
for( let i = 0; i < toggle_list_of_tasks.length; i++ ) { 
  toggle_list_of_tasks[i].addEventListener('click', (event) => {
    list_of_tasks[i].classList.toggle('hidden')
    lists_of_tasks_indexes[i].classList.toggle('hidden')
  })
}














const select_due_date = document.getElementsByClassName('select_due_date')
for( let i = 0; i < select_due_date.length; i++ ) { 
  select_due_date[i].addEventListener('click', (event) => {
    select_due_date[i].getElementsByTagName('input')[0].showPicker()
  })
}























var selected_task_type
var selected_task_parent_task = null
const toggle_types_modal = document.getElementsByClassName('toggle_types_modal')
const types_modal_content = document.getElementById('types_modal_content')
const types_modal = document.getElementById('types_modal')
var types_top
var types_left 

for( let i = 0; i < toggle_types_modal.length; i++ ) { 
  toggle_types_modal[i].addEventListener('click', (event) => {
    console.log('clicked')
    selected_task_type = event.target.parentElement.parentElement.id
    if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
      selected_task_parent_task=event.target.parentElement.parentElement.parentElement.previousElementSibling.id
    }
    /*
    for (let i = types_modal_content.classList.length - 1; i >= 0; i--) {
      if (types_modal_content.classList[i].startsWith('top') || types_modal_content.classList[i].startsWith('left')) {
          types_modal_content.classList.remove(types_modal_content.classList[i]);
      }
    }*/

    types_modal.classList.remove('hidden')
    top_pixel = 'top-['+event.target.offsetTop+'px]'
    left = 'left-['+event.target.offsetLeft+'px]'
    //types_modal_content.classList.add(top_pixel) 
    //types_modal_content.classList.add(left)
    types_modal_content.style.top = (event.target.offsetTop+40)+'px'
    types_modal_content.style.left = event.target.offsetLeft+'px'
  })
}

types_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    types_modal.classList.toggle('hidden')
  }
})

const selected_type = document.getElementsByClassName('selected_type')
for( let i = 0; i < selected_type.length; i++ ) { 
  selected_type[i].addEventListener('click', (event) => {
    const xhttp = new XMLHttpRequest();
    let json = JSON.stringify({
      selected_task : selected_task_type,
      type_id : event.target.id,
      parent_workspace : current_active_space,
      parent_list : current_active_list,
      parent_task_if_exists : selected_task_parent_task
    });
    console.log(json)
    xhttp.open("POST", "/add_type_to_task");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.response) 
        if(json.status == 'success'){
          document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].style.backgroundColor = json.color
          document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].innerText = json.name
          types_modal.classList.add('hidden')
        }else if(json.status == 'denied'){
          alert('ez')
        }else{

        }
      }
    }
  })
}



























var selected_task_category
var selected_task_parent_task = null
const toggle_categories_modal = document.getElementsByClassName('toggle_categories_modal')
const hover_item = document.getElementById('hover_item')
const hover_item_content = document.getElementById('hover_item_content')
const categories_modal = document.getElementById('categories_modal')
const categories_modal_content = document.getElementById('categories_modal_content')
const task_category_toggle = document.getElementsByClassName('task_category_toggle')
for( let i = 0; i < task_category_toggle.length; i++ ) { 
  task_category_toggle[i].addEventListener('click', (event) => {
    if(event.target.classList.contains('task_category_toggle')){
      selected_task_category = event.target.parentElement.parentElement.id
      if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
        selected_task_parent_task=event.target.parentElement.parentElement.parentElement.previousElementSibling.id
      }
    }else{
      selected_task_category = event.target.parentElement.parentElement.parentElement.id
      if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
        selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.id
      }
    }


    categories_modal.classList.remove('hidden')
    categories_modal_content.style.top = (event.target.offsetTop+40)+'px'
    categories_modal_content.style.left = event.target.offsetLeft+'px'
  })
  task_category_toggle[i].addEventListener('mouseover', (event) => {
    
    hover_item.classList.remove('hidden')
    hover_item.style.top = (event.target.offsetTop-60)+'px'
    hover_item.style.left = event.target.offsetLeft+'px'
    hover_item_content.innerText = 'this tech'
  })

  task_category_toggle[i].addEventListener('mouseout', (event) => {
    hover_item.classList.add('hidden')
  })

}

categories_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    categories_modal.classList.toggle('hidden')
  }
})

const selected_category = document.getElementsByClassName('selected_category')
for( let i = 0; i < selected_category.length; i++ ) { 
  selected_category[i].addEventListener('click', (event) => {
    const xhttp = new XMLHttpRequest();
    let json = JSON.stringify({
      selected_task : selected_task_category,
      category_id : event.target.id,
      parent_workspace : current_active_space,
      parent_list : current_active_list,
      parent_task_if_exists : selected_task_parent_task
    });
    console.log(json)
    xhttp.open("POST", "/add_category_to_task");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.response) 
        alert(this.response)
        if(json.status == 'success'){
          document.getElementById(selected_task_category).firstElementChild.firstElementChild.firstElementChild.style.backgroundColor = json.color
          document.getElementById(selected_task_category).firstElementChild.firstElementChild.style.borderColor = json.color
          categories_modal.classList.add('hidden')
        }else if(json.status == 'denied'){
          alert('ez')
        }else{

        }
      }
    }
  })
}




































var selected_task_tag
var selected_task_parent_task = null
const toggle_tags_modal = document.getElementsByClassName('toggle_tags_modal')
const tags_modal_content = document.getElementById('tags_modal_content')
const tags_modal = document.getElementById('tags_modal')
var top_pixel
var left 
for( let i = 0; i < toggle_tags_modal.length; i++ ) { 
  toggle_tags_modal[i].addEventListener('click', (event) => {
    selected_task_tag = event.target.parentElement.parentElement.id
    if(event.target.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
      selected_task_parent_task=event.target.parentElement.parentElement.parentElement.previousElementSibling.id
    }
    
    for (let i = tags_modal_content.classList.length - 1; i >= 0; i--) {
      if (tags_modal_content.classList[i].startsWith('top') || tags_modal_content.classList[i].startsWith('left')) {
          tags_modal_content.classList.remove(tags_modal_content.classList[i]);
      }
    }
    tags_modal.classList.remove('hidden')
    top_pixel = 'top-['+event.target.offsetTop+'px]'
    left = 'left-['+event.target.offsetLeft+'px]'
    //tags_modal_content.classList.add(top_pixel) 
    //tags_modal_content.classList.add(left)
    tags_modal_content.style.top = (event.target.offsetTop+30)+'px'
    tags_modal_content.style.left = event.target.offsetLeft+'px'
  })
}

tags_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    tags_modal.classList.toggle('hidden')
  }
})




const selected_tag = document.getElementsByClassName('selected_tag')
for( let i = 0; i < selected_tag.length; i++ ) { 
  selected_tag[i].addEventListener('click', (event) => {
    const xhttp = new XMLHttpRequest();
    let json = JSON.stringify({
      selected_task : selected_task_tag,
      tag_id : event.target.id,
      parent_workspace : current_active_space,
      parent_list : current_active_list,
      parent_task_if_exists : selected_task_parent_task
    });
    console.log(json)
    xhttp.open("POST", "/add_tag_to_task");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.response) 
        if(json.status == 'success'){
          document.getElementById(selected_task_tag).getElementsByClassName('tags_container')[0].insertAdjacentHTML('beforeend', '<div class="mx-2 px-1 rounded-md flex flex-row" style="background-color: '+json.color+'"> '+json.name+' <div id="'+json.id+'" class="px-1 ml-1 remove_tag hover:bg-red-600 rounded-md">X</div> </div>')
          tags_modal.classList.add('hidden')
        }else if(json.status == 'denied'){
          alert('ez')
        }else{

        }
      }
    }
  })
}


const remove_tag = document.getElementsByClassName('remove_tag')
for( let i = 0; i < remove_tag.length; i++ ) { 
  remove_tag[i].addEventListener('click', (event) => {
    selected_task_parent_task = null
    selected_task_tag = event.target.parentElement.parentElement.parentElement.parentElement.id
    if(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('hidden_sub_tasks')){
      selected_task_parent_task=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.id
    }
    const xhttp = new XMLHttpRequest();
    let json = JSON.stringify({
      selected_task : selected_task_tag,
      tag_id : event.target.id,
      parent_workspace : current_active_space,
      parent_list : current_active_list,
      parent_task_if_exists : selected_task_parent_task
    });
    console.log(json)
    xhttp.open("POST", "/remove_tag_from_task");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.response) 
        if(json.status == 'success'){
          event.target.parentElement.remove()
        }else if(json.status == 'denied'){
          alert('ez')
        }else{

        }
      }
    }
  })
}




















const table_element = '<div id="remove_on_error" class="border-y border-primary w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
                                <div class="flex flex-row space-x-2 w-2/3"> \
                                    <div class="border hover:border-white rounded-sm border-transparent p-0.5 self-center">     \
                                        <div class="h-3 w-3 bg-white rounded-sm self-center "></div> \
                                    </div> \
                                    <div><input id="new_task_name" type="text" class=" bg-transparent"></div> \
                                    <div class="toggle_sub_tasks this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden"><%= workspaces[i].lists[j].tasks[k].sub_tasks.length %></div> \
                                    <div class="toggle_tags_modal this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div> \
                                    <div class="this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div> \
                                </div> \
                                <div class="flex flex-row w-1/3"> \
                                    <div class="w-1/4 text-center">temp</div> \
                                    <div class="w-1/4 text-center">temp</div> \
                                    <div class="w-1/4 text-center">temp</div> \
                                    <div class="w-1/4 text-center">temp</div> \
                                </div> \
                            </div> '




const add_task_in_list = document.getElementsByClassName('add_task_in_list')
for( let i = 0; i < add_task_in_list.length; i++ ) { 
  add_task_in_list[i].addEventListener('click', (event) => {
    event.target.insertAdjacentHTML('beforebegin', table_element)
    const new_task_name = document.getElementById('new_task_name')
    new_task_name.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        const xhttp = new XMLHttpRequest();
        let json = JSON.stringify({
          name: new_task_name.value,
          parent_workspace : current_active_space,
          parent_list : current_active_list,
        });
        console.log(json)
        xhttp.open("POST", "/create_new_task_in_list");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response) 
            if(json.status == 'success'){
              new_task_name.insertAdjacentHTML('beforebegin', new_task_name.value)
              new_task_name.remove()
              document.getElementById('remove_on_error').removeAttribute('id')       
              success_modal.classList.remove('hidden')
              setTimeout(()=>{
                success_modal.classList.add('hidden')
              }, 5000);
            }else if(json.status == 'denied'){
              document.getElementById('remove_on_error').remove()
            }else{
              alert('error, please check your internet connection')
            }
          }
        }
      }
    });
    new_task_name.focus()
    new_task_name.addEventListener('blur', (event) => {
      document.getElementById('remove_on_error').remove()
    })
  })
}


































const sub_table_element = '<div id="remove_on_error" class="border-y border-primary w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
<div class="flex flex-row space-x-2 w-2/3 h-full items-center">  \
        <div class="w-10 h-full flex flex-row">  \
            <div class="w-1/4 h-full "></div>  \
            <div class="w-3/4 h-full ">  \
                <div class="w-full h-1/2  border-b border-l rounded-bl-lg"></div>  \
            </div>  \
        </div>  \
    <div class="border hover:border-white rounded-sm border-transparent p-0.5 self-center">    \
        <div class="h-3 w-3 bg-white rounded-sm self-center "></div>  \
    </div>  \
    <div><input id="new_task_name" type="text" class=" bg-transparent"></div>\
    <div class="this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
    <div class="this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
    <div class="this_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
</div>\
<div class="flex flex-row w-1/3">\
    <div class="w-1/4 text-center">ico</div>\
    <div class="w-1/4 text-center">ico</div>\
    <div class="w-1/4 text-center">icp</div>\
    <div class="w-1/4 text-center">ico</div>\
</div>\
</div> '


const middle_sub_task = ' <div class="w-10 h-full flex flex-row divide-x"> \
    <div class="w-1/4 h-full "></div> \
    <div class="w-3/4 h-full "> \
    <div class="w-full h-1/2  border-b rounded-bl-lg"></div> \
    </div> \
</div>'


const final_sub_task = '<div class="w-10 h-full flex flex-row "> \
    <div class="w-1/4 h-full "></div> \
    <div class="w-3/4 h-full "> \
        <div class="w-full h-1/2  border-b border-l rounded-bl-lg"></div> \
    </div> \
</div>'





const create_sub_task_in_list = document.getElementsByClassName('create_sub_task_in_list')
for( let i = 0; i < create_sub_task_in_list.length; i++ ) { 
  create_sub_task_in_list[i].addEventListener('click', (event) => {
    document.getElementsByClassName('hidden_sub_tasks')[i].classList.remove('hidden')
    hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.remove()
    hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.insertAdjacentHTML('beforebegin', middle_sub_task)
    document.getElementsByClassName('hidden_sub_tasks')[i].insertAdjacentHTML('beforeend', sub_table_element)
    const new_task_name = document.getElementById('new_task_name')
    console.log(event.target.parentElement)
    const parent_task = event.target.parentElement.parentElement.parentElement.id
    new_task_name.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        const xhttp = new XMLHttpRequest();
        let json = JSON.stringify({
          name: new_task_name.value,
          parent_workspace : current_active_space,
          parent_list : current_active_list,
          parent_task : parent_task,
        });
        console.log(json)
        xhttp.open("POST", "/create_new_sub_task_in_list");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response) 
            if(json.status == 'success'){
              new_task_name.insertAdjacentHTML('beforebegin', new_task_name.value)
              new_task_name.remove()
              document.getElementById('remove_on_error').removeAttribute('id')
              success_modal.classList.remove('hidden')
              setTimeout(()=>{
                success_modal.classList.add('hidden')
              }, 5000);
            }else if(json.status == 'denied'){
              document.getElementById('remove_on_error').remove()
            }else{
              alert('error, please check your internet connection')
            }
          }
        }
      }
    });
    new_task_name.focus()
    new_task_name.addEventListener('blur', (event) => {
      document.getElementById('remove_on_error').remove()
      hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.remove()
      hidden_sub_tasks[i].lastElementChild.firstElementChild.firstElementChild.insertAdjacentHTML('beforebegin', final_sub_task)
    })
  })
}
































































































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
/*

slist(document.getElementById("sortlist"));



function slist (target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"), current = null;

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



































































































//copy of original
/*

<div class="list_of_tasks" id="tempo">
    <% for( let k = 0; k < workspaces[i].lists[j].tasks.length; k++ ) { %>
        <div id="<%= workspaces[i].lists[j].tasks[k]._id %>" class=" w-full flex flex-col bg-gray-800 hover:bg-gray-600  cursor-pointer table_row">
            <div class="flex flex-row  space-x-2 w-full h-10 items-center px-2 relative">
                <% if(workspaces[i].lists[j].tasks[k].category){%>
                    <div class="task_category_toggle border hover:border-blue-600 rounded-sm border-transparent p-0.5 self-center" onmouseover="this.style.borderColor='<%= workspaces[i].lists[j].tasks[k].category.color %>';" onmouseout="this.style.borderColor='rgba(0,0,0,0)';">    
                        <div class="h-3 w-3 bg-blue-600 rounded-sm self-center " style="background-color: <%= workspaces[i].lists[j].tasks[k].category.color %>; "></div>
                    </div>
                <% }else{ %>
                    <div class="task_category_toggle border hover:border-white rounded-sm border-transparent p-0.5 self-center">    
                        <div class="h-3 w-3 bg-white rounded-sm self-center "></div>
                    </div>
                <% } %>
                <div class="flex flex-row tags_container"><%=  workspaces[i].lists[j].tasks[k].name %> 
                    <%workspaces[i].lists[j].tasks[k].tags.forEach(element =>{ %>
                        <div class="mx-2 px-1 rounded-md flex flex-row" style="background-color: <%= element.color %>"> <%= element.name %> <div id="<%= element._id %>" class="px-1 ml-1 remove_tag hover:bg-red-600 rounded-md">X</div> </div>
                    <% }) %>

                </div>
                <div class=" row_hidden_icons rounded-md border border-gray-800 w-10 h-5 hidden flex flex-row divide-x" >
                    <div class="toggle_sub_tasks w-5 flex items-center justify-center">
                        <%= workspaces[i].lists[j].tasks[k].sub_tasks.length %>
                    </div>
                    <div class="w-5 flex items-center justify-center create_sub_task_in_list" >
                        +
                    </div>
                </div>
                <div class="row_hidden_icons toggle_tags_modal rounded-md border border-gray-800 w-5 h-5 hidden">i</div>
                <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>
                <div class="flex flex-row w-1/3 h-full items-center absolute right-0">
                    <% if(workspaces[i].lists[j].tasks[k].due_date){ %>
                        azdazd
                    <% }else{ %>
                        <div class="w-1/4 text-center h-full flex justify-center items-center hover:bg-red-600">
                            ib    
                        </div>
                    <% } %>
                    <% if(workspaces[i].lists[j].tasks[k].priority){ %>
                        azdazd
                    <% }else{ %>
                        <div class="w-1/4 text-center h-full flex justify-center items-center hover:bg-red-600">temp</div>
                    <% } %>
                    <% if(workspaces[i].lists[j].tasks[k].type){ %>
                        <div class="w-1/4 text-center hover:bg-green-600 h-full flex  items-center justify-center toggle_types_modal" style="background-color: <%= workspaces[i].lists[j].tasks[k].type.color %>">
                            <%= workspaces[i].lists[j].tasks[k].type.name %>
                        </div>
                    <% }else{ %>
                        <div class="w-1/4 text-center hover:bg-green-600 h-full flex  items-center justify-center toggle_types_modal">-</div>
                    <% } %>                     
                    <div class="w-1/4 flex items-center">
                        <div class="text-green-600 px-1"><%= Math.round(workspaces[i].lists[j].tasks[k].sub_tasks.reduce((total, next) => total + next.progress , 0)/ workspaces[i].lists[j].tasks[k].sub_tasks.length) || 0 %>%</div>
                        <div class="w-full rounded-full border border-green-600 h-2">
                            <div class="h-full rounded-full bg-green-600" style="width:<%= Math.round(workspaces[i].lists[j].tasks[k].sub_tasks.reduce((total, next) => total + next.progress , 0)/ workspaces[i].lists[j].tasks[k].sub_tasks.length)  || 0  %>%"></div>    
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hidden hidden_sub_tasks ">
                <% for( let l = 0; l < workspaces[i].lists[j].tasks[k].sub_tasks.length; l++ ) { %>
                    <div id="<%= workspaces[i].lists[j].tasks[k].sub_tasks[l]._id %>" class="w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center pl-2 cursor-pointer table_row">
                        <div class="flex flex-row space-x-2 w-2/3 h-full items-center">
                            <% if(!(l == workspaces[i].lists[j].tasks[k].sub_tasks.length-1)){ %>
                                <div class="w-10 h-full flex flex-row divide-x">
                                    <div class="w-1/4 h-full "></div>
                                    <div class="w-3/4 h-full ">
                                        <div class="w-full h-1/2  border-b rounded-bl-lg"></div>
                                    </div>
                                </div>
                            <% }else{ %>
                                <div class="w-10 h-full flex flex-row">
                                    <div class="w-1/4 h-full "></div>
                                    <div class="w-3/4 h-full ">
                                        <div class="w-full h-1/2  border-b border-l rounded-bl-lg"></div>
                                    </div>
                                </div>
                            <% } %>
                            
                            <% if(workspaces[i].lists[j].tasks[k].category){
                                user_data.categories.filter(obj => {
                                    if(obj._id== workspaces[i].lists[j].tasks[k].sub_tasks[l].category){%>
                                        <div class="task_category_toggle border hover:border-blue-600 rounded-sm border-transparent p-0.5 self-center" onmouseover="this.style.borderColor='<%= obj.color %>';" onmouseout="this.style.borderColor='rgba(0,0,0,0)';">    
                                            <div class="h-3 w-3 bg-blue-600 rounded-sm self-center " style="background-color: <%= obj.color %>; "></div>
                                        </div>
                                    <% }
                                })
                            
                            
                            }else{ %>
                                <div class="task_category_toggle border hover:border-white rounded-sm border-transparent p-0.5 self-center">    
                                    <div class="h-3 w-3 bg-white rounded-sm self-center "></div>
                                </div>
                            <% } %>
                            <div class="flex flex-row tags_container"><%=  workspaces[i].lists[j].tasks[k].sub_tasks[l].name %>
                                <%workspaces[i].lists[j].tasks[k].sub_tasks[l].tags.forEach(element =>{ %>
                                    <div class="mx-2 px-1 rounded-md  flex flex-row" style="background-color: <%= element.color %>"> <%= element.name %> <div id="<%= element._id %>" class="px-1 ml-1 remove_tag hover:bg-red-600 rounded-md">X</div> </div>
                                <% }) %>
                            </div>
                            <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>
                            <div class="toggle_tags_modal row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">tag</div>
                            <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>
                        </div>
                        <div class="flex flex-row w-1/3 h-full items-center">
                            <div class="w-1/4 text-center h-full hover:bg-red-600">ico</div>
                            <div class="w-1/4 text-center h-full hover:bg-red-600">ico</div> 
                            <% if(workspaces[i].lists[j].tasks[k].sub_tasks[l].type){ %>
                                <div class="w-1/4 text-center hover:bg-green-600 h-full flex  items-center justify-center toggle_types_modal" style="background-color: <%= workspaces[i].lists[j].tasks[k].type.color %>">
                                    <%= workspaces[i].lists[j].tasks[k].type.name %>
                                </div>
                            <% }else{ %>
                                <div class="w-1/4 text-center hover:bg-green-600 h-full flex  items-center justify-center toggle_types_modal">-</div>
                            <% } %>  
                            <div class="w-1/4 flex items-center">
                                <div class="text-green-600 px-1"><%= workspaces[i].lists[j].tasks[k].sub_tasks[l].progress %>%</div>
                                <div class="w-full rounded-full border border-green-600 h-2">
                                    <div class="h-full rounded-full bg-green-600" style="width:<%= workspaces[i].lists[j].tasks[k].sub_tasks[l].progress %>%"></div>    
                                </div>
                            </div>
                        </div>
                    </div>
                <% } %>
            </div>
        </div>
    <% } %>
    <div class="rounded-md hover:bg-gray-700 w-fit mt-2 px-2 add_task_in_list">
        + add task
    </div>
</div>
*/