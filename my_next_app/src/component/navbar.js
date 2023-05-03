import Link from "next/link";
import React from "react";
import styles from '../styles/Navbar.module.css'
const Navbar = () => {
  return (
    <nav className={styles.main_nav}>
      <ul className={styles.navManu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
