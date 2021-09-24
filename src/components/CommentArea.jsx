import { Component } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

class CommentArea extends Component {
  state = {
    comment: [],
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.elementId !== this.props.elementId) {
      console.log("movie has changed!");
      console.log(prevProps.elementId);
      console.log(this.props.elementId);
      try {
        let response = await fetch(
          process.env.REACT_APP_BE_URL + "/media/" + this.props.elementId
        );
        if (response.ok) {
          let data = await response.json();
          this.setState({ comment: data.Reviews });
          console.log(this.state.comment);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div className="container">
        <AddComment elementId={this.props.elementId}></AddComment>
        {this.state.comment.length > 0 && (
          <CommentList
            comments={this.state.comment}
            elementId={this.props.elementId}
          ></CommentList>
        )}
      </div>
    );
  }
}

export default CommentArea;
