import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => (
  <Card
    border={
      status === "LEARNED"
        ? "success"
        : status === "LEARNING"
        ? "warning"
        : "danger"
    }
    className="shadow h-100"
  >
    <Card.Body>
      <Card.Title>
        <Row>
          <Col md="6" sm="6" xs="6">
            <p className="post-title">{title}</p>
            <Badge
              pill
              variant={
                status === "LEARNED"
                  ? "success"
                  : status === "LEARNING"
                  ? "warning"
                  : "danger"
              }
            >
              {status}
            </Badge>
          </Col>
          <Col md="6" sm="6" xs="6">
            <div className="group-btn">
              <ActionButtons url={url} _id={_id} />
            </div>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text className="text-limit">{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default SinglePost;
