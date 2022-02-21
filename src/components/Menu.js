import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import swal from "sweetalert";
import MenuItems from "./MenuItems";
import ValuesList from "./ValuesList";

const Menu = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("itemsData"))
  );
  let navigate = useNavigate();

  const data = items?.length > 0 && {
    precio: items
      .map((item) => item.pricePerServing)
      .reduce((preTot, pre) => (preTot += pre))
      .toFixed(2),
    tiempo:
      items
        .map((item) => item.readyInMinutes)
        .reduce((tiempTot, tiemp) => (tiempTot += tiemp)) / items.length,
    healthScore: Number(
      (
        items
          .map((item) => item.healthScore)
          .reduce((healthTot, health) => (healthTot += health)) / items.length
      ).toFixed(2)
    ),
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
        const itemsDataNew = items.filter((item) => item.id !== id);
        if (itemsDataNew.length !== 0) {
          localStorage.setItem("itemsData", JSON.stringify(itemsDataNew));
          setItems(itemsDataNew);
        } else {
          localStorage.removeItem("itemsData");
          setItems(null);
        }
      }
    });
  };

  return (
    <>
      <Container tag="main" className="section-space">
        {!!items === false ? (
          <div className="text-center">
            <p className="fs-4">No hay Items! Agrega alguno.</p>
            <Button
              color="primary"
              value="Agregar Plato"
              onClick={() => navigate("/add-item")}
            >
              Agregar Platos
            </Button>
          </div>
        ) : (
          <>
            <div className="row gap-3 justify-content-center">
              {items ? (
                <MenuItems items={items} onDelete={handleDelete} />
              ) : (
                <span>Cargando Item...</span>
              )}
            </div>
            <div className="bg-warning">
              {items ? (
                <ValuesList promedio={true} data={data} />
              ) : (
                <span>Cargando...</span>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Menu;
