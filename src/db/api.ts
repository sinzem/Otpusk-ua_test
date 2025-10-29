const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateToken = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

type Country = { id: string; name: string; flag: string };
type City    = { id: number; name: string; countryId: string };
type Hotel   = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
};

// Колекції у вигляді словників
type CountriesMap = Record<string, Country>;
type CitiesMap = Record<string, City>;
type HotelsMap    = Record<string, Hotel>;

type GeoEntity =
  | (Country & { type: "country" })
  | (City    & { type: "city" })
  | (Hotel   & { type: "hotel" });

type GeoResponse = Record<string, GeoEntity>;



class DB {
  countries: CountriesMap;
  cities: CitiesMap; 
  hotels: HotelsMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searches: any
  constructor() {
    this.countries = {
      115: {
        name: "Туреччина",
        id: "115",
        flag: "https://flagcdn.com/w40/tr.png",
      },
      43: {
        name: "Єгипет",
        id: "43",
        flag: "https://flagcdn.com/w40/eg.png",
      },
      34: {
        name: "Греція",
        id: "34",
        flag: "https://flagcdn.com/w40/gr.png",
      },
    };

    this.cities = {
      712: {
        countryId: "43",
        id: 712,
        name: "Хургада",
      },
      1262: {
        id: 1262,
        name: "Макаді Бей",
        countryId: "43",
      },
      1247: {
        id: 1247,
        name: "Марса Алам",
        countryId: "43",
      },
      953: {
        id: 953,
        name: "Аланія",
        countryId: "115",
      },
    };

    this.hotels = {
      7953: {
        id: 7953,
        name: "Marlin Inn Azur Resort",
        img: "https://newimg.otpusk.com/2/400x300/00/03/97/88/3978846.webp",
        cityId: 712,
        cityName: "Хургада",
        countryId: "43",
        countryName: "Єгипет",
      },
      18183: {
        id: 18183,
        name: "Albatros Makadi Resort",
        img: "https://newimg.otpusk.com/2/400x300/00/04/88/41/4884132.webp",
        cityId: 1262,
        cityName: "Макаді Бей",
        countryId: "43",
        countryName: "Єгипет",
      },
      84183: {
        id: 84183,
        name: "Protels Beach Club & SPA",
        img: "https://newimg.otpusk.com/2/400x300/00/03/95/62/3956278.webp",
        cityId: 1247,
        cityName: "Марса Алам",
        countryId: "43",
        countryName: "Єгипет",
      },
      7898: {
        id: 7898,
        name: "Saphir Hotel & Villas",
        img: "https://newimg.otpusk.com/2/400x300/00/04/37/33/4373386.webp",
        cityId: 953,
        cityName: "Аланія",
        countryId: "115",
        countryName: "Туреччина",
      },
    };

    this.searches = new Map();
  }

  getCountries = () => {
    return this.countries;
  };

  getCities = () => {
    return this.cities;
  };

  getHotel = (hotelID: number) => {
    const [, hotel] =
      Object.entries(this.getHotels()).find(
        ([, hotel]) => hotel.id === hotelID
      ) ?? [];

    if (hotel) {
      const description =
        "Готель розташований на березі моря. Готель заснований у 1990 році, остання реновація проведена у 2016 році. Затишна зелена територія, комфортабельні номери. Поруч із готелем знаходиться гарна дискотека. Підійде для молоді та сімей з дітьми.";
      const services = {
        wifi: "yes",
        aquapark: "none",
        tennis_court: "yes",
        laundry: "yes",
        parking: "yes",
      };

      return { ...hotel, description, services };
    }

    return {};
  };

  getHotels = () => {
    return this.hotels;
  };

  getHotelsByCountryID = (countryID: string) => {
    return Object.fromEntries(
      Object.entries(this.getHotels()).filter(
        ([, hotel]) => hotel.countryId === countryID
      )
    );
  };

  addSearch = (token: string, search: Search) => {
    this.searches.set(token, search);
  };

  deleteSearch = (token: string) => {
    this.searches.delete(token);
  };

  hasSearch = (token: string) => {
    return this.searches.has(token);
  };

  getSearch = (token: string) => {
    return this.searches.get(token) ?? null;
  };
}

class Price {
  static futureDate(daysFromNow: number) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split("T")[0];
  }

  static generate() {
    const amount = randomInt(1500, 4000);
    const startOffset = randomInt(2, 5);
    const startDate = this.futureDate(startOffset);
    const endDate = this.futureDate(startOffset + randomInt(4, 7));

    return {
      id: generateToken(),
      amount,
      currency: "usd",
      startDate,
      endDate,
    };
  }
}

class Search {
  _token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _params: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readyTimestamp: any;
  constructor(token: string, params = {}) {
    this._token = token;
    this._params = params;
    this.readyTimestamp = this._setReadyTimestamp();
  }

  _setReadyTimestamp = () => {
    const getFutureTimestamp = (offsetSeconds: number) => {
      const now = Date.now();
      return now + offsetSeconds * 1000;
    };

    return getFutureTimestamp(randomInt(2, 4));
  };

  get isReady() {
    return Date.now() >= this.readyTimestamp;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMockPrices(db: any) {
    const hotels = db.getHotelsByCountryID(this._params.countryID);

    return Object.fromEntries(
      Object.entries(hotels).map(([hotelID]) => {
        const price = Price.generate();

        return [price.id, Object.assign(price, { hotelID })];
      })
    );
  }
}

const db = new DB();

export const getCountries = async () => {
  const countries = db.getCountries();

  const response = new Response(JSON.stringify(countries), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const response = new Error({status: 404, message: "Fatal error"})
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Promise.resolve(response);
};

export const searchGeo = (string: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addType = (type: any) => (entity: any) => ({ ...entity, type });

  const countries = Object.values(db.getCountries()).map(addType("country"));
  const hotels = Object.values(db.getHotels()).map(addType("hotel"));
  const cities = Object.values(db.getCities()).map(addType("city"));

  const geo: GeoResponse  = {};

  switch (string?.length) {
    case 2: {
      const [country] = countries;
      const [hotelA, hotelB] = hotels;

      geo[country.id] = country;
      geo[hotelA.id] = hotelA;
      geo[hotelB.id] = hotelB;

      break;
    }

    case 3: {
      const [, , hotelA, hotelB] = hotels;
      const [cityA, cityB] = cities;

      geo[hotelA.id] = hotelA;
      geo[hotelB.id] = hotelB;
      geo[cityA.id] = cityA;
      geo[cityB.id] = cityB;

      break;
    }

    case 4: {
      break;
    }

    default: {
      const [, country] = countries;
      const [, , cityA, cityB] = cities;
      const [hotelA] = hotels;

      geo[cityA.id] = cityA;
      geo[cityB.id] = cityB;
      geo[country.id] = country;
      geo[hotelA.id] = hotelA;
    }
  }

  const response = new Response(JSON.stringify(geo), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const startSearchPrices = (countryID: string) => {
  if (!countryID) {
    const error = {
      code: 400,
      error: true,
      message: "Country id is required param.",
    };
    const response = new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.reject(response);
  }

  const token = generateToken();
  const search = new Search(token, { countryID });
  
  db.addSearch(token, search);

  const body = {
    token,
    waitUntil: new Date(search.readyTimestamp).toISOString(),
  };
  const response = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const getSearchPrices = (token: string) => {
  const search = db.getSearch(token);

  if (!search) {
    const error = {
      code: 404,
      error: true,
      message: "Search with this token was not found.",
    };
    const response = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.reject(response);
  }

  if (!search.isReady) {
    const error = {
      code: 425,
      error: true,
      message: "Search results are not ready yet. Please try again later.",
      waitUntil: new Date(search.readyTimestamp).toISOString(),
    };
    const response = new Response(JSON.stringify(error), {
      status: 425,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.reject(response);
  }

  const prices = search.getMockPrices(db);
  const response = new Response(JSON.stringify({ prices }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const stopSearchPrices = (token: string) => {
  if (!token || !db.hasSearch(token)) {
    const error = {
      code: 404,
      error: true,
      message: "Search with this token was not found.",
    };
    const response = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.reject(response);
  }

  db.deleteSearch(token);

  const body = {
    message: "Search has been cancelled successfully.",
  };
  const response = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const getHotels = (countryID: string) => {
  const hotels = db.getHotelsByCountryID(countryID);

  const response = new Response(JSON.stringify(hotels), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const getHotel = (hotelId: number) => {
  const hotel = db.getHotel(hotelId);

  if (!hotel) {
    const error = {
      code: 404,
      error: true,
      message: "Hotel with this ID was not found.",
    };
    const resp = new Response(JSON.stringify(error), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
    return Promise.reject(resp);
  }

  const response = new Response(JSON.stringify(hotel), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};

export const getPrice = (priceId: string) => {
  if (!priceId) {
    const error = {
      code: 404,
      error: true,
      message: "Offer with this ID was not found.",
    };
    const response = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.reject(response);
  }

  const price = Object.assign(Price.generate(), { id: priceId });
  const response = new Response(JSON.stringify(price), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
};
