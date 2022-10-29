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











































//declare html comps
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