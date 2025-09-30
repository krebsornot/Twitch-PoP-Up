window.onload = () => {
  const alertBox = document.getElementById('alertBox');
  const sound = document.getElementById('sound');
  const nameField = document.getElementById('name');

  // Testname (kann später dynamisch ersetzt werden)
  nameField.textContent = "Maya";

  // Sound starten
  sound.volume = 0.8;
  sound.play();

  // Nach 8 Sekunden Popup ausblenden
  setTimeout(() => {
    alertBox.style.transition = "opacity 1s ease, transform 1s ease";
    alertBox.style.opacity = "0";
    alertBox.style.transform = "translateX(-50%) translateY(60px) scale(0.8)";
  }, 8000);
};
