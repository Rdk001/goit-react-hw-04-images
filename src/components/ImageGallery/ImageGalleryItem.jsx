import { GalleryItem, GalleryItemImage } from './ImageGallery.styled';

const ImageGalleryItem = ({ card, handleItemClick }) => {
  const { webformatURL, largeImageURL, user } = card;
  return (
    <GalleryItem onClick={() => handleItemClick({ largeImageURL, user })}>
      <GalleryItemImage src={webformatURL} alt={user} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
