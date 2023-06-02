import styled, { css, keyframes } from 'styled-components';

type Props = {
    onClick: () => void;
    show: boolean;
};

export const Backdrop = ({ show, onClick }: Props) => {
    return (
        <StyledBackdrop
            onClick={onClick}
            show={show}
        />
    );
};

const Opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Opacity2 = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledBackdrop = styled.div<{show: boolean }>`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  filter: blur(9px);
  background-color: rgba(0, 0, 0, 0.43);
  opacity: 0;
  z-index: 99;
  ${({ show }) => {
        if (show) {
            return css`
        animation: ${Opacity} 1s ease-in-out forwards;
      `;
        }
        return css`
        animation: ${Opacity2} 1s ease-out forwards;
      `;
    }}
`;
