import { ButtonLoadMore } from './Button.styled';

const Button = ({ handleIncrement }) => {
  return (
    <ButtonLoadMore onClick={handleIncrement} type="button">
      Load more
    </ButtonLoadMore>
  );
};

export default Button;
