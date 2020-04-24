import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
    padding: 16px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px auto 24px;

    padding: 0 30px;
`;

export const LogoImage = styled.Image`
    margin: 8px auto;
`;

export const CreateAccountButton = styled.TouchableOpacity`
    margin-top: 24px;
    background: #312E38;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CreateAccountText = styled.Text`
    color: #F4EDE8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;
