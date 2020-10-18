import React from "react";
import { setAlert } from "../actions/alerts";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  async createUser(name, email, password) {
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
    console.log(this.state);
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state);
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state);
  };
  async onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    const { name, email, password } = this.state;
    try {
      await this.createUser(name, email, password);
    } catch (error) {
      this.props.setAlert("Invaliddd", "Invalid");
      console.log("AAAAAAAAAAAA");
    }
  }

  render() {
    return (
      <div>
        <div className="title">{"Register"}</div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div>
            <div className="input">{"Name"}</div>
            <input type="text" onChange={this.onChangeName} />
          </div>
          <div>
            <div className="input">{"Email"}</div>
            <input type="text" onChange={this.onChangeEmail} />
          </div>
          <div>
            <div className="input">{"Password"}</div>
            <input type="text" onChange={this.onChangePassword} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, { setAlert })(Register);
