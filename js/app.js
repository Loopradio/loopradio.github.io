window.onload = function() {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let audioBuffer;
  let audioSource;
  let isPlaying = false;
  const playButton = document.getElementById("play-button");
  const loader = document.getElementById("loader");

  // Mostrar el loader mientras se carga el audio
  loader.style.display = 'block';

  // Function to fetch and decode audio file
  function fetchAndDecodeAudio(url) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(decodedAudioBuffer => {
        audioBuffer = decodedAudioBuffer;
        loader.style.display = 'none'; // Ocultar el loader una vez que el audio esté listo
        playButton.style.display = 'inline-block'; // Mostrar el botón una vez que el audio esté listo
      })
      .catch(error => console.error('Error loading audio file:', error));
  }

  // Load audio file on page load (assuming session_no1.mp3 is in the root directory)
  fetchAndDecodeAudio('session_no1.mp3');

  // Event listener for play button
  playButton.addEventListener('click', function() {
    if (!audioBuffer) return; // Audio not loaded yet

    if (!isPlaying) {
      // Create audio source
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;
      audioSource.loop = true; // Loop audio

      // Get random start time within the duration of the audio
      const randomStartTime = Math.random() * audioBuffer.duration;
      audioSource.connect(audioContext.destination);
      audioSource.start(0, randomStartTime); // Start from a random time

      isPlaying = true;
      playButton.textContent = "Pause Loop Radio";
    } else {
      audioSource.stop();
      isPlaying = false;
      playButton.textContent = "Play Loop Radio";
    }
  });
};
