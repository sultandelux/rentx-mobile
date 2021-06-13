import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Logo from '../../assets/logo.svg';
import * as S from './styles';
import { ContextProps } from './types';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { Car } from '../../components/Car';
import { LoadAnimate } from '../../components/LoadAnimate';

export const Home = () => {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const animatedButton = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: ContextProps) => {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive: (event, ctx: ContextProps) => {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd: () => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const loadCars = async (isMonted: boolean) => {
    try {
      const { data } = await api.get('cars');
      if (isMonted) {
        setCars(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (isMonted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMonted = true;
    loadCars(isMonted);
    return () => {
      isMonted = false;
    };
  }, []);

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <Logo
          width={RFValue(108)}
          height={RFValue(12)}
          style={{ marginRight: 'auto' }}
        />
        {!isLoading && <S.TotalCars>Total de {cars.length} carros</S.TotalCars>}
      </S.Header>
      {isLoading ? (
        <LoadAnimate />
      ) : (
        <S.CarsList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item: car }) => (
            <Car data={car} onPress={() => navigate('CarDetails', { car })} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <S.MyRents style={animatedButton}>
          <S.MyRentsButton onPress={() => navigate('SchedulesList')}>
            <S.CarIcon name="ios-car-sport" />
          </S.MyRentsButton>
        </S.MyRents>
      </PanGestureHandler>
    </S.Container>
  );
};
