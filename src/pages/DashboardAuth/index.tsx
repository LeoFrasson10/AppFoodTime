import React, { useState, useRef, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import {
  Container,
  Text,
  Header,
  Category,
  CategoryText,
  Title,
  ContainerMain,
  Search,
  ProductList,
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
import beer from '../../assets/category/beber.png';
import food from '../../assets/category/massa.png';
import lunch from '../../assets/category/comida.png';
import past from '../../assets/category/pastelaria.png';

// import Input from '../../components/Input';
import api from '../../services/api';

export interface Itens {
  id: string;
  titulo: string;
  descritivo: string;
  preco: string;
  // eslint-disable-next-line camelcase
  categorias_id: string;
}
interface Categoria {
  id: string;
  descritivo: string;
}

const DashboardAuth: React.FC = () => {
  const formRef = useRef<FormHandles>();
  const [itens, setItens] = useState<Itens[]>([]);

  const loadItens = useCallback(() => {
    api.get('/').then(response => {
      setItens(response.data);
    });
  }, [setItens]);

  useEffect(() => {
    loadItens();
    // teste();
  }, [loadItens]);

  return (
    <>
      <Container>
        <Header style={{ justifyContent: 'flex-start' }}>
          <Text>Categorias</Text>
          <ContainerMain>
            <Category onPress={() => {}}>
              <Image source={food} />
              <CategoryText>Prato Feito</CategoryText>
            </Category>
            <Category onPress={() => {}}>
              <Image source={lunch} />
              <CategoryText>Lanches</CategoryText>
            </Category>
            <Category onPress={() => {}}>
              <Image source={past} />
              <CategoryText>Pastéris</CategoryText>
            </Category>
            <Category onPress={() => {}}>
              <Image source={beer} />
              <CategoryText>Bebidas</CategoryText>
            </Category>
          </ContainerMain>
        </Header>
        {/* <Search>
          <Form ref={formRef} onSubmit={() => {}}>
            <Input name="name" icon="search" placeholder="Pesquise aqui" />
          </Form>
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
                    <ProductPrice>{`R$ ${item.preco}`}</ProductPrice>
                    <ProductButton onPress={() => {}}>
                      <Icon size={25} name="plus" color="#000" />
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

export default DashboardAuth;
