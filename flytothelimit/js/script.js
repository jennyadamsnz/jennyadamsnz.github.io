
// ================PRICE CALCULATOR==================

function calculateTotal(){

		var flightPrice=0;
		var timePrice=0;
		var passengersPrice=0;
		var timeOption=0;

		var theForm = document.forms["booking-form"];

		// var elementsArray = theForm.elements;

		var selectedFlightOption = theForm.elements["flight_option"];
		var selectedFlightTimeOption = theForm.elements["flight_time_option"];
		var selectedPassengersOption = theForm.elements["passengers_option"];
		var selectedTimeOption = theForm.elements["time_option"];
		var selectedDoorOption = theForm.elements["door_option"];


		if(typeof selectedFlightOption != "undefined"){

			for(var i = 0; i < selectedFlightOption.length; i++){
				if(selectedFlightOption[i].checked){
					flightPrice = [selectedFlightOption[i].value];
					document.getElementById('totalPrice-error').innerHTML = "";
					break;
				}
			}
		} else {
			flightPrice = 1;
		};

		if(typeof selectedFlightTimeOption != "undefined"){

			for(var i = 0; i < selectedFlightTimeOption.length; i++){
				if(selectedFlightTimeOption[i].checked){
					timePrice = [selectedFlightTimeOption[i].value];
					document.getElementById('totalPrice-error').innerHTML = ""
					break;
				}
			}
		} else {
			timePrice = 1;
		};	

		if(typeof selectedPassengersOption != "undefined"){		

			for(var i = 0; i < selectedPassengersOption.length; i++){
				if(selectedPassengersOption[i].checked){
					passengersPrice = [selectedPassengersOption[i].value];
					document.getElementById('totalPrice-error').innerHTML = ""
					break;
				}
			}
		} else {
			passengersPrice = 1;
		};	

		if(typeof selectedTimeOption != "undefined"){		

			for(var i = 0; i < selectedTimeOption.length; i++){
				if(selectedTimeOption[i].checked){
					timeOption = [selectedTimeOption[i].value];
					document.getElementById('totalPrice-error').innerHTML = ""
					break;
				}
			}
		} else {
			console.log('timeOption');
			timeOption = 1;
		};			

	var bookingPrice = flightPrice * timePrice * passengersPrice * timeOption;
	document.getElementById('totalPrice').innerHTML = "Total: NZ$"+bookingPrice+".00";
 

		// if(document.getElementById('totalPrice').innerHTML === "Total: $0.00"){		
		// 	console.log("hi there");

		// 	document.getElementById('totalPrice-error').innerHTM = "Please select your flight preferences above to display the total price";
		// }


    // Flight Options Check-----------------------------------------------

    	console.log(bookingPrice);
    	if(bookingPrice != 0){
	            
	            document.getElementById('totalPrice-error').innerHTML = "";          
	        }

		theForm.addEventListener('submit', function() {
			
			if(bookingPrice === 0){
	            
	            document.getElementById('totalPrice-error').innerHTML = "Please select your flight & time options above to display the total price";          
	        } 
	  		else {
	  			document.getElementById('totalPrice-error').innerHTML = "";     
	  		}
		}, true);
	

	  //       var selectedFlightOption = theForm.elements["flight_option"];

			// for(var i = 0; i < selectedFlightOption.length; i++){

			// 	if(selectedFlightOption[i].checked){
			// 	var	flightPrice = [selectedFlightOption[i].value];
			// 		break;
			// 	}
			// 	return flightPrice;

			// }

	
}


// ================GALLERY==================
function gallery() {

	var counter = 0;
	
	var allFigures = document.querySelectorAll("#gallery figure");
	console.log(allFigures);
	var countFigures = allFigures.length;
	var prevButton = document.querySelector('.prev');
	var nextButton = document.querySelector('.next');
	var pager = document.querySelector('.pager');

	prevButton.addEventListener("click", function(){
		
		counter--;
		console.log(counter);
		if(counter < 0){
			counter = countFigures -1;
		}
		showGalleryFigure();
	}, false);

	nextButton.addEventListener("click", function(){
		counter++;
		console.log(counter);
		showGalleryFigure();

	}, false);

	pager.addEventListener("click", function(e){
		var child = e.target;
		var source = child.getAttribute('src');
		var pattern = /\D/g;
		var childItem = source.replace(pattern,'');
		showGalleryFigure(childItem);
	}, false);

	function showGalleryFigure(childItem){
		
		if(childItem){
			var displayedFigure = childItem - 1;
			counter = displayedFigure;
		} else {
			console.log(counter);
			displayedFigure = Math.abs(counter % countFigures);
		}

		for(var i=0; i < countFigures; i++){
			if(allFigures[i].classList.contains("showGallery")){
				allFigures[i].classList.remove("showGallery");
				break;
			}

		}
		allFigures[displayedFigure].classList.add('showGallery');
	}
}
// ================DROPDOWN MENUS===============

function dropMenu(){
	var shift = document.querySelector('#shift');

	var labelElement = shift.querySelectorAll('label');
	console.log(labelElement.length);

	for(var i=0; i < labelElement.length; i ++){

		labelElement[i].addEventListener("click", function(e){

			var element = e.target;
			console.log(element);
			myFunction(element);
			shift.classList.add("shift");
		});
		
	}
	function myFunction(element) {
		console.log(element);
		var dropDown = shift.querySelector('#'+element.id+"-Dropdown");
		dropDown.classList.toggle("show");
	}
}

// ========================FORM VALIDATION=======================

function formValidation(theForm){

		// turn off basic html validation
		theForm.noValidate = true;

		theForm.addEventListener('blur', function(evt) {
			
			if(validateForm(theForm) === false){
	            evt.preventDefault();
	        } 
		}, true);

		theForm.addEventListener('submit', function(evt) {
			
			if(validateForm(theForm) === false){
	            evt.preventDefault();
	           
	        } 
		}, true);

	    function validateForm(theForm){
	    	// assume initially there are no errors
	        var isError = false;
	        // get elements from the form
	        var elements = theForm.elements;
	        console.log(elements);
	        // traverse through the array to get fields and check if it is valid
	         for (var i = 0; i < elements.length; i += 1) {
	            var isValid = isFieldValid(elements[i]);
	             if(isValid === false){
	                    isError = true;
	                }      
	         }
	         return ! isError;
	    }
	
		function isFieldValid(field){

				var errorMessage = "";
				var errMsg="";

			
				//skip fields that are always considered valid
				if( ! needsToBeValidated(field)){
					return true;
				}

		
		// reset error messages and error fields

		if((field.type !== "radio" ) && (field.type !== "checkbox")){

			field.classList.remove('invalid');
			var errorSpan = document.querySelector("#"+ field.id +"-error");
			errorSpan.innerHTML = "";
			errorSpan.classList.remove('warning');

		} else if (field.type ===  "radio") {
		
			field.classList.remove('invalid');
			var errorSpan = document.querySelector("#"+ field.name +"-error");
			errorSpan.innerHTML = "";
			errorSpan.classList.remove('warning');

		} else if(field.type === "checkbox"){

			
			field.classList.remove('invalid');
			var errorSpan = document.querySelector("#"+ field.type +"-error");
			errorSpan.innerHTML = "";
			errorSpan.classList.remove('warning');

		}

		// radio button---------------------------------------------------------------------------------

		if((field.type === "radio") && ! radioButtonChecked(field)){
			errorMessage = "Please select one.";
		} 			

		// checkbox---------------------------------------------------------------------------------

		if(field.type === "checkbox" && ! field.checked && ! checkBoxCheck(field)) { 
            errorMessage = "Please select all required options.";
        }

		// number check---------------------------------------------------------------------------------

        if(field.type === "number" && field.min > 0 && parseInt(field.value) < parseInt(field.min)) {
        	console.log("error");
            errorMessage = "must be " + field.min + " or greater.";
        }

        if(field.type === "number" && field.max > 0 && parseInt(field.value) > parseInt(field.max)) {
            errorMessage = "must be " + field.max + " or less.";
        }

        // phone number check---------------------------------------------------------------------------------

        if(field.type === "tel" && ! checkPhone(field)){
             errorMessage = "Enter a valid phone number";
        }

		// ============================================================== min value check

		if(field.minLength > 0 && field.value.length < field.minLength){
			errorMessage = "Must be at least " + field.minLength +" or more characters please";
		}

		//  ============================================================= check email

		if(field.type === "email" && ! isEmail(field.value)){			
			errorMessage = "Please provide a proper email.";
		}

		// ============================================================== check if the form element is blank

		if(field.required && field.value.trim() === ""){		
			errorMessage = "This field is required";				
		}


		// check for error messages===================================

		if(errorMessage !== ""){

			if((field.type !== "radio" ) && (field.type !== "checkbox")){
				// generate error field
				field.classList.add('invalid');

				// display error message in form
				var errorSpan = document.querySelector("#"+ field.id +"-error");
				errorSpan.innerHTML = errorMessage;
				errorSpan.classList.add('warning');

			} else if (field.type ===  "radio") {

				// generate error field
				field.classList.add('invalid');

				// display error message in form
				var errorSpan = document.querySelector("#"+ field.name +"-error");
				errorSpan.innerHTML = errorMessage;
				errorSpan.classList.add('warning');

			} else if(field.type === "checkbox"){

				// generate error field
				field.classList.add('invalid');

				// display error message in form
				var errorSpan = document.querySelector("#"+ field.type +"-error");
				errorSpan.innerHTML = errorMessage;
				errorSpan.classList.add('warning');

			}

			return false;
		}
		return true;
	}
	
	function needsToBeValidated(field){
		var validElements = ['submit', 'button', 'select'];
		if((validElements.indexOf(field.type) === -1 ) || (field === 'select')){
			return true;
		} else {
			return false;
		}
	}
	function isEmail(input) {
	    return input.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	    					

	}
	function checkPhone(field) {
		// The g means Global, and causes the replace call to replace all matches, not just the first one.
		// The "g" flag indicates that the regular expression should be tested against all possible matches in a string.
		var val = field.value;
		var pattern = /[^\dA-Z]/g;
    	var phoneNum = val.replace( pattern, ''); 
    	// console.log(phoneNum);
		if(phoneNum.length > 6 && phoneNum.length < 15) {
             return true;
        }    
    }
    function radioButtonChecked(field){
    	
    	var count=0;  
		var fieldName = field.name;
		var radioButtons = document.querySelectorAll('input[name=' + fieldName +']');
		console.log(radioButtons);
		for(var i=0; i < radioButtons.length ; i++){
			if((radioButtons[i].checked)) {	
				count ++;										
			} 
		}
		if(count > 0){
			return true;
		}

	} 
	function checkBoxCheck(field){
		// var fieldName = field.name;
		var count =0;
		var checkBoxes = document.querySelectorAll('input[type=checkbox]');
		for(var i=0; i < checkBoxes.length; i++){
			if(checkBoxes[i].checked){
				count++;
			}
		}
		if(count>0){
			return true;
		} 
	}

}