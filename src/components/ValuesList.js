import { List } from "reactstrap";

const ValuesList = ({ promedio, data }) => {
  return (
    <List>
      <li>
        {promedio ? "Precio Total:" : "Precio:"} {`$${data.precio}`}
      </li>
      <li>
        {promedio ? "Tiempo Promedio:" : "Tiempo:"} {`${data.tiempo} minutes`}
      </li>
      <li>
        {promedio ? "Health Score Promedio: " : "Health Score: "}
        {data.healthScore}
      </li>
    </List>
  );
};

export default ValuesList;
