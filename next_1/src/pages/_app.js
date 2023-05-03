import "@/styles/globals.css";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}
