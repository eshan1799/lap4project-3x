import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className='loading-buttons'
        style={{
          color: "#388087",
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5 ,
          position: 'fixed',
          top:'25%'
        }}
      >
        <Loader type="ThreeDots" color="#388087" height="400" width="400" style={{zIndex: '5'}}/>
      </div>
    )
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <LoadingIndicator />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
