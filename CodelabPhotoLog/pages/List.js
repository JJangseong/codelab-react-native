import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import storage from '../net/storage'

const Title = styled.Text`
  font-size: 36px;
`;
const Button = styled.Button``;

function List(props) {
  const [list, setList] = useState([])
  useEffect(() => {
    storage.readAll()
      .then(data => {
        setList(data)
      })
      .catch(error => {

      })
  }, [])
  return (
    <>
      <Title>
        리스트
      </Title>

      {
        list.map(item => (
          <Title key={item.id}>{item.hashtags}</Title>
        ))
      }

      <Button title="조회" onPress={() => props.navigation.navigate('View')}/>
      <Button title="신규 작성" onPress={() => props.navigation.navigate('Form')}/>
    </>
  );
}

export default List;
