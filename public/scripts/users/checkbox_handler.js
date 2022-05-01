
const checkBoxAll = $('.check-box-all')
const checkBoxItems = $('input[name="usersSelect[]"]')
const btnAction = $('.btn-action')
const formCheck = $('#form-check')
const selectNode = $('select[name="action"]');
checkBoxAll.change(function(){
    const isSelectAll = $(this).prop("checked");
    checkBoxItems.prop('checked',isSelectAll);
    getAction();
})
checkBoxItems.change(function(){
    const isSelectAll = checkBoxItems.length === $('input[name="usersSelect[]"]:checked').length;
    checkBoxAll.prop('checked',isSelectAll);
    getAction();
})
selectNode.change(getAction);
function getAction(){
    let count = $('input[name="usersSelect[]"]:checked').length;
    let selectNode = $('select[name="action"]').find(":selected");
    if(count&&selectNode.val()){
        btnAction.removeClass('disabled');
    }
    else{
        btnAction.addClass('disabled');
    }
}
getAction();
btnAction.click(function (e){
    // console.log($('input[name="usersSelect[]"]:checked'))
    console.log(formCheck)
    formCheck.submit();
    }
)
