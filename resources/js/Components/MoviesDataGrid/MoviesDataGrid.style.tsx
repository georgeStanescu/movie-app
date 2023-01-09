import styled from '@emotion/styled';

export const GridContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  @media (min-width: 1024px) {
    width: 75%;
  }

  @media (min-width: 1440px) {
    width: 50%;
  }
`;

export const Poster = styled.img`
 max-width: 120px;
 height: auto;
 src: ${({src}: {src: string}) => (src)};
`;
