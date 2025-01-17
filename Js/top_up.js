// edit by abdo tharwat 
var buttonUp = document.querySelector(".go-up");

// function make the page go to top with smooth
buttonUp.onclick = function () {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };