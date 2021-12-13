import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { StatisticContext } from "../contexts/StatisticContext";
import Spinner from "react-bootstrap/esm/Spinner";
import HightlightCard from "../components/statistic/HighlightCard";

const Statistic = () => {
  //Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    statisticState: { postsNumByType, statisticLoading },
    getStatistic,
  } = useContext(StatisticContext);

  //Start get all post
  useEffect(() => getStatistic(), []);

  let body = null;

  if (statisticLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <>
        <div className="statistic">
          <p className="statistic-title">
            Hello <span style={{ color: "var(--secondary)" }}>{username}</span>,
            this is an overview of your learning status, keep calm and making
            progress!
          </p>
        </div>
        <Row className="row-cols-1 row-cols-md-4 row-cols-sm-2 g-4 mx-auto mt-2">
          {postsNumByType.map((item) => (
            <Col key={item.type} className="my-3">
              <HightlightCard
                title={item.title}
                count={item.count}
                type={item.type}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return <>{body}</>;
};

export default Statistic;
