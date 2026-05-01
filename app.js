document.addEventListener('DOMContentLoaded', () => {
    const salamTextContainer = document.querySelector('.salamTextContainer');
    const nameContainer = document.querySelector('.name');
    const jobTitleContainers = document.querySelectorAll(".jobTitleContainer");
    const jobTitles = document.querySelectorAll(".jobTitle");
    const projects = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projectsTitle');
    const salamImg = document.getElementById('salamImg');
    const hintButton = document.getElementById('hintButton');
    const hintMessage = document.getElementById('hintMessage');

    function handleMove(e) {
        const githubContainer = document.querySelector('.githubContainer');
        if (!githubContainer || !githubContainer.contains(e.target)) return;

        const eyesContainer = document.querySelector('.eyes');
        const eyes = document.querySelectorAll('.eyes > div');
        if (!eyesContainer || eyes.length !== 2) return;

        const { left, top, width, height } = eyesContainer.getBoundingClientRect();
        const containerCenterX = left + width / 2;
        const containerCenterY = top + height / 2;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const angle = Math.atan2(clientY - containerCenterY, clientX - containerCenterX);
        const distance = Math.min(
            eyes[0].offsetWidth / 4,
            Math.sqrt(Math.pow(clientX - containerCenterX, 2) + Math.pow(clientY - containerCenterY, 2))
        );

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        eyes.forEach(eye => {
            const eyeBall = eye.querySelector('i');
            eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    function handleScroll() {
        const offsetY = window.scrollY;
        salamTextContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
        nameContainer.style.transform = `translateX(${offsetY * 0.3 - 50}px)`;
        jobTitleContainers[0].style.backgroundPositionY = `${offsetY * 0.5}px`;
        jobTitleContainers[1].style.backgroundPositionY = `${-offsetY * 0.5}px`;
        jobTitles[0].style.transform = `translateX(calc(200vh - ${offsetY}px))`;
        jobTitles[1].style.transform = `translateX(calc(-300vh + ${offsetY}px))`;

        const top = window.scrollY;
        const offset = projects.offsetTop - 600;
        const height = projects.offsetHeight;

        projectsTitle.classList.toggle('show-animate', top >= offset && top < offset + height);
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);

    window.addEventListener('scroll', handleScroll);

    let isHappyDog = false;
    salamImg.addEventListener('click', () => {
        if (isHappyDog) {
            salamImg.src = './public/img/dogline.png';
        } else {
            salamImg.src = './public/img/happydog.png';
        }
        isHappyDog = !isHappyDog;
    });


    hintButton.addEventListener('click', () => {
        hintMessage.classList.remove('hidden');
    });


    const canvas = document.getElementById('scratchCard');
    const ctx = canvas.getContext('2d');
    const scratchText = document.getElementById('scratchText');
    let isDrawing = false;

    function drawBarcode() {
        const lineWidth = 5;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < canvas.width; i += lineWidth * 2) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(i, 0, lineWidth, canvas.height);
        }
    }

    drawBarcode();

    function startDrawing() {
        isDrawing = true;
    }

    function stopDrawing() {
        isDrawing = false;
        checkScratchCompletion();
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing();
    });
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });

    function checkScratchCompletion() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let scratchedPixels = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                scratchedPixels++;
            }
        }
        const scratchedPercentage = (scratchedPixels / (canvas.width * canvas.height)) * 100;
        if (scratchedPercentage > 50) {
            scratchText.classList.remove('hidden');
        }
    }
});