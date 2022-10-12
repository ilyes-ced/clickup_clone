

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





const create_space_modal = document.getElementById('create_space_modal')
const toggle_create_space_modal = document.getElementById('toggle_create_space_modal')
toggle_create_space_modal.addEventListener('click', (event) => {
  create_space_modal.classList.toggle('hidden')
})
const close_create_space_modal = document.getElementById('close_create_space_modal')
close_create_space_modal.addEventListener('click', (event) => {
  create_space_modal.classList.toggle('hidden')
})
create_space_modal.addEventListener('click', (event) => {
  if(event.target == event.currentTarget) {
    create_space_modal.classList.toggle('hidden')
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

