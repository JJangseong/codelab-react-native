import React, {useState} from 'react'
import Container from "../components/Container";
import Button from "../components/Button";
import Contents from "../components/Contents";
import styled from 'styled-components/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Label = styled.Text`
    font-size: 20px;
    font-weight: bold;
`

const Input = styled.TextInput`
    width: 100%;
    border: 1px solid #666666;
    padding: 4px;
    font-size: 20px;
    margin-bottom: 12px;
`

function Form({navigation}) {
    const [date, setDate] = useState('');
    const [text, setText] = useState('')

    const store = async () => {
        if (date === '' || text === '') return

        let list = await AsyncStorage.getItem("list")
        if(list === null) {list = []}
        else list = JSON.parse(list)

        list.push({
            date,
            text
        })
        await AsyncStorage.setItem('list', JSON.stringify(list))
        navigation.goBack()
    }

    return (
        <Container>
            <Contents>
                <Label>날짜</Label>
                <Input placeholder='YYYY-MM-DD'
                       value={date}
                       onChangeText={setDate}/>

                <Label>내용</Label>
                <Input multiline style={{height: 200}}
                       value-={text}
                       onChangeText={setText}/>
            </Contents>
            <Button onPress={store}>
                저장
            </Button>
        </Container>
    )
}

export default Form;
