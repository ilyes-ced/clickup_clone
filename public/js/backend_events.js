

const http_request = (url, type, data) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open(type, url);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(data);
    return xhttp
}







submit_create_list.addEventListener('click', (event) => { 
    let json = JSON.stringify({
        name: name_create_list.value,
        parent_space: active_workspace
    });
    
    http_request('/create_list', 'POST', json).onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.response) 
        name_create_list.value=""
        if(json.status == 'success'){
            create_list_modal.classList.add('hidden')
            success_modal.classList.remove('hidden')
            setTimeout(()=>{
            success_modal.classList.add('hidden')
        }, 5000);

        document.getElementById("parent.id_"+active_workspace).parentElement.nextElementSibling.insertAdjacentHTML('beforeend', '<div id="'+json.id+'" class="list_names px-10 h-10 flex items-center">'+json.name+'</div>')
        
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