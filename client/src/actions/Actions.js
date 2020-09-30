const url = "http://localhost:5000";
const token = "pk_805248909bc94205989d68559f04fcb3";

import "regenerator-runtime/runtime";


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

export const clearSearchResult = () => ({
  type: 'CLEAR_SEARCH'
})

export const signOut = () => ({
  type: 'LOG_OUT'
})

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
            console.log(data.token);
            localStorage.setItem("user", data.token);
            window.location = `/dashboard`;
            dispatch(getPortfolio());
          } else {
            console.log(data);
            alert(data);
          }
        });
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
      const response = await fetch(`${url}/history`, options);
      const history = await response.json();
      dispatch(addHistory(history));
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const newShare = (order) => {
  return async dispatch => {
    try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      method: "POST",
      body: JSON.stringify(order),
    };
    fetch(`${url}/buy`, options).then(dispatch(getPortfolio()));
    } catch (err) {
      console.warn(err.message);
    }
  }
};

export const updateShares = (order) => {
  return async dispatch => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        method: "PATCH",
        body: JSON.stringify(order),
      };
      fetch(`${url}/buy`, options).then(dispatch(getPortfolio()));
    } catch (err) {
      console.warn(err.message);
    }
  }
};

export const sellShare = (order) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      method: "PATCH",
      body: JSON.stringify(order),
    };
    fetch(`${url}/sell`, options).then(dispatch(getPortfolio()));
  } catch (err) {
    console.warn(err.message);
  }
};

export const getSearch = (ticker) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`
      );
      const searchResult = await response.json();
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
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      };
      const comparison = await fetch(`${url}/compare_auth`, options);
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
