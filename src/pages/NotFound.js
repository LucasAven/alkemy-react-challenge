import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div className="not-found-wrapper section-space">
      <h1>OOPS!</h1>
      <h2>Error 404: La página a la que quieres acceder no existe</h2>
      <Button className="main-col" onClick={() => navigate("/")}>
        Volver a Home
      </Button>
    </div>
  );
};

export default NotFound;
