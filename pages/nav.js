const navEl = document.getElementById('nav')
const page = navEl.getAttribute('page')
const dir = (page === 'index') ? 'pages/' : ''

const navItems = [
  {
    id: 'cipher',
    label: 'Cipher',
    ref: 'cipher.html'
  },
  {
    id: 'combo',
    label: 'Combo',
    ref: 'combo.html'
  },
  {
    id: 'hamster-calculator',
    label: 'Hamster<br>Calculator',
    ref: 'hamster-calculator.html'
  },
  {
    id: 'puzzle',
    label: 'Puzzle<br>2024-07-24',
    ref: 'puzzle-2024-07-24.html'
  },
]

navItems.forEach(navItem => {
  const pEl = navEl.appendChild(document.createElement('p'))
  pEl.innerHTML = navItem.label
  if (navItem.id === page)
    pEl.className = 'active'
  else
    pEl.onclick = () => location.replace(dir + navItem.ref)
})
