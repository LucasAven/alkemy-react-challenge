import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRef, useState, useEffect } from "react";
import { Button, Container, Spinner } from "reactstrap";
import swal from "sweetalert";
import MenuItems from "../components/MenuItems";

const AddItem = () => {
  const [searchVal, setSearchVal] = useState("");
  const [items, setItems] = useState();
  const [error, setError] = useState();
  const [submit, setSubmit] = useState(false);

  const itemsPerFetch = 4;
  const [reachMaxItems, setReachMaxItems] = useState(false);
  const [showingCount, setShowingCount] = useState(itemsPerFetch);

  const formikRef = useRef(null);

  const getItems = async ({ search }) => {
    setSubmit(true);
    setError(undefined);
    if (searchVal !== search) {
      setItems(undefined);
      setShowingCount(itemsPerFetch);
    } else {
      if (items?.length > 0) {
        setSubmit(false);
        return;
      }
    }
    setItems(undefined);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}complexSearch?${process.env.REACT_APP_API_KEY}&query=${search}&number=${itemsPerFetch}&offset=${showingCount}&addRecipeInformation=true`
      )
      .then(({ data }) => {
        setReachMaxItems(data.results.length === 0);
        if (data.results.length !== 0) {
          let loadedAndNewItems = [];
          if (items && searchVal === search) {
            loadedAndNewItems = [...items, ...data.results];
          } else loadedAndNewItems = [...data.results];
          setItems(loadedAndNewItems);
        }
      })
      .then(() => setSubmit(false))
      .catch((err) => setError(err));
  };

  const handleAdd = (data) => {
    swal({
      title: "Agregar Plato",
      text: "¿Está seguro que quiere agregar el plato?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((willAdd) => {
      if (willAdd) {
        swal("Plato Agregado!", { icon: "success" });
        let itemsData = localStorage.getItem("itemsData");
        if (itemsData === null) {
          localStorage.setItem("itemsData", JSON.stringify([data]));
        } else {
          let itemsDataNew = JSON.parse(itemsData);
          if (itemsDataNew.find((item) => item.id === data.id)) {
            swal("Error", "Plato ya agregado.", "error");
          } else {
            if (itemsDataNew.length < 4) {
              const veganItems = itemsDataNew.filter(
                (item) => item.vegan
              ).length;
              const noVeganItems = itemsDataNew.length - veganItems;
              let excesoPlatosTipo = true;

              if (data.vegan) excesoPlatosTipo = veganItems === 2;
              else excesoPlatosTipo = noVeganItems === 2;

              if (!excesoPlatosTipo) {
                itemsDataNew.push(data);
                localStorage.setItem("itemsData", JSON.stringify(itemsDataNew));
              } else {
                swal(
                  "Atención",
                  "No se pueden agregar más de 2 platos del mismo tipo (vegano / no vegano).",
                  "warning"
                );
              }
            } else {
              swal(
                "Atención",
                "No se pueden agregar más de 4 platos, elimine alguno.",
                "warning"
              );
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (showingCount !== itemsPerFetch) {
      formikRef.current.setSubmitting(true);
      setSubmit(true);
      axios
        .get(
          `${process.env.REACT_APP_URL_API}complexSearch?${process.env.REACT_APP_API_KEY}&query=${searchVal}&number=${itemsPerFetch}&offset=${showingCount}&addRecipeInformation=true`
        )
        .then(({ data }) => {
          setReachMaxItems(data.results.length === 0);
          if (data.results.length !== 0) {
            let loadedAndNewItems = [];
            if (items) loadedAndNewItems = [...items, ...data.results];
            else loadedAndNewItems = [...data.results];
            setItems(loadedAndNewItems);
          }
        })
        .then(() => setSubmit(false))
        .then(() => formikRef.current.setSubmitting(false))
        .catch((err) => setError(err));
    }
  }, [showingCount]);

  return (
    <Container tag="main" className="section-space">
      <Formik
        innerRef={formikRef}
        initialValues={{ search: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.search) {
            errors.search = "No hay nada que buscar!";
          } else if (values.search.length <= 2) {
            errors.search = "Ingrese más de 2 letras";
          }
          setReachMaxItems(false);
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await getItems(values);
          setSearchVal(values.search);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="d-flex justify-content-center gap-3">
            <div className="d-flex flex-column gap-1">
              <Field type="text" name="search" />
              {touched.search && errors.search && (
                <span className="text-danger fw-bold">{errors.search}</span>
              )}
            </div>
            <Button
              className="align-self-start"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Buscar
            </Button>
          </Form>
        )}
      </Formik>
      <div className="row gap-3 justify-content-center mt-5">
        {error && (
          <span className="text-danger">
            Problem getting items. {error.message}
          </span>
        )}
        {!!error === false && items && (
          <MenuItems items={items} onAdd={handleAdd} />
        )}
        {!!error === false && submit && (
          <div className="text-center">
            <Spinner color="info" size="sm" /> Cargando Items...
          </div>
        )}
      </div>
      {items?.length > 0 &&
        (reachMaxItems ? (
          <div className="text-center d-block m-auto mt-3 text-primary fs-5">
            No hay más platos!
          </div>
        ) : (
          <Button
            color="primary"
            className="d-block m-auto mt-3"
            onClick={() =>
              setShowingCount((oldValue) => (oldValue += itemsPerFetch))
            }
          >
            Mostrar más Platos
          </Button>
        ))}
    </Container>
  );
};

export default AddItem;
