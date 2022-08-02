// 유저가 input에 값을 입력한다
// +버튼 클릭시, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 끝나면서 줄이 그인다
// 1. check버튼을 누르는순간 isComplete -> true
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 -> 끝난아이템, 진행중탭은 ->진행중인아이템만

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);

for(i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };

    taskList.push(task)
    console.log(taskList)
    render();
}

function render(){
    let list = [];

    if(mode == "all"){
        list = taskList
    }else{
        list = filterList
    }

    let resultHTML = "";

    for(let i=0; i<list.length; i++){
        if(list[i].isComplete==true){
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }else{
            resultHTML += `<div class="task">
                                <div>${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button onclick="deleteTask('${list[i].id}')">delete</button>
                                </div>
                            </div>`;
        }


    }

    document.getElementById("task-board").innerHTML = resultHTML
    
    filterList = []
}

function toggleComplete(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }
    render()
}

function filter(event){
    mode = event.target.id;

    if(mode == "all" ){
        render()
    }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
    }

    render();
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9)
}