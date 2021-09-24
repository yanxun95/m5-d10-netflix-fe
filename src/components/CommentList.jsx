import { Button, ListGroup } from "react-bootstrap";

const deleteReview = async (currentID) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BE_URL + "/media/" + currentID + "/reviews",
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("Comment was delete!");
    } else {
      console.log("error");
      alert("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const CommentList = (props) => (
  <div>
    <ListGroup>
      {props.comments.length > 0 &&
        props.comments.map((comment) => (
          <ListGroup.Item key={comment._id}>{comment.comment}</ListGroup.Item>
        ))}
    </ListGroup>
    {console.log("this is the ID", props.elementId)}
    <Button onClick={() => deleteReview(props.elementId)}>Delete</Button>
  </div>
);

export default CommentList;
