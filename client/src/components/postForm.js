import React from "react";
import { setAlert } from "../actions/alerts";
import { connect } from "react-redux";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isloading: true };
  }

  async postPost(title, text) {
    console.log(title, text);
    let token = localStorage.getItem("token");
    console.log(token);
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    });
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
    console.log(this.state);
  };
  onChangeText = (e) => {
    this.setState({ text: e.target.value });
    console.log(this.state);
  };
  onSubmit = (e) => {
    console.log(this.state);
    this.postPost(this.state.title, this.state.text);
  };

  render() {
    return (
      <div>
        <div className="title">{"Posts"}</div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div>
            <div className="input">{"Title"}</div>
            <input type="text" onChange={this.onChangeTitle} />
          </div>
          <div>
            <div className="input">{"Text"}</div>
            <input type="text" onChange={this.onChangeText} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, { setAlert })(Form);
