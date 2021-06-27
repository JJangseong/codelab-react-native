import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

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

const Check = styled.TouchableOpacity`
    margin-right: 4px;
`

const CheckIcon = styled.Text`
    font-size: 20px
`

export default function App() {
    const [list, setList] = useState([])
    const [inputTodo, setInputTodo] = useState()

   useEffect(() => {
       AsyncStorage.getItem('list')
           .then( data => {
               if(data) setList(JSON.parse(data))
           })
           .catch(e => {alert(e.message)})
   }, [])

    const store = (newList)=> {
        setList(newList);
        AsyncStorage.setItem('list', JSON.stringify(newList))
    }

    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Contents>
                    {
                        list.map(({id, todo, done}) => {
                            return (
                                <TodoItem key={id}>
                                    <Check onPress={() => {
                                        store(list.map(item => item.id === id ? {...item, done: !done} : {...item}))
                                    }}>
                                        <CheckIcon>{done ? '✅' : "☑️" }</CheckIcon>
                                    </Check>
                                    <TodoItemText>{todo}</TodoItemText>
                                    <TodoItemButton title="삭제" onPress={() => {
                                        store( _.reject(list, element => element.id === id) )
                                    }}/>
                                </TodoItem>
                            )
                        })
                    }
                </Contents>
                <InputContainer>
                    <Input value={inputTodo} onChangeText={setInputTodo}/>
                    <Button title="전송" onPress={() => {
                        const newTodo =[...list, {id: new Date().getTime().toString(), todo: inputTodo, done: false}]
                        store(newTodo)
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
