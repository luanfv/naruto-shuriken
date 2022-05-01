import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { IRoutes } from '../../@types';
import {
  Footer,
  Header,
  Body,
  Separator,
  CardBattle,
  Champion,
  Title,
} from '../../components';

const BattleResult: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'battleResult'>>();
  const { goBack, reset } =
    useNavigation<NavigationProp<IRoutes, 'battleResult'>>();
  const { spacing } = useTheme();

  const getTitleOfRound = useCallback((value, length) => {
    switch (value) {
      case 0:
        return 'Final';

      case 1:
        return 'Semifinal';

      default:
        return `${length - value}ª Rodada`;
    }
  }, []);

  return (
    <>
      <Header
        title="RESULTADO"
        leftComponent={
          <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />

      <Body>
        <ScrollView
          contentContainerStyle={{
            padding: spacing,
          }}
        >
          <Champion shinobi={params[0][0].winner} />

          {params.map((round, index) => {
            return (
              <View key={String(index)}>
                <Separator />

                <Title>{getTitleOfRound(index, params.length)}</Title>

                {round.map((item, index2) => (
                  <CardBattle key={index2} competitor={item} />
                ))}
              </View>
            );
          })}
        </ScrollView>
      </Body>

      <Footer
        text="Voltar para home"
        onPress={() => reset({ index: 1, routes: [{ name: 'home' }] })}
      />
    </>
  );
};

export { BattleResult };