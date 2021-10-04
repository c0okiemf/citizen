import React, { useState } from 'react'
import styled from 'styled-components'
import searchIcon from 'assets/search.svg'
import clearIcon from 'assets/clear.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { IncidentsContext } from 'pages'

const StyledIncidentsSearch = styled.div`
    position: relative;
    margin: 15px 0 15px 15px;
`

const SearchInput = styled.input`
    padding: 0 16px;
    border-radius: 0.25rem;
    border: 2px solid transparent;
    height: 40px;
    background-color: #11141a;
    color: #ffffff;
    width: 100%;
    padding-left: 40px;
    outline: none;

    &:focus {
        border: 2px solid #8d9299;
    }
`

const SearchImageContainer = styled.div`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(76, 81, 89, 0.6);
`

const ClearButon = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    padding: 0;
    z-index: 1;
`

export const IncidentsSearch = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { applySearchTerm } = useContext(IncidentsContext)

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm((e.target as HTMLInputElement).value)
    }

    const handleApply = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            applySearchTerm((e.target as HTMLInputElement).value)
        }
    }

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        applySearchTerm('')
        setSearchTerm('')
    }

    return (
        <StyledIncidentsSearch>
            <SearchImageContainer>
                <Image src={searchIcon} alt="search" />
            </SearchImageContainer>
            <SearchInput
                type="text"
                placeholder="Search incidents"
                onKeyDown={handleApply}
                value={searchTerm}
                onInput={handleInput}
            />
            <ClearButon onClick={handleClear}>
                <Image src={clearIcon} alt="clear" />
            </ClearButon>
        </StyledIncidentsSearch>
    )
}
