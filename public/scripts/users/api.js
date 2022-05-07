const originURL = window.location.origin
function removeAction(id){
    if(confirm("Do you really want to delete this record??")){
        axios.delete(`${originURL}/api/users/${id}`);
       location.reload();
    }
}
