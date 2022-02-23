import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import swal from "sweetalert";
import MenuItems from "./MenuItems";
import ValuesList from "./ValuesList";
import EmptyPana from "../images/Empty-pana.svg";

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
    tiempo: (
      items
        .map((item) => item.readyInMinutes)
        .reduce((tiempTot, tiemp) => (tiempTot += tiemp)) / items.length
    ).toFixed(2),
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
      buttons: ["No", "Si"],
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
            <p className="fs-3">
              No hay Items! <br /> Agrega alguno.
            </p>
            <Button
              className="primary-col d-block m-auto fs-4"
              value="Agregar Plato"
              onClick={() => navigate("/add-item")}
            >
              Agregar Platos
            </Button>
            <img
              src={EmptyPana}
              alt=""
              className="mt-5 opacity-75"
              style={{ maxWidth: 400 + "px" }}
            />
          </div>
        ) : (
          <>
            <Container className="primary-col promedios-wrapper m-auto mb-3 rounded">
              {items ? (
                <ValuesList promedio={true} data={data} />
              ) : (
                <span>Cargando...</span>
              )}
            </Container>
            <div className="row gap-3 justify-content-center">
              {items ? (
                <MenuItems items={items} onDelete={handleDelete} />
              ) : (
                <span>Cargando Item...</span>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Menu;
