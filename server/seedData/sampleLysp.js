const remDays = (days) => {
  var someDate = new Date()
  someDate.setDate(someDate.getDate() - days)
  return someDate
}

const sampleLysp = [
  {
    auth: 'test',
    log: [
      {
        title: 'Tacos',
        date: remDays(4),
      },
      {
        title: 'Hardboiled Eggs',
        date: remDays(3),
      },
      {
        title: 'Spaghetti',
        date: remDays(2),
      },
      {
        title: 'Watermelon',
        date: remDays(1),
      },
      {
        title: 'Curry',
        date: remDays(1),
      },
      {
        title: 'Refried Beans',
      },
    ],
  },
  {
    auth: 'test2',
    log: [
      {
        title: 'Heuvos rancheros',
        date: remDays(4),
      },
      {
        title: '火锅',
        date: remDays(3),
      },
      {
        title: 'Aïoli',
        date: remDays(2),
      },
      {
        title: 'برتقال',
        date: remDays(1),
      },
      {
        title: 'Riz au gras',
        date: remDays(1),
      },
      {
        title: 'ᐃᓄᑦᑐᑦ',
      },
    ],
  },
]

export default sampleLysp
