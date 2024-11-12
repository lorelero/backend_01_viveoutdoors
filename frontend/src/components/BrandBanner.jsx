
import { Container, Row, Col } from "react-bootstrap";

const BrandBanner = () => {
  const brands = [
    { src: "/public/doite.jpg", alt: "doite-logo" },
    { src: "/public/kano.png", alt: "Kano-logo" },
    { src: "/public/thermarest.png", alt: "Therm-a-rest-logo" },
    { src: "/public/lippi.png", alt: "lippi-logo" },
    { src: "/public/Lafuma_Logo.png", alt: "lafuma-logo" },
  ];

  return (
    <Container className="my-4 text-center">
      <h3>Marcas Asociadas</h3>
      <Row className="justify-content-center">
        {brands.map((brand, index) => (
          <Col xs={2} md={1} key={index} className="mb-1">
            {" "}
            {/* Reducido a mb-1 */}
            <img src={brand.src} alt={brand.alt} className="img-fluid" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrandBanner;
