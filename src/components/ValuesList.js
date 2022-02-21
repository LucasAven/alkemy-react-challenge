import { List } from "reactstrap";
import PropTypes from "prop-types";

const ValuesList = ({ promedio, data: { precio, tiempo, healthScore } }) => {
  return (
    <List>
      <li>
        {promedio ? "Precio Total:" : "Precio:"} {`$${precio}`}
      </li>
      <li>
        {promedio ? "Tiempo Promedio:" : "Tiempo:"} {`${tiempo} minutes`}
      </li>
      <li>
        {promedio ? "Health Score Promedio: " : "Health Score: "}
        {healthScore}
      </li>
    </List>
  );
};

ValuesList.propTypes = {
  promedio: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};
export default ValuesList;
