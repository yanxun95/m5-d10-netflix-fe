import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    commentObj: {
      comment: "",
      rate: 1,
      elementId: this.props.elementId,
    },
  };

  sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        process.env.REACT_APP_BE_URL +
          "/media/" +
          this.props.elementId +
          "/reviews",
        {
          method: "POST",
          body: JSON.stringify(this.state.commentObj),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Comment was sent!");
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    // console.log(this.state.commentObj);
    return (
      <Form className="px-2 my-2" onSubmit={this.sendComment}>
        <Form.Group>
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={this.state.commentObj.comment}
            onChange={(e) =>
              this.setState({
                commentObj: {
                  ...this.state.commentObj,
                  comment: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating:</Form.Label>
          <Form.Control
            as="select"
            value={this.state.commentObj.rate}
            onChange={(e) =>
              this.setState({
                commentObj: { ...this.state.commentObj, rate: e.target.value },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddComment;
