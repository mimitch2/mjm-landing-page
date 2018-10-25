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
      teams: [{"idTeam":"134853","idSoccerXML":null,"intLoved":"1","strTeam":"San Jose Sharks","strTeamShort":"SJS","strAlternate":"","intFormedYear":"1991","strSport":"Ice Hockey","strLeague":"NHL","idLeague":"4380","strDivision":null,"strManager":"Doug Wilson","strStadium":"SAP Center at San Jose","strKeywords":null,"strRSS":"","strStadiumThumb":null,"strStadiumDescription":"The SAP Center at San Jose (formerly San Jose Arena, Compaq Center at San Jose and HP Pavilion at San Jose) is an American indoor arena, located in San Jose, California. Its primary tenant is the San Jose Sharks of the National Hockey League, and the arena has been nicknamed the \"Shark Tank\".","strStadiumLocation":"San Jose, California","intStadiumCapacity":"17562","strWebsite":"sharks.nhl.com","strFacebook":"www.facebook.com/SanJoseSharks","strTwitter":"twitter.com/SanJoseSharks","strInstagram":"instagram.com/sanjosesharks","strDescriptionEN":"The San Jose Sharks are a professional ice hockey team based in San Jose, California, United States. They are members of the Pacific Division of the Western Conference of the National Hockey League (NHL). They play their home games at the SAP Center at San Jose, known locally as the Shark Tank. The Sharks were founded in 1991 and were the first NHL franchise based in the San Francisco Bay Area since the California Golden Seals left in 1976. They have won six division titles, but have never won a conference title or the Stanley Cup.","strDescriptionDE":null,"strDescriptionFR":null,"strDescriptionCN":null,"strDescriptionIT":null,"strDescriptionJP":null,"strDescriptionRU":null,"strDescriptionES":null,"strDescriptionPT":null,"strDescriptionSE":null,"strDescriptionNL":null,"strDescriptionHU":null,"strDescriptionNO":null,"strDescriptionIL":null,"strDescriptionPL":null,"strGender":"Male","strCountry":"USA","strTeamBadge":"https://www.thesportsdb.com/images/media/team/badge/vxruup1421877078.png","strTeamJersey":null,"strTeamLogo":"https://www.thesportsdb.com/images/media/team/logo/qptuxv1421877655.png","strTeamFanart1":"https://www.thesportsdb.com/images/media/team/fanart/svyxuq1421877396.jpg","strTeamFanart2":"https://www.thesportsdb.com/images/media/team/fanart/xqwvut1421877590.jpg","strTeamFanart3":null,"strTeamFanart4":null,"strTeamBanner":null,"strYoutube":"www.youtube.com/user/sjsharksofficial","strLocked":"unlocked"}],
    },
    news:{
      include: true,
      // categories: ["general", "entertainment"],
      sources:  [
        {
          "id": "australian-financial-review",
          "name": "Australian Financial Review",
          "description": "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
          "url": "http://www.afr.com",
          "category": "business",
          "language": "en",
          "country": "au"
        },
        {
          "id": "associated-press",
          "name": "Associated Press",
          "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
          "url": "https://apnews.com/",
          "category": "general",
          "language": "en",
          "country": "us"
        },
        {
          "id": "ary-news",
          "name": "Ary News",
          "description": "ARY News is a Pakistani news channel committed to bring you up-to-the minute Pakistan news and featured stories from around Pakistan and all over the world.",
          "url": "https://arynews.tv/ud/",
          "category": "general",
          "language": "ud",
          "country": "pk"
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