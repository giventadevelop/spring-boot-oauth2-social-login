function isInteger(s)
{
    var i;
    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}
function stripCharsInBag(s, bag)
{
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}
		
//Phone Number Validation
$.validator.addMethod("phone", function(phone_number, element) {
    var digits = "0123456789";
    var phoneNumberDelimiters = "()- ext.";
    var validWorldPhoneChars = phoneNumberDelimiters + "+";
    var minDigitsInIPhoneNumber = 10;
    s=stripCharsInBag(phone_number,validWorldPhoneChars);
    return this.optional(element) || isInteger(s) && s.length >= minDigitsInIPhoneNumber;
}, "Please enter a valid phone number");

//retype password check
$.validator.addMethod("repass", function(repass, element) {
    var pass = $('#regpassword').val();
    if(repass != pass){
        return false;
    } else return true;
}, "Verify your password.");
	
//Select Validation
$.validator.addMethod("selectNone", function(value, element) {
    if (element.value == "-1"){
        return false;
    } else return true;
}, "Please select an option.");

//Single Select Validation
$.validator.addMethod("selectSingle", function(value, element) {
    var leng = this.getLength($.trim(value), element);
    //alert(leng);
    if (leng > 1){
        return false;
    } else return true;
}, "Please select only one option.");
		
//File Validation
$.validator.addMethod("validateFile", function(val, element) {
    var ext = $('#document').val().split('.').pop().toLowerCase();
    var allow = new Array('jpg','png');
    if(jQuery.inArray(ext, allow) == "-1") {
			    
        return false;
    }else{
			    
        return true;
    }
			 
}, "Only jpg and png image allowed.");
		
		
$.validator.addMethod("validatexlsfile", function(val, element) {
    var ext = $('#upload').val().split('.').pop().toLowerCase();
    var allow = new Array('xls');
    if(jQuery.inArray(ext, allow) == "-1") {
			    
        return false;
    }else{
			    
        return true;
    }
			 
}, "Only xls file allowed.");
		
		
//Max 
$.validator.addMethod("maxlimit", function(value, element) { 
    if (element.value == "-1"){
        return false;
    } else return true;
}, "Please select an option."); 