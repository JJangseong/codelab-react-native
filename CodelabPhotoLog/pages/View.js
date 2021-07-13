import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import storage from "../net/storage";
import { withContext } from "context-q";
import moment from "moment";


const Title = styled.Text`
  font-size: 36px;
`;
const Image = styled.Image`
  width: 100%;
  height: 360px;
`
const Tags = styled.Text`
  font-size: 18px;
`
const Date = styled.Text`
  color: #aaaaaa;
  font-size: 14px;
  text-align: right;
`

function View(props) {
  const [item,setItem] = useState(null);
  useEffect(() => {
    storage.readById(props.route.params.id)
      .then(data => setItem(data))

  }, [])
  return (
    <>
      { item && (
        <>
          <Image source={{uri: item.url}}/>
          {props.context.showDate && (<Date>{moment(item.id, 'x').format("YYYY년 MM월 DD일")}</Date>)}
          <Tags>{item.hashtags}</Tags>
        </>
      )}
    </>
  );
}

export default withContext(View);
