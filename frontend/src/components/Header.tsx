import React from "react";
import Link from "next/dist/client/link";
const Header = () => {
  return (
    <>
      <div className="header flex__center">
        <div className="header__menu flex__center">
          <ul className="flex__center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/upload">Upload</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
