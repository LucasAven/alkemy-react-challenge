import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import PropTypes from "prop-types";

const ValuesList = ({ promedio, data: { precio, tiempo, healthScore } }) => {
  return (
    <ListGroup
      className={
        promedio
          ? "justify-content-center py-2 flex-sm-row"
          : "justify-content-center py-2"
      }
    >
      <ListGroupItem className="bg-col">
        <ListGroupItemHeading>
          {promedio ? "Precio Total" : "Precio"}
        </ListGroupItemHeading>
        <ListGroupItemText className="text-center">{`$${precio}`}</ListGroupItemText>
      </ListGroupItem>
      <ListGroupItem className="bg-col">
        <ListGroupItemHeading>
          {promedio ? "Tiempo Promedio" : "Tiempo"}
        </ListGroupItemHeading>
        <ListGroupItemText className="text-center">{`${tiempo} minutes`}</ListGroupItemText>
      </ListGroupItem>
      <ListGroupItem className="bg-col">
        <ListGroupItemHeading>
          {promedio ? "Health Score Promedio" : "Health Score"}
        </ListGroupItemHeading>
        <ListGroupItemText className="text-center">
          {healthScore}
        </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  );
};

ValuesList.propTypes = {
  promedio: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};
export default ValuesList;
