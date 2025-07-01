
let aktuellerFallIndex = 0;
let punkte = 0;

function zeigeFall(index) {
  const container = document.getElementById('fallContainer');
  const fall = faelle[index];

  container.innerHTML = `
    <h2>${fall.titel}</h2>
    <p><strong>Untersuchung:</strong> ${fall.untersuchung}</p>
    <p><strong>Region:</strong> ${fall.region}</p>
    <p>${fall.beschreibung}</p>
    <img src="${fall.bild}" alt="Bild zum Fall" />
    <p><strong>Was ist die Diagnose?</strong></p>
    <input type="text" id="eingabeDiagnose" placeholder="Diagnose eingeben..." />
    <p><strong>Theoretische Frage:</strong> ${fall.theorie}</p>
    <input type="text" id="eingabeTheorie" placeholder="Antwort eingeben..." />
    <br><br>
    <button onclick="prüfen()">Antwort prüfen</button>
    <div id="feedback"></div>
  `;
}

function prüfen() {
  const fall = faelle[aktuellerFallIndex];
  const diagnoseInput = document.getElementById('eingabeDiagnose').value.trim().toLowerCase();
  const theorieInput = document.getElementById('eingabeTheorie').value.trim().toLowerCase();

  const korrektDiagnose = fall.richtigeDiagnose.trim().toLowerCase();
  const korrektTheorie = fall.richtigeTheorie.trim().toLowerCase();

  let feedback = "";
  let lokalScore = 0;

  if (diagnoseInput === korrektDiagnose) {
    feedback += "<p>✅ Diagnose korrekt!</p>";
    lokalScore += 1;
  } else {
    feedback += `<p>❌ Diagnose falsch. Richtig wäre: <strong>${fall.richtigeDiagnose}</strong></p>`;
  }

  if (theorieInput === korrektTheorie) {
    feedback += "<p>✅ Theorie korrekt!</p>";
    lokalScore += 1;
  } else {
    feedback += `<p>❌ Theorie falsch. Richtig wäre: <strong>${fall.richtigeTheorie}</strong></p>`;
  }

  punkte += lokalScore;
  document.getElementById('feedback').innerHTML = feedback;
  document.getElementById('scoreAnzeige').innerText = `Gesamtscore: ${Math.round((punkte / (faelle.length * 2)) * 100)}%`;
}

function naechsterFall() {
  if (aktuellerFallIndex < faelle.length - 1) {
    aktuellerFallIndex++;
    zeigeFall(aktuellerFallIndex);
  }
}

function vorherigerFall() {
  if (aktuellerFallIndex > 0) {
    aktuellerFallIndex--;
    zeigeFall(aktuellerFallIndex);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  zeigeFall(aktuellerFallIndex);
});
