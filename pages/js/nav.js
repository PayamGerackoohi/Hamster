const navEl = document.getElementById('nav')
const contentEl = document.getElementById('content')

const page = navEl.getAttribute('page')
const isIndexPage = page === 'index'
let isNavOpen = isIndexPage
const dir = isIndexPage ? 'pages/' : ''

const navItems = [
  {
    name: 'Calculator',
    ref: 'calculator.html'
  },
  {
    name: 'Cipher',
    ref: 'cipher.html'
  },
  {
    name: 'Combo',
    ref: 'combo.html'
  },
  {
    name: 'Puzzle',
    ref: 'puzzle-2024-07-25.html'
  },
]

makeNav()

function makeNav() {
  makeNavButton()
  isNavOpen && navEl.setAttribute('open', '')
  navItems.forEach(({ name, ref }) => {
    const pEl = navEl.appendChild(document.createElement('p'))
    pEl.innerHTML = name
    if (name === page)
      pEl.className = 'active'
    else
      pEl.onclick = () => location.replace(dir + ref)
  })
}

function makeNavButton() {
  const divEl = document.body.appendChild(document.createElement('div'))
  divEl.id = 'nav-button'
  isNavOpen && divEl.setAttribute('nav-open', '')
  divEl.onclick = () => {
    if (navEl.hasAttribute('open')) {
      navEl.removeAttribute('open')
      divEl.removeAttribute('nav-open')
    } else {
      navEl.setAttribute('open', '')
      divEl.setAttribute('nav-open', '')
    }
  }
  const contentEl = divEl.appendChild(document.createElement('div'))
  contentEl.textContent = '≡'
}
