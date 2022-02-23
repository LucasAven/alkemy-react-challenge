import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import PropTypes from "prop-types";

const MenuItem = ({
  data,
  eliminable = true,
  agregable = false,
  onDetail,
  onDelete,
  onAdd,
}) => {
  return (
    <>
      <Card className="rounded col-12 col-md-5 pt-3">
        <CardImg alt={data.title} src={data.image} top width="100%" />
        <CardBody className="d-flex flex-column justify-content-between gap-3">
          <div>
            <CardTitle tag="h5">{data.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {data.vegan ? "Vegano" : "No Vegano"}
            </CardSubtitle>
            <CardText
              dangerouslySetInnerHTML={{
                __html: data.summary.split(".")[0] + ".",
              }}
            />
          </div>
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-evenly">
            <Button
              className="btn-outline fw-bold"
              onClick={() => onDetail(data.id)}
            >
              VER PLATO
            </Button>
            {agregable && (
              <Button
                className="primary-col fw-bold"
                onClick={() => onAdd(data)}
              >
                AGREGAR PLATO
              </Button>
            )}
            {eliminable && (
              <Button
                className="primary-col fw-bold"
                onClick={() => onDelete(data.id)}
              >
                ELIMINAR
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  eliminable: PropTypes.bool,
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};
export default MenuItem;
