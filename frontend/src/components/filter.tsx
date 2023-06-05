import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCamera, faGrip } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { useAppContext } from 'src/providers/appContext';
import { useDebounce } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { GET_POKEMON_TYPES } from 'src/api/query';
import { GroupButton } from 'src/elements/input/button/groupButton';
import { IconButton } from 'src/elements/input/button/iconButton';
import { Search } from 'src/elements/input/search';
import { Select } from 'src/elements/input/select';

import { useImageRecognizer } from './pokemonRecognizer';

export const Filter = () => {
    const { setFilter, filter, setView } = useAppContext();
    const { data } = useQuery(GET_POKEMON_TYPES);
    const { show, Component } = useImageRecognizer();
    return (
        <>
            {Component}
            <Nav>
                <CenterDiv>
                    <ButtonGroupContainer>
                        <GroupButton color={filter.isFavorite ? 'white' : 'green'} onClick={() => setFilter({ isFavorite: false })}>All</GroupButton>
                        <GroupButton color={filter.isFavorite ? 'green' : 'white'} onClick={() => setFilter({ isFavorite: true })}>Favorites</GroupButton>
                    </ButtonGroupContainer>
                </CenterDiv>
                <CenterDiv>
                    { data !== undefined && (
                        <FilterGroupContainer>
                            <IconButton onClick={show}><FontAwesomeIcon icon={faCamera} size="lg" /></IconButton>
                            <SearchComponent />
                            <Select onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                                <option value="">All</option>
                                {data.pokemonTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                            </Select>
                            <IconButton onClick={() => setView('list')}><FontAwesomeIcon icon={faBars} size="lg" /></IconButton>
                            <IconButton onClick={() => setView('grid')}><FontAwesomeIcon icon={faGrip} size="lg" /></IconButton>
                        </FilterGroupContainer>
                    )}
                </CenterDiv>
            </Nav>
        </>
    );
};

const SearchComponent = () => {
    const { setFilter, filter } = useAppContext();
    const [value, setValue] = useState<string>('');
    const search = useDebounce<string>(value, 500);
    useEffect(() => {
        setFilter({ ...filter, name: search });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, setFilter]);

    return (
        <Search onChange={(e) => setValue(e.target.value)} type="text" />
    );
};

const Nav = styled.nav`
  position: sticky;
  border-bottom: 1px solid #0000002b;
  box-shadow: 0px 0px 9px #0000002b;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ButtonGroupContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: stretch;
  flex-grow: 1;
`;

const FilterGroupContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  gap: 10px;
`;

