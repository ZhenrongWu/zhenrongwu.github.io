import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Seo title="找不到頁面" noIndex />
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p>找不到頁面</p>
        <Link to="/" className="btn btn-lavender text-light">
          返回首頁
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
