import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { Container, Row, Col } from "react-bootstrap";

import { Product } from "../../types/type";
import ProductCard from "./card/ProductCard";

interface LatestProductsProps {
  handleToggleWishlist: (product: Product) => void;
  isItemInWishlist: (productId: number) => boolean;
}

function LatestProducts(props: LatestProductsProps) {
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  const { handleToggleWishlist, isItemInWishlist } = props;

  return (
    <Container className="my-3 py-3">
      <h3 className="text-center mb-4">
        <span>Latest Products</span>
      </h3>
      <Row>
        {products &&
          products.slice(0, 6).map((p: Product) => {
            return (
              <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={p.id}>
                <ProductCard
                  product={p}
                  handleToggleWishlist={() => handleToggleWishlist(p)}
                  isItemInWishlist={isItemInWishlist}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default LatestProducts;
