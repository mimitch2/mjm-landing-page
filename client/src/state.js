
export default {
  defaultData: { 
    weather: {
      include: true,
      cities: ["London", "Los Angelas, CA"],
    },
    sports: {
      include: true,
      teams: ["Houston Astros", "Detroit Red Wingsd"],
    },
    news:{
      include: true,
      categories: ["general", "entertainment"],
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
  newsArticlesLoaded: false
    
};
  