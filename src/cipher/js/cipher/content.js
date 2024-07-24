contentEl.innerHTML = `
<table>
  <thead>
    <th>Letter</th>
    <th>Morse</th>
  </thead>
  <tbody>
    ${makeTableBody()}
  </tbody>
</table>`;
function makeTableBody() {
  return data
    .map(it => `<tr><td>${it.c}</td><td>${it.m}</td></tr>`)
    .join('')
}
