import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";

import Footer from "../../components/footer/Footer";
import MyNavbar from "../../components/header/MyNavbar";
import ProductCard from "../../components/product/card/ProductCard";
import { Product } from "../../types/type";

function CategoryProducts() {
  let { categoryName } = useParams<{ categoryName: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    let data = products.filter((p) => p.category === categoryName);
    setCategoryProducts(data);
  }, [categoryName, products]);

  const handleToggleWishlist = (productId: number) => {
    console.log("Toggle wishlist for product id: ", productId);
  };

  const isItemInWishlist = (productId: number) => {
    console.log("Check if product id is in wishlist: ", productId);
    return false;
  };

  return (
    <div>
      <MyNavbar />
      <Container>
        <div className="my-4">
          <h4 className="mb-4">
            Produdcts from -{" "}
            <span className="text-capitalize">{categoryName}</span>
          </h4>
          <Row>
            {categoryProducts &&
              categoryProducts.map((product) => {
                return (
                  <Col
                    xs={12}
                    sm={6}
                    md={2}
                    lg={2}
                    className="mb-4"
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      handleToggleWishlist={() =>
                        handleToggleWishlist(product.id)
                      }
                      isItemInWishlist={() => isItemInWishlist(product.id)}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default CategoryProducts;
