import styles from "./Icons.module.css";

function Icons() {
  return (
    <div className={styles.socialIcons}>
      <a href="#">
        <i className="bx bxl-google"></i>
      </a>
      <a href="#">
        <i className="bx bxl-facebook"></i>
      </a>
      <a href="#">
        <i className="bx bxl-github"></i>
      </a>
      <a href="#">
        <i className="bx bxl-linkedin"></i>
      </a>
    </div>
  );
}

export default Icons;
