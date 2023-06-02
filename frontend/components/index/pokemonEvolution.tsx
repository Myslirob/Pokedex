import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

import { PokemonCard } from '../../elements/card/pokemonCard';

import type { PokemonByNameQuery } from 'src/__generated__/graphql';

type Props = {
    favoritePokemon: (pokemon: NonNullable<PokemonByNameQuery['pokemonByName']>['evolutions'][0]) => void;
    pokemon: NonNullable<PokemonByNameQuery['pokemonByName']>['evolutions'][0];
};

export const PokemonEvolution = ({ pokemon, favoritePokemon }: Props) => {
    return (
        <Link href={`/${pokemon.name}`}>
            <PokemonCard $mode="grid">
                <ImageWrapper $mode="grid">
                    <img alt={pokemon.name} src={pokemon.image} />
                </ImageWrapper>
                <DescriptionWrapper>
                    <TitleWrapper>
                        <b>{pokemon.name}</b><br />
                    </TitleWrapper>
                    <IconButton><FontAwesomeIcon color="red" icon={pokemon.isFavorite ? fullHeart : emptyHeart} onClick={(e) => {
                        e.preventDefault();
                        favoritePokemon(pokemon);
                    }} size="xl"
                    /></IconButton>
                </DescriptionWrapper>
            </PokemonCard>
        </Link>
    );
};

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

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #d5e6d196;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
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
`;
