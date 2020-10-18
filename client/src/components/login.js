import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  async loginUser(email, password) {
    console.log(email, password);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return res;
  }

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
    const { email, password } = this.state;

    try {
      const token = await this.loginUser(email, password)
        .then((data) => data.json())
        .then((data) => {
          return data;
        });
      console.log(token);
      localStorage.setItem("token", token.token);
      this.setState(token.token);
      console.log(this.state);
    } catch (error) {
      console.log("error");
    }
  }

  render() {
    return (
      <div>
        <div className="title">{"Login"}</div>
        <form onSubmit={(e) => this.onSubmit(e)}>
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

export default Login;
