// CODE EXPLAINED channel

//Select elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes name

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST,
    id;

//get item from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set id to the last one in the list
    loadList(LIST); //loads list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });

}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//Show todays date

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-IN", options);

//add to do function

function addToDo(toDo, id, done, trash) {
    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = ` 
        <li class = "item">
        <i class = "fa ${DONE} co" job ="complete" id = "${id}"></i> 
    <p class = "text ${LINE}" > ${toDo} </p> 
    <i class = "fa fa-trash-o de" job ="delete" id = "${id}"></i> 
    </li>
        `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add an item to list user

document.addEventListener("keyup", function(event) {


    if (event.keyCode == 13) {

        const toDo = input.value;

        //if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false

            });

            //add item to local storage(this code should be added where list is updateds)

            localStorage.setItem("TODO", JSON.stringify(LIST));

        }
        input.value = "";
        id++;


    }

});

//complete to do

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove to do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event) {
    const element = event.target; //returns clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {

        removeToDo(element);
    }
    //add item to local storage

    localStorage.setItem("TODO", JSON.stringify(LIST));
});