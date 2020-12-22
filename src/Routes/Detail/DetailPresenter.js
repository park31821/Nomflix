import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Hemlet, { Helmet } from "react-helmet";
import {Link,Route} from "react-router-dom";
import Trailers from "../../Components/Trailers";
import Productions from "../../Components/Productions";
import Collections from "../../Components/Collections";
import Seasons from "../../Components/Seasons";

const imdbIcon ="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png";

const isMovieLink = (id) =>(
  window.location.href.includes(`#/movie/${id}`)
)


const Icon = styled.img`
  height: 20px;
  
`;

const IconLink = styled.a`
  position:relative;
  top: 5px;
`;

const HomePage = styled.a`
  text-decoration:underline;
`;


const Data =styled.div`
    width:70%;
    margin-left:10px;
`;

const Title = styled.h3`
    font-size:32px;
    margin-bottom:10px;
`;

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin:0 10px;    
`;

const Overview = styled.p`
    font-size:12px;
    opacity:0.7;
    line-height:2;
    width:50%;
`;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const List = styled("ul")`
  display: flex;
`;

const Tab = styled("li")`
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#1abc9c" : "transparent")};
  color:white;
  font-size:15px;
`;

const TabContainer = styled("div")`
  margin: 20px 0px;
`;

const DetailPresenter = ({ result, loading, error }) =>
    error?(
        <>
        <Helmet>
          <title>Error | Nomflix</title>
        </Helmet>
        <h1>Error! No result was found.</h1>
        </>
    ):(
      loading ? (
      <>
      <Hemlet>
        <title>Loading | Nomflix</title>
      </Hemlet>
      <Loader />
      </>
    ) : (
      <Container>
        <Hemlet>
          <title>{result.original_title?result.original_title:result.original_name} | Nomflix</title>
        </Hemlet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : "../../public/noPoster.png"
            }
          />
          <Data>
            <Title>{result.original_title?result.original_title:result.original_name}</Title>
            <ItemContainer>
                <Item>{result.release_date?result.release_date.substring(0,4):result.first_air_date.substring(0,4)}</Item>
                <Divider>•</Divider>
                <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
                <Divider>•</Divider>
                <Item>
                    {result.genres && result.genres.map((genre,index)=>index===result.genres.length-1?genre.name:`${genre.name} / `)}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {result.imdb_id?(
                      <IconLink href={`https://www.imdb.com/title/${result.imdb_id}`}>
                        <Icon src={imdbIcon}/>
                      </IconLink>
                    ):(
                      <HomePage href={result.homepage}>Home Page</HomePage>
                    )}
                </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <TabContainer>
            <List>
              <Tab active={window.location.href.includes(`#/movie/${result.id}/trailers`) || window.location.href.includes(`/show/${result.id}/trailers`)}>
                <Link to={
                  isMovieLink(result.id)  ? `/movie/${result.id}/trailers` : `/show/${result.id}/trailers`
                  }>Trailers</Link>
              </Tab>
              <Tab active={window.location.href.includes(`/movie/${result.id}/productions`)  || window.location.href.includes(`/show/${result.id}/productions`)}>
                <Link to={
                  isMovieLink(result.id) ? `/movie/${result.id}/productions` : `/show/${result.id}/productions`
                }>Productions</Link>
              </Tab>
              {isMovieLink(result.id)?(
                (result.belongs_to_collection?( 
                <Tab active={window.location.href.includes(`/movie/${result.id}/collections`)}>
                  <Link to={`/movie/${result.id}/collections`}>Collections</Link>
                </Tab>
                ):null)
              ):(
                <Tab active={window.location.href.includes(`/show/${result.id}/seasons`)}>
                  <Link to={`/show/${result.id}/seasons`}>Seasons</Link>
                </Tab>
              )}
            </List>
            <Route path="/movie/:id/trailers">
              <Trailers videos={result.videos.results}/>
            </Route>
            <Route path="/show/:id/trailers">
              <Trailers videos={result.videos.results}/>
            </Route>
            <Route path="/movie/:id/productions">
                <Productions companies={result.production_companies} countries={result.production_countries}/>
            </Route>
            <Route path="/show/:id/productions">
                <Productions companies={result.production_companies} countries={result.production_countries}/>
            </Route>

            {result.belongs_to_collection?(
              <Route path="/movie/:id/collections">
                <Collections poster={result.belongs_to_collection.poster_path} name={result.belongs_to_collection.name}/>
              </Route>
            ):null}
            
            {result.seasons?(
              <Route path="/show/:id/seasons">
                <Seasons seasons={result.seasons}/>
              </Route>
            ):null}
            </TabContainer>
          </Data>
        </Content>
      </Container>
    )
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};
export default DetailPresenter;