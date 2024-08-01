contentEl.innerHTML = makeContent();

function makeContent() {
  let content = [];
  content.push('<div class="cards">');
  data.description &&
    content.push(`${data.description}`);
  content.push(`<img src="${data.image}">`);
  content.push('</div>');
  return content.join('');
}
// contentEl.innerHTML = `
// <table>
//   <thead>
//     <th>Group</th>
//     <th>Card</th>
//   </thead>
//   <tbody>
//     ${makeTableBody()}
//   </tbody>
// </table>`;
// function makeTableBody() {
//   return data.map(it => `<tr><td>${it.group}</td><td>${it.card}</td></tr>`).join('')
// }
