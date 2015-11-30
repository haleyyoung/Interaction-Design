/**
  * Strength indicator jQuery widget.
  */
(function ($) {
    $.fn.strengthIndicate = function () {
        var WHITE = "#FFFFFF",
            DEEP_RED = "#FF4719",
            RED = "#FF4D4D",
            YELLOW = "#FFFF80",
            GREEN = "#4DFF4D",
            LIGHT_BLUE = "#80FFFF",
            BLUE = "#4D4DFF",
            PURPLE = "#D685FF",
            STRENGTH_LEVEL_INTERVAL = 3,

            feedbackSetters = [
                {
                    color: WHITE,
                    label: "Please enter a password."
                },
                {
                    color: DEEP_RED,
                    label: "Pretty weak, I must say."
                },
                {
                    color: RED,
                    label: "Meh, getting better."
                },
                {
                    color: YELLOW,
                    label: "You're on your way to greatness, keep going!"
                },
                {
                    color: GREEN,
                    label: "Just a little further."
                },
                {
                    color: LIGHT_BLUE,
                    label: "Two more levels 'til purple."
                },
                {
                    color: BLUE,
                    label: "Whimp!"
                },
                {
                    color: PURPLE,
                    label: "Dondi status achieved!"
                }
            ],

            criteria = /[A-Za-z]+?[0-9]+?|[0-9]+?[A-Za-z]+?/,

            passwordField = $("<input type='password' class='indicatedField' />"),
            notify = $("<span class='notify'></span>"),

            /** Helper method for updatePasswordStrengthIndicator(). Grabs
              * information from the feedbackSetters array
              */
            getQualityData = function (passwordStrength) {
                var strength = Math.ceil(passwordStrength / STRENGTH_LEVEL_INTERVAL),
                    maxStrength = feedbackSetters.length - 1;
                return feedbackSetters[strength > maxStrength ? maxStrength : strength];
            },

            /** Gives the user visual feedback of the strength of their password
              * Strength is dependent upon length, having at least one lowercase and
              * one uppercase letter, and containing at least one number and one letter
              */
            updatePasswordStrengthIndicator = function (event) {
                var jQueryTarget = $(event.currentTarget),
                    password = jQueryTarget.val(),
                    passwordQualityData,
                    passwordStrength = password.length;

                //If there is a mixture of cases of the letters
                if (password.toUpperCase() !== password && password.toLowerCase() !== password) {
                    passwordStrength += STRENGTH_LEVEL_INTERVAL;
                }
                //If there is at least one number and one letter
                if (criteria.test(password)) {
                    passwordStrength += STRENGTH_LEVEL_INTERVAL;
                }
                passwordQualityData = getQualityData(passwordStrength);
                jQueryTarget.parent().children(".notify").html(passwordQualityData.label);
                jQueryTarget.css("background-color", passwordQualityData.color);
            };

        this.append(passwordField);
        this.append(notify);
        $(".indicatedField").bind("input", function (event) {
            updatePasswordStrengthIndicator(event);
        });
    };
})(jQuery);
