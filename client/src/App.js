import React from "react";
import "./App.css";
import Posts from "./components/posts";
import Form from "./components/postForm";
import Register from "./components/registerForm";
import Login from "./components/login";
import Alert from "./components/alert";
// Redux
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Alert />
        <Register />
        <Login />
        <Form />
      </div>
      <div className="postContainer">
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
