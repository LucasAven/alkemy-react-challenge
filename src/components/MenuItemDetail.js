import {
  Button,
  List,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const MenuItemDetail = ({ title, image, data, setModal }) => {
  return (
    <Modal isOpen={true} centered size="xl" toggle={() => setModal(false)}>
      <ModalHeader toggle={() => setModal(false)}>{title}</ModalHeader>
      <ModalBody className="d-flex gap-3 flex-column flex-md-row">
        <div className="w-100 w-md-50">
          <img alt={title} src={image} width="100%" />
        </div>
        <div className="w-100 w-md-50">
          <List>
            <li>Precio: {data.precio}</li>
            <li>Tiempo: {data.tiempo}</li>
            <li>Health Score: {data.healthScore}</li>
          </List>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal(false)}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MenuItemDetail;
