import React, { useCallback, useRef } from 'react';
import { TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';
import Button from '../../components/button';
import Input from '../../components/input';
import getValidationErrors from '../../utils/getvalidationErrors';

import {
    Container,
    LogoImage,
    Title,
    CreateAccountButton,
    CreateAccountText,
} from './styles';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const {
        navigate,
    } = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('senha obrigatória')
                    .min(6, 'No mínimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signUp({
                name: data.name,
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error));
                console.log(error);
            }

            Alert.alert(
                'Erro no Cadastros',
                'Ocorreu um erro ao fazer cadastro.',
            );
        }
    }, []);

    const signUp = useCallback(async (data) => {
        console.log(data);
    }, []);

    return (
        <Container>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LogoImage source={logoImg} />
                <Title>{'Crie sua conta'}</Title>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="name"
                        icon="user"
                        placeholder="Nome"
                        textContentType="username"
                        autoCapitalize="words"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={() => emailInputRef.current?.focus()}
                    />

                    <Input
                        ref={emailInputRef}
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                    />

                    <Input
                        ref={passwordInputRef}
                        name="password"
                        icon="lock"
                        placeholder="Password"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        textContentType="password"
                        onSubmitEditing={() => formRef.current?.submitForm()}
                    />

                    <Button
                        onPress={() => formRef.current?.submitForm()}
                    >
                        {'Cadastrar'}
                    </Button>
                </Form>

                <CreateAccountButton
                    onPress={() => { navigate('SignIn'); }}
                >
                    <Icon name="log-in" size={20} />
                    <CreateAccountText>{'Voltar para logon'}</CreateAccountText>
                </CreateAccountButton>

            </ScrollView>
        </Container>
    );
}

export default SignUp;
