import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Poster = styled.img`
    margin-bottom:15px;
    height:300px;
    width:auto;
    border-radius:4px;
    margin-left:5px;
`;

const Title = styled.h1`
    font-size:15px;
    margin-bottom:10px;
`;

const Container = styled.div`
    font-size:12px;
    margin-left:50px;
    margin-top:20px;
    justify-content:center;
`;

const Collections = ({poster,name})=>(
    <Container>
        <Title>{name}</Title>
        <Poster src = {`https://image.tmdb.org/t/p/original${poster}`}/>
    </Container>
);

Collections.propTypes = {
    poster: PropTypes.string,
    name: PropTypes.string
  };

export default Collections;