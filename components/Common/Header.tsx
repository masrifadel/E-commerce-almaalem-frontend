import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-100 bg-[url('/tableye.png')] bg-[center_40%]">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
