/* eslint-disable no-unused-expressions */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiService } from '../services/ApiService';
import Image from '../assets/mainImage.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 85vh;
  width: 80vw;
`;

const Introduce = styled.p`
  font-size: 1.5em;
  color:${(props) => props.theme.colors.homeText};
  padding-bottom: .7em;
  padding-left: 1em;
  font-weight: bold;
`;

const Buttons = styled.div`
  padding-top: 1em;
  padding-left: 2em;
`;

const TransferButton = styled.button`
  color: white;
  font-size: .5em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  padding-right: 3em;
  padding-left: 3em;
  margin-right: 1em;
  background: #A79FFF;
  border: none;
  border-radius: 3em;
`;

const TransactionButton = styled.button`
  color: white;
  font-size: .5em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  padding-right: 2em;
  padding-left: 2em;
  margin-right: 4em;
  background: #A79FFF;
  border: none;
  border-radius: 3em;
`;

const ImageBox = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  width: 60vh;
  height: 50vh;
  background: url(${Image}) no-repeat 0 50%; 
  background-size: contain;
`;

export default function Homepage() {
  const navigate = useNavigate();

  const handleClickTransfer = () => {
    apiService.accessToken ? navigate('/transfer') : navigate('/login');
  };

  const handleClickTransaction = () => {
    apiService.accessToken ? navigate('/transaction') : navigate('/login');
  };

  return (
    <Container>
      <div>
        <Introduce>
          마카오뱅크에서
        </Introduce>
        <Introduce>
          똑똑한 금융습관을 들이세요.
        </Introduce>
        <Buttons>
          <TransferButton
            type="button"
            onClick={handleClickTransfer}
          >
            송금하기
          </TransferButton>
          <TransactionButton
            type="button"
            onClick={handleClickTransaction}
          >
            거래 내역 조회
          </TransactionButton>
        </Buttons>
        <ImageBox />
      </div>
    </Container>
  );
}
