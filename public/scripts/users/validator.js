function Validator(formObj){
	const formElement = document.querySelector(formObj.form);	
	const selectorRules = {};
	function getGroup(usernameEle,groupId){
		var groupElement = usernameEle;
		while(usernameEle.parentNode){
			if(groupElement.matches(groupId)){
				return groupElement;
			}
			groupElement = groupElement.parentNode;
		}
	}
	function validate(usernameEle,rules){
		function displayError(usernameEle,errorElement,mess){
			if(mess){
				errorElement.innerText = mess;
				usernameEle.classList.add('is-invalid');
			}
			else{
				errorElement.innerText = '';
				usernameEle.classList.remove('is-invalid');
			}
		}
		const errorElement = getGroup(usernameEle,formObj.group).querySelector(formObj.error);
		let mess;
		var list;
		for(let i = 0; i < rules.length; i++){
			switch(usernameEle.type){
				case 'radio':
				case 'checkbox':
					list = formElement.querySelectorAll(rules[i].selector);
					if(formElement.querySelector(rules[i].selector + ":checked")){
						mess = rules[i].test(formElement.querySelector(rules[i].selector + ":checked").value);
					}
					else
						mess = rules[i].test(null);
				break;
				default:
					mess = rules[i].test(usernameEle.value);
				break;
			}
			if(list){
				Array.from(list).forEach((usernameEle)=>{
					displayError(usernameEle,errorElement,mess);
				})
				break;
			}
			if(mess){
				displayError(usernameEle,errorElement,mess);
				break;
			}
		}
		return !mess;
	}
	if(formElement){
		formElement.onsubmit=(e)=>{
			let isValidAll = true;
			formObj.rules.forEach((rule)=>{
				const usernameEle = formElement.querySelector(rule.selector);
				let isValid = validate(usernameEle,selectorRules[rule.selector])
				isValidAll = isValidAll && isValid;

			});
			if(!isValidAll)
			{
				e.preventDefault();
			}
			else{
				var data;
				if(typeof formObj.onSubmit === 'function'){
					var enableinput = formElement.querySelectorAll('[name]:not([disabled])');
					data = Array.from(enableinput).reduce((dt,val)=>{
						switch(val.type){
							case 'radio':
								if(val.checked){
									dt[val.name] = val.value;
								}
							break;
							case 'select':
								if(val.checked){
								if(!Array.isArray(dt[val.name])){
									dt[val.name] =[val.value];
								}
								else
									dt[val.name].push(val.value);
								}
							break;
							case 'file':
								dt[val.name] = val.files;
							break;
							default:
								dt[val.name] = val.value;
							break;
						}

						return dt;
					},{})


					formObj.onSubmit(data);
				}
				else
					formElement.submit();
			}


		}

		formObj.rules.forEach((rule)=>{
			const usernameEle = formElement.querySelector(rule.selector);
			if(Array.isArray(selectorRules[rule.selector])){
				selectorRules[rule.selector].push(rule);
			}
			else{
				selectorRules[rule.selector] = [rule];
			}
				if(usernameEle.type == 'radio' ||usernameEle.type =='checkbox'){
					const list = formElement.querySelectorAll(rule.selector);
					Array.from(list).forEach((usernameEle)=>{
						usernameEle.oninput = ()=>{
						validate(usernameEle,selectorRules[rule.selector]);
						}
					})
				}
				
				usernameEle.onblur = ()=>{
					validate(usernameEle,selectorRules[rule.selector]);
				}
				usernameEle.onfocus = ()=>{
					usernameEle.classList.remove('is-invalid');
				}


		});	

	}

}
Validator.isRequired = (selector,error)=>{
	return {
		selector:selector,
		test:(value)=>{
			if(!value){
				value = "";
			}
			return value.trim() ? undefined : error || "Vui lòng nhập trường này.";
		},
	}
}
Validator.isEmail = (selector,error)=>{
	return {
		selector:selector,
		test:(value)=>{
			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return regex.test(value) ? undefined : error || "Vui lòng nhập đúng email.";
		},
	}
}
Validator.minLength =(selector,min,error)=>{
	return{
		selector:selector,
		test:(value)=>{
			return (value.length >= 6) ? undefined : error ||`Vui lòng nhập tối thiểu ${min} kí tự.`
		}
	}
}
Validator.isConfirmed =(selector,cfValue,error)=>{
	return{
		selector:selector,
		test:(value)=>{
			return (value === cfValue() ? undefined : error || "Mật khẩu nhập lại không chính xác.");
		}
	}
}
