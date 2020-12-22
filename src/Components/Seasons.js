import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Poster = styled.img`
    margin-bottom:15px;
    height:300px;
    width:auto;
    border-radius:4px;
    margin-left:5px;
    display:flex;
`;

const Item = styled.div`
    font-size:15px;
    margin-bottom:10px;
    margin-left:20px;
`;

const ItemContainer = styled.div`

`;

const Title = styled.div`
    font-size:15px;
    font-weight:600;
    margin-bottom:10px;
    margin-left:20px;
`;

const SeasonContianer=styled.span`
    float:left;
`;

const Container = styled.div`
    font-size:12px;
    margin-right:100px;
    margin-top:20px;
    justify-content:center;
`;

const Seasons = ({seasons})=>(
    <Container>
        {seasons.map(season=>(
            <SeasonContianer key={season.id}>
                <ItemContainer>
                    <Poster src = {season.poster_path?`https://image.tmdb.org/t/p/original${season.poster_path}`:"../assets/noPoster.jpg"}/>
                    <Title>{season.name}</Title>
                    <Item>Air Date: {season.air_date}</Item>
                    <Item>{season.episode_count} Episodes</Item>
                </ItemContainer>
            </SeasonContianer>
        ))}
    </Container>
);

Seasons.propTypes = {
    seasons: PropTypes.array
  };

export default Seasons;