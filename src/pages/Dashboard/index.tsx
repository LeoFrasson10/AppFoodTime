import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Image, ToastAndroid, LogBox, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/FontAwesome';

// import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Text,
  Header,
  Category,
  CategoryText,
  ContainerMain,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  ProductContainer,
  DescriptionContainer,
  Description,
  ItensList,
} from './styles';

import Navigation from '../../components/Navigation';
import full from '../../assets/category/full2.png';
import beer from '../../assets/category/beber.png';
import food from '../../assets/category/massa.png';
import lunch from '../../assets/category/comida.png';
import past from '../../assets/category/pastelaria.png';
import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';

// import Input from '../../components/Input';
import api from '../../services/api';

export interface Itens {
  id: string;
  titulo: string;
  descritivo: string;
  preco: number;
  // eslint-disable-next-line camelcase
  categorias_id: string;
}
interface Categoria {
  id: string;
  descritivo: string;
  status: string;
}

const Dashboard: React.FC = () => {
  LogBox.ignoreAllLogs();
  const { addToCart } = useCart();

  // const formRef = useRef<FormHandles>();
  const [itens, setItens] = useState<Itens[]>([]);
  // const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { user } = useAuth();
  const navigation = useNavigation();

  const loadItens = useCallback(async () => {
    setItens([]);
    const valor = await api.get('/');
    setItens(valor.data);
  }, [setItens]);

  // const loadCategoria = useCallback(() => {
  //   api.get('/categoria').then(response => {
  //     setCategorias(response.data);
  //   });
  // }, [setCategorias]);

  useEffect(() => {
    setItens([]);
    loadItens();
  }, [loadItens]);

  function handleAddToCart(item: Itens): void {
    if (user) {
      // api.get(`user/${user.email}`).then(response => {
      //   console.log(response.data);
      // });
      addToCart(item);
      ToastAndroid.showWithGravity(
        'Item adicionado ao carrinho!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      navigation.navigate('SignIn');
    }
  }

  const handlePratoFeito = useCallback(async () => {
    const valor = await api.get('/filter/1');
    setItens([]);
    setItens(valor.data);
  }, [setItens]);

  const handlePastel = useCallback(async () => {
    const valor = await api.get('/filter/3');
    setItens([]);
    setItens(valor.data);
  }, [setItens]);

  const handleBebida = useCallback(async () => {
    const valor = await api.get('/filter/4');
    setItens([]);
    setItens(valor.data);
  }, [setItens]);

  const handleLanche = useCallback(async () => {
    const valor = await api.get('/filter/2');
    setItens([]);
    setItens(valor.data);
  }, [setItens]);

  return (
    <>
      <Container>
        <Header style={{ justifyContent: 'flex-start' }}>
          <Text>Categorias</Text>
          <ScrollView horizontal style={{marginLeft: "-34%"}}>
          <ContainerMain>
            <Category onPress={loadItens}>
              <Image source={full} />
              <CategoryText>Todos</CategoryText>
            </Category>
            <Category onPress={handlePratoFeito}>
              <Image source={food} />
              <CategoryText>Prato Feito</CategoryText>
            </Category>
            <Category onPress={handleLanche}>
              <Image source={lunch} />
              <CategoryText>Lanches</CategoryText>
            </Category>
            <Category onPress={handlePastel}>
              <Image source={past} />
              <CategoryText>Pastéis</CategoryText>
            </Category>
            <Category onPress={handleBebida}>
              <Image source={beer} />
              <CategoryText>Bebidas</CategoryText>
            </Category>
            
          </ContainerMain>
          </ScrollView>
        </Header>
        {/* <Search onPress={loadItens}>
          <TextTodos>Todos</TextTodos>
        </Search> */}
        <ProductContainer>
          <ItensList
            data={itens}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={itens.length}
            renderItem={({ item }: { item: Itens }) => {
              return (
                <Product key={item.id}>
                  <ProductTitle>{item.titulo}</ProductTitle>
                  <DescriptionContainer>
                    <Description>{item.descritivo}</Description>
                  </DescriptionContainer>
                  <PriceContainer>
                    <ProductPrice>{`R$ ${item.preco},00`}</ProductPrice>
                    <ProductButton onPress={() => handleAddToCart(item)}>
                      <Icon size={30} name="plus" color="#000" />
                      {/* <Icon size={30} name="shopping-cart" color="#000" /> */}
                    </ProductButton>
                  </PriceContainer>
                </Product>
              );
            }}
          />
        </ProductContainer>
      </Container>
      <Navigation />
    </>
  );
};

export default Dashboard;
