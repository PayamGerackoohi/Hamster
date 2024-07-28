contentEl.innerHTML = makeContent();

function makeContent() {
  let content = [];
  content.push('<h1>Rocky Rabbit</h1>');
  content.push('<h2>Supersets</h2>');
  content.push('<div style="width:fit-content;">');
  if (cardData.ul)
    content.push(`  ${cardData.ul}`);
  content.push(`  <img src="${cardData.img}">`);
  content.push('</div>');
  content.push('<h2>Enigma</h2>');
  content.push('<div>');
  content.push(`  <img src="${enigmaData.link}">`);
  content.push('</div>');
  return content.join('');
}
