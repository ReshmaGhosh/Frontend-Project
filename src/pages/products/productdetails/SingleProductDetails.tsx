import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";

import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";

import MyNavbar from "../../../components/header/MyNavbar";
import "./ProductDetails.css";
import Footer from "../../../components/footer/Footer";
import { addToCarts } from "../../../components/features/cart/CartSlice";
import { Product } from "../../../types/type";
import RightCartIcon from "../../../components/cart/RightCartIcon";

interface RouteParams {
  productId: string;
  [key: string]: string | undefined;
}

function SingleProductDetails() {
  const { productId } = useParams<RouteParams>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);
  const { products } = useSelector((state: RootState) => state.products);

  const carts = useSelector((state: RootState) => state.carts.carts);

  const dispatch = useDispatch();

  const increaseQunaity = (e: React.MouseEvent) => {
    e.preventDefault();

    setQuantity(quantity + 1);
  };

  const decreaseQunaity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      const item = {
        id: product.id,
        quantity: quantity,
        price: product.price,
      };
      dispatch(addToCarts(item));
    }
  };

  useEffect(() => {
    if (productId) {
      let result = products.find((p) => p.id === parseInt(productId));
      setProduct(result);
    }
  }, [productId, products]);

  return (
    <div>
      SingleProductDetails
      <MyNavbar />
      <Container>
        <Row>
          <Col className="text-end">
            <RightCartIcon />
          </Col>
        </Row>
        {product && (
          <Row className="my-5">
            <Col md={6} sm={12}>
              <div className="img-container p-3">
                <Image className="single-img" src={product.thumbnail} />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="px-4">
                <h2>{product.title}</h2>
                <h4 className="py-2 fs-5">
                  Category:{" "}
                  <Link
                    to={`/category/${product.category}`}
                    className="text-capitalize text-decoration-none"
                  >
                    {product.category}
                  </Link>
                </h4>
                <h4 className="py-2">Price: ${product.price}</h4>
                <p>{product.description}</p>
                <div className="d-flex mb-3">
                  <button
                    className="btn btn-sm btn-dark fs-6 me-3 text-center"
                    onClick={decreaseQunaity}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center w-auto p-0 m-0"
                    value={quantity}
                    readOnly={true}
                    required={true}
                  />
                  <button
                    className="btn btn-sm btn-dark fs-6 ms-3 text-center"
                    onClick={increaseQunaity}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="">
                  <Button variant="dark" className="me-2">
                    Buy Now
                  </Button>
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default SingleProductDetails;
