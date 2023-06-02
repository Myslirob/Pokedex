import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGrip } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { useAppContext } from 'src/appContext';
import { useDebounce } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { GET_POKEMON_TYPES } from 'src/api/queries';

export const Filter = () => {
    const { setFilter, filter, setView } = useAppContext();
    const { data } = useQuery(GET_POKEMON_TYPES);

    return (
        <Nav>
            <CenterDiv>
                <ButtonGroupWrapper>
                    <ButtonGroup onClick={() => setFilter({ isFavorite: false })} selected={!filter.isFavorite}>All</ButtonGroup>
                    <ButtonGroup onClick={() => setFilter({ isFavorite: true })} selected={filter.isFavorite}>Favorites</ButtonGroup>
                </ButtonGroupWrapper>
            </CenterDiv>
            <CenterDiv>
                { data !== undefined && (
                    <FilterGroupWrapper>
                        <Search />
                        <StyledSelect onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                            <option value="">All</option>
                            {data.pokemonTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                        </StyledSelect>
                        <IconButton onClick={() => setView('list')}><FontAwesomeIcon icon={faBars} size="lg" /></IconButton>
                        <IconButton onClick={() => setView('grid')}><FontAwesomeIcon icon={faGrip} size="lg" /></IconButton>
                    </FilterGroupWrapper>
                )}
            </CenterDiv>
        </Nav>
    );
};

const Search = () => {
    const { setFilter, filter } = useAppContext();
    const [value, setValue] = useState<string>('');
    const search = useDebounce<string>(value, 500);
    useEffect(() => {
        setFilter({ ...filter, name: search });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, setFilter]);

    return (
        <SearchInput onChange={(e) => setValue(e.target.value)} type="text" />
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

const ButtonGroup = styled.button<{ selected?: boolean; maxWidth?: number }>`
  border: 1px solid green;
  background-color: ${(props) => props.selected === true ? 'green' : 'white'};
  color: ${(props) => props.selected === true ? 'white' : 'green'};
  padding: 1rem;
  text-align: center;
  &:first-child {
    border-radius: 2rem 0 0 2rem;
  }
  &:last-child {
    border-radius: 0 2rem 2rem 0;
  }
  max-width: ${(props) => props.maxWidth ? props.maxWidth + 'px' : 'inherit'};
  width: 100%;
`;

const ButtonGroupWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: stretch;
  flex-grow: 1;
`;

const FilterGroupWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  box-shadow: none;
  border: solid 1px rgba(0, 0, 0, 0.23);
  height: 1.4375em;
  width: 100%;
  padding: 16.5px 14px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  cursor: text;
  border-radius: 6px;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 6px;
  background-color: white;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 2px 0px #eee;
  }
`;
