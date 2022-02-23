import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [areEmpty, setAreEmpty] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = async (e) => {
    e.preventDefault();
    setAreEmpty(email === "" || password === "");
    if (!(email === "" || password === "")) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_LOGIN_URL, {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        swal("Hola!", "Login Correcto!", "success");
        setToken(data.token);
      })
      .catch(() => {
        swal("Error", "Credenciales incorrectas!", "error");
        setLoading(false);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-img" />
      <Form className="login-form" onSubmit={(e) => validateInputs(e)}>
        <h2 className="text-center pb-4">Login</h2>
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label for="email">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label for="password">Password</Label>
        </FormGroup>
        <Button
          className="login-form-btn primary-col fw-bold"
          disabled={loading}
        >
          {loading ? <Spinner color="info" size="sm" /> : "Enviar"}
        </Button>
        {areEmpty && (
          <Alert
            className="mt-4"
            color="danger"
            toggle={() => setAreEmpty(null)}
          >
            Porfavor no deje ningún campo vacío.
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Login;
