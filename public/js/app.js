var current_workspace
const success_modal = document.getElementById('success_modal')

const sidebar_menu = document.getElementById('sidebar_menu')
const extend_sidebar = document.getElementById('extend_sidebar')
extend_sidebar.addEventListener('click', (event) => {
  sidebar_menu.classList.toggle('hidden')
})





const toggle_spaces_list = document.getElementById('toggle_spaces_list')
const toggle_spaces = document.getElementById('toggle_spaces')
toggle_spaces.addEventListener('click', (event) => {
  toggle_spaces_list.classList.toggle('hidden')
})





const create_list_modal = document.getElementById('create_list_modal')
const toggle_create_list_modal = document.getElementById('toggle_create_list_modal')
toggle_create_list_modal.addEventListener('click', (event) => {
  current_workspace = event.target.getElementsByTagName('input')[0].id.split('_')[1]
  create_list_modal.classList.toggle('hidden')
  if(!create_list_modal.classList.contains('hidden')){
    document.getElementById('name_create_list').focus()
  }
})
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
  }
})






const create_task_modal = document.getElementById('create_task_modal')
const toggle_create_task_modal = document.getElementById('toggle_create_task_modal')
toggle_create_task_modal.addEventListener('click', (event) => {
  create_task_modal.classList.toggle('hidden')
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
        
      }else{

      }
    }
  };
})



