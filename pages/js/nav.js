const navEl = document.getElementById('nav')
const contentEl = document.getElementById('content')

const page = navEl.getAttribute('page')
const isIndexPage = page === 'index'
let isNavOpen = isIndexPage
const dir = isIndexPage ? 'pages/' : ''
const headers = page.split('->').slice(0, -1).map(h => h.trim())

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
  // {
  //   name: 'Puzzle',
  //   items: [
  //     {
  //       name: 'Solution',
  //       ref: 'puzzle-solution.html'
  //     },
  //     {
  //       name: 'Practice',
  //       ref: 'puzzle-practice.html'
  //     },
  //   ],
  // },
  {
    name: 'Rocky Rabbit',
    ref: 'rabbit.html'
  },
]

makeNav()

function makeNav() {
  makeNavButton()
  isNavOpen && navEl.setAttribute('open', '')
  navItems.forEach(item => makeNavItem(navEl, item))

  function makeNavItem(parent, { name, ref, items }, prefix = '', depth = 0) {
    const fullName = `${prefix}${prefix.length === 0 ? '' : ' -> '}${name}`
    if (items)
      makeGroup()
    else
      makeItem()

    function makeItem() {
      const pEl = parent.appendChild(document.createElement('p'))
      pEl.innerHTML = `${'    '.repeat(depth)}${name}`
      if (fullName === page)
        pEl.setAttribute('active', '')
      else
        pEl.onclick = () => location.replace(dir + ref)
    }
    function makeGroup() {
      const divEl = parent.appendChild(document.createElement('div'))
      const pEl = divEl.appendChild(document.createElement('p'))
      pEl.className = 'expandable-button'
      pEl.innerHTML = `${'    '.repeat(depth)}${name}`
      const itemsEl = divEl.appendChild(document.createElement('div'))

      itemsEl.className = 'expandable'
      items.forEach(item => makeNavItem(itemsEl, item, fullName, depth + 1))
      pEl.onclick = toggleGroup
      if (headers.includes(name)) {
        disableTransition(itemsEl)
        toggleGroup()
        setTimeout(() => enableTransition(itemsEl))
      }

      function enableTransition(expandableEl) {
        expandableEl.removeAttribute('no-transition')
      }
      function disableTransition(expandableEl) {
        expandableEl.setAttribute('no-transition', '')
      }
      function toggleGroup() {
        if (pEl.hasAttribute('expanded')) {
          pEl.removeAttribute('expanded')
          itemsEl.style.maxHeight = null
        } else {
          pEl.setAttribute('expanded', '')
          itemsEl.style.maxHeight = itemsEl.scrollHeight + 'px'
        }
      }
    }
  }
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
