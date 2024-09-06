const entriesData = [
  {
    id: 1,
    name: "Aj",
    phoneNumber: "5593659522",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 2,
    name: "Alan Black",
    phoneNumber: "7346121090",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 3,
    name: "Andrew Weisner",
    phoneNumber: "4086160796",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 4,
    name: "Ankit Sharma",
    phoneNumber: "2149266722",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 5,
    name: "Brett Duboff",
    phoneNumber: "6176699751",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 6,
    name: "BRONKY ",
    phoneNumber: "8457754342",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 7,
    name: "Dustin",
    phoneNumber: "8179888185",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 8,
    name: "Bubba",
    phoneNumber: "8435679045",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 9,
    name: "chinchillachimcheroo",
    phoneNumber: "888-888-8888",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 10,
    name: "Cody",
    phoneNumber: "1234589010",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 11,
    name: "Daniel Householder",
    phoneNumber: "5082544549",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 12,
    name: "Dante",
    phoneNumber: "3609273007",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 13,
    name: "Darius",
    phoneNumber: "9546996253",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 14,
    name: "David K",
    phoneNumber: "8305606165",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 15,
    name: "David Mariano",
    phoneNumber: "+1 209-756-6464",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Arizona Cardinals","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Jacksonville Jaguars","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 16,
    name: "Dezcaughtit",
    phoneNumber: "3252348126",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 17,
    name: "DGF",
    phoneNumber: "1234567890",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 18,
    name: "Doug Blesener",
    phoneNumber: "6122956172",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 19,
    name: "Erik ",
    phoneNumber: "2092618446",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 20,
    name: "Fernando ",
    phoneNumber: "2096588964",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions"}
  },
  {
    id: 21,
    name: "G",
    phoneNumber: "88888888",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 22,
    name: "Hgg",
    phoneNumber: "35884588855",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 23,
    name: "Rand Lichtman",
    phoneNumber: "(703) 939-1106",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 24,
    name: "James McAllister",
    phoneNumber: "(330) 257-6535",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 25,
    name: "Jean ALPHONSE",
    phoneNumber: "845-775-4342",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 26,
    name: "Jimmy",
    phoneNumber: "9027173553",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Arizona Cardinals","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 27,
    name: "JJ",
    phoneNumber: "5138016267",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Washington Commanders","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 28,
    name: "Jose Romero ",
    phoneNumber: "9094419399",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"New York Giants","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 29,
    name: "Kevin Mendoza",
    phoneNumber: "(951) 318-7953",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Arizona Cardinals","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 30,
    name: "Kevin Vieira",
    phoneNumber: "9167188911",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Washington Commanders","15":"Detroit Lions"}
  },
  {
    id: 31,
    name: "Kyle Johnson",
    phoneNumber: "6666666666",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 32,
    name: "Mario Arceo ",
    phoneNumber: "2098516101",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams"}
  },
  {
    id: 33,
    name: "Mark C",
    phoneNumber: "407015643",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Arizona Cardinals","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 34,
    name: "Ocha905",
    phoneNumber: "412345678",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Jacksonville Jaguars","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 35,
    name: "phishhd333",
    phoneNumber: "7655206799",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 36,
    name: "Richard Walker",
    phoneNumber: "3042830057",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Washington Commanders","15":"Los Angeles Rams","16":"New York Jets"}
  },
  {
    id: 37,
    name: "Ricky Mosby",
    phoneNumber: "8127737556",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Arizona Cardinals","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Indianapolis Colts","8":"Miami Dolphins","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"New York Jets"}
  },
  {
    id: 38,
    name: "Rico ",
    phoneNumber: "3529296236",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Arizona Cardinals","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 39,
    name: "Roy",
    phoneNumber: "6155161854",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"New York Jets"}
  },
  {
    id: 40,
    name: "ryan martyn",
    phoneNumber: "9145229046",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Las Vegas Raiders","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Los Angeles Rams","16":"New York Jets"}
  },
  {
    id: 41,
    name: "Sabby",
    phoneNumber: "5599081106",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Denver Broncos","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 42,
    name: "Sean Golbad",
    phoneNumber: "(209) 382-5938",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Arizona Cardinals","5":"Tennessee Titans","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Dallas Cowboys","14":"Washington Commanders","15":"Los Angeles Rams","16":"San Francisco 49ers"}
  },
  {
    id: 43,
    name: "Shook",
    phoneNumber: "7575827771",
    picks: {"1":"Kansas City Chiefs","2":"Green Bay Packers","3":"Atlanta Falcons","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"New York Giants","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Washington Commanders","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 44,
    name: "Sian",
    phoneNumber: "6093739214",
    picks: {"1":"Kansas City Chiefs","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Denver Broncos","13":"Dallas Cowboys","14":"Washington Commanders","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 45,
    name: "Steve",
    phoneNumber: "+1 (907) 687-6870",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Cleveland Browns","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  },
  {
    id: 46,
    name: "Test",
    phoneNumber: "1234567890",
    picks: {"1":"Baltimore Ravens","2":"Philadelphia Eagles","3":"Pittsburgh Steelers","4":"Arizona Cardinals","5":"Tennessee Titans","6":"New England Patriots","7":"Houston Texans","8":"Jacksonville Jaguars","9":"Carolina Panthers","10":"Minnesota Vikings","11":"Las Vegas Raiders","12":"Denver Broncos","13":"Dallas Cowboys","14":"Washington Commanders","15":"Los Angeles Rams","16":"New York Jets"}
  },
  {
    id: 47,
    name: "Zachary Bridges",
    phoneNumber: "3183322902",
    picks: {"1":"Baltimore Ravens","2":"Green Bay Packers","3":"Pittsburgh Steelers","4":"Buffalo Bills","5":"Chicago Bears","6":"Cincinnati Bengals","7":"Houston Texans","8":"Miami Dolphins","9":"New Orleans Saints","10":"Minnesota Vikings","11":"Los Angeles Chargers","12":"Seattle Seahawks","13":"Dallas Cowboys","14":"Tampa Bay Buccaneers","15":"Detroit Lions","16":"San Francisco 49ers"}
  }
];

export default entriesData;