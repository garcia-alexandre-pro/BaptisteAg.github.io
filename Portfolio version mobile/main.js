let checkbox = document.querySelector("header nav input")
let nav = document.querySelectorAll("li a")

nav.forEach(element => {
    element.addEventListener('click', function () {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        checkbox.checked = false;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.querySelector('#' + element.name).scrollIntoView({
            behavior: "smooth"
        });
    })
});
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
    } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
});