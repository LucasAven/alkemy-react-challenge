import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import {
  Alert,
  Button,
  Container,
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
        swal("Hi!", "Successful Login!", "success");
        setToken(data.token);
      })
      .catch(() => {
        swal("Error", "Incorrect credentials!", "error");
        setLoading(false);
      });
  };

  return (
    <Container className="section-space">
      <h2>Login</h2>
      <Container className="p-sm-5">
        <Form onSubmit={(e) => validateInputs(e)}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <Button color="primary" disabled={loading}>
            {loading ? <Spinner color="info" size="sm" /> : "Enviar"}
          </Button>
        </Form>
        {areEmpty && (
          <Alert
            className="mt-4"
            color="danger"
            toggle={() => setAreEmpty(null)}
          >
            Please do not leave empty any field.
          </Alert>
        )}
      </Container>
    </Container>
  );
};

export default Login;
