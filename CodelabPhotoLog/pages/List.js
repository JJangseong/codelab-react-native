import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import storage from '../net/storage'
import { withContext } from "context-q";
import moment from "moment";

const Title = styled.Text`
  font-size: 36px;
`;
const Button = styled.Button``;
const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5; 
  justify-content: space-between;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 12px;
`
const Tags = styled.Text`
  
`
const Date = styled.Text`
  color: #aaaaaa;
  margin-right: 12px;
`

function List(props) {
  const [list, setList] = useState([])
  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      storage.readAll()
        .then(data => {
          setList(data)
        })
        .catch(error => {

        })
    });
    return () => unsubscribe;
  }, [])
  return (
    <>
      {
        list.map(item => (
          <ListItem key={item.id} onPress={() => props.navigation.navigate('View', {id: item.id})}>
            <Row>
            <Thumbnail source={{uri: item.url}} />
            <Tags>
              {item.hashtags}
            </Tags>
            </Row>
            {
              props.context.showDate && (<Date>{moment(item.id, 'x').format("YYYY년 MM월 DD일")}</Date>)
            }
          </ListItem>
        ))
      }
      <Button title="사진 추가" onPress={() => props.navigation.navigate('Form')}/>
      <Button title="설정" onPress={() => props.navigation.navigate('Settings')}/>
    </>
  );
}

export default withContext(List);
