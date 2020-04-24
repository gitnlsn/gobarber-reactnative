import React, { useCallback, useRef } from 'react';
import { TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
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
    ForgotPasswordContainer,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountText,
} from './styles';


interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const { navigate } = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error));
                console.log(error);
            }
            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, cheque as credenciais.',
            );
        }
    }, []);


    const signIn = useCallback(async (data) => {
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
                <Title>{'Faça seu logon'}</Title>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        textContentType="emailAddress"
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
                        {'Entrar'}
                    </Button>
                </Form>


                <ForgotPasswordContainer
                    onPress={() => console.log('Forgot password clicked')}
                >
                    <ForgotPasswordText>
                        {'Esqueci minha senha'}
                    </ForgotPasswordText>
                </ForgotPasswordContainer>

                <CreateAccountButton
                    onPress={() => { navigate('SignUp'); }}
                >
                    <Icon name="log-in" size={20} />
                    <CreateAccountText>
                        {'Criar uma conta'}
                    </CreateAccountText>
                </CreateAccountButton>

            </ScrollView>
        </Container>
    );
}

export default SignIn;
