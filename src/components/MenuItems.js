import { useState } from "react";
import MenuItemDetail from "./MenuItemDetail";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

const MenuItems = ({ items, onAdd, onDelete }) => {
  const [modal, setModal] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState({});

  const handleModal = (id) => {
    setItemSeleccionado(items.find((item) => item.id === id));
    setModal(!modal);
  };
  return (
    <>
      {items.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          data={menuItem}
          eliminable={onDelete ? true : false}
          agregable={onAdd ? true : false}
          onDetail={handleModal}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      ))}
      {modal && (
        <MenuItemDetail
          item={itemSeleccionado}
          modal={modal}
          setModal={setModal}
        />
      )}
    </>
  );
};

MenuItems.propTypes = {
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MenuItems;
