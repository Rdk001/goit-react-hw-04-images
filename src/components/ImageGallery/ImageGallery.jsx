import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { GalleryList, Div } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { getSearchGalleryApi } from '../Servise/GalleryApi';

const ImageGallery = ({ propRequest }) => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (propRequest !== request) {
      setPage(1);
      setRequest(propRequest);

      setTotalHits(0);
    }
  }, [propRequest, request]);

  useEffect(() => {
    if (!request) {
      return;
    }

    setGalleryCards();
  }, [request, page]);

  const setGalleryCards = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getSearchGalleryApi(request, page);

      if (data.hits.length === 0) {
        setCards([]);
        toast.error(`no response on request ${request}`);
        throw new Error();
      }

      setCards(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = modalData => {
    setModalData(modalData);
  };

  return (
    <>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <GalleryList>
            {cards &&
              cards.map(card => {
                return (
                  <ImageGalleryItem
                    key={card.id}
                    card={card}
                    handleItemClick={openModal}
                  />
                );
              })}
          </GalleryList>

          {cards.length > 0 && !isLoading && cards.length !== totalHits && (
            <Div>
              <Button handleIncrement={() => setPage(prev => prev + 1)} />
            </Div>
          )}
          {isLoading && <Loader />}
        </>
      )}

      {modalData && <Modal onClose={() => setModalData(null)} {...modalData} />}
    </>
  );
};

export default ImageGallery;
