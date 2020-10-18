import React from "react";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], isloading: true };
  }
  async getPosts() {
    let posts = await fetch("/api/posts", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
    this.setState({ posts, isloading: false });
  }

  async onDelete(id) {
    console.log(id);
    await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    this.getPosts();
  }

  componentDidMount = () => {
    this.getPosts();
  };
  render = () => {
    const { posts, isloading } = this.state;
    console.log(isloading, posts);
    if (isloading) {
      return <div></div>;
    } else {
      return posts.map((element) => {
        return (
          <div className="post" key={element._id}>
            <div className="post_name">{element.name}</div>
            <div className="post_title">{"Title"}</div>
            <div>{element.title}</div>
            <div className="post_text">{"Text"}</div>
            <div>{element.text}</div>
            <button
              onClick={() => {
                this.onDelete(element._id);
              }}
            >
              delete
            </button>
          </div>
        );
      });
    }
  };
}

export default Posts;
