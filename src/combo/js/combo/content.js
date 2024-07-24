contentEl.innerHTML = `
<table>
  <thead>
    <th>Group</th>
    <th>Card</th>
  </thead>
  <tbody>
    ${makeTableBody()}
  </tbody>
</table>`;
function makeTableBody() {
  return data.map(it => `<tr><td>${it.group}</td><td>${it.card}</td></tr>`).join('')
}
