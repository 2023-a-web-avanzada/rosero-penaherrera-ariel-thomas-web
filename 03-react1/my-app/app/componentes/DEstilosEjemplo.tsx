'use client'
import styled from "@emotion/styled";
import { css } from '@emotion/react'
//import cStyles from './c_estilos.module.css'

const pinkStyle = css`
    color: pink;
`
const TituloNaranja = styled.h1`
    color: orange;
    font-size: 8px;
`
const TituloVerde = styled.h2`
    color: green;
    font-size: 10px;
`
export default function DEstilosEjemplo(){
    return(
        <>
            <TituloNaranja> Titulo 1</TituloNaranja>
            <TituloVerde> Titulo 2</TituloVerde>
            <div css={pinkStyle}>
                Texto Pink
            </div>
        </>
    )
}