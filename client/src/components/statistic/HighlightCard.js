const getPostStatisticClass = (type) => {
  if (type === "LEARNED") return "small-box bg-success";
  else if (type === "TO LEARN") return "small-box bg-warning";
  else if (type === "ALL") return "small-box bg-info";
  else return "small-box bg-danger";
};

const HightlightCard = ({ title, count, type }) => {
  return (
    <div className={getPostStatisticClass(type)}>
      <div className="inner">
        <h3>{count} Skills</h3>
        <p>{title}</p>
      </div>
      <div className="icon">
        <i className="ion ion-bag"></i>
      </div>
    </div>
  );
};

export default HightlightCard;
