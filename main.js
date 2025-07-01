let aktuellerFall = 0;
let beantworteteFragen = {};

function zeigeFall() {
  const container = document.getElementById('fallContainer');
  container.innerHTML = '';
  const fall = faelle[aktuellerFall];
  let html = `<img src="${fall.bild}" alt="Fallbild" style="max-width:100%"><br/>`;
  fall.fragen.forEach((f, i) => {
    const id = \`\${aktuellerFall}-\${i}\`;
    html += `
      <div class="frage">\${f.frage}</div>
      <input class="antwort" type="text" data-index="\${i}" id="\${id}" oninput="checkAntwort(event, \${aktuellerFall}, \${i})">
    `;
  });
  container.innerHTML = html;
}

function checkAntwort(e, fallIndex, frageIndex) {
  const eingabe = e.target.value.trim().toLowerCase();
  const korrekt = faelle[fallIndex].fragen[frageIndex].antwort.toLowerCase();
  const id = \`\${fallIndex}-\${frageIndex}\`;

  if (eingabe === korrekt) {
    e.target.style.backgroundColor = '#d4edda';
    beantworteteFragen[id] = true;
  } else {
    e.target.style.backgroundColor = '#f8d7da';
    beantworteteFragen[id] = false;
  }
  updateScore();
}

function updateScore() {
  const total = faelle.length * 4; // 4 Fragen pro Fall
  const richtig = Object.values(beantworteteFragen).filter(v => v).length;
  const score = Math.round((richtig / total) * 100);
  document.getElementById('scoreAnzeige').innerText = \`Gesamtscore: \${score}%\`;
}

function vorherigerFall() {
  if (aktuellerFall > 0) {
    aktuellerFall--;
    zeigeFall();
  }
}

function naechsterFall() {
  if (aktuellerFall < faelle.length - 1) {
    aktuellerFall++;
    zeigeFall();
  }
}

zeigeFall();
