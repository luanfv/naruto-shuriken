import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, RefreshControl, View, FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IShinobi, IRoutes } from '../../@types';
import {
  Footer,
  Card,
  Header,
  Body,
  Separator,
  Loading,
} from '../../components';
import { useShinobis } from '../../hooks/shinobis';
import { Spacing } from '../../components/styles';

const Home: React.FC = () => {
  const shinobisContext = useShinobis();
  const isFocused = useIsFocused();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'home'>>();

  const [shinobis, setShinobis] = useState<IShinobi[]>([]);
  const [shinobisToBattle, setShinobisToBattle] = useState<IShinobi[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const flatlistRef = useRef<FlatList>(null);

  const onResetShinobis = useCallback((allShinobis: IShinobi[]) => {
    setShinobisToBattle([]);
    setShinobis(allShinobis);
  }, []);

  const handleAddNinjaToBattle = useCallback((shinobi: IShinobi) => {
    setShinobis((oldState) =>
      oldState.filter((state) => state.id !== shinobi.id),
    );
    setShinobisToBattle((oldState) => [...oldState, shinobi]);
  }, []);

  const handleARemoveNinjaToBattle = useCallback((shinobi: IShinobi) => {
    setShinobisToBattle((oldState) =>
      oldState.filter((state) => state.id !== shinobi.id),
    );
    setShinobis((oldState) => [...oldState, shinobi]);
  }, []);

  const handleRefresh = useCallback(() => {
    try {
      setIsRefreshing(true);

      onResetShinobis(shinobisContext.shinobis);
    } finally {
      setIsRefreshing(false);
    }
  }, [shinobisContext.shinobis, onResetShinobis]);

  useEffect(() => {
    if (isFocused) {
      onResetShinobis(shinobisContext.shinobis);

      flatlistRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  }, [isFocused, shinobisContext, onResetShinobis]);

  return (
    <>
      <Header
        title="SELEÇÃO DE COMPETIDOERES"
        isDescriptionError={shinobisToBattle.length !== 8}
        description={`Shinobis selecionados: ${shinobisToBattle.length} de 8`}
      />

      {shinobisContext.status === 'loading' && <Loading />}

      {shinobisContext.status === 'fail' && (
        <Text>Falha ao buscar os shinobis</Text>
      )}

      {shinobisContext.status === 'success' && (
        <>
          <Body>
            <FlatList
              ref={flatlistRef}
              data={shinobis}
              ListHeaderComponent={() =>
                shinobisToBattle.length > 0 ? (
                  <>
                    {shinobisToBattle.map((shinobi) => (
                      <Card
                        key={String(shinobi.id)}
                        shinobi={shinobi}
                        onPress={() => handleARemoveNinjaToBattle(shinobi)}
                        isSelected
                        margin={1}
                      />
                    ))}

                    <Spacing>
                      <Separator />
                    </Spacing>
                  </>
                ) : (
                  <View />
                )
              }
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Card
                  shinobi={item}
                  onPress={() => handleAddNinjaToBattle(item)}
                  margin={1}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          </Body>

          <Footer
            text="Avançar"
            disabled={shinobisToBattle.length !== 8}
            onPress={() => navigate('battle', shinobisToBattle)}
          />
        </>
      )}
    </>
  );
};

export { Home };
