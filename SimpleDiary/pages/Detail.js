import React from 'react'
import Container from "../components/Container";
import styled from "styled-components/native";
import Contents from "../components/Contents";

const Text = styled.Text`
    font-size: 20px;
    line-height: 28px;
`

function Detail({navigation}) {
    return (
        <Container>
            <Contents>
                <Text>asdasdasdasdasdasd</Text>
            </Contents>
        </Container>
    )
}

export default Detail;
