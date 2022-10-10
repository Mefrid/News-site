import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => (
  <div className={styles.container}>
    <h3 className={styles.title}>404</h3>
    <p className={styles.subtitle}>Страница не найдена</p>
  </div>
);

export default NotFoundPage;
