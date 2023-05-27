import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useAppContext } from 'src/appContext';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    pokemon: PokemonsQuery['pokemons']['edges'][0];
    favoritePokemon: (pokemon: PokemonsQuery['pokemons']['edges'][0]) => void;
}

export const PokemonBox = ({ pokemon, favoritePokemon }: Props) => {
    const { view } = useAppContext();
    return (
        <PaperWrapper $mode={view}>
            <Link href={`/${pokemon.name}`}>
                <Paper $mode={view} key={pokemon.id}>
                    <ImageWrapper $mode={view}>
                        <img alt={pokemon.name} src={pokemon.image} />
                    </ImageWrapper>
                    <DescriptionWrapper>
                        <TitleWrapper><b>{pokemon.name}</b><br />{pokemon.types.join(', ')} </TitleWrapper>
                        <IconButton><FontAwesomeIcon color="red" icon={pokemon.isFavorite ? fullHeart : emptyHeart} onClick={(e) => {
                            e.preventDefault();
                            favoritePokemon(pokemon);
                        }} size="xl"
                        /></IconButton>
                    </DescriptionWrapper>
                </Paper>
            </Link>
        </PaperWrapper>
    );
};

const PaperWrapper = styled.div<{ $mode: 'list' | 'grid'}>`
  ${(props) => {
        switch (props.$mode) {
            case 'list': return css`
              width: 100%;
        `;
            default: return css`
              height: 250px;
              width: 195px;
        `;
        }
    }
}
  position: relative;

  & a {
    color: black;
    text-decoration: none;
  }
`;

const Paper = styled.div<{ $mode: 'list' | 'grid'}>`
  display: flex;
  justify-content: stretch;
  align-items: center;
  border: 1px solid #96eca4;
  border-radius: 5px;
  box-shadow: 0 0 3px #96eca4;
  height: 100%;
  width: 100%;
  ${(props) => {
        switch (props.$mode) {
            case 'list': return css`
              flex-direction: row;
              &:hover {
                transform: scale(1.007);
              }
          `;
            default: return css`
              flex-direction: column;
              &:hover {
                & img {
                  transform: scale(1.08);
                }
              }
          `;
        }
    }
}
  transition: all 2s ease;
`;

const ImageWrapper = styled.div<{ $mode: 'list' | 'grid'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 5px;
  overflow: hidden;
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
            default:
                return css`
                  width: 150px;
                    & img {
                      max-width: 150px;
                      max-height: 150px;
                    }
                `;
        }
    }
}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #d5e6d196;
  padding: 10px;
  box-sizing: border-box;
`;

const TitleWrapper = styled.span`
  color: black;
  text-decoration: none;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 2px 0 #eee;
  }
`;
