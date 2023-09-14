import { useNavigate, Link, useLocation } from "react-router-dom";
const Header = () => {
  const listMenu = [
    {
      name: "Home",
      url: "/home",
    },
    {
      name: "Công thức",
      url: "/recipe",
    },
    {
      name: "Cảm hứng sống",
      url: "/inspiration",
    },
    {
      name: "biblelicious",
      url: "/biblelicious",
    },
    {
      name: "Travel",
      url: "/travel",
    },
    {
      name: "Góc review",
      url: "/review",
    },
    {
      name: "về esheep kitchen",
      url: "/about",
    },
    {
      name: "Favorites",
      url: "/favorite",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  var urlPage = location.pathname;
  if (urlPage === "/search" || urlPage.indexOf("/detail") > -1)
    urlPage = "/recipe";
  return (
    <header>
      <div className="menu-header">
        <ul className="header-list container">
          {listMenu.map(({ name, url }, index) => {
            return (
              <li
                key={index}
                className={`header-list-item ${
                  urlPage === url ? "active" : ""
                } `}
              >
                <Link to={url} className="header-list-item-text">
                  {name.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container logo">
        <img
          src="https://www.esheepkitchen.com/wp-content/uploads/2018/04/logo-slogan.png"
          alt="logo"
          className="logo-image"
          onClick={() => navigate("/home")}
        />
      </div>
    </header>
  );
};

export default Header;
