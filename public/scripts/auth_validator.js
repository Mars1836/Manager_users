
    Validator({
        form:"#registerForm",
        error:"#error",
        group:".form-group",
        rules:[
            Validator.isRequired("#name"),
            Validator.isRequired("#email",'Vui lòng nhập trường này'),
            Validator.isEmail("#email"),
            Validator.isRequired("#password"),
            Validator.minLength("#password",6),
            Validator.isRequired("#repeat_password"),
            Validator.isConfirmed("#repeat_password",()=>{
                return document.querySelector('#password').value;
            })
        ],
        onSubmit:function(data){
            console.log(data);
        }
    })
