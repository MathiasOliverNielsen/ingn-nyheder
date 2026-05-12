"use client";

import { useState } from "react";
import { useArticle } from "@/context/ArticleContext";
import styles from "./Navigation.module.scss";
import userIcon from "../public/img/icons/icon _User_.png";
import logoImg from "../public/img/icons/INGN.png";
import Image from "next/image";

const categories = ["Alle", "Indland", "Udland", "Teknologi", "Sport", "Politik", "Samfund"];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setSelectedCategory } = useArticle();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "Alle" ? category : null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Image src={logoImg} alt="INGN Logo" height={40} className={styles.logo} />

        <div className={`${styles.menu} ${mobileOpen ? styles.open : ""}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                handleCategoryClick(cat);
                setMobileOpen(false);
              }}
              className={styles.navLink}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.rightSection}>
          <Image src={userIcon} alt="Login" width={24} height={24} className={styles.userIcon} />
          <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
