import styles from "./Icons.module.css";
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
function Icons() {
  return (
    <div className={styles.socialIcons}>
      <a href="#">
        <FaGoogle />
      </a>
      <a href="#">
        <MdFacebook />
      </a>
      <a href="#">
        <AiFillGithub />
      </a>
      <a href="#">
        <AiFillLinkedin />
      </a>
    </div>
  );
}

export default Icons;
