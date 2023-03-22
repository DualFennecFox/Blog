/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/
const blob = document.getElementById("blob");
const box = document.getElementById("box");
let colorMode = document.getElementsByClassName("color-replacement");
const images = document.getElementById("images");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

window.onload = () => {
let cmode = getCookie("dark-mode");
if (cmode == "") setCookie("dark-mode", "false", 365);


if (cmode == "true") {
    document.body.style.backgroundColor = "#000";

    for (var i = 0; i < colorMode.length; i++) {
        colorMode[i].style.color = "#fff";
}
}
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    
    let expires = "expires=" + d.toUTCString();

    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
document.getElementById("welcome").onpointerover = event => {
    let iterations = 0;
    const interval = setInterval(() => {
    event.target.innerText = event.target.innerText.split("")
    .map((letter, index) => {
        if(index < iterations) {
            return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)]
        })
        .join("");

    if(iterations > event.target.dataset.value.length) { clearInterval(interval) }

    iterations += 1 / 3;
    }, 30)
}

window.onmousemove = event => {
    const { clientX, clientY } = event;
    
    blob.animate({
        left: `${clientX}px`,
        top:`${clientY + window.scrollY}px`
    }, { duration: 3000, fill: "forwards" });

	if(! navigator.userAgent.match(/Android/i) &&
            ! navigator.userAgent.match(/webOS/i) &&
            ! navigator.userAgent.match(/iPhone/i) &&
            ! navigator.userAgent.match(/iPod/i) &&
            ! navigator.userAgent.match(/iPad/i) &&
            ! navigator.userAgent.match(/Blackberry/i) )
    {
    if(images.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(images.dataset.mouseDownAt) - event.clientX,
        maxDelta = window.innerWidth / 2;
    
        if(!mouseDelta) return;
        
    let percentage = (mouseDelta / maxDelta) * 100,
        nextPercentage = parseFloat(images.dataset.prevPercentage) + percentage;

    if (nextPercentage >= 0) nextPercentage = Math.min(nextPercentage, 0);
    if (nextPercentage <= -100) nextPercentage = Math.max(nextPercentage, -100);
    images.dataset.percentage = nextPercentage;

    images.animate({
        transform: `translate(${nextPercentage}%, 50%)`
    }, { duration: 1200, fill: "forwards"})

	for(const image of images.getElementsByClassName("image")) {
		image.animate({
			objectPosition: `${nextPercentage + 100}% 50%`
		}, { duration:1200, fill: "forwards" })
	}
	}
}

window.onmousedown = e => {
    images.dataset.mouseDownAt = e.clientX;

}

window.onmouseup = () => {
    images.dataset.mouseDownAt = "0";
    images.dataset.prevPercentage = images.dataset.percentage;
}

box.onclick = () => {
	let color = "";
    let mode = getCookie("dark-mode");
    if (mode == "") setCookie("dark-mode", "false", 365);
    if (!colorMode) colorMode = document.getElementsByClassName("color-replacement");

	if (mode == "false") { backgroundColor = "#000"; color = "#fff"; setCookie("dark-mode", "true", 365); }
	else { backgroundColor = "#fff"; color = "#000"; setCookie("dark-mode", "false", 365); }
    
    document.body.style.backgroundColor = backgroundColor;

	for (var i = 0; i < colorMode.length; i++) {
        colorMode[i].style.color = color;
	}
}

$('img').attr('draggable', false);