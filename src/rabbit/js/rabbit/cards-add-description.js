const fs = require('fs')
const vm = require('vm')

const cardList = [
  'Flexibility Training',
  'Nutrition',
  'Motivation and Su...',
]

const cards = {
  'Fighter': {
    'Upgrade': {
      'Diet': [
        'Nutrition',
        'Supplements',
      ],
      'Training': [
        'Warm Up',
        'Technical Training',
        'Strength and Endurance Training',
        'Endurance Training',
        'Flexibility Training',
        'Mental Training',
      ],
    },
    'Claim': {
      'Nutrition': [
        'Breakfast',
        'Morning Snack',
        'Lunch',
        'Lunch Break',
        'Dinner',
      ],
      'Supplements': [
        'Morning',
        'Afternoon',
        'Before Workout',
        'After Workout',
        'Before Bed',
      ],
      'Warm Up': [
        'Jump Rope',
        'Stretching',
      ],
      'Technical Training': [
        'Bag Work Training',
        'Pad Work Training',
        'Shadow Boxing Training',
      ],
      'Strength and Endurance Training': [
        'Bodyweigth Training',
        'Weightlifting',
        'Running',
      ],
      'Endurance Training': [
        'High-Intensity Interval Training',
        'Yoga and Pilates',
      ],
      'Flexibility Training': [
        'Advanced Stretching',
        'Meditation',
      ],
      'Mental Training': [
        'Visualisation Training',
      ],
    },
    'Venture': [
      'Level Up with a Manager',
      'Invest in Startups, Grow Wealth',
      'Charity Tournament!',
      {
        'Health': [
          'Live Fitness Classes',
          'Launching a Fitness Blog',
        ],
      },
      {
        'Finance': [
          'Insurance Planning',
          'Financial Planning',
        ],
      },
      {
        'Media': [
          'Brand Endorsements',
          'Sponsoership Deals',
        ],
      },
      {
        'Opportunity': [
          'Offering Nutrition Consulting',
        ],
      },
    ],
  },
  'Coach': {
    'Upgrade': [
      'Teaching Basic Techniques',
      'Physical Training',
      'Technical Training',
      'Combination Training',
      'Defensive Training',
      'Sparring',
      'Supervision and Evaluation',
      'Motivation and Support',
      'Competition Preparation',
      'Flexibility Training Coach',
    ],
    'Claim': {
      'Teaching Basic Techniques': [
        'Punching Practice',
        'Kicking Practice',
      ],
      'Physical Training': [
        'Warm Up',
        'Endurance Practice',
        'Strength Practice',
      ],
      'Technical Training': [
        'Punching Bag Practice',
        'Pad Work Practice',
        'Shadow Boxing Practice',
      ],
      'Combination Training': [
        'MMA Practice',
      ],
      'Defensive Training': [
        'Blocking Practice',
        'Dodging Practice',
        'Counter-Attack Prevention Practice',
      ],
      'Sparring': [
        'Combat Practice',
        'Tactical Practice',
      ],
      'Supervision and Evaluation': [
        'Evaluating Progress',
        'Training Plans',
      ],
      'Motivation and Support': [
        'Motivational Practice',
        'Psychological Support Practice',
      ],
      'Competition Preparation': [
        'Specialized Practice',
        'Competition Strategies',
      ],
      'Flexibility Training': [
        'Yoga and Pilates',
        'Stretching Exercises',
      ],
    },
  },
  'Tournaments': [
    'Newcomer Tournament',
    'Freshman Tournament',
    'Ember Tournament',
    'Specter Tournament',
    'Enigma Tournament',
    'Arcane Tournament',
    'Apex Tournament',
    'Vanguard Tournament',
    'Zenith Tournament',
    'Titan Tournament',
  ],
}

addDescription()

function addDescription() {
  const text = fs.readFileSync('cards-data.js').toString()
  let cardData = vm.runInNewContext(text + ';cardData')
  if (!cardData.description) {
    cardData.description = getDescription()
    cardData.isRtl = false
  }
  fs.writeFileSync(
    'cards-data-with-description.js',
    `const cardData = ${JSON.stringify(cardData, null, 2)}`
  )
}

function getDescription() {
  const list = cardList.map(card => card.toLowerCase())
  let result = []
  expand(cards)
  return `<ul>${result
    .sort((a, b) => a.index - b.index)
    .map(r => `<li>${r.value}</li>`)
    .join('')
    }</ul>`

  function expand(obj, prefix = '') {
    switch (typeof obj) {
      case 'string':
        const item = obj.toLocaleLowerCase()
        const index = list.findIndex(i => {
          if (i.endsWith('...'))
            return item.startsWith(i.substring(0, i.length - 3))
          else
            return i === item
        })
        if (index !== -1)
          result.push({ index, value: `${prefix} > ${obj}` })
        break;
      case 'object':
        if (Array.isArray(obj))
          for (o of obj)
            expand(o, prefix)
        else
          for (o in obj)
            expand(obj[o], `${prefix ? `${prefix} > ` : ''}${o}`)
        break;
      default:
        console.log(`Illegal - ${obj}`)
    }
  }
}
