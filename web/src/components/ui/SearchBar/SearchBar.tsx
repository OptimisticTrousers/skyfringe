import CSSModules from "react-css-modules";
import styles from "./SearchBar.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsArrowLeft } from "react-icons/bs";
import { useContext, useRef, useState } from "react";
import useMenuCloseEvents from "../../../hooks/useMenuCloseEvents";
import useSearchQuery from "../../../hooks/useSearchQuery";
import SearchItemResult from "../SearchItemResult";
import ProgressBar from "../ProgressBar";
import { ThemeContext } from "../../../context/ThemeContext";

const SearchBar = () => {
  const windowRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const {
    results,
    query,
    handleInputFocused,
    handleQuery,
    setQuery,
    setResults,
    loading,
    error,
  } = useSearchQuery();

  const handleFocusOut = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <div styleName="search">
      <input
        styleName={`search__input search__input--${theme}`}
        type="text"
        placeholder="Search Skyfringe"
        value={query}
        onChange={handleQuery}
        onFocus={handleInputFocused}
      />
      <HiOutlineMagnifyingGlass styleName="search__icon search__icon--glass" />
      <div styleName={`search__window search__window--${theme}`} ref={windowRef}>
        <div styleName="search__top">
          <button styleName="search__button" onClick={handleFocusOut}>
            <BsArrowLeft styleName="search__icon search__icon--arrow" />
          </button>
        </div>
        <div styleName="search__results">
          {results?.length ? (
            results.map((user: any) => {
              return (
                <SearchItemResult
                  user={user}
                  handleFocusOut={handleFocusOut}
                  key={user._id}
                />
              );
            })
          ) : (
            <div styleName="search__no-results">
              {!query ? "Start typing to find friends!" : "No results found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
