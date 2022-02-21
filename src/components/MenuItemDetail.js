import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ValuesList from "./ValuesList";
import PropTypes from "prop-types";

const MenuItemDetail = ({ item, modal, setModal }) => {
  const dataModal = {
    precio: item.pricePerServing,
    tiempo: item.readyInMinutes,
    healthScore: item.healthScore,
  };
  return (
    <Modal isOpen={true} centered size="xl" toggle={() => setModal(!modal)}>
      <ModalHeader toggle={() => setModal(!modal)}>{item.title}</ModalHeader>
      <ModalBody className="d-flex gap-3 flex-column flex-md-row">
        <div className="w-100 w-md-50">
          <img alt={item.title} src={item.image} width="100%" />
        </div>
        <div className="w-100 w-md-50">
          <ValuesList promedio={false} data={dataModal} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal(!modal)}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

MenuItemDetail.propTypes = {
  item: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
};
export default MenuItemDetail;
