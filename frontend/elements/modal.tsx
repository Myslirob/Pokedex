import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 99;
  border: 1px solid #96eca4;
  border-radius: 5px;
  box-shadow: 0 0 3px #96eca4;
  display: flex;
  flex-direction: column;
  height: 500px;
`;
