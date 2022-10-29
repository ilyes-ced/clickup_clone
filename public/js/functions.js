//declared variables
var active_workspace
var active_list








//decallred elements
const success_modal = document.getElementById('success_modal')
const extend_sidebar = document.getElementById('extend_sidebar')
const toggle_spaces = document.getElementsByClassName('toggle_spaces')
const create_list_modal = document.getElementById('create_list_modal')
const close_success_modal = document.getElementById('close_success_modal')
const name_create_list = document.getElementById('name_create_list')
const submit_create_list = document.getElementById('submit_create_list')






//declared functions

const define_hovered_row = (target) => {
    if(target.classList.contains('table_row')){
        return target
    }else if(target.parentElement.classList.contains('table_row')){
        return target.parentElement
    }else if(target.parentElement.parentElement.classList.contains('table_row')){
        return target.parentElement.parentElement
    }else if(target.parentElement.parentElement.parentElement.classList.contains('table_row')){
        return target.parentElement.parentElement.parentElement
    }else if(target.parentElement.parentElement.parentElement.parentElement.classList.contains('table_row')){
        return target.parentElement.parentElement.parentElement.parentElement
    }
}









