window.addEventListener('DOMContentLoaded', () => {
	// default
	let selectBox = new vanillaSelectBox("#select1",{
        "maxHeight": 200,
        search: false,
        placeHolder: "რა ოპერაციული სისტემას იყენებთ?",
    });
	let selectBox2 = new vanillaSelectBox("#select2", {
        "maxHeight": 200,
        search: false,
        placeHolder: "რა მიზნით გამოიყენებდით ikiddo-ს?"
    });
	let selectBox3 = new vanillaSelectBox("#select3", {
        "maxHeight": 200,
        search: false,
        placeHolder: "ვისთვის გამოიყენებდით ikiddo-ს?"
    });

	let form = document.getElementById('form');
	let formInfo = document.querySelector('.form__info');
	let formUserNameValue = null;
	let formUserName = document.getElementById('name');
	let formBack = document.getElementById('form-back');
	form.addEventListener('submit', function(e){
		e.preventDefault();
		let checkValid = validatInputs();
		if(checkValid){
			// console.log('No Error');
			formInfo.classList.add('active');
			formUserName.textContent = formUserNameValue;

            function resetForm() {
                selectBox.empty();
                selectBox2.empty();
                selectBox3.empty();
				form.reset();
				formInfo.classList.remove('active');

                const formGroups = Array.from(form.querySelectorAll('.form__group'));
                formGroups.forEach(formGroup => {
                    formGroup.classList.remove('error');
                });
            }

			formBack.addEventListener('click', resetForm);
			setTimeout(resetForm, 5000);
		}else{
			// console.log('Error');
		}
	});
	function validatInputs(){
		let inputs = form.querySelectorAll('.form-control');
		let valid = [];
		let radioCheck = false;
		let checkboxCheck = false;
		let checkAttr = null;
		inputs.forEach(function(i,j){
			i.addEventListener('input', validatInputs);
			i.addEventListener('change', validatInputs);
			if(i.getAttribute('type')){
				checkAttr = i.getAttribute('type');
			}else{
				checkAttr = i.tagName;
			}
			
			switch(checkAttr){
				case 'radio':
					// console.log(i.checked);
					if(!radioCheck){
						if(!i.checked){
							i.closest(".form__group").classList.add("error");
							radioCheck = false;
						}else{
							i.closest(".form__group").classList.remove("error");
							radioCheck = true;
						}
					}
				break;
				case 'checkbox':
					if(!checkboxCheck){
						if(!i.checked){
							i.closest(".form__group").classList.add("error");
							checkboxCheck = false;
							valid.push(i);
						}else{
							i.closest(".form__group").classList.remove("error");
							checkboxCheck = true;
						}
					}
					
				break;
				case 'text':
					let _thisVal = i.value;
					if(i.getAttribute('data-name') == 'name'){
						if(!isNaN(i.value)){
							_thisVal = '';
						}
						formUserNameValue = i.value;
					}
					if(_thisVal==''){
						i.closest(".form__group").classList.add("error");
						valid.push(i.getAttribute('name'));
					}else{
						i.closest(".form__group").classList.remove("error");
					}
				break;
				case 'tel':
					if(i.value=='' || isNaN(i.value)){
						i.closest(".form__group").classList.add("error");
						valid.push(i.getAttribute('name'));
					}else{
						i.closest(".form__group").classList.remove("error");
					}
				break;
				case 'email':
					let regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
					if(i.value=='' || !regEmail.test(i.value)){
						i.closest(".form__group").classList.add("error");
						valid.push(i.getAttribute('name'));
					}else{
						i.closest(".form__group").classList.remove("error");
					}
				break;
				case 'select':
					if(i[select.selectedIndex].value==''){
						i.closest(".form__group").classList.add("error");
						valid.push(i.getAttribute('select'));
					}else{
						i.closest(".form__group").classList.remove("error");
					}
				break;
				default:
					if(i.value==''){
						i.closest(".form__group").classList.add("error");
						valid.push(i.getAttribute('name'));
					}else{
						i.closest(".form__group").classList.remove("error");
					}
				break;
			}
		});

		if(valid.length>0){
			// console.log(valid.length);
			return false;
		}else{
			return true;
		}
		
	}

});