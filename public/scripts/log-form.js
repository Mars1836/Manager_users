
const logform = document.querySelector('.log-form')
const showLog = logform.querySelector('.btn-show-logout')
const logbody = logform.querySelector('.log-body')
const logout_btn = logform.querySelector('#logout_btn')
const update_infor_btn = logform.querySelector('#update_infor_btn')
const body = document.querySelector('body');
console.log(logform)
console.log(showLog)
console.log(logbody)

showLog.onclick = function(e){
	e.stopPropagation();
	let logbody_class = logbody.classList;
	if(logbody_class.contains('visually-hidden')){
		logbody_class.remove('visually-hidden');
	}
	else{
		logbody_class.add('visually-hidden');
	}
}
body.onclick = function(){
	let logbody_class = logbody.classList;
	if(!logbody_class.contains('visually-hidden')){
		logbody_class.add('visually-hidden');
	}
}
logout_btn.onclick = function(){
	console.log(1);
	document.cookie = "id=; expires=Thu, 18 Dec 2013 12:00:00 UTC;path=/"
	location.reload();
}
