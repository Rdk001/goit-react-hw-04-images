import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [request, setRequest] = useState('');

  const handlerSearchbarSubmit = request => {
    setRequest(request);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handlerSearchbarSubmit} />
      <ImageGallery propRequest={request} />
      <ToastContainer autoClose={3000} styled />
    </AppContainer>
  );
};
