import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import addIcon from "../assets/plus-circle-fill.svg";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  //Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //Start get all post
  useEffect(() => getPosts(), []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 row-cols-sm-2 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col className="my-3" key={post._id}>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open add post modal */}
        {/* <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new skill to learn</Tooltip>}
        > */}
        <Button
          className="btn-floating"
          onClick={setShowAddPostModal.bind(this, true)}
        >
          <img src={addIcon} alt="add post icon" width="60" height="60" />
        </Button>
        {/* </OverlayTrigger> */}
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After add post, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`text-white bg-${type}`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
        animation={false}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
