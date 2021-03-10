if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    let scriptDesktop = document.createElement("script");
    scriptDesktop.setAttribute("src", "js/desktop.js");
    document.body.appendChild(scriptDesktop);
}

var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
        // document.body.style.top = `-${window.scrollY}px`;
        // document.body.style.position = 'fixed';
        document.body.style.overflowY = "hidden";
    } else {
        // const scrollY = document.body.style.top;
        // document.body.style.position = '';
        // document.body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.body.style.overflowY = "";
    }
});

Swal.fire(
    'Bienvenue !',
    'Mon portfolio est toujours en cours de développement (surtout la partie "Mes projets") et évolue au fil des jours.<br>Merci de votre indulgence 🙂<br><br>Mon téléphone : 06 62 43 09 40 📱',
    'info'
)

let fullscreenProjet = document.querySelector("#fullscreenProjet")
function openNav() {
    document.body.style.overflowY = "hidden";
    fullscreenProjet.style.width = "100%";
}

function closeNav() {
    document.body.style.overflowY = "";
    fullscreenProjet.style.width = "0%";
}
