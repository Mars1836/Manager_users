
    Validator({
        form:"#inforForm",
        error:"#error",
        group:".form-group",
        rules:[
            Validator.isRequired("#name"),
            Validator.isRequired("#email",'Vui lòng nhập trường này'),
            Validator.isEmail("#email"),
            Validator.isRequired("#phone"),
            Validator.isRequired("#address"),
        ],
        onSubmit:function(data){
            console.log(data);
        }
    })
