import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import Title from "../components/Title";
import ListItem from "../components/ListItem";
import MovieName from "../components/MovieName";
import Constants from "../Constants";
import fetch from "../net/fetch";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

function BoxOffice(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${Constants.key}&targetDt=20210701`)
      .then((data) => {
        setList(data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  return (
    <Container>
      <Contents>
        <Title>BoxOffice</Title>
        { list.length === 0 && <ActivityIndicator size='large'/> }
        {
          list.map(movie => {
            return (
              <ListItem key={movie.movieCd} onPress={() => {
                props.navigation.navigate('MovieDetail', {movieCd: movie.movieCd})
              }}>
                <Rank>{movie.rank}</Rank>
                <MovieName>{movie.movieNm}</MovieName>
              </ListItem>
            );
          })
        }
      </Contents>
    </Container>
  );
}

export default BoxOffice;
