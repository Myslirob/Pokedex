import styled from 'styled-components';

import { Button } from './button';

export const GroupButton = styled(Button)`
  border-radius: 0;
  &:first-child {
    border-radius: 2rem 0 0 2rem;
  }
  &:last-child {
    border-radius: 0 2rem 2rem 0;
  }
`;
