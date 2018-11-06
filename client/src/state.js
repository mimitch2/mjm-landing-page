import teamList from "./teams.json"
import cityList from "./cities.json"


export default {
  teamsList: teamList,
  citiesList: cityList,

  defaultData: { 
    weather: {
      include: true,
      cities: [
        {"name":"Austin","cityAsci":"Austin","lat":30.3038,"long":-97.7545,"country":"United States","iso2":"US","iso3":"USA","region":"Texas","capital":"admin","population":1633847,"id":1840019590},
        {"name":"San Jose","cityAsci":"San Jose","lat":37.302,"long":-121.8488,"country":"United States","iso2":"US","iso3":"USA","region":"California","population":1804359,"id":1840021570},
        {"name":"Barcelona","cityAsci":"Barcelona","lat":41.3833,"long":2.1834,"country":"Spain","iso2":"ES","iso3":"ESP","region":"Catalonia","capital":"admin","population":4920000,"id":1724594040}
      ],
    },
    sports: {
      include: true,
      teams: [
        {"idTeam":"134853","idSoccerXML":null,"intLoved":"1","strTeam":"San Jose Sharks","strTeamShort":"SJS","strAlternate":"","intFormedYear":"1991","strSport":"Ice Hockey","strLeague":"NHL","idLeague":"4380","strDivision":null,"strManager":"Doug Wilson","strStadium":"SAP Center at San Jose","strKeywords":null,"strRSS":"","strStadiumThumb":null,"strStadiumDescription":"The SAP Center at San Jose (formerly San Jose Arena, Compaq Center at San Jose and HP Pavilion at San Jose) is an American indoor arena, located in San Jose, California. Its primary tenant is the San Jose Sharks of the National Hockey League, and the arena has been nicknamed the \"Shark Tank\".","strStadiumLocation":"San Jose, California","intStadiumCapacity":"17562","strWebsite":"sharks.nhl.com","strFacebook":"www.facebook.com/SanJoseSharks","strTwitter":"twitter.com/SanJoseSharks","strInstagram":"instagram.com/sanjosesharks","strDescriptionEN":"The San Jose Sharks are a professional ice hockey team based in San Jose, California, United States. They are members of the Pacific Division of the Western Conference of the National Hockey League (NHL). They play their home games at the SAP Center at San Jose, known locally as the Shark Tank. The Sharks were founded in 1991 and were the first NHL franchise based in the San Francisco Bay Area since the California Golden Seals left in 1976. They have won six division titles, but have never won a conference title or the Stanley Cup.","strDescriptionDE":null,"strDescriptionFR":null,"strDescriptionCN":null,"strDescriptionIT":null,"strDescriptionJP":null,"strDescriptionRU":null,"strDescriptionES":null,"strDescriptionPT":null,"strDescriptionSE":null,"strDescriptionNL":null,"strDescriptionHU":null,"strDescriptionNO":null,"strDescriptionIL":null,"strDescriptionPL":null,"strGender":"Male","strCountry":"USA","strTeamBadge":"https://www.thesportsdb.com/images/media/team/badge/vxruup1421877078.png","strTeamJersey":null,"strTeamLogo":"https://www.thesportsdb.com/images/media/team/logo/qptuxv1421877655.png","strTeamFanart1":"https://www.thesportsdb.com/images/media/team/fanart/svyxuq1421877396.jpg","strTeamFanart2":"https://www.thesportsdb.com/images/media/team/fanart/xqwvut1421877590.jpg","strTeamFanart3":null,"strTeamFanart4":null,"strTeamBanner":null,"strYoutube":"www.youtube.com/user/sjsharksofficial","strLocked":"unlocked"},
        {
          idTeam: "134948",
          idSoccerXML: null,
          intLoved: "1",
          strTeam: "San Francisco 49ers",
          strTeamShort: "SF",
          strAlternate: null,
          intFormedYear: "1946",
          strSport: "American Football",
          strLeague: "NFL",
          idLeague: "4391",
          strDivision: null,
          strManager: "",
          strStadium: "Levi's Stadium",
          strKeywords: null,
          strRSS: null,
          strStadiumThumb: null,
          strStadiumDescription: "Levi's Stadium is a football stadium in Santa Clara, California which serves as the current home of the San Francisco 49ers of the National Football League. In 2006, the 49ers initially proposed constructing a new stadium at Candlestick Point in San Francisco, the site of their now-former home, Candlestick Park. The project, which included plans for retail space and housing improvements, was considered to have been of great potential benefit to the nearby historically blighted neighborhood of Hunters Point. After negotiations with the city of San Francisco fell through, the 49ers focused their attention on a site adjacent to their administrative offices and training facility in Santa Clara, a South Bay city adjacent to San Jose. In June 2010, Santa Clara voters approved a measure authorizing the city government to lease land to the 49ers Stadium Authority to construct a new football stadium. The necessary funds were secured in December 2011, allowing construction to start in April 2012. Levi's Stadium opened on July 17, 2014. Levi's Stadium is scheduled to host Super Bowl 50 on February 7, 2016, The 2015 NHL Stadium Series featuring the Los Angeles Kings and the San Jose Sharks on February 21, 2015, and WrestleMania XXXI on March 29, 2015, and will be the new permanent home of college football's annual Foster Farms Bowl. Levi's Stadium will also serve as the site of the Pacific-12 Football Championship Game for at least three years, beginning in 2014. Previously the game was played at the home stadium of the division winner with the better record entering the game.",
          strStadiumLocation: "Santa Clara, California",
          intStadiumCapacity: null,
          strWebsite: "",
          strFacebook: "",
          strTwitter: "",
          strInstagram: null,
          strDescriptionEN: "The San Francisco 49ers are an American football franchise located in the San Francisco Bay Area, that plays in the West Division of the National Football Conference (NFC) in the National Football League (NFL). The team was founded in 1946 as a charter member of the All-America Football Conference (AAFC) and joined the NFL in 1949 after the two leagues merged. The team plays its home games at Levi's Stadium in Santa Clara, California, beginning with the 2014 NFL season, after playing at Candlestick Park in San Francisco from 1971 to 2013. The original home of the 49ers, Kezar Stadium, is within Golden Gate Park in San Francisco. The 49ers are known for having one of the NFL's greatest dynasties, winning five Super Bowl championships in just 14 years, between 1981 and 1994, with four of those championships in the 1980s. The Super Bowl teams were led by Hall of Famers Joe Montana, Jerry Rice, Ronnie Lott, Steve Young, and coach Bill Walsh. With five Super Bowl wins, the 49ers are tied with rivals Dallas Cowboys for the second most Super Bowl wins. The 49ers won the most regular season NFL games in both the 1980s (104) and 1990s (113). The name '49ers' comes from the name given to the gold prospectors who arrived in Northern California around 1849 during the California Gold Rush. The name was suggested to reflect the voyagers who had rushed the West for gold. It is the only name the team has ever had and the team has always been within the San Francisco Bay Area. The team is legally and corporately registered as the San Francisco Forty Niners, Ltd., and is the oldest major professional sports team in California. The 49ers and Los Angeles Rams were cross-state rivals until 1995, when the Rams moved from Southern California to St. Louis, Missouri to become the current St. Louis Rams.",
          strDescriptionDE: null,
          strDescriptionFR: null,
          strDescriptionCN: null,
          strDescriptionIT: null,
          strDescriptionJP: null,
          strDescriptionRU: null,
          strDescriptionES: "Los San Francisco 49ers (en español Cuarenta y Nueves de San Francisco) son un equipo profesional estadounidense de fútbol americano de la ciudad de San Francisco, California. Forman parte de la NFC Oeste de la National Football League (NFL). Juegan en el Levi's Stadium con base en la ciudad de Santa Clara, California.2 Los 49ers son conocidos por tener una de las mayores dinastías de la NFL, habiendo ganado cinco campeonatos de Super Bowl en tan sólo 14 años, entre 1981 y 1994, con cuatro de esos campeonatos en la década de 1980. Los equipos que ganaron aquellas Super Bowls estuvieron dirigidos por los miembros del Salón de la Fama del Fútbol Americano Joe Montana, Jerry Rice, Ronnie Lott, Steve Young, y el entrenador Bill Walsh. Con cinco campeonatos de Super Bowl, los 49ers están empatados con sus rivales, los Dallas Cowboys, en el segundo puesto que más trofeos poseen. Los 49ers ganaron el mayor número de partidos regulares en una temporada de la NFL en las décadas de 1980 (104)3 y 1990 (113).4 El nombre '49ers' proviene del nombre dado a los buscadores de oro que llegaron a California del Norte hacia 1849 durante la fiebre del oro de California.5 El nombre fue sugerido para reflejar a los navegantes que habían acudido a Occidente en busca de oro. Es el único nombre que el equipo ha tenido en toda su historia y siempre ha estado dentro de la Bahía de San Francisco.6 El equipo está legalmente registrado como los San Francisco Forty Niners, Ltd.,7 y es el equipo más antiguo de los deportes profesionales en California. Los 49ers y Los Angeles Rams fueron rivales estatales hasta 1995, cuando los Rams se trasladaron desde el sur de California a St. Louis, Missouri para convertirse en los actuales St. Louis Rams.",
          strDescriptionPT: null,
          strDescriptionSE: null,
          strDescriptionNL: null,
          strDescriptionHU: null,
          strDescriptionNO: null,
          strDescriptionIL: null,
          strDescriptionPL: null,
          strGender: "Male",
          strCountry: "USA",
          strTeamBadge: "https://www.thesportsdb.com/images/media/team/badge/yyytup1427607562.png",
          strTeamJersey: "https://www.thesportsdb.com/images/media/team/jersey/ihy2gc1488737197.png",
          strTeamLogo: "https://www.thesportsdb.com/images/media/team/logo/0gkz2f1488737348.png",
          strTeamFanart1: null,
          strTeamFanart2: null,
          strTeamFanart3: null,
          strTeamFanart4: null,
          strTeamBanner: "https://www.thesportsdb.com/images/media/team/banner/xsqqvw1421525016.jpg",
          strYoutube: "",
          strLocked: "unlocked"
        }
      ],
    },
    news:{
      include: true,
      // categories: ["general", "entertainment"],
      sources:  [
        {
          id: "bbc-news",
          name: "BBC News",
          description: "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
          url: "http://www.bbc.co.uk/news",
          category: "general",
          language: "en",
          country: "gb"
        },
        {
          id: "google-news",
          name: "Google News",
          description: "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
          url: "https://news.google.com",
          category: "general",
          language: "en",
          country: "us"
        },
        {
          "id": "associated-press",
          "name": "Associated Press",
          "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
          "url": "https://apnews.com/",
          "category": "general",
          "language": "en",
          "country": "us"
        }
      ]
    },
    stocks: {
      include: true,
      companies: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          date: "2018-10-24",
          isEnabled: true,
          type: "cs",
          iexId: "11"
        },
        {
          symbol: "AMZN",
          name: "Amazon.com Inc.",
          date: "2018-10-24",
          isEnabled: true,
          type: "cs",
          iexId: "323"
        }
      ]
    },
    movies: {
      include: true,
      location: "Austin, TX"
    },
    dailyPics: {
      include: true,
      pics: ["NASA", "Foxes", "Doggos"]
    }
  },

  userName: "",
  userData: {},
  userDataLoaded: false,
  newsArticles: {},
  newsArticlesLoaded: false,
  currentWeather: [],
  sportsData: {},
  sportsDataLoaded: false,
  stockSymbols: [],
  stocksData: [],
  stocksDataLoaded: false
    
};
  

// sportsData: {
//   teams: [{team: {info: {}, games: {}, stats: {}}, ....],
//   standings: {{NHL: {}, }}
// }