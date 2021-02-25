if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    let scriptDesktop = document.createElement("script");
    scriptDesktop.setAttribute("src", "js/desktop.js");
    document.body.appendChild(scriptDesktop);
}

var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    loop: true,
});


let checkbox = document.querySelector("header nav input")
checkbox.checked = false;
let nav = document.querySelectorAll("header li a")

nav.forEach(element => {
    element.addEventListener('click', function () {
        if (window.innerWidth < 700) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            checkbox.checked = false;
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        let name = document.querySelector('#' + element.name)
        console.log(name)
        if (name.id == "introduction") {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            name.scrollIntoView({
                behavior: "smooth"
            });
        }

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

var lang = {
    "html": "100%",
    "css": "90%",
    "javascript": "70%",
    "php": "55%",
    "angular": "65%"
};

var multiply = 4;

// $.each(lang, function (language, pourcent) {

//     var delay = 700;

//     setTimeout(function () {
//         $('#' + language + '-pourcent').html(pourcent);
//     }, delay * multiply);

//     multiply++;

// });
lang.forEach((item, index) => {
    console.log(item)
    console.log(index)
});