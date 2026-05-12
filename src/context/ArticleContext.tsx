"use client";

import React, { createContext, useContext, useState } from "react";

interface ArticleContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return <ArticleContext.Provider value={{ selectedCategory, setSelectedCategory }}>{children}</ArticleContext.Provider>;
}

export function useArticle() {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within ArticleProvider");
  }
  return context;
}
