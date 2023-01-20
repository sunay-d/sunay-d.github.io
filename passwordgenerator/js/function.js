
const characters = "%!*@#$()^&";

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
};

function generate(){
    var length = document.getElementById("length").value;
    var spec = document.getElementById("chars").value;
    var num = document.getElementById("num").checked;
    var upper = document.getElementById("upper").checked;
    var lower = document.getElementById("lower").checked;

    if (isNaN(Number(length)) || length<=3 || length>25){
        alert("Length must be an integer between 4 and 25");}
    else if (!specCheck(spec)){
        alert("Special characters must be a combination of these characters: %!*@#$()^&");
    }
    else {
        document.getElementById("display").value = passwordGenerator(length,spec,num,upper,lower);}
}

function specCheck(spec) {
    for (let i=0; i<10; i++) {
        if (i==spec.length){
            return true;
            break;
        }else if (regExpEscape(characters).search(regExpEscape(spec[i]))===-1){
            return false;
            break;
        }
    }
    return true;
}

function passwordGenerator(length,spec,num,upper,lower){
    var password='';
    var passw=spec;
    if (num==1){
        passw+='0123456789'};
    if (upper==1){
        passw+='ABCDEFGHIJKLMONPQRSTUWVXYZ'};
    if (lower==1){
        passw+='abcdefghijklmnopqrstuwvxyz'};
    for (let i=0; i<length; i++){
        password += passw[Math.floor(Math.random() * passw.length)]};
    
    return password;
}





