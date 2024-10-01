gestisce il riempimento della barra di imput-range
const rangeInput = document.getElementById("progress-bar");

rangeInput.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #1ed760 ${value}%, #404040 ${value}%)`;
});

// audio.src = firstTrackPreview;
// audio.load()
