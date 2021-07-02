window.onload = function () {
    AOS.init();
    window.scrollTo(0,0);
    document.querySelector(".loader").remove()

    Swal.fire(
        'Bienvenue !',
        'Mon portfolio est à votre disposition et évolue au fil des jours.<br>J\'attends votre appel 🙂<br><br>Mon téléphone : 06 62 43 09 40 📱',
        'info'
    )
}

// if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    let scriptDesktop = document.createElement("script");
    scriptDesktop.setAttribute("src", "js/desktop.js");
    document.body.appendChild(scriptDesktop);
// }

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#200122', '#6f0000'],
                ['#000000', '#434343'],
                ['#0F2027', '#203A43']
            ]
        }
    }
});


let checkbox = document.querySelector("header nav input")
checkbox.checked = false;
let nav = document.querySelectorAll("header li a ,header img")

nav.forEach(element => {
    element.addEventListener('click', function () {
        document.body.style.overflowY = "";
        let name = document.querySelector('#' + element.name)

        if (window.innerWidth < 700) {
            checkbox.checked = false;
        }

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
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "";
    }
});

let fullscreenProjet = document.querySelector("#fullscreenProjet")

function openNav(id) {
    let thisuse = document.getElementById("fullscreenProjet").querySelector("div:not(.hidden).ndhidden");
    let projtogg = document.getElementById(id.id);
    if (thisuse !== null) {
        thisuse.classList.toggle("hidden");
    };

    projtogg.classList.toggle("hidden");
    document.body.style.overflowY = "hidden";
    fullscreenProjet.style.width = "100%";
}

function closeNav() {
    document.body.style.overflowY = "";
    fullscreenProjet.style.width = "0%";
}

var elmssplide = document.getElementsByClassName('splide');
for (var i = 0, len = elmssplide.length; i < len; i++) {
    new Splide(elmssplide[i]).mount();
}

function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "baptisteageron@gmail.com",
	Password : "walexs747474",
	To : 'baptisteageron@gmail.com',
	From : "baptisteageron@gmail.com",
	Subject : "yes",
	Body : "ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
	}).then(
		message => alert("Email envoyé")
	);
}