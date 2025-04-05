import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";

export function FooterIcons() {
  return (
    <div className="icons flex">
      <MdFacebook className="bx bxl-facebook-circle text-3xl  cursor-pointer fill-[var(--main-color)]" />
      <AiFillLinkedin className="bx bxl-linkedin-square text-3xl   cursor-pointer fill-[var(--main-color)]" />
      <AiFillGithub className="bx bxl-github text-3xl  cursor-pointer fill-[var(--main-color)]" />
    </div>
  );
}
