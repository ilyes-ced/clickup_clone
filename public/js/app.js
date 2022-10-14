var current_workspace
var current_active_space
var current_active_list
const spaces = document.getElementsByClassName('toggle_spaces')
spaces[0].classList.add('active_space')
const lists = document.getElementsByClassName('list_names')
lists[0].classList.add('active_list')
current_active_space = spaces[0].id
current_active_list = lists[0].id

for( let i = 0; i < lists.length; i++ ) { 
  lists[i].addEventListener('click', (event) => {
    if(!event.target.classList.contains('active_list')){
      document.getElementsByClassName('active_list')[0].classList.remove('active_list')
      event.target.classList.add('active_list')
      current_active_list =  document.getElementsByClassName('active_list')[0]
      document.getElementsByClassName('active_space')[0].classList.remove('active_space')
      document.getElementById(current_active_list.parentElement.id.split('_')[1]).classList.add('active_space')
      current_active_space =  document.getElementsByClassName('active_space')[0]
    }
  })
}
/*
for( let i = 0; i < spaces.length; i++ ) { 
  spaces[i].addEventListener('click', (event) => {
    if(!event.target.classList.contains('active_space')){
      document.getElementsByClassName('active_space')[0].classList.remove('active_space')
      event.target.classList.add('active_space')
      current_active_space =  document.getElementsByClassName('active_space')[0].id
      console.log(current_active_list+'/'+current_active_space)
    }
  })
}
*/


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











success_modal.addEventListener('click', (event) => {
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
        document.getElementById('alert_content').innerText = 'i like this error'
        success_modal.classList.remove('hidden')

        setTimeout(()=>{
          success_modal.classList.add('hidden')
        }, 2000);
        
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
    event.preventDefault();
    if (event.keyCode === 13) {
      submit_create_space.click();
    }
});




submit_create_space.addEventListener('click', (event) => { 
  const xhttp = new XMLHttpRequest();
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
        document.getElementById('alert_content').innerText = 'i like this error'
        success_modal.classList.remove('hidden')

        setTimeout(()=>{
          success_modal.classList.add('hidden')
        }, 2000);
        
      }else if(json.status == 'exists'){
        name_create_space.parentElement.appendChild(document.createTextNode(" This text was added to the DIV."));
      }else{

      }
    }
  }
})















const task_create_select_input = document.getElementById('task_create_select_input')
const task_create_select_input_toggle = document.getElementById('task_create_select_input_toggle')

task_create_select_input.addEventListener('click', (event) => {
  if(document.activeElement == task_create_select_input){
    task_create_select_input_toggle.classList.toggle('hidden')
  }
})





















const toggle_sub_tasks = document.getElementsByClassName('toggle_sub_tasks')
const hidden_sub_tasks = document.getElementsByClassName('hidden_sub_tasks')
for( let i = 0; i < toggle_sub_tasks.length; i++ ) { 
  toggle_sub_tasks[i].addEventListener('click', (event) => {
    hidden_sub_tasks[i].classList.toggle('hidden')
  })
}






const toggle_list_of_tasks = document.getElementsByClassName('toggle_list_of_tasks')
const list_of_tasks = document.getElementsByClassName('list_of_tasks')
const lists_of_tasks_indexes = document.getElementsByClassName('lists_of_tasks_indexes')
for( let i = 0; i < toggle_list_of_tasks.length; i++ ) { 
  toggle_list_of_tasks[i].addEventListener('click', (event) => {
    list_of_tasks[i].classList.toggle('hidden')
    lists_of_tasks_indexes[i].classList.toggle('hidden')
  })
}






const toggle_tags_modal = document.getElementsByClassName('toggle_tags_modal')
const tags_modal_content = document.getElementById('tags_modal_content')
const tags_modal = document.getElementById('tags_modal')
var co = 0
var top_pixel
var left 
for( let i = 0; i < toggle_tags_modal.length; i++ ) { 
  toggle_tags_modal[i].addEventListener('click', (event) => {
    
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





























const table_element = '<div class="border-y border-primary w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
                                <div class="flex flex-row space-x-2 w-2/3"> \
                                    <div class="border hover:border-blue-600 rounded-sm border-transparent p-0.5 self-center">     \
                                        <div class="h-3 w-3 bg-blue-600 rounded-sm self-center "></div> \
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
          parent_workspace : current_active_space.id,
          parent_list : current_active_list.id,
        });
        xhttp.open("POST", "/create_new_task_in_list");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response) 
            name_create_space.value=""
            if(json.status == 'success'){
            
            }else if(json.status == 'exists'){

            }else{
      
            }
          }
        }
      }
    });
    new_task_name.focus()

  })
}

