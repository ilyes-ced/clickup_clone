//declared variables
var active_space = document.getElementsByClassName('toggle_spaces')[0].parentElement.id
var active_list = document.getElementsByClassName('list_names_container')[0].firstElementChild.id
var json
var selected_task
var selected_task_parent_task = null
var new_task_name
var list_category
var tempo





//decallred elements
const toggle_spaces = document.getElementsByClassName('toggle_spaces')
const edit_task = document.getElementsByClassName('edit_task')
const success_modal = document.getElementById('success_modal')
const extend_sidebar = document.getElementById('extend_sidebar')
const create_list_modal = document.getElementById('create_list_modal')
const close_success_modal = document.getElementById('close_success_modal')
const name_create_list = document.getElementById('name_create_list')
const submit_create_list = document.getElementById('submit_create_list')
const create_space_modal = document.getElementById('create_space_modal')
const create_task_modal = document.getElementById('create_task_modal')
const toggle_create_task_modal = document.getElementById('toggle_create_task_modal')
const name_create_space = document.getElementById('name_create_space')
const submit_create_space = document.getElementById('submit_create_space')
const task_create_select_input = document.getElementById('task_create_select_input')
const task_create_select_input_toggle = document.getElementById('task_create_select_input_toggle')
const types_modal_content = document.getElementById('types_modal_content')
const types_modal = document.getElementById('types_modal')
const categories_modal = document.getElementById('categories_modal')
const categories_modal_content = document.getElementById('categories_modal_content')
const hover_item = document.getElementById('hover_item')
const hover_item_content = document.getElementById('hover_item_content')
const tags_modal_content = document.getElementById('tags_modal_content')
const tags_modal = document.getElementById('tags_modal')
const priorities_modal_content = document.getElementById('priorities_modal_content')
const priorities_modal = document.getElementById('priorities_modal')
const task_modal = document.getElementById('task_modal')
const task_modal_content = document.getElementById('task_modal_content')
const toggle_user_menu = document.getElementById('toggle_user_menu')
const user_menu = document.getElementById('user_menu')
const new_sub_tasks_tempo = document.getElementById('new_sub_tasks_tempo')
const add_tags_in_list = document.getElementById('add_tags_in_list')
const add_tags_in_list_modal = document.getElementById('add_tags_in_list_modal')
const task_create_priority_toggle = document.getElementById('task_create_priority_toggle')
const task_create_priority = document.getElementById('task_create_priority')
const toggle_in_list_types = document.getElementById('toggle_in_list_types')
const in_list_types = document.getElementById('in_list_types')
const in_list_selected_type = document.getElementById('in_list_selected_type')
const clicked_type_in_list = document.getElementById('clicked_type_in_list')

const task_category_toggle_task_modal_value = document.getElementById('task_category_toggle_task_modal_value')
const task_priority_toggle_task_modal_value = document.getElementById('task_priority_toggle_task_modal_value')
const task_type_toggle_task_modal_value = document.getElementById('task_type_toggle_task_modal_value')
const task_tags_toggle_task_modal_value = document.getElementById('task_tags_toggle_task_modal_value')
const task_progress_toggle_task_modal_value = document.getElementById('task_progress_toggle_task_modal_value')

const task_create_select_input_id = document.getElementById('task_create_select_input_id')
const text_area_desc = document.getElementById('text_area_desc')
const due_date_input = document.getElementById('due_date_input')
const name_create_task = document.getElementById('name_create_task')
const selected_list_to_add_task_search = document.getElementById('selected_list_to_add_task_search')




const submit_create_task = document.getElementById('submit_create_task')



//declared functions

const http_request = (url, type, data) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open(type, url);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(data);
    return xhttp
}





const show_success_modal = () => {
    success_modal.classList.remove('hidden')
    setTimeout(()=>{
        success_modal.classList.add('hidden')
    }, 5000);
}





//get the hovered row
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







//created list
const create_list_success = () => {
    create_list_modal.classList.add('hidden')
    success_modal.classList.remove('hidden')
    document.getElementById(active_space).getElementsByClassName('list_names_container')[0].insertAdjacentHTML('beforeend', 
        '<div id="'+json.id+'" class="list_names px-10 h-10 flex items-center">'+json.name+'</div>'
    )
    show_success_modal()
}





//created space
const create_space_success = () => {
    create_space_modal.classList.add('hidden')
    sidebar_menu.insertAdjacentHTML('beforeend',' \
        <div id="'+json.id+'" class="border-b border-transparent flex flex-col  "> \
            <div class="toggle_spaces hover:bg-blue-800 w-full h-full p-2 flex justify-between items-center"> \
                <div  class="text-lg">'+json.name+'</div> \
                <div>V</div> \
            </div> \
            <div  class="hidden toggle_spaces_list"> \
                <div class="bg-gray-600 rounded-md m-2 text-center toggle_create_list_modal"> \
                    <input type="hidden"> \
                    create new list  \
                </div> \
                <div class="list_names_container"> \
                </div> \
            </div> \
        </div> \ '
    )
    show_success_modal()
}

























//declare html comps
const table_element = ' \
<div id="remove_on_error" class=" w-full flex flex-row bg-[#2b343b] hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
    <div class="flex flex-row space-x-2 w-2/3"> \
        <div class="task_category_toggle border  rounded-sm border-transparent p-0.5 self-center"> \
            <div class="h-3 w-3  rounded-sm self-center "></div> \
        </div> \
        <div class="flex flex-row tags_container"><input id="new_task_name" type="text" class=" bg-transparent"></div> \
        <div class=" row_hidden_icons rounded-md border border-gray-800 w-10 h-5 hidden flex flex-row divide-x" > \
            <div class="toggle_sub_tasks w-5 flex items-center justify-center"> \
                0 \
            </div> \
            <div class="w-5 flex items-center justify-center create_sub_task_in_list" > \
                + \
            </div> \
        </div> \
        <div class="row_hidden_icons toggle_tags_modal rounded-md border border-gray-800 w-5 h-5 hidden">i</div> \
        <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div> \
    </div> \
    <div class="flex flex-row w-1/3 h-full items-center"> \
        <div class="w-1/4 text-center"> \
            ib \
        </div> \
        <div class="w-1/4 text-center">temp</div> \
        <div class="w-1/4 text-center hover:bg-green-600 h-full flex  items-center justify-center toggle_types_modal">-</div> \
        <div class="w-1/4 flex items-center"> \
            <div class="text-green-600 px-1">0%</div> \
            <div class="w-full rounded-full border border-green-600 h-2"> \
                <div class="h-full rounded-full bg-green-600" style="width:0%"></div> \
            </div> \
        </div> \
    </div> \
    <div class="hidden hidden_sub_tasks"></div> \
</div> '



const sub_table_element = ' \
<div id="remove_on_error" class="border-y border-primary w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
    <div class="flex flex-row space-x-2 w-2/3 h-full items-center">  \
            <div class="w-10 h-full flex flex-row">  \
                <div class="w-1/4 h-full "></div>  \
                <div class="w-3/4 h-full ">  \
                    <div class="w-full h-1/2  border-b border-l rounded-bl-lg"></div>  \
                </div>  \
            </div>  \
        <div class="border rounded-sm border-transparent p-0.5 self-center">    \
            <div class="h-3 w-3  rounded-sm self-center "></div>  \
        </div>  \
        <div><input id="new_task_name" type="text" class=" bg-transparent"></div>\
        <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
        <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
        <div class="row_hidden_icons rounded-md border border-gray-800 w-5 h-5 hidden">i</div>\
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











































































/*
'<div id="remove_on_error" class="border-y border-primary w-full flex flex-row bg-gray-800 hover:bg-gray-600 h-10 items-center px-2 cursor-pointer table_row"> \
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
                            </div> '*/