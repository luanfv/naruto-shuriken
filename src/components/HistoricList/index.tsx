import React from 'react';
import { FlatList } from 'react-native';

import { IHistoricList } from '@src/@types/components';
import { Loading } from '@src/components/Loading';
import { Separator } from '@src/components/styles';
import { NotFound, NotFoundAnimation, Title } from './styles';
import { HistoricItem } from './Item';

const HistoricList: React.FC<IHistoricList> = ({ status, items }) => {
  if (status === 'loading') {
    return <Loading />;
  }

  if (items.length === 0) {
    return (
      <>
        <Title>Meu histórico</Title>

        <NotFound>
          <NotFoundAnimation
            source={require('@src/assets/animations/not_found.json')}
            autoPlay
            loop={false}
          />
        </NotFound>
      </>
    );
  }

  if (status === 'success') {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        ListHeaderComponent={() => (
          <>
            <Title>Meu histórico</Title>

            <Separator />
          </>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoricItem
            id={item.id}
            winner={item.winner}
            length={item.length}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }

  return <></>;
};

export { HistoricList };
