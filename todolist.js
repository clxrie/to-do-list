const datee = document.getElementById("datee");
const searchbar = document.getElementById("searchbar");
const plus = document.getElementById("plus");
const todolist = document.getElementById("todolist");
const error = document.getElementById("error");
const app = document.querySelector('.to-do-app');
const total = document.getElementById("total");
const notepad = document.getElementById("notepad");


function newDate(){
today = new Date();
datee.textContent = today.toLocaleDateString('ko-KR');
};
newDate();

plus.addEventListener('click', function(){
   const value = searchbar.value;

   if(!value.trim()){
      error.textContent = "Please you have to add something";    //return exits the function early so you don't need the whole else block.
      searchbar.style.borderColor = "red";
      return;
   }

   let checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   checkbox.className = "todonames";

   let span = document.createElement("span");
   span.className = "todo-text";
   span.textContent = value;

   let taskDiv = document.createElement("div");
   taskDiv.className = "todo-item";

   taskDiv.append(checkbox);
   taskDiv.append(span);

   let deletebtn = document.createElement("button");
   deletebtn.textContent = 'x';
   deletebtn.className = "delete-btn";
   taskDiv.append(deletebtn);


   todolist.after(taskDiv);
   searchbar.value = '';
   updateCounter();
   saveTodos();    

});

searchbar.addEventListener('input', function(){
   error.textContent = '';
   searchbar.style.borderColor = '';
});

searchbar.addEventListener('keydown', function(e){
   if(e.key === 'Enter'){
      plus.click();
   }
});


//"Hey .to-do-app, whenever ANYTHING inside you changes, tell me"
app.addEventListener('change', function(e){
    // Step 1:  "Was the thing that changed a .todonames checkbox?"
    if(e.target.matches('.todonames')){
      // Step 2: "Find the span right next to that checkbox"
      let span = e.target.nextElementSibling;

      // Step 2: "Is the checkbox checked?"
      if(e.target.checked){
         span.style.textDecoration = 'line-through';
      }else{
          span.style.textDecoration = 'none';
      }
    }

    updateCounter();
    saveTodos();    
})

function updateCounter(){
   let totalbox = document.querySelectorAll('.todonames').length;
   let checkedbox = document.querySelectorAll('.todonames:checked').length;
   total.textContent = `${checkedbox} of ${totalbox} done`;
}

app.addEventListener('click',function(e){
      if(e.target.matches('.delete-btn')){
         e.target.closest(".todo-item").remove();
      }
      updateCounter();
      saveTodos();    
   })

// saving in local storage
function saveTodos(){
let todos = [];
//Creating an empty box (array) to collect all tasks.
document.querySelectorAll('.todo-item').forEach(function(item){
   todos.push({
      text: item.querySelector('.todo-text').textContent,
      done: item.querySelector('.todonames').checked
   });
});
   // save to localStorage as a string
  localStorage.setItem('todos', JSON.stringify(todos));
}

//loading 
function loadTodos(){
   let saved = localStorage.getItem('todos');
   if(!saved){
      return;     // nothing saved, do nothing
   }

   let todos = JSON.parse(saved);

   todos.forEach(function(todo){
   let checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   checkbox.className = "todonames";
   checkbox.checked = todo.done;              // ← was it checked? restore that

   let span = document.createElement("span");
   span.className = "todo-text";
   span.textContent = todo.text;             // ← the saved text

   // add strikethrough if it was checked
   if(todo.done){
      span.style.textDecoration = 'line-through';
    }

   let deletebtn = document.createElement("button");
   deletebtn.textContent = 'x';
   deletebtn.className = "delete-btn";

   let taskDiv = document.createElement("div");
   taskDiv.className = "todo-item";

   taskDiv.append(checkbox);
   taskDiv.append(span);
   taskDiv.append(deletebtn);

   todolist.after(taskDiv);

  });
}

loadTodos();   

function saveNotes(){
   notepad.addEventListener('input', function(){
      localStorage.setItem('notes', notepad.value);
   });
}
saveNotes();
updateCounter();

function loadNotes(){
   let saved = localStorage.getItem('notes');
  if(saved){
    notepad.value = saved;
  }
}

loadNotes();
updateCounter();