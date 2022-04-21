const tbody = document.querySelector("tbody");
const table = document.querySelector("#table");
const createBtn = document.querySelector("#createBtn");
const createForm = document.querySelector("#createForm");
const inputSearch = document.querySelector('input[name="search"]');
const usersAPI  = 'http://localhost:3000/users';
var usersList = [];
inputSearch.oninput=()=>{
    let value = inputSearch.value;
    let usersFilter = usersList.filter((user)=>{
        return user.name.toLowerCase().includes(value.toLowerCase());
    })
    render(usersFilter);

}
function removeUser(userID){
    const option = {
        method: "DELETE",
    }
    fetch(usersAPI+`/${userID}`,option)
    .then(()=>{
        getData(render);
    })
    .catch((error)=>{
        console.log(error);
    })
}
function postUser(callback){
    const option = {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(usersAPI,option)
    .then(getData(render))
}
function getData(callback){
    fetch(usersAPI)
    .then((resolve)=>{
        return resolve.json();
    })
    .then(callback)
    .catch((error)=>{
            console.log(error);}
    )
}
getData(render);
function render(users){
    let html ="";
        users.forEach((user,index)=>{
            html +=`<tr>
                        <th scope="row">${index+1}</th>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address}</td>
                        <td>
                             <button class="btn btn-outline-success btn-sm me-2" type="button">View</button>
                             <button class="btn btn-outline-danger btn-sm" type="button" onclick="removeUser('${user.id}')">Remove</button>
                        </td>
                    </tr>`
        })
    tbody.innerHTML = html;
}
// Turn on and off form create
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
