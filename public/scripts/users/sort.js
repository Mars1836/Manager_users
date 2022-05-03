const myForm = document.querySelector('#myform')

let listBtnField = document.querySelectorAll('.btn-field')
listBtnField = Array.from(listBtnField);

var path = new URL(window.location.href);

listBtnField.forEach((x)=>{
    if(x.value === path.searchParams.get('field')){
        setIcon(x);
    }
})
const listParams = ['name','type','field','page'] 

function setIcon(ele){
    let type = path.searchParams.get('type');
    const defaultIc = ele.querySelector('#default-sort');
    const ascIc = ele.querySelector('#asc-sort');
    const descIc = ele.querySelector('#desc-sort');
    const listIc = [defaultIc,ascIc,descIc]
    listIc.forEach((icon)=>{
        icon.classList.add("visually-hidden");
    })
    if(type =='asc'){
        ascIc.classList.remove("visually-hidden");
    }
    if(type == 'desc'){
        descIc.classList.remove("visually-hidden");
    }

}
function getParams(callback){
    callback();
    listParams.forEach((param)=>{
        if(!myForm[param].value){ 
            myForm[param].value = path.searchParams.get(param);
        }
    })
    console.log({myForm});
    myForm.submit();

} 
const types ={
    asc : 'desc',
    desc : 'asc',
    default : 'asc',
}
function getType(btn){
    let type = path.searchParams.get('type');
    let field = path.searchParams.get('field');
    if(field===btn.value){
        myForm['type'].value = types[type]
    }
}
listBtnField.forEach((x)=>{
    x.onclick = function(){
        getParams(()=>{
            getType(this);
            setIcon(this);
            myForm['field'].value = this.value;
        })
}})

function getPage(e){
    getParams(()=>{
        myForm['page'].value = e;
    })
} 