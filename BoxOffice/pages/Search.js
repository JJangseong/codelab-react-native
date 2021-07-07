import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import Title from "../components/Title";
import Row from "../components/Row";
import ListItem from "../components/ListItem";
import MovieName from "../components/MovieName";
import axios from "axios";
import Constants from "../Constants";
import { ActivityIndicator } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;

`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;


function Search(props) {
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const search = useCallback(async () => {
    try {
      console.log(keyword)
      setIsLoading(true)
      const data = await fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${Constants.key}&movieNm=${keyword}`)
      setList(data.movieListResult.movieList)
      setIsLoading(false)
    }catch (e) {
      alert(e.message)
    }
  }, [])

  return (
    <Container>
      <Title>
        영화 검색
      </Title>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)}/>
        <Button title="검색" onPress={search} />
      </Row>
      {
        isLoading ? (<ActivityIndicator size='large'/>) : (
          list.map(item => {
            return (
              <ListItem key={item.movieCd} onPress={() => {
                props.navigation.navigate('MovieDetail', {movieCd: item.movieCd})
              }}>
                <MovieName>{item.movieNm}</MovieName>
              </ListItem>
            )
          })
        )
      }

    </Container>
  );
}

export default Search;
