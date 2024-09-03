const fs = require('fs')
const vm = require('vm')

const cardList = [
  'level up with a m...',
  'insurance planning...',
  'pad work prac...',
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
          'Speaking at Fitness Conferences',
        ],
      },
      {
        'Finance': [
          'Insurance Planning',
          'Financial Planning',
          'Venture Capital Investments',
          'Real Estate Investment',
        ],
      },
      {
        'Media': [
          'Brand Endorsements',
          'Sponsorship Deals',
          'Book Publishing',
          'YouTube Channel Creation',
        ],
      },
      {
        'Opportunity': [
          'Offering Nutrition Consulting',
          'Creating Fitness and Wellness Festivals',
        ],
      },
      {
        'Business': [
          'Developing a Nutrition Brand',
          'Hosting Branded Fitness Events',
          'Developing a Signature Porduct Line',
        ]
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

console.log(JSON.stringify(getDescription(), null, 2))

function getDescription() {
  const list = cardList.map(card => card.toLowerCase())
  let result = []
  expand(cards)
  return result
    .sort((a, b) => a.index - b.index)
    .map(r => r.value)

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
