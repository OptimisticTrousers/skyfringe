import CSSModules from "react-css-modules";
import styles from "./SearchBar.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";

const SearchBar = () => {

  return (
    <div styleName="search">
      <div styleName="search__input" />
      <HiOutlineMagnifyingGlass />
      <div styleName="search__window">
        <div styleName="search__top">
          <button styleName="search__button">
            <BsArrowLeft />
          </button>
        </div>
        <div styleName="search__results">
          <div styleName="search__no-results">{}</div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
