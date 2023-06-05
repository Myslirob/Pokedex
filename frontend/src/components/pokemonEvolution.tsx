import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { PokemonCard } from 'src/elements/card/pokemonCard';
import { IconButton } from 'src/elements/input/button/iconButton';
import { ImageWrapper } from 'src/elements/card/imageWrapper';
import { DescriptionWrapper } from 'src/elements/card/descriptionWrapper';
import { Title } from 'src/elements/card/title';

import type { PokemonByNameQuery } from 'src/__generated__/graphql';

type Props = {
    favoritePokemon: (pokemon: NonNullable<PokemonByNameQuery['pokemonByName']>['evolutions'][0]) => void;
    pokemon: NonNullable<PokemonByNameQuery['pokemonByName']>['evolutions'][0];
};

export const PokemonEvolution = ({ pokemon, favoritePokemon }: Props) => {
    return (
        <Link href={`/${pokemon.name}`}>
            <PokemonCard>
                <ImageWrapper>
                    <img alt={pokemon.name} src={pokemon.image} />
                </ImageWrapper>
                <DescriptionWrapper>
                    <Title>
                        <b>{pokemon.name}</b><br />
                    </Title>
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

