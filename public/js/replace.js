var current_workspace
var current_active_space
var current_active_list
const spaces = document.getElementsByClassName('toggle_spaces')
spaces[0].classList.add('active_space')
const lists = document.getElementsByClassName('list_names')
lists[0].classList.add('active_list')
current_active_space = spaces[0].id
current_active_list = lists[0].id
document.getElementById(current_active_list).classList.remove('hidden')
for( let i = 0; i < lists.length; i++ ) { 
  lists[i].addEventListener('click', (event) => {
    if(!event.target.classList.contains('active_list')){
      document.getElementById(current_active_list).classList.add('hidden')
      document.getElementsByClassName('active_list')[0].classList.remove('active_list')
      event.target.classList.add('active_list')
      current_active_list =  document.getElementsByClassName('active_list')[0]
      document.getElementsByClassName('active_space')[0].classList.remove('active_space')
      document.getElementById(current_active_list.parentElement.id.split('_')[1]).classList.add('active_space')
      current_active_space =  document.getElementsByClassName('active_space')[0].id
      current_active_list =  document.getElementsByClassName('active_list')[0].id
      document.getElementById(current_active_list).classList.remove('hidden')
      console.log(current_active_list+'/////'+current_active_space)
    }
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