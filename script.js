
//firstly we have to get the value of the entered number in calculator
function getHistory()
{
   return document.getElementById("history-value").innerText;
}
//Now printHistory function prints the entered value by user
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
//priting the calculated value of the calculator
function getOutput()
{
   return document.getElementById("output-value").innerText;
}

//now if calculated output(ex.7-7) is 0(empty,"") then we need not to use getformatted function(for comma separation) so we checked the the condition 
function printOutput(num) 
{
      //checking for empty number
    if(num=="")
    {
        document.getElementById("output-value").innerText=num;
	}
	//for non empty number
    else{
		//getting output value and sending to getformattednumber function as a parameter
        document.getElementById("output-value").innerText=getFormattedNumber(num)
    }

 
}
//Intially there is no comma separarted number(12389) so we have created getformattednumber for adding comma to their respected weight (12,389)
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;

}
//as computer don't need any comma separated number as it work in binary input so for calculation for machine we need to remove the comma separated values as comma separated is only for human understandability  so this function will remove ",","/","/g"
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

//above written  code is only for taking input, displaying input, comma separation and printing output 
 
//now the actual /mathematical/functional code is written below for various operators 
 
// operator variable for getting diff. operator like +,-,*,/etc
var operator = document.getElementsByClassName("operator");

//operator.length is for total operator 
for(var i =0;i<operator.length;i++)
{

	// addEventListener is the predefined function in javascript for the function we need to perfom operation on operators 

	operator[i].addEventListener('click',function(){

		//if id(button "C") selected is "clear " then we need to clear the history and output on the screen by empty("")

		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
//if id(button "CE") selected is "backspace " then we need to separated added comma by calling reverseNumberFormat and if output has non zero number then converted to string and prints string length minus 1 character on output 

		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
//isNaN() is a function that returns the true or false function i.e if number is legal it will return true and if number is not legal or its something else than a number

		//
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					// if id is equal "=" history is evaluated 

					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{

	// for other operator i.e other than equal history is printed		
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
		 	}
		}

	});
}

// just like above we performed on operators and now we will be dealing with number 
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ 
			//if output is a number concanate(means that entering  334 is like concanating 3 to 3 to 4 ) the number like "+" is used for concanating the no.
			output=output+this.id;
			printOutput(output);
		}
	});
}



