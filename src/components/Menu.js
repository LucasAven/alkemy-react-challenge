import { useState } from "react";
import { Container } from "reactstrap";
import swal from "sweetalert";
import MenuItem from "../components/MenuItem";
import MenuItemDetail from "./MenuItemDetail";
import ValuesList from "./ValuesList";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([176430, 176431]);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [precioTotal, setPrecioTotal] = useState(0.0);
  const [tiempoTotal, setTiempoTotal] = useState(0.0);
  const [healthScoreTotal, setHealthScoreTotal] = useState(0.0);

  const handleModal = (title, image, data) => {
    setTitle(title);
    setImage(image);
    setModalData(data);
    setModal(true);
  };

  const handleGeneralValues = ({ precio, tiempo, healthScore }) => {
    setPrecioTotal((precioTota) => precioTota + precio);
    setTiempoTotal((tiempoTota) => tiempoTota + tiempo);
    setHealthScoreTotal((healthScoreTota) => healthScoreTota + healthScore);
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
        swal("Plato eliminado!", { icon: "success" });
        const newMenuItems = menuItems.filter((menuId) => menuId !== id);
        setMenuItems(newMenuItems);
        setPrecioTotal(0);
        setTiempoTotal(0);
        setHealthScoreTotal(0);
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
              eliminable={true}
              onDetail={handleModal}
              onDelete={handleDelete}
              changeValues={handleGeneralValues}
            />
          ))}
        </div>
        <div className="bg-warning">
          <ValuesList
            promedio={true}
            data={{
              precio: precioTotal,
              tiempo: tiempoTotal / menuItems.length,
              healthScore: healthScoreTotal / menuItems.length,
            }}
          />
        </div>
      </Container>
      {modal && (
        <MenuItemDetail
          title={title}
          image={image}
          data={modalData}
          setModal={setModal}
        />
      )}
    </>
  );
};

export default Menu;
