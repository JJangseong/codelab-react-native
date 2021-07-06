import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

const MovieName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

function BoxOffice(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=8ea0b3b2558da6365800af563e45aca6&targetDt=20210701")
      .then(({ data }) => {
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
