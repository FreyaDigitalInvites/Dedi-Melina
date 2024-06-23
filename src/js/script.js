document.addEventListener("DOMContentLoaded", function() {
    // Countdown timer
    var countDownDate = new Date("Jul 6, 2024 08:00:00").getTime();
    var countdownFunction = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("akad-days").innerHTML = days + " <br>Hari";
        document.getElementById("akad-hours").innerHTML = hours + " <br>Jam";
        document.getElementById("akad-minutes").innerHTML = minutes + " <br>Menit";
        document.getElementById("akad-seconds").innerHTML = seconds + " <br>Detik";

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("akad-days").innerHTML = "0 <br>Hari";
            document.getElementById("akad-hours").innerHTML = "0 <br>Jam";
            document.getElementById("akad-minutes").innerHTML = "0 <br>Menit";
            document.getElementById("akad-seconds").innerHTML = "0 <br>Detik";
            document.getElementById("message").innerHTML = "The event has started!";
        }
    }, 1000);

    // Fade in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    console.log('Fade elements:', fadeElements);

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element is intersecting:', entry.target);
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        fadeElements.forEach(element => observer.observe(element));
    } else {
        fadeElements.forEach(element => element.classList.add('visible'));
    }

    toggleMusic();
});

function openInvitation() {
    const hero = document.querySelector('.hero');
    const invitationContainer = document.getElementById('invitation-container');
    hero.style.display = 'none';
    
    invitationContainer.style.display = 'block'; 
    invitationContainer.offsetHeight; 
    invitationContainer.classList.add('show');
}

document.getElementById('openInvitationButton').addEventListener('click', openInvitation);

let currentSlide = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.slide');
    currentSlide += n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    const slideWidth = slides[0].clientWidth;
    const newTransform = -currentSlide * slideWidth;
    document.querySelector('.slides').style.transform = `translateX(${newTransform}px)`;
}

setInterval(() => {
    moveSlide(1);
}, 5000);

function copyAccountNumber(elementId) {
    const accountNumberElement = document.getElementById(elementId);
    if (!accountNumberElement) {
        console.error(`Elemen dengan ID ${elementId} tidak ditemukan.`);
        return;
    }
    
    const accountNumber = accountNumberElement.textContent.trim();
    
    const textArea = document.createElement('textarea');
    textArea.value = accountNumber;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    alert(`Nomor rekening ${accountNumber} berhasil disalin!`);
}

function toggleMusic() {
    var music = document.getElementById("weddingMusic");
    var musicButton = document.getElementById("musicButton");
    var musicIcon = document.getElementById("musicIcon");

    if (music.paused) {
        music.play();
        musicButton.classList.add("playing");
        musicIcon.classList.remove("fa-play");
        musicIcon.classList.add("fa-stop");
    } else {
        music.pause();
        musicButton.classList.remove("playing");
        musicIcon.classList.remove("fa-stop");
        musicIcon.classList.add("fa-play");
    }
}

document.getElementById('scrollButton').addEventListener('click', function() {
    const scrollIcon = document.getElementById('scrollIcon');
    const scrollAnchor = this.querySelector('a');

    if (scrollIcon.classList.contains('fa-arrow-down')) {
        scrollAnchor.setAttribute('href', '#end');
        scrollIcon.classList.remove('fa-arrow-down');
        scrollIcon.classList.add('fa-arrow-up');
    } else {
        scrollAnchor.setAttribute('href', '#top');
        scrollIcon.classList.remove('fa-arrow-up');
        scrollIcon.classList.add('fa-arrow-down');
    }
});


document.addEventListener('selectstart', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());

