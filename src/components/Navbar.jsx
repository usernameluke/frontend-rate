import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { IoGlobeOutline } from "react-icons/io5";

export function Navbar() {
  const [header, setHeader] = useState(false);

  const showHeader = () => setHeader(!header);

  // const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-firstrow">
          <div className="nav-left">
            <a href="#" className="menu-logo">
              <img
                src="/images/logo.png"
                alt="R8+ logo"
                className="logo-icon"
              />
            </a>
          </div>
          <div className="nav-right">
            <div className="search" onClick={() => setShowSearch(!showSearch)}>
              {showSearch ? (
                <IoIosCloseCircleOutline className="nav-icon" />
              ) : (
                <FaMagnifyingGlass className="nav-icon" />
              )}
            </div>
            {showSearch && (
              <form className="search-form bg-white rounded-xl">
                <input
                  type="search"
                  placeholder="Search here..."
                  className="search-input text-sm"
                />
              </form>
            )}

            <IoMenu className="menu-icon text-white" onClick={showHeader} />
          </div>
        </div>
        <nav className={header ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showHeader}>
            <div className="menu-row">
              <div>
                <img
                  src="/images/logo-red.png"
                  alt="R8+ logo"
                  className="red-logo"
                />
              </div>
              <div>
                <a href="#" className="navbar-toggle icon menu-logo">
                  <IoIosCloseCircleOutline className="menu-close" />
                </a>
              </div>
            </div>
            <div className="menu-col">
              <li className="navbar-item">
                <a href="#browse">
                  <IoGlobeOutline
                    className="icon"
                  />
                  <span className="cinzel-400">Browse</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#to-watch">
                  <img
                    className="icon"
                    src="/images/ToWatch.png"
                    alt="To watch"
                  />
                  <span className="cinzel-400">Watchlist</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#custom-list">
                  <CiViewList className="icon" />
                  <span className="cinzel-400">Custom List</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#profile">
                  <IoPersonOutline className="icon" />
                  <span className="cinzel-400">Profile</span>
                </a>
              </li>
              <li className="navbar-item">
                <a href="#signout">
                  <VscSignOut className="icon" />
                  <span className="cinzel-400">Sign Out</span>
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
}
