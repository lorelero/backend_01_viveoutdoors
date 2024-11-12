import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles.css"; // archivo para estilos personalizados
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Account = () => {
  const { login, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

    // Estado para datos de login
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });

  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirige al dashboard tras autenticación
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const newUser = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password,
    };

    setUsuarios([...usuarios, newUser]);
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      password: "",
      confirmPassword: "",
    });

    console.log("Usuario registrado:", newUser);
    alert("Usuario registrado con éxito");
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const success = login(formData.email, formData.password);
    if (success) {
      navigate("/user"); // Redirige a /user tras autenticación exitosa
    } else {
      console.log("Credenciales incorrectas");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-start">
        <Col md={5} className="mb-4">
          <Card className="card-custom">
            <Card.Body>
              <Card.Title className="text-center">Nuevo Cliente</Card.Title>
              <Form onSubmit={handleSubmitRegister}>
                <Form.Group controlId="formNombre" className="mb-3">
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formApellido" className="mb-3">
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu apellido"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formTelefono" className="mb-3">
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu teléfono"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formEmailRegister" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu correo electrónico"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formPasswordRegister" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Crea una contraseña"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirma tu contraseña"
                    className="border-lila"
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="button-custom mt-3"
                >
                  Registrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <div className="vertical-line"></div>

        <Col md={5} className="mb-4">
          <Card className="card-custom">
            <Card.Body>
              <Card.Title className="text-center">Ya Tengo Cuenta</Card.Title>
              <Form onSubmit={handleSubmitLogin}>
                <Form.Group controlId="formEmailLogin" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu correo electrónico"
                    className="border-lila"
                  />
                </Form.Group>
                <Form.Group controlId="formPasswordLogin" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu contraseña"
                    className="border-lila"
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="button-custom mt-3"
                >
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
