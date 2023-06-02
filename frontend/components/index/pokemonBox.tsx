import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faMaximize } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useAppContext } from 'src/appContext';
import { useRef } from 'react';
import { useMaximalize } from 'src/hook';

import { Backdrop } from '../../elements/backdrop';
import { PokemonCard } from '../../elements/card/pokemonCard';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    pokemon: PokemonsQuery['pokemons']['edges'][0];
    favoritePokemon: (pokemon: PokemonsQuery['pokemons']['edges'][0]) => void;
}

export const PokemonBox = ({ pokemon, favoritePokemon }: Props) => {
    const { view } = useAppContext();
    const boxRef = useRef<any>(null);
    const {
        maximalize,
        minimalize,
        isHiding,
        coordination,
    } = useMaximalize({ ref: boxRef });
    return (
        <CardWrapper $mode={view} ref={boxRef}>
            {coordination && (
                <Backdrop onClick={minimalize}
                    show={!isHiding}
                />
            )}
            <Link href={`/${pokemon.name}`}>
                <PokemonCard $coordination={coordination} $isHiding={isHiding} $mode={view}>
                    <ImageWrapper $mode={view}>
                        {view === 'grid' && coordination === undefined && (
                            <MaximalizeButton onClick={(e) => {
                                e.preventDefault();
                                maximalize();
                            }}
                            >
                                <FontAwesomeIcon icon={faMaximize} size="lg" />
                            </MaximalizeButton>
                        )}
                        <img alt={pokemon.name} src={pokemon.image} />
                    </ImageWrapper>
                    {!isHiding && (
                        <AdditionalInfo>
                            <DescriptionWrapper>
                                <Line color="red" />
                                <span>HP: {pokemon.maxHP}</span>
                            </DescriptionWrapper>
                            <DescriptionWrapper>
                                <Line color="blue" />
                                <span>CP: {pokemon.maxCP}</span>
                            </DescriptionWrapper>
                        </AdditionalInfo>
                    )}
                    <DescriptionWrapper>
                        <TitleWrapper>
                            <b>{pokemon.name}</b><br />
                            {pokemon.types.join(', ')}
                        </TitleWrapper>
                        <IconButton><FontAwesomeIcon color="red" icon={pokemon.isFavorite ? fullHeart : emptyHeart} onClick={(e) => {
                            e.preventDefault();
                            favoritePokemon(pokemon);
                        }} size="xl"
                        /></IconButton>
                    </DescriptionWrapper>
                </PokemonCard>
            </Link>
        </CardWrapper>
    );
};

const Line = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 10px;
  flex-grow: 1;
  height: 10px;
  margin-right: 10px;
`;

const CardWrapper = styled.div<{ $mode: 'list' | 'grid'}>`
  ${(props) => {
        switch (props.$mode) {
            case 'list': return css`
              width: 100%;
              height: 60px;
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

const Opacity = keyframes`
  0% {
    opacity: 0;
    display: none;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
    display: block;
  }
`;

const MaximalizeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 2px 0px #eee;
    opacity: 0.5;
  }
  position: absolute;
  top: 10px;
  right: 5px;
  opacity: 0.3;
  z-index: 2;
`;

const ImageWrapper = styled.div<{ $mode: 'list' | 'grid'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 160px;
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
            default:
                return css`
                  //height: 190px;
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
  align-items: center;
`;

const AdditionalInfo = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  opacity: 0;
  animation: ${Opacity} 1s 0.2s ease-in forwards;
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
