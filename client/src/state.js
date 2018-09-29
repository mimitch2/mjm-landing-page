
export default {
  defaultData: { //replace this with prefs from DB, will have to insert/delete keys based on user input
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
      categories: ["Politics", "Entertainment", "World"],
      sources: ["abc-news", "ars-technica", "cbs-news"]
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
  userData: {}

  // fullData: {
  //   weather: {
  //     include: true,
  //     cities: ["Austin, TX", "San Jose, CA"],
  //   },
  //   sports: {
  //     include: true,
  //     teams: ["San Jose Sharks", "San Francisco 49ers"],
  //   },
  //   news:{
  //     include: true,
  //     categories: ["Politics", "Entertainment", "World"],
  //     sources: ["bbc-news", "nbc-news", "nhl-news"]
  //   },
  //   movies: {
  //     include: true,
  //     location: "Austin, TX"
  //   },
  //   dailyPics: {
  //     include: true,
  //     pics: ["NASA", "Foxes", "Doggos"]
  //   }
  // }
    
};
  