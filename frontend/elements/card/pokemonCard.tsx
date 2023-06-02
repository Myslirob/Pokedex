import styled, { css, keyframes } from 'styled-components';

const MoveFrame = keyframes`
  0% {
    height: 250px;
    width: 200px;
  }
  100% {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const MoveFrame2 = keyframes`
  0% {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    height: 250px;
    width: 200px;
  }
`;

export const PokemonCard = styled.div<{ $isHiding?: boolean; $coordination?: { x: number; y: number }; $mode: 'list' | 'grid'}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #96eca4;
  border-radius: 5px;
  box-shadow: 0 0 3px #96eca4;
  height: 100%;
  width: 100%;
  ${(props) => {
        switch (props.$mode) {
            case 'list': return css`
              width: 100%;
              height: 60px;
        flex-direction: row;
        &:hover {
          transform: scale(1.007);
        }
      `;
            default: return css`
              height: 250px;
              width: 200px;
        flex-direction: column;
        &:hover {
          & img {
            transform: scale(${props.$coordination === undefined ? 1.08 : 1});
          }
        }
      `;
        }
    }
}
  position: relative;
  background-color: white;
  ${(props) => {
        if (props.$coordination !== undefined) {
            if (props.$isHiding) {
                return css`
                position: fixed;
                z-index: 99;
                height: 500px;
                width: 350px;
                left: ${props.$coordination.x}px;
                top: ${props.$coordination.y}px;
                transition: all 2s linear;
                animation: ${MoveFrame2} 1s forwards;
              `;
            }
            return css`
                position: fixed;
                z-index: 99;
                height: 500px;
                width: 350px;
                left: ${props.$coordination.x}px;
                top: ${props.$coordination.y}px;
                transition: all 2s linear;
                animation: ${MoveFrame} 1s forwards;
              `;
        }
        return;
    }
}
`;
