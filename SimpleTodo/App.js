import React, {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    flex: 1;
`

const Contents = styled.ScrollView`
  flex: 1;
  padding: 8px 24px;
`

const TodoItem = styled.View`
    flex-direction: row;
    align-items: center;
`

const TodoItemText = styled.Text`
    font-size: 20px;
    flex: 1;
`

const TodoItemButton = styled.Button``

const InputContainer = styled.View`
 flex-direction: row; 
 padding: 8px 24px;
`

const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  flex: 1;
`

const Button = styled.Button``

const TempText = styled.Text`
    font-size: 20px;
    margin-bottom: 12px;
`

export default function App() {
    const [list, setList] = useState([
        {id: 1, todo: '할 일 1'}
    ])
    const [inputTodo, setInputTodo] = useState()
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Contents>
                    {
                        list.map(({id, todo}) => {
                            return (
                                <TodoItem key={id}>
                                    <TodoItemText>{todo}</TodoItemText>
                                    <TodoItemButton title="삭제" onPress={() => {
                                        setList(list.filter((item => item.id !== id)))
                                    }}/>
                                </TodoItem>
                            )
                        })
                    }
                </Contents>
                <InputContainer>
                    <Input value={inputTodo} onChangeText={setInputTodo}/>
                    <Button title="전송" onPress={() => {
                        setList([...list, {id: new Date().getTime().toString(), todo: inputTodo}])
                        setInputTodo("")
                    }}/>
                </InputContainer>
            </KeyboardAvoidingView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
