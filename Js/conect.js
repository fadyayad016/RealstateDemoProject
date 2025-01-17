var dataContainer;
if(localStorage.getItem('ourProduct')!=null)
{
  dataContainer=JSON.parse(localStorage.getItem('ourProduct'))
  displatProduct();
}
else{
  dataContainer=[]; 

}
//data by id from html page
var nameDataInput=document.getElementById('dataname');
var emailDataInput=document.getElementById('dataemaill');
var numpeDataInput=document.getElementById('datanumper');
var adresDataInput=document.getElementById('dataadress');
var textDataInput=document.getElementById('datatextZone');

//function to collect data 
function collectData() {
  
    var data={
        name:nameDataInput.value,
        email:emailDataInput.value,
        numper:numpeDataInput.value,
        adress:adresDataInput.value,
        text:textDataInput.value
    }
    
    clear()
    dataContainer.push(data);
    localStorage.setItem('ourProduct',JSON.stringify(dataContainer));
    console.log(dataContainer);
}
/////////function to cleat input after enter data
function clear() {{
    nameDataInput.value="";
    emailDataInput.value="";
    numpeDataInput.value="";
    adresDataInput.value="";
    textDataInput.value="";
    
}};

  
  /////////////
  document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Select input fields
  var name = document.getElementById("dataname");
  var email = document.getElementById("dataemaill");
  var phone = document.getElementById("datanumper");
  var subject = document.getElementById("name='dataadress");
  var message = document.getElementById("datatextZone");

  // Regular expressions
  var nameRegex = /^[a-zA-Z\u0621-\u064A\s]{3,50}$/; // Arabic/English letters, 3-50 chars
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  var phoneRegex = /\+201|01|00201)[0-2,5]{1}[0-9]{8}/; // egyptain number only
  var nonEmptyRegex = /^.+$/; // At least one character

  // Validation
  if (!nameRegex.test(dataname.value)) {
    alert("Please Write Correct Name)");
    return;
  }

  if (!emailRegex.test(dataemaill.value)) {
    alert("Please write correct email");
    return;
  }

  if (!phoneRegex.test(datanumper.value)) {
    alert("please write egyption number");
    return;
  }

  if (!nonEmptyRegex.test(dataadress.value)) {
    alert("Yoyr Adree");
    return;
  }

  if (!nonEmptyRegex.test(datatextZone.value)) {
    alert("Please write your message");
    return;
  }

  
  alert("Done");
  event.target.submit(); 
});
