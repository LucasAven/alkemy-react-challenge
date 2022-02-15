import { useState } from "react";
import { Container } from "reactstrap";
import swal from "sweetalert";
import MenuItem from "../components/MenuItem";
import MenuItemDetail from "./MenuItemDetail";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([176430, 176431, 176432, 176433]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState({});

  const handleModal = (title, image, data) => {
    setTitle(title);
    setImage(image);
    setData(data);
    setModal(true);
  };

  const handleDelete = (id) => {
    swal({
      title: "Eliminar Plato",
      text: "¿Está seguro que quiere eliminar el plato?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Plato eliminado!", "success");
        setMenuItems(menuItems.filter((menuId) => menuId !== id));
      }
    });
  };

  return (
    <>
      <Container tag="main" className="section-space">
        <div className="row gap-3 justify-content-center">
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              id={menuItem}
              onDetail={handleModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Container>
      {modal && (
        <MenuItemDetail
          title={title}
          image={image}
          data={data}
          setModal={setModal}
        />
      )}
    </>
  );
};

export default Menu;
