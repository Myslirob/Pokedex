import styled, { css } from 'styled-components';

export const ImageWrapper = styled.div<{ $mode?: 'list' | 'grid'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 15px;
  overflow: hidden;
  max-height: 350px;
  max-width: 100%;
  & img {
    transition: transform 0.5s;
    max-height: 100%;
    max-width: 100%;
  }
  ${(props) => {
        switch (props.$mode) {
            case 'list':
                return css`
                  flex-direction: row;
                  height: 50px;
                  width: 60px;
                `;
            case 'grid':
                return css`
                  min-height: 160px;
                `;
        }
    }
}
`;

export const RelativeImageWrapper = styled(ImageWrapper)`
  position: relative;
`;
