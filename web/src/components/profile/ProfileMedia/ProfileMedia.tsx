import CSSModules from "react-css-modules";
import useFetch from "../../../hooks/useFetch";
import userImageFallback from "../../../utils/userImageFallback";
import { SkeletonUserMedia } from "../../skeletons";
import { Card } from "../../ui";
import styles from "./ProfileMedia.module.css";

const ProfileMedia = ({ user }: any) => {
  const {
    setData: setImages,
    data: images,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user?._id}/images`
  );

  if (loading) {
    return <SkeletonUserMedia />;
  }

  return (
    <section styleName="media">
      <Card>
        <div styleName="media__top">
          <h2 styleName="media__title">Media</h2>
        </div>
        <ul styleName="media__list">
          {images?.length > 0 ? (
            images?.map((image: any, index: number) => {
              console.log(image);
              const isBig = (index + 1) % 18 === 2 || (index + 1) % 18 === 10;
              return (
                <img
                  key={index}
                  styleName={`media__image ${
                    isBig ? "media__image--large" : ""
                  }`}
                  src={image.imageUrl}
                  alt={image.altText}
                  onError={userImageFallback}
                />
              );
            })
          ) : (
            <p styleName="media__message">No images yet...</p>
          )}
        </ul>
      </Card>
    </section>
  );
};

export default CSSModules(ProfileMedia, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
