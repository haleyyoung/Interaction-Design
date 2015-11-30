/*
 * Companion JavaScript for sample account signup page.
 *
 * Prerequisite: Load jQuery prior to loading this script.
 */
$(function () {
    /*
     * We will be enabling and disabling this form as the
     * user types username in.
     */
    var validateSignup = function () {
        if ($("#username").val()) {
            // All conditions satisfied.  Submission can continue.
            $("#username-prompt").css({ opacity: 0 });

            // And, the user can submit.
            $("#submit").removeAttr("disabled");
        } else {
            // Conditions are not satisfied.  Display the appropriate
            // requirements so the user knows what to do.
            $("#username-prompt").css({ opacity: 1 });
            $("#submit").attr({ disabled: "disabled" });
        }
    };

    /*
     * HTML5 alert!  "input" is so new jQuery does not have it yet.
     * The bind function is the "backdoor" for things like that.
     * Note how, with everything placed in validateSignup, we can
     * assign handlers in one fell swoop!
     */
    $("#username").bind("input", validateSignup);

    $("#cancel").click(function () {
        if (confirm("Are you sure you want to cancel signup?")) {
            window.location = "http://www.google.com";
        }
    });

    $("#submit").click(function () {
        // If validateSignup does its job, we can go right into
        // assuming that everything is OK when we get here.
        $("body").append($("<p>Name: " + $("#username").val()));
    });


    // Call validateSignup once just to make sure everything is consistent.
    validateSignup();
});
