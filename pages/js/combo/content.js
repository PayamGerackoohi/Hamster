// contentEl.innerHTML = `<table><thead><th>Group</th><th>Card</th></thead><tbody>${makeTableBody()}</tbody></table>`; function makeTableBody() { return data.map(it => `<tr><td>${it.group}</td><td>${it.card}</td></tr>`).join('') }

contentEl.innerHTML = `
<img src="https://nobitex.ir/mag/wp-content/uploads//2024/07/photo_2024-07-30_18-53-11-1024x498.jpg">
<ul>
  <li>کارت Fan tokens از بخش Market</li>
  <li>کارت Hamster YouTube Channel از بخش Specials</li>
  <li>کارت  Crypto Farming از بخش Web3</li>
</ul>
`