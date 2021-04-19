import OrderForm from "../components/OrderForm";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Evive Diner!</h1>

        <p className={styles.description}>Enter your order below:</p>

        <OrderForm />
      </main>
    </div>
  );
}
