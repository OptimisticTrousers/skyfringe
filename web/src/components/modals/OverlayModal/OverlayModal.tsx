import { FC, useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare } from "react-icons/ai";
import ModalContainer from "../ModalContainer";
import styles from "./OverlayModal.module.css";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Carousel,
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import userImageFallback from "../../../utils/userImageFallback";
import ResizeObserver from "react-resize-observer";
import { ChatContext } from "../../../context/ChatContext";

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const giphyFetch = new GiphyFetch("OUjnMwpRh4c4zCd2Z44lEIHC8tLGMeLP");

// // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
// const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

interface Props {
  toggleModal: any;
  type: any;
  sendChatMessage: any;
  title: any;
  handleFeedback: any;
  placeholder: any;
}

const OverlayModal: FC<Props> = ({
  toggleModal,
  type,
  placeholder,
  title,
  sendChatMessage,
  handleFeedback,
}) => {
  const [width, setWidth] = useState(400);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedChat } = useContext(ChatContext);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const fetchGifs = (offset: any) => {
    if (!searchQuery) {
      return giphyFetch.trending({ offset, limit: 10, type });
    }
    return giphyFetch.search(searchQuery, { offset, limit: 10, type });
  };

  const handleSubmit = async (gif: any, event: any) => {
    const formData = new FormData();
    formData.append("imageUrl", gif.images.original.webp);
    formData.append("altText", gif.title);
    const newMessage = await sendChatMessage(selectedChat._id, formData);
    handleFeedback(newMessage);
    toggleModal();
  };

  return (
    <SearchContextManager apiKey={"OUjnMwpRh4c4zCd2Z44lEIHC8tLGMeLP"}>
      <ModalContainer title={title} toggleModal={toggleModal}>
        <div styleName="overlay">
          <div styleName="overlay__top">
            <input
              styleName="overlay__input"
              placeholder={placeholder}
              onChange={handleSearchChange}
            />
          </div>
          {/* <SearchBar /> */}
          {/* <div styleName="overlay__gifs">
          <ul styleName="overlay__list">
          {gifs?.data?.map((gif: any, index: number) => {
            console.log(gif.url);
            return (
              <li styleName="overlay__item" key={index}>
                <button
                  styleName="overlay__button overlay__button--item"
                  type="button"
                  onClick={toggleModal}
                >
                  <img
                    styleName="overlay__image"
                    src={gif.url}
                    alt={gif.title}
                    onError={userImageFallback}
                  />
                </button>
              </li>
            );
          })}
        </ul>
          </div> */}

          <div styleName="overlay__gifs">
            <Grid
              onGifClick={handleSubmit}
              fetchGifs={fetchGifs}
              noResultsMessage="No GIFS found"
              width={width}
              columns={3}
              gutter={6}
              noLink={true}
              key={searchQuery}
            />
            <ResizeObserver
              onResize={({ width }) => {
                setWidth(width);
              }}
            />
          </div>
          {/* <Carousel
            key={searchKey}
            fetchGifs={fetchGifs}
            gifHeight={200}
            gutter={6}
          /> */}
        </div>
      </ModalContainer>
    </SearchContextManager>
  );
};

export default CSSModules(OverlayModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
