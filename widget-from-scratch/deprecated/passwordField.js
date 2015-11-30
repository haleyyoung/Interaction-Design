/* This is a typical "web page setup" routine using jQuery. */
    // Define a function that we will need.

$("#passwordLetters").keydown(function(event){
    var password = this.value;
    var passwordLength = password.length;
    if(passwordLength < 3) {
        $(this).css("background-color", "#FF4D4D");
    }
    else if(passwordLength < 5){
        $(this).css("background-color", "#FF4719");
    }
    else if(passwordLength < 7){
        $(this).css("background-color", "#FFFF80");
    }
    else if(passwordLength < 9){
        $(this).css("background-color", "#4DFF4D");
    }
    else if(passwordLength < 11){
        $(this).css("background-color", "#80FFFF");
    }
    else if(passwordLength < 13){
        $(this).css("background-color", "#4D4DFF");
    }
    else if(passwordLength < 15){
        $(this).css("background-color", "#D685FF");
    }
});

