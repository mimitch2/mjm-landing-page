
export default {
  defaultData: { //replace this with prefs from DB, will have to insert/delete keys based on user input
    weather: {
      switch: true,
      citites: ["London", "Los Angelas, CA"],
    },
    sports: {
      switch: true,
      teams: ["San Jose Sharks", "San Francisco 49ers"],
    },
    news:{
      switch: true,
      types: ["Headlines", "Entertainment", "World"]
    },
    movies: {
      switch: true,
      location: "Austin, TX"
    },
    instagram: {
      switch: true,
      handles: ["mimitch"]
    },
    picOfTheDay: {
      switch: true,
      pics: ["NASA", "Foxes", "Doggos"]
    }
  },

  fullData: {
    weather: {
      switch: true,
      citites: ["Austin, TX", "San Jose, CA"],
    },
    sports: {
      switch: true,
      teams: ["San Jose Sharks", "San Francisco 49ers"],
    },
    news:{
      switch: true,
      types: ["Headlines", "Entertainment", "World"]
    },
    movies: {
      switch: true,
      location: "Austin, TX"
    },
    instagram: {
      switch: true,
      handles: ["mimitch"]
    },
    picOfTheDay: {
      switch: true,
      pics: ["NASA", "Foxes", "Doggos"]
    }
  }
    
};
  