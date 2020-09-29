const url = "http://localhost:5000";
import "regenerator-runtime/runtime";

const addUsername = (username) => ({
  type: "ADD_USERNAME",
  payload: username,
});

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

const addHistoricPrices = (comparison) => ({
  type: "ADD_HISTORIC_PRICES",
  payload: historicPrices,
});

const addComparison = (comparison) => ({
  type: "ADD_COMPARISON",
  payload: comparison,
});

export const registerUser = (details) => {
  try {
    options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(details),
    };
    fetch(`${url}/register`, options);
  } catch (err) {
    console.warn(err.message);
  }
};

export const logIn = (details) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(details),
      };
      fetch(`${url}/login`, options)
        .then((r) => r.json())
        .then((data) => {
          if (data.token) {
            // console.log(data.token);
            localStorage.setItem("user", data.token);
            dispatch(getPortfolio());
          } else {
            console.log(data);
            alert(data);
          }
        });
      // .then(() => {
      //   if (localStorage.getItem("user")) {
      //     dispatch(getPortfolio());
      //   }
      // });

      // const response = await fetch(`${url}/login`, options)
      // console.log(response.json())
      // dispatch(getPortfolio())
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
      const response = await fetch(`${url}/portfolio`, options);
      const portfolio = await response.json();
      console.log(portfolio);
      dispatch(addPortfolio(portfolio));
    } catch (err) {
      console.warn(err.message);
    }
  };
};
export const getHistory = () => {
  return async (dispatch) => {
    try {
      const history = await fetch(`${url}/history`);
      dispatch(addHistory(history));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getSearch = (ticker, token) => {
  return async (dispatch) => {
    try {
      const searchResult = await fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`
      );
      dispatch(addSearch(searchResult));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getHistoricPrices = (ticker, range = "1y", token) => {
  return async (dispatch) => {
    try {
      const historicPrices = await fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${token}`
      );
      dispatch(addHistoricPrices(historicPrices));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getAuthComparison = () => {
  return async (dispatch) => {
    try {
      const comparison = await fetch(`${url}/compare_auth`);
      dispatch(addComparison(comparison));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const getUnAuthComparison = () => {
  return async (dispatch) => {
    try {
      const comparison = await fetch(`${url}/compare_unauth`);
      dispatch(addComparison(comparison));
    } catch (err) {
      console.warn(err.message);
    }
  };
};
