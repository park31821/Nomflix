import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Videos = styled.iframe`
    height:300px;
    width:400px;
`;

const VideoContainer = styled.span`
    margin-right:15px;
    margin-bottom:15px;
`;

const Container = styled.div`
    font-size:12px;
    margin-right:15px;
    margin-top:20px;
`;

const Trailers = ({videos})=>(
    <Container>
        {videos.map(video=>(
            <VideoContainer key={video.id}>
                <Videos  src = {`https://www.youtube.com/embed/${video.key}`}></Videos>
            </VideoContainer>
        ))}
    </Container>
    
);

Trailers.propTypes = {
    videos: PropTypes.array
  };

export default Trailers;