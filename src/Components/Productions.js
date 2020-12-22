import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.h1`
    font-size:30px;
`;

const CountriesContainer = styled.div`
    margin-top:20px;
    font-size:20px;
    font-weight:bold;

`;

const CompaniesContainer = styled.div`
    margin-top:10px;
    font-size:20px;
    font-weight:bold;
`;

const Company = styled.span`
    margin-left:10px;
    font-weight:normal;
`;

const Country = styled.span`
    margin-left:10px;
    font-weight:normal;
`;

const Container = styled.div`
    margin-right:15px;
    margin-top:20px;
`;

const Productions = ({companies,countries})=>(
    <Container>
        <Title>Productions</Title>
        <CountriesContainer>
            Country:  
            <Country>
                {countries.map((country,index)=>index===countries.length-1?country.name:`${country.name} / `)}
            </Country>
        </CountriesContainer>
        <CompaniesContainer>
            Company:  
            <Company>
                {companies.map((company,index)=>index===companies.length-1?company.name:`${company.name} / `)}
            </Company>
        </CompaniesContainer>
    </Container>
    
);

Productions.propTypes = {
    companies: PropTypes.array,
    countries: PropTypes.array
  };

export default Productions;