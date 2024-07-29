/*
referenced HyperionDev's "11-031 jQuery" pdf and the files within the "11-031 jQuery" folder
sources referenced for guidance on jQuery function structure and syntax

referenced https://stackoverflow.com/questions/71526109/how-do-i-fade-out-any-specific-element-that-is-clicked-on-using-jquery
website referenced for guidance on fading elements out of the webpage

referenced https://stackoverflow.com/questions/9122078/difference-between-onclick-vs-click
website referenced for guidance on the difference between .on('click') and .click()
*/
$(document).ready(function () {
    // jQuery functions
    // 1. alert user once the page has loaded
    alert("This page has loaded!");

    // 2. change the background once the page has loaded
    $('body').css('background-color', '#1abc91');

    // 3. change only a single paragraph's styling
    // note that the paragraph is styled differently than the other paragraphs so that the paragraph styled through the jQuery function stands out
    // while i would ensure consistent styling of a website usually, this task is used to explore a variety of jQuery functions, seeing as all elements would not float around or allow for fading out upon click in a typical website 
    $('p#styleParagraph').css({
        'font-size': '20px',
        'color': 'lightcyan',
        'font-family': 'Calibri, sans-serif'
    });

    // 4. fade out any object that is clicked on
    // bind click function to all elements (except dropdown menu button)
    $("*:not(.menuBtn)").on('click', function (event) {
        // prevent event bubbling
        event.stopPropagation();
        // target clicked element
        $(this).fadeOut(1500);
    });

    // 5. create a drop-down menu (accordion animation style when each section is hovered over)
    // hide menu options and option items upon loading of webpage
    $('.dropdown-options').hide();
    $('.dropdown-option-items').hide();

    // show menu options when menu button is clicked on
    $('.menuBtn').on('click', function (event) {
        // prevent event bubbling
        event.stopPropagation();
        // hide dropdown menu options upon clicking on menuBtn when dropdown options already visible
        $('.dropdown-options').not($(this).siblings('.dropdown-options')).slideUp('medium');
        // toggle dropdown menu options visibility
        $(this).siblings('.dropdown-options').stop(true, true).slideToggle('medium');
    });

    // referenced https://stackoverflow.com/questions/8775860/jquery-drop-down-hover-menu | https://jsfiddle.net/amkrtchyan/4jxph/3/ for guidance on a jQuery dropdown hover menu
    $('.dropdown-options li').hover(
        function () {
            // show dropdown menu options upon hover over section
            $(this).children('.dropdown-option-items').stop(true, true).slideDown('medium');
        },
        function () {
            // close dropdown menu options when dropdown menu section is not hovered over
            $(this).children('.dropdown-option-items').stop(true, true).slideUp('medium');
        });

    // 6. chained effect to slide all the elements around repeatedly whilst changing the background
    // function for changing background colour 
    function changeBackgroundColour() {
        $('body').css('background-color', 'lightseagreen');
        setTimeout(function () {
            $('body').css('background', '#199f7c');
        }, 2000);
    }

    // function to slide elements around
    function slideElements() {
        // referenced https://www.hackerearth.com/practice/notes/javascript-chaining-method-pattern/#:~:text=Javascript%20Method%20Chaining%20allows%20us,method%20chaining%20when%20using%20jQuery. for guidance on the chaining method
        // chained effect to slide elements around
        $('#elements')
            .animate({ left: "-=20px" }, 2000, 'linear')
            .animate({ top: "-=20px" }, 2000, 'linear')
            .animate({ left: "+=20px" }, 2000, 'linear')
            .animate({ top: "+=20px" }, 2000, 'linear');

        // referenced https://stackoverflow.com/questions/12698641/changing-background-colour-for-a-few-seconds-only-with-jquery for guidance on changing background colour with jQuery
        // call function to change background repeatedly while sliding elements around
        changeBackgroundColour();
    }

    // call functions repeatedly
    setInterval(slideElements, 4000);

    // 7. fade a picture in and out over a period of 3 seconds each when the respective buttons are clicked
    // initialise variable to check animation state
    let isAnimating = false;

    // image click event handler
    $('img').on('click', function (event) {
        // prevent event bubbling
        event.stopPropagation();
        // stop ongoing animations
        $(this).stop();

        // check if animation is in progress
        if (!isAnimating) {
            // set animation state to true - clicked on image will be animating automatically due to jQuery function 4 ("fade out any object that is clicked on")
            isAnimating = true;

            // fade in image over 3 seconds
            $(this).fadeIn(3000, function () {
                // fade out image over 3 seconds
                $(this).fadeOut(3000, function () {
                    // set animation state to false after fading out
                    isAnimating = false;
                });
            });
        }
        //8. stop the animation of the above effect whilst in progress
        else {
            $(this).stop();
            // set animation state to false after stopping progress
            isAnimating = false;
        }
    });
});
