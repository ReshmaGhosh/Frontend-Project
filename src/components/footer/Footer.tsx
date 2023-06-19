import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <div className="footer">
      <Box
        sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
      >
        <Box>
          <InstagramIcon />
          <TwitterIcon />
          <FacebookIcon />
        </Box>
        <Typography variant="h6">
          All Rights Reserved &copy; Reshma Ghosh
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
