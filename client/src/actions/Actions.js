const url = "https://lastproject-3x.herokuapp.com";
const token = "pk_805248909bc94205989d68559f04fcb3";

import "regenerator-runtime/runtime";
import { trackPromise } from "react-promise-tracker";

const addPortfolio = (portfolio) => ({
  type: "ADD_PORTFOLIO",
  payload: portfolio,
});

const addHistory = (history) => ({
  type: "ADD_HISTORY",
  payload: history,
});

const addSearch = (search) => ({
  type: "ADD_SEARCH",
  payload: search,
});

const addHistoricPrices = (historicPrices) => ({
  type: "ADD_HISTORIC_PRICES",
  payload: historicPrices,
});

const addNews = (news) => ({
  type: "ADD_NEWS",
  payload: news,
});

const addComparison = (comparison) => ({
  type: "ADD_COMPARISON",
  payload: comparison,
});

export const clearSearchResult = () => ({
  type: "CLEAR_SEARCH",
});

export const signOut = () => ({
  type: "LOG_OUT",
});

export const registerUser = (details) => {
  return (async) => {
    try {
      const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(details),
      };
      trackPromise(
        fetch(`${url}/register`, options)
          .then((r) => r.json())
          .then((data) => {
            if (data.status == 200) {
              alert(`Welcome ${data.username}, please log in`);
              window.location = `/login`;
            } else {
              alert(data);
            }
          })
      );
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const logIn = (details) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(details),
      };
      trackPromise(
        fetch(`${url}/login`, options)
          .then((r) => r.json())
          .then((data) => {
            if (data.token) {
              console.log(data.token);
              localStorage.setItem("user", data.token);
              
              dispatch(getPortfolio());
            } else {
              console.log(data);
              alert(data);
            }
          })
      );
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getPortfolio = () => {
  return async (dispatch) => {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      };
      const response = await trackPromise(fetch(`${url}/portfolio`, options));
      const portfolio = await response.json();
      dispatch(addPortfolio(portfolio));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getHistory = () => {
  return async (dispatch) => {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      };
      const response = await trackPromise(fetch(`${url}/history`, options));
      const history = await response.json();
      dispatch(addHistory(history));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const newShare = (order) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        method: "POST",
        body: JSON.stringify(order),
      };
      trackPromise(
        fetch(`${url}/buy`, options)
          .then((r) => r.json())
          .then((data) => {
            alert(data);
            window.location = "/dashboard";
          })
      );
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const updateShares = (order) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        method: "PATCH",
        body: JSON.stringify(order),
      };
      trackPromise(
        fetch(`${url}/buy`, options)
          .then((r) => r.json())
          .then((data) => {
            alert(data);
            window.location = "/dashboard";
          })
      );
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const sellShare = (order) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        method: "PATCH",
        body: JSON.stringify(order),
      };
      trackPromise(
        fetch(`${url}/sell`, options)
          .then((r) => r.json())
          .then((data) => {
            alert(data);
            window.location = "/dashboard";
          })
      );
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getSearch = (ticker) => {
  return async (dispatch) => {
    try {
      const response = await trackPromise(fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`
      ));
      const responseStatus = await response.status;
      if (responseStatus == 200) {
        const searchResult = await response.json();
        dispatch(addSearch(searchResult));
      } else {
        alert(`Stock '${ticker}' not found`);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getHistoricPrices = (ticker, range = "1m") => {
  return async (dispatch) => {
    try {
      const response = await trackPromise(fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${token}`
      ));
      const historicPrices = await response.json();
      dispatch(addHistoricPrices(historicPrices));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getNews = (ticker) => {
  return async (dispatch) => {
    try {
      const response = await trackPromise(fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/news/last?token=${token}`
      ));
      const responseStatus = await response.status;
      if (responseStatus == 200) {
        const news = await response.json();
        console.log(news);
        dispatch(addNews(news));
      }
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getAuthComparison = () => {
  return async (dispatch) => {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      };
      const response = await trackPromise(fetch(`${url}/compare_auth`, options));
      const authComparison = await response.json();
      dispatch(addComparison(authComparison));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getUnauthComparison = () => {
  return async (dispatch) => {
    try {
      const response = await trackPromise(fetch(`${url}/compare_unauth`));
      const unauthComparison = await response.json();
      dispatch(addComparison(unauthComparison));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const resetPortfolio = () => {
  return async (dispatch) => {
    try {
      const options = {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      };
      const response = await trackPromise(fetch(`${url}/reset`, options));
      const confirmation = await response.json();
      if (confirmation) {
        dispatch(getPortfolio());
      }
      return confirmation;
    } catch (err) {
      console.warn(err.message);
    }
  };
};
