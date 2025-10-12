
const halloweenContainer = document.querySelector('.halloween-container');
const audio = document.getElementById('bg-audio');
const startBtn = document.getElementById('start-btn');

function createHalloweenItem() {
    const item = document.createElement('div');
    const icons = ['🎃', '👻', '🕷️', '🦇', '💀', '🕸️'];
    const emoji = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 20 + 20;
    const leftPosition = Math.random() * 100;
    const duration = Math.random() * 5 + 5;

    item.classList.add('halloween-item');
    item.textContent = emoji;
    item.style.fontSize = `${size}px`;
    item.style.left = `${leftPosition}vw`;
    item.style.animationDuration = `${duration}s`;
    halloweenContainer.appendChild(item);

    item.addEventListener('animationend', () => item.remove());
}

function startHalloween() {
    // Start spooky effects
    setInterval(createHalloweenItem, 400);
    audio.play();
    startBtn.remove(); // Hide the button
}

startBtn.addEventListener('click', startHalloween);