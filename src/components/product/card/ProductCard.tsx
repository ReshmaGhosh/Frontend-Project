import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./ProductCard.css";
import { Product } from "../../../types/type";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

interface ProductCardProps {
  product: Product;
  handleToggleWishlist: (product: Product) => void;
  isItemInWishlist: (productId: number) => boolean;
}

function ProductCard({
  product,
  handleToggleWishlist,
  isItemInWishlist,
}: ProductCardProps) {
  const firstImage =
    product.images && product.images.length > 0 ? product.images[0] : "";

  const handleHeartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    handleToggleWishlist(product);
  };

  return (
    <div>
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Card className="custom-card">
          <CardMedia
            component="img"
            height="200"
            image={firstImage}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="subtitle1" component="div">
              {product.title.slice(0, 15)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}
            </Typography>
            <Typography variant="body1" color="text.primary">
              ${product.price}
            </Typography>

            <div className="py-2 d-flex justify-content-center fs-6">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="text-feedback"
                  value={product.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Box sx={{ ml: 2 }}>{labels[product.rating]}</Box>
              </Box>
              {`(${product.rating})`}
            </div>
          </CardContent>
          <FavoriteIcon
            color={isItemInWishlist(product.id) ? "secondary" : "primary"}
            onClick={handleHeartClick}
          />
        </Card>
      </Link>
    </div>
  );
}

export default ProductCard;
