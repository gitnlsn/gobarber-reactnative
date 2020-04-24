import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';
import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Image source={logoImg} />
            <Title>Faça seu logon</Title>

            <Input
                name="email"
                icon="mail"
                keyboardType="email-address"
                placeholder="E-mail"
                textContentType="emailAddress"
            />

            <Input
                name="password"
                icon="lock"
                autoCompleteType="password"
                secureTextEntry={true}
                placeholder="Password"
                textContentType="password"
            />

            <Button
                onPress={() => console.log('Button pressed')}
            >
                Entrar
            </Button>
        </Container>
    );
}

export default SignIn;
