var header = document.querySelector("header")
let fakeheader = document.querySelector(".fakeHeader")

window.onscroll = function () {
  if (window.innerWidth > 700) {
    headerMin()
  }
}

window.onresize = function () {
  if (window.innerWidth > 700) {
    checkbox.checked = false;
    headerMin()
    document.body.style.position = '';
    document.body.style.top = '';
  } else {
    header.classList.remove("headermin");
    fakeheader.style.display = "none";
  }
}

var sticky = header.offsetHeight;

headerMin()
function headerMin() {
  if (window.pageYOffset > sticky && window.innerWidth > 700) {
    header.classList.add("headermin");
    fakeheader.style.display = "block";
  } else {
    header.classList.remove("headermin");
    fakeheader.style.display = "none";
  }
} 