import React from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';

import { Container, Header, Title, SubTitle, Footer, Form } from './styles';

export function SignIn() {
  return (
    <KeyboardAvoidingView>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <Title>
            Estamos
            {'\n'}quase lá.
          </Title>
          <SubTitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <PasswordInput
            iconName="lock"
            autoCorrect={false}
            placeholder="Senha"
            autoCapitalize="none"
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            onPress={() => {}}
            enabled={false}
            loading={false}
          />
          <Button
            title="Criar conta gratuita"
            onPress={() => {}}
            color={theme.colors.background_secondary}
            enabled={false}
            loading={false}
            light
          />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
}
