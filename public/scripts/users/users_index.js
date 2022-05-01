const tbody = document.querySelector("tbody");
const table = document.querySelector("#table");
const createBtn = document.querySelector("#createBtn");
const createForm = document.querySelector("#createForm");
const inputSearch = document.querySelector('input[name="name"]');
const myForm = document.querySelector('#myform')
var usersList = [];

function getPage(e){
    myForm.page.value = e;
    myForm.submit();
}
createBtn.onclick = ()=>{
    let setFormOn = "col-7";
    let setFormOf = "col-12";

    let classListTable = table.classList;
    let classListForm = createForm.classList;
    let listClass = Array.from(classListTable);
    let bool = listClass.find((_class)=>{
        return _class == setFormOn;
    })
    if(!bool){
        classListTable.remove(setFormOf);
        classListTable.add(setFormOn);
        classListForm.remove("visually-hidden");
    }
    else
    {
        classListTable.add(setFormOf);
        classListTable.remove(setFormOn);
        classListForm.add("visually-hidden");
    }

}

//Remove
