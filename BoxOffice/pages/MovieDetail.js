import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import moment from 'moment'
import Title from "../components/Title";
import Constants from "../Constants";
import fetch from "../net/fetch";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Description = styled.Text`
  font-size: 18px;
  margin: 4px 12px;
  line-height: 26px;
`;

const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackLabel = styled.Text`
  font-size: 18px;
  color: #0000cc;
`

const Header = styled.View`
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;  
`

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

function MovieDetail(props) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const movieCd = props.route.params.movieCd;
    fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${Constants.key}&movieCd=${movieCd}`)
      .then(( data ) => {
        setInfo(data.movieInfoResult.movieInfo);
      })
      .catch(error => alert(error.message));
  }, []);
  return (
    <Container>
      <Header>
        <Back onPress={() => props.navigation.goBack()}>
          <BackLabel>{"<"}</BackLabel>
        </Back>
        <HeaderTitle>
          영화 정보 조회
        </HeaderTitle>
      </Header>
      <Contents>
        {info === null ? (<ActivityIndicator size="large" />) : (
          <>
            <Title>{info.movieNm}</Title>
            <Description>제작년도 : {info.prdtYear}년</Description>
            <Description>개봉일 : {moment(info.openDt).format("YYYY년 MM월 DD일")}</Description>
            <Description>상영시간 : {info.showTm}분</Description>
            <Description>국가 : {info.nations.map(nation => nation.nationNm).join(', ')}</Description>
            <Description>감독 : {info.directors.map(item => item.peopleNm).join(', ')}</Description>
            <Description>출현 : {info.actors.map(item => item.peopleNm).join(', ')}</Description>
          </>
        )}

      </Contents>
    </Container>
  );
}

export default MovieDetail;
