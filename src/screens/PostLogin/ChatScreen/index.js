import {Container} from '@app/components';
import {IMAGES} from '@app/resources';
import PageTitle from '@app/screens/atoms/PageTitle';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Header from './Header';
import {EmptyList, FooterList, RenderItem, Seprator} from './commn';

const DATA = [
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
];

const ChatScreen = ({navigation}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(DATA);
  }, []);

  const onLoadMore = () => {
    console.log('Load More');
    setConversations([...conversations, ...DATA]);
  };

  return (
    <Container useSafeAreaView={true}>
      <Header />
      <PageTitle title={'Chats'} />
      <FlatList
        data={conversations}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
        ListEmptyComponent={EmptyList}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ItemSeparatorComponent={Seprator}
        ListFooterComponent={FooterList}
      />
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
