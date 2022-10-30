//create list
submit_create_list.addEventListener('click', (event) => { 
    http_request('/create_list', 'POST', JSON.stringify({
        name: name_create_list.value,
        parent_space: active_space
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            if(json.status == 'success'){
                create_list_success(active_space)
            }else if(json.status == 'exists'){
                name_create_list.parentElement.appendChild(document.createTextNode(" This text was added to the DIV."));
            }else{
            }
        }
    }
})



//create space
submit_create_space.addEventListener('click', (event) => { 
    http_request('/create_space', 'POST', JSON.stringify({
        name: name_create_space.value,
    })).onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.response)
            name_create_list.value=""
            if(json.status == 'success'){
                create_space_success(json)
            }else if(json.status == 'exists'){

            }else{

            }
        }
    }
})



//change types
types_modal_content.addEventListener('click', (event) => {
    if(event.target.classList.contains('selected_type')){
        http_request('/add_type_to_task', 'POST', JSON.stringify({
            selected_task : selected_task_type,
            type_id : event.target.id,
            parent_workspace : active_space,
            parent_list : active_list,
            parent_task_if_exists : selected_task_parent_task
        })).onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.response)
                name_create_list.value=""
                console.log(json)
                if(json.status == 'success'){
                    document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].style.backgroundColor = json.color
                    document.getElementById(selected_task_type).getElementsByClassName('toggle_types_modal')[0].innerText = json.name
                    types_modal.classList.add('hidden')
                }else if(json.status == 'exists'){
    
                }else{
    
                }
            }
        }
    }
})


























//change categories
categories_modal_content.addEventListener('click', (event) => {
    console.log('grezgr')
    if(event.target.classList.contains('selected_category')){
        http_request('/add_category_to_task', 'POST', JSON.stringify({
            selected_task : selected_task_category,
            category_id : event.target.id,
            parent_workspace : active_space,
            parent_list : active_list,
            parent_task_if_exists : selected_task_parent_task
        })).onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.response)
                name_create_list.value=""
                console.log(json)
                if(json.status == 'success'){
                    document.getElementById(selected_task_category).firstElementChild.firstElementChild.firstElementChild.style.backgroundColor = json.color
                    document.getElementById(selected_task_category).firstElementChild.firstElementChild.style.borderColor = json.color
                    categories_modal.classList.add('hidden')
                }else if(json.status == 'exists'){
    
                }else{
    
                }
            }
        }
    }
})








































