//taken from in class participation assignment done with others in class

if (window.screen.availWidth <= 780) {
    document.addEventListener("DOMContentLoaded", function (event) {
        var menuButton = document.getElementsByClassName('menu-toggle');
        var menu_bar_state = 0;

        menuButton[0].addEventListener("click", function (evt) {
            if (menu_bar_state === 0) {
                menuButton[0].textContent = "Hide Menu";
                slideDown("menu-main-container", 0, 20000);
                menu_bar_state = 1;
            }
            else {
                menuButton[0].textContent = "Menu";
                slideUp("menu-main-container", 0, 20000);
                menu_bar_state = 0;
            }
        });

        function slideDown(element, nextHeight, time, maxHeight) {
            var NextTick = 0;
            var toSlide = document.getElementsByClassName(element);

            if (maxHeight === undefined) {
                maxHeight = 40;

                toSlide[0].style.height = "0px";
                toSlide[0].style.position = "initial";
                toSlide[0].style.visibility = "visible";
                NextTick = maxHeight / time;
            }
            else {
                NextTick = maxHeight / time;
            }

            if (nextHeight < maxHeight) {
                toSlide[0].style.height = nextHeight + "px";
                setTimeout(function () {

                    slideDown(element, nextHeight + 1, time, maxHeight);
                }, NextTick * 1000);
            }
        }

        function slideUp(element, nextHeight, time, maxHeight) {
            var NextTick = 0;

            var toSlide = document.getElementsByClassName(element);

            //computes the maxHeight if not given

            if (maxHeight === undefined) {
                maxHeight = 40;

                toSlide[0].style.height = maxHeight;
                toSlide[0].style.position = "initial";
                toSlide[0].style.visibility = "hidden";
                nextHeight = maxHeight - 1;
                NextTick = maxHeight / time;
            }
            else {
                NextTick = maxHeight / time;
            }

            //recursive step
            if (nextHeight >= 0) {
                toSlide[0].style.height = nextHeight + "px";
                setTimeout(function () {
                    slideUp(element, nextHeight - 1, time, maxHeight);
                }, NextTick * 1000);
            }
        }
    });
}
