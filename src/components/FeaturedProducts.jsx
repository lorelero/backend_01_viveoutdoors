import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const FeaturedProducts = () => {
  const products = [
    {
      title: "Carpa Neltume Lime",
      imgSrc: "/carpa1.webp",
    },
    {
      title: "Mochila Intense 20L Lippi",
      imgSrc: "/mochila.webp",
    },
    {
      title: "Lafuma Saco de dormir Active",
      imgSrc: "/public/saco.webp",
    },
    {
      title: "Pack Cocina Doite Astra",
      imgSrc: "/public/cocinilla.webp",
    },
    {
      title: "Colchoneta Z-Lite Therm-a-rest",
      imgSrc: "/public/colchoneta-z-lite.jpg",
    },
  ];

  return (
    <div className="mt-4 text-center">
      <h2>Productos Destacados</h2>
      <Row className="justify-content-center">
        {products.map((product, index) => (
          <Col md={2} key={index} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imgSrc}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;
