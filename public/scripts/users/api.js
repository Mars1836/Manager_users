const url = "http://localhost:3000/api/users"
function removeAction(id){
    if(confirm("Do you really want to delete this record??")){
        axios.delete(`${url}/${id}`);
       location.reload();
    }
}
