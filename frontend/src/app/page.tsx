import Image from "next/image";
import styles from "./page.module.css";
import BasicCard from "@/components/BasicCard";

export default function Home() {
  return (
    <main className={styles.main}>
      home page
      <BasicCard />
    </main>
  );
}
