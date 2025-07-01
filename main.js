
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fallContainer');

  if (!Array.isArray(faelle)) {
    container.innerHTML = '<p>⚠️ Fehler: Keine Fälle geladen.</p>';
    return;
  }

  faelle.forEach((fall, index) => {
    const fallBox = document.createElement('div');
    fallBox.style.border = '1px solid #ccc';
    fallBox.style.padding = '1rem';
    fallBox.style.marginBottom = '1rem';

    fallBox.innerHTML = `
      <h2>Fall ${index + 1}: ${fall.titel}</h2>
      <p>${fall.beschreibung}</p>
      ${fall.bild ? `<img src="${fall.bild}" alt="Bild zu Fall ${index + 1}">` : ''}
    `;

    container.appendChild(fallBox);
  });
});
