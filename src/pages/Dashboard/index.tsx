import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Text,
  Header,
  Category,
  CategoryText,
  ProductList,
  ContainerMain,
  Search,
  TextTodos,
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
  const { addToCart } = useCart();

  const formRef = useRef<FormHandles>();
  const [itens, setItens] = useState<Itens[]>([]);
  // const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isFilter, setIsFilter] = useState(true);
  const { user } = useAuth();
  const navigation = useNavigation();

  const loadItens = useCallback(() => {
    api.get('/').then(response => {
      setItens([]);
      setItens(response.data);
    });
  }, [setItens]);

  // const loadCategoria = useCallback(() => {
  //   api.get('/categoria').then(response => {
  //     setCategorias(response.data);
  //   });
  // }, [setCategorias]);

  useEffect(() => {
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

  const handlePratoFeito = useCallback(() => {
    api.get('/filter/1').then(response => {
      setItens([]);
      setItens(response.data);
    });
  }, [setItens]);

  const handlePastel = useCallback(() => {
    api.get('/filter/3').then(response => {
      setItens([]);
      setItens(response.data);
    });
  }, [setItens]);

  const handleBebida = useCallback(() => {
    api.get('/filter/4').then(response => {
      setItens([]);
      setItens(response.data);
    });
  }, [setItens]);

  const handleLanche = useCallback(() => {
    api.get('/filter/2').then(response => {
      setItens([]);
      setItens(response.data);
    });
  }, [setItens]);

  return (
    <>
      <Container>
        <Header style={{ justifyContent: 'flex-start' }}>
          <Text>Categorias</Text>
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
              <CategoryText>Pastéris</CategoryText>
            </Category>
            <Category onPress={handleBebida}>
              <Image source={beer} />
              <CategoryText>Bebidas</CategoryText>
            </Category>
          </ContainerMain>
        </Header>
        {/* <Search onPress={loadItens}>
          <TextTodos>Todos</TextTodos>
        </Search> */}

        <ProductContainer>
          <ItensList
            data={itens}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
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
                    </ProductButton>
                  </PriceContainer>
                </Product>
              );
            }}
          />
        </ProductContainer>

        {/* <ProductList>
              <Product>
                <ProductTitle>Picanha</ProductTitle>
                <DescriptionContainer>
                  <Description>
                    Arroz, feijão, filé de picanha e salada
                  </Description>
                </DescriptionContainer>
                <PriceContainer>
                  <ProductPrice>R$ 19,90</ProductPrice>
                  <ProductButton onPress={() => {}}>
                    <Icon size={25} name="plus" color="#000" />
                  </ProductButton>
                </PriceContainer>
              </Product>

              <Product>
                <ProductTitle>Picanha</ProductTitle>
                <DescriptionContainer>
                  <Description>
                    Arroz, feijão, filé de picanha e salada
                  </Description>
                </DescriptionContainer>
                <PriceContainer>
                  <ProductPrice>R$ 19,90</ProductPrice>
                  <ProductButton onPress={() => {}}>
                    <Icon size={25} name="plus" color="#000" />
                  </ProductButton>
                </PriceContainer>
              </Product>

              <Product>
                <ProductTitle>Picanha</ProductTitle>
                <DescriptionContainer>
                  <Description>
                    Arroz, feijão, filé de picanha e salada
                  </Description>
                </DescriptionContainer>
                <PriceContainer>
                  <ProductPrice>R$ 19,90</ProductPrice>
                  <ProductButton onPress={() => {}}>
                    <Icon size={25} name="plus" color="#000" />
                  </ProductButton>
                </PriceContainer>
              </Product>
            </ProductList> */}
      </Container>
      <Navigation />
    </>
  );
};

export default Dashboard;
