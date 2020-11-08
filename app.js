const addForm = document.querySelector(".add");
const list = document.querySelector(".todos"); // getting the parent ul
const search = document.querySelector(".search input"); // because there are othe input fields

//we can declare a function in the submit but we want a global function
// that we can use it in other palces of the app
const generateTempalte = todo =>{
    const html = `
        <li class="list-group-item d-flex justify-content-between align-item-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    list.innerHTML += html; // adding li with the ul
}

addForm.addEventListener("submit", e =>{
    e.preventDefault();
    const todo = addForm.add.value.trim(); //trim() clears the white spacesin a input form

    //a problem is blank space are also adding in list so we have to pass it through a condition
    //that if the input gets a length then it will fire, it means if the length is 0 then it will
    //not fire, so we have to call generateTempalte through a conditional

    if(todo.length){
        generateTempalte(todo);
        //what we right, stays on the input section, so we can reset after submit
        addForm.reset();
    }
});

// delete items

list.addEventListener("click", e => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    }
});


//the search method with filter() and "keyup" event
//we are making the function out side of the event because of global value or reusuable

const filterTodos = userTyped =>{

    Array.from(list.children)
        .filter((todo) =>{
            return !todo.textContent.includes(userTyped); // here we have to use ! the opposite boolean
        })
        //.filter((todo) => !todo.textContent.includes(userTyped)); we can make it one line also
        .forEach((todo)=>{
            todo.classList.add("filtered");
        });

    //when we typed, and put a backspace, it doesn't removes "filtered" class so we also have to do the opposite
    Array.from(list.children)
        .filter((todo) =>{
            return todo.textContent.includes(userTyped); // here we have to remove ! the opposite boolean
        })
        //.filter((todo) => !todo.textContent.includes(userTyped)); we can make it one line also
        .forEach((todo)=>{
            todo.classList.remove("filtered");
        });
}

search.addEventListener("keyup",()=>{
    const userTyped = search.value.trim(); 
    filterTodos(userTyped);
});