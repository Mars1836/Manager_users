const formRestore = document.querySelector('.restore-form');
function restoreAction(id){
    formRestore.action = 'restore/'+id;
    formRestore.submit();
}
function deleteAction(id){
    formRestore.action = 'delete/'+id;
    formRestore.submit();
}