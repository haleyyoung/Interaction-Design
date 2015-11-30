/*
 * Companion JavaScript for sample account signup page.
 *
 * Prerequisite: Load jQuery prior to loading this script.
 */
$(function () {
    /*
     * We will be enabling and disabling this form as the
     * user types things in.  For convenience, we put logic
     * that we will use a lot inside their own functions.
     */
    var updatePasswordMatchMessages = function () {
        // We leave visibility to the validation code.
        $("#password-match").css({ opacity: 0 });
        
        // Update the match message based on equality.
        if ($("#password").val() === $("#password-repeat").val()) {
            $("#password-match")
                .html("Passwords match!")
                .removeClass("requirement")
                .addClass("approval");
        } else {
            $("#password-match")
                .html("Passwords do not match.")
                .removeClass("approval")
                .addClass("requirement");
        }
    },
    
    // Gives the user visual feedback of the strength of their password
    // Strength is dependent upon length, having at least one lowercase and
    // one uppercase letter, and containing at least one number and one letter
    updatePasswordStrengthIndicator = function () {
        var password = $("#password").val();
        var passwordLength = password.length;
        // Create a password strength score
        var passwordStrength = passwordLength;
        console.log("letters " + passwordStrength);
        //If there is a mixture of cases of the letters
        if(password.toUpperCase() !== password && password.toLowerCase() !== password){
            passwordStrength += 3;
        }
        console.log("case " + passwordStrength);
        //If there is at least one number and one letter
        if(password.match(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/) !== null){
            passwordStrength += 3;
        }
        console.log("alphanumeric " + passwordStrength);
        
        if(passwordStrength === 0){
            $("#password").css("background-color", "white");
        }
        else if(passwordStrength < 3) {
            $("#password").css("background-color", "#FF4D4D");
        }
        else if(passwordStrength < 6){
            $("#password").css("background-color", "#FF4719");
        }
        else if(passwordStrength < 9){
            $("#password").css("background-color", "#FFFF80");
        }
        else if(passwordStrength < 12){
            $("#password").css("background-color", "#4DFF4D");
        }
        else if(passwordStrength < 15){
            $("#password").css("background-color", "#80FFFF");
        }
        else if(passwordStrength < 18){
            $("#password").css("background-color", "#4D4DFF");
        }
        else if(passwordStrength < 21){
            $("#password").css("background-color", "#D685FF");
        }
    },

    validateSignup = function () {
        // Our three conditions for valid signup are:
        //  - non-empty username
        //  - non-empty password
        //  - strong password
        //  - matching passwords
        updatePasswordMatchMessages();
        updatePasswordStrengthIndicator();
        if ($("#username").val() && $("#password").val() &&
                $("#password").val() === $("#password-repeat").val()) {
            // All conditions satisfied.  Submission can continue.
            $("#username-prompt, #password-prompt").css({ opacity: 0 });
            $("#password-match").css({ opacity: 1 });
            
            // And, the user can submit.
            $("#submit").removeAttr("disabled");
        } else {
            // Conditions are not satisfied.  Display the appropriate
            // requirements so the user knows what to do.
            if ($("#username").val()) {
                $("#username-prompt").css({ opacity: 0 });
            } else {
                $("#username-prompt").css({ opacity: 1 });
            }
            
            if ($("#password").val()) {
                if ($("#password-repeat").val()) {
                    $("#password-prompt").css({ opacity: 0 });
                    $("#password-match").css({ opacity: 1 });
                } else {
                    $("#password-prompt")
                        .html("Please repeat your password below.")
                        .css({ opacity: 1 });
                    $("#password-match").css({ opacity: 0 });
                }
            } else {
                $("#password-prompt")
                    .html("Please enter a password.")
                    .css({ opacity: 1 });
                $("#password-match").css({ opacity: 0 });
            }

            // And, the user cannot submit.
            $("#submit").attr({ disabled: "disabled" });
        }
    };

    /* 
     * HTML5 alert!  "input" is so new jQuery does not have it yet.
     * The bind function is the "backdoor" for things like that.
     * Note how, with everything placed in validateSignup, we can
     * assign handlers in one fell swoop!
     */
    $("#username, #password, #password-repeat").bind("input", validateSignup);

    $("#cancel").click(function () {
        if (confirm("Are you sure you want to cancel signup?")) {
            window.location = "http://www.google.com";
        }
    });

    $("#submit").click(function () {
        // If validateSignup does its job, we can go right into
        // assuming that everything is OK when we get here.
        $("body").append($("<p>Name: " + $("#username").val() + "</p>" +
                "<p>Gender: " + $("input[name=sex]:checked").val() + "</p>" +
                ($("input[type=checkbox]:checked").val() ?
                        "<p>" + "You have chosen to receive emails." + "</p>" :
                        "<p>" + "You have chosen not to receive emails." + "</p>")));
    });
    
    // Call validateSignup once just to make sure everything is consistent.
    validateSignup();
});
