import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const MenuItem = ({ id, eliminable, onDetail, onDelete }) => {
  const [menuItem, error] = useFetch(id);

  if (error) {
    return <span className="text-danger">Problem getting menu item info.</span>;
  }

  return (
    <>
      {menuItem ? (
        <Card className="rounded col-12 col-md-5 pt-3">
          <CardImg alt={menuItem.title} src={menuItem.image} top width="100%" />
          <CardBody className="d-flex flex-column justify-content-between gap-3">
            <div>
              <CardTitle tag="h5">{menuItem.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {menuItem.vegan ? "Vegan" : "No Vegan"}
              </CardSubtitle>
              <CardText
                dangerouslySetInnerHTML={{
                  __html: menuItem.summary.split(".")[0] + ".",
                }}
              />
            </div>
            <div className="d-flex justify-content-evenly">
              <Button
                className="bg-transparent border-2 border-primary text-primary fw-bold"
                onClick={() =>
                  onDetail(menuItem.title, menuItem.image, {
                    precio: menuItem.pricePerServing,
                    tiempo: menuItem.readyInMinutes,
                    healthScore: menuItem.healthScore,
                  })
                }
              >
                VER PLATO
              </Button>
              {eliminable && (
                <Button
                  color="primary"
                  className="fw-bold"
                  onClick={() => onDelete(id)}
                >
                  ELIMINAR
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      ) : (
        <span>Cargando...</span>
      )}
    </>
  );
};

MenuItem.propTypes = {
  id: PropTypes.number.isRequired,
  eliminable: PropTypes.bool,
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};
export default MenuItem;
