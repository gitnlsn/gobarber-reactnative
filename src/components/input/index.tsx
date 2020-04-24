import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
    useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueRef {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({
    name,
    icon,
    ...props
}, ref) => {
    const {
        fieldName,
        registerField,
        defaultValue,
        error,
    } = useField(name);

    useImperativeHandle(ref, () => ({
        focus() { inputElementRef.current.focus(); },
    }))

    const inputValueRef = useRef<InputValueRef>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: any) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, []);

    return (
        <Container
            isFocused={isFocused}
            isFilled={isFilled}
            isErrored={!!error}
        >
            <Icon
                name={icon}
                size={20}
                color={(isFocused || isFilled) ? '#FF9000' : '#666360'}
            />

            <TextInput
                ref={inputElementRef}
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...props}
            />
        </Container>
    );
}

export default forwardRef(Input);
