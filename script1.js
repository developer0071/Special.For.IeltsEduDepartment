document.addEventListener("DOMContentLoaded", () => {
  const halloweenContainer = document.querySelector('.halloween-container');
  const audio = document.getElementById('bg-audio');
  const startBtn = document.getElementById('start-btn');

  if (!halloweenContainer) return console.error("Missing .halloween-container element.");
  if (!audio) return console.error("Missing #bg-audio element.");
  if (!startBtn) return console.error("Missing #start-btn element.");

  // 🎵 Track list — make sure paths are correct relative to this HTML file
  const tracks = [
    "INSANE (A Hazbin Hotel Song) - Black Gryph0n & Baasik.mp3",
    "littlenightmares.mp3",
    "halloween_theme.mp3"
  ];

  // Utility to pick random index
  const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

  // Set one random track and load it into the audio element
  function setRandomTrack() {
    const idx = randomIndex(tracks);
    const chosen = tracks[idx];
    // Remove existing <source> children to avoid conflicts
    while (audio.firstChild) audio.removeChild(audio.firstChild);

    // Use audio.src + load() — reliable approach
    audio.src = chosen;
    audio.load();
    console.log("Chosen track:", chosen);
    return chosen;
  }

  // Create one halloween emoji element
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

  // start/stop control and interval guard
  let rainIntervalId = null;

  function startHalloween() {
    if (rainIntervalId === null) {
      rainIntervalId = setInterval(createHalloweenItem, 400);
    }

    // Set and play a random track
    const chosen = setRandomTrack();

    // Attempt to play — must be triggered in user gesture (click), so this should work
    audio.play()
      .then(() => console.log("Playing:", chosen))
      .catch(err => {
        console.warn("Playback failed (autoplay policy or file issue):", err);
        // In some cases the browser requires a user gesture; we are already in a click handler though.
      });

    // Remove the start button (or hide it)
    startBtn.remove();
  }

  // When a track ends, pick another random one and play it (keeps music going)
  audio.addEventListener('ended', () => {
    const next = setRandomTrack();
    audio.play().then(() => console.log("Now playing next:", next))
      .catch(err => console.warn("Could not play next track:", err));
  });

  // Helpful debug: show file load errors
  audio.addEventListener('error', (e) => {
    console.error("Audio element error event:", e);
    const mediaErr = audio.error;
    if (mediaErr) console.error("MediaError code:", mediaErr.code, "message:", mediaErr.message);
  });

  // Finally attach click handler
  startBtn.addEventListener('click', startHalloween);
});
