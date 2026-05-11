"use client";

import styled from "styled-components";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

// import { useArticle } from "@/context/ArticleContext";

const StyledAppBar = styled(AppBar)`
  background-color: #fff !important;
  color: #333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
`;

const categories = ["Alle", "Indland", "Udland", "Teknologi", "Sport", "Politik og Samfund"];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const { setSelectedCategory } = useArticle();

  const handleCategoryClick = (category: string) => {
    // setSelectedCategory(category === "Alle" ? null : category);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            INGN Nyheder
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {categories.map((cat) => (
            <Button key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Button onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </Button>
        </Box>
      </Toolbar>
      {mobileOpen && (
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          {categories.map((cat) => (
            <Button key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </Button>
          ))}
        </Box>
      )}
    </StyledAppBar>
  );
}
