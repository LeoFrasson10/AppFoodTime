import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  preco: number;
  // eslint-disable-next-line camelcase
  categorias_id: string;
}
interface Categoria {
  id: string;
  descritivo: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>();
  const [itens, setItens] = useState<Itens[]>([]);

  useEffect(() => {
    api.get('/').then(response => {
      setItens(response.data);
    });
  }, []);

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
        <ScrollView>
          <Title>Prato Feito</Title>
          <ProductContainer>
            <ItensList
              data={itens}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ProductList>
                  <Product>
                    <ProductTitle>{item.titulo}</ProductTitle>
                    <DescriptionContainer>
                      <Description>{item.descritivo}</Description>
                    </DescriptionContainer>
                    <PriceContainer>
                      <ProductPrice>
                        R$
                        {item.preco}
                      </ProductPrice>
                      <ProductButton onPress={() => {}}>
                        <Icon size={25} name="plus" color="#000" />
                      </ProductButton>
                    </PriceContainer>
                  </Product>
                </ProductList>
              )}
            />

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
          </ProductContainer>
        </ScrollView>
      </Container>
      <Navigation />
    </>
  );
};

export default Dashboard;
