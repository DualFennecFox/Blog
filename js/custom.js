/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/
const blob = document.getElementById("blob");
const box = document.getElementById("box");
const colorMode = document.getElementsByClassName("color-replacement")
const images = document.getElementById("images");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let click = 0;

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

window.onpointermove = event => {
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
		images.style.left = "50%";
    if(images.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(images.dataset.mouseDownAt) - event.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100,
        nextPercentage = parseFloat(images.dataset.prevPercentage) + percentage;

    if (nextPercentage >= 0) nextPercentage = Math.min(nextPercentage, 0);
    if (nextPercentage <= -100) nextPercentage = Math.max(nextPercentage, -100);

    images.dataset.percentage = nextPercentage;

    images.animate({
        transform: `translate(${nextPercentage}%, 50%)`
    }, { duration: 1200, fill: "forwards"})

	for(const image of images.getElementsByClassName("image")) {
		image.animate({
			objectPosition: `${nextPercentage + 100}% 0%`
		}, { duration:1200, fill: "forwards" })
	}
	}
}

window.onpointerdown = e => {
    images.dataset.mouseDownAt = e.clientX;

}

window.onpointerup = () => {
    images.dataset.mouseDownAt = "0";
    images.dataset.prevPercentage = images.dataset.percentage;
}

box.onclick = () => {
	let color = "";
	if (click == 0) { backgroundColor = "#000"; color = "#fff"; click = 1; }
	else { backgroundColor = "#fff"; color = "#000"; click = 0; }
    
    document.body.style.backgroundColor = backgroundColor;

	for (var i = 0; i < colorMode.length; i++) {
        colorMode[i].style.color = color;



	}
}

$('img').attr('draggable', false);