const myForm = document.querySelector('#myform')

function getPage(e){
    myForm.page.value = e;
    myForm.submit();
}