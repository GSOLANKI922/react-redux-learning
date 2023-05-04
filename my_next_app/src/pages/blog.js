import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const Blog = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.title_Main}>
          <h1 className={styles.title}>Hunter Coder</h1>
          <p className={styles.description}>
            A blog for hunting coders by a hunting coder
          </p>
        </div>
        <div className={styles.blogs}>
          <h2 className={styles.populer_Blog}> Populer Blogs</h2>
          <div className={styles.blogItem}>
            <Link href="/blogpost/0">
              <h3>How to learn javascript in 2022?</h3>
            </Link>
            <p>Javascript is the language used to design logic for the web</p>
          </div>

          <div className={styles.blogItem}>
            <Link href="/blogpost/1">
              <h3>How to learn javascript in 2022?</h3>
            </Link>
            <p>Javascript is the language used to design logic for the web</p>
          </div>

          <div className={styles.blogItem}>
            <Link href="/blogpost/2">
              <h3>How to learn javascript in 2022?</h3>
            </Link>
            <p>Javascript is the language used to design logic for the web</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
