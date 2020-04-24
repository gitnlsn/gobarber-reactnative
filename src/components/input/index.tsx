import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

const Input: React.FC<InputProps> = ({
    name,
    icon,
    ...props
}) => (
    <Container>
        <Icon
            name={icon}
            size={20}
            color="#66630"
        />

        <TextInput
            placeholderTextColor="#666360"
            {...props}
        />
    </Container>
);

export default Input;