import React from "react";

import { Button, Card, Container, Form } from "react-bootstrap";

import MyNavbar from "../components/header/MyNavbar";
import Footer from "../components/footer/Footer";

function Contact() {
  return (
    <div>
      <MyNavbar />
      <Container>
        <div className="w-50 mx-auto my-5">
          <Card>
            <Card.Header>
              <h3 className="text-center">Contact With Us</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Smith"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="smith@example.com"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <textarea
                    className="form-control"
                    rows={5}
                    style={{ resize: "none" }}
                    placeholder="Your message"
                  ></textarea>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" variant="dark">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;
