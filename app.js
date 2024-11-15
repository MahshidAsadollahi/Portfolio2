const salamTextContainer = document.querySelector('.salamTextContainer');
const nameContainer = document.querySelector('.name');
const jobTitleContainers = document.querySelectorAll(".jobTitleContainer");
const jobTitles = document.querySelectorAll(".jobTitle");
const projects = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projectsTitle');

document.getElementById('hintButton').addEventListener('click', function() {
    const elements = document.querySelectorAll('.catPaw, .fishbone');
    elements.forEach(element => {
        element.style.display = 'block';
    });
});

document.addEventListener('mousemove', (e) => {
    const githubContainer = document.querySelector('.githubContainer');
    if (!githubContainer) return;

    const isInsideContainer = githubContainer.contains(e.target);
    if (!isInsideContainer) return;

    const eyesContainer = document.querySelector('.eyes');
    const eyes = document.querySelectorAll('.eyes > div');
    
    if (!eyesContainer || eyes.length !== 2) return;
    
    const containerRect = eyesContainer.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

    const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
    const distance = Math.min(
        eyes[0].offsetWidth / 4,
        Math.sqrt(Math.pow(e.clientX - containerCenterX, 2) + Math.pow(e.clientY - containerCenterY, 2))
    );

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    eyes.forEach(eye => {
        const eyeBall = eye.querySelector('i');
        eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    const light = document.getElementById('light');
    light.style.top = `${e.pageY - 200}px`;
    light.style.left = `${e.pageX - 100}px`;

    const githubLink = document.querySelector('.githubLink');
    const linkRect = githubLink.getBoundingClientRect();
    const lightRect = light.getBoundingClientRect();

    const lightCenterX = lightRect.left + lightRect.width / 2;
    const lightCenterY = lightRect.top + lightRect.height / 2;
    const linkCenterX = linkRect.left + linkRect.width / 2;
    const linkCenterY = linkRect.top + linkRect.height / 2;

    const distanceBetweenCenters = Math.sqrt(
        Math.pow(lightCenterX - linkCenterX, 2) + Math.pow(lightCenterY - linkCenterY, 2)
    );

    const threshold = 50;

    if (distanceBetweenCenters < threshold) {
        githubLink.classList.add('visible');
    } else {
        githubLink.classList.remove('visible');
    }
});

document.getElementById('woolBall').addEventListener('click', function() {
    const blackboard = document.getElementById('blackboard');
    blackboard.classList.add('drop');
});

document.querySelectorAll('input[name="option"]').forEach((radio) => {
    radio.addEventListener('change', function() {
        const salamImg = document.getElementById('salamImg');
        if (this.value === 'yes') {
            salamImg.src = './public/img/happydog.png';
            document.getElementById('tail').classList.add('animate-tail');
        } else if (this.value === 'no') {
            salamImg.src = './public/img/saddog.png'; 
            document.getElementById('tail').classList.remove('animate-tail');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.close-btn');
    const blackboard = document.querySelector('.blackboard');
    const salamImg = document.querySelector('.salamImg'); 

    function resetRadioButtons() {
        const radioButtons = document.querySelectorAll('input[name="option"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
        document.getElementById('tail').classList.remove('animate-tail');
    }

    closeButton.addEventListener('click', () => {
        blackboard.classList.add('hide');
        salamImg.src = './public/img/dogline.png'; 
        resetRadioButtons(); 
    });

    blackboard.addEventListener('animationend', () => {
        if (blackboard.classList.contains('hide')) {
            blackboard.classList.remove('drop'); 
        }
    });

    document.getElementById('woolBall').addEventListener('click', function() {
        blackboard.classList.remove('hide');
        blackboard.classList.add('drop');
        blackboard.style.visibility = 'visible'; 
    });
});

window.addEventListener('scroll', () => {
    let offsetY = window.scrollY;
    salamTextContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    nameContainer.style.transform = `translateX(${offsetY * 0.3 - 50}px)`;
    jobTitleContainers[0].style.backgroundPositionY = `${offsetY * 0.5}px`;
    jobTitleContainers[1].style.backgroundPositionY = `${-offsetY * 0.5}px`;
    jobTitles[0].style.transform = `translateX(calc(200vh - ${offsetY}px))`;
    jobTitles[1].style.transform = `translateX(calc(-300vh + ${offsetY}px))`;

    let top = window.scrollY;
    let offset = projects.offsetTop - 600;
    let height = projects.offsetHeight;

    if (top >= offset && top < offset + height) {
        projectsTitle.classList.add('show-animate');
    } else {
        projectsTitle.classList.remove('show-animate');
    }
});