import DashSideBar from "../Components/DashBoard/DashSideBar";
import DashHome from "../Components/DashBoard/DashHome";

function DashBoard() {
  return (
    <div className="flex ">
      <DashSideBar />
      <DashHome />
    </div>
  );
}

export default DashBoard;
