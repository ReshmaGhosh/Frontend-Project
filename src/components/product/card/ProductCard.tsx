import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./ProductCard.css";
import { Product } from "../../../types/type";

interface ProductCardProps {
  product: Product;
  handleToggleWishlist: (productId: number) => void;
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
    handleToggleWishlist(product.id);
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
