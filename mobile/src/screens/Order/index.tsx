import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
} from 'react-native';
import { Background } from '../../components/Background';
import { BtnCount } from '../../components/BtnCount';
import { BtnPicker } from '../../components/BtnPicker';
import { BtnTrash } from '../../components/BtnTrash';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ModalPicker } from '../../components/ModalPicker';
import { Picker } from '../../components/Picker';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}

export type CategoryProps = {
  id: string;
  name: string;
}

export type ProductProps = {
  id: string;
  name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export function Order() {

  const route = useRoute<OrderRouteProps>();

  const navigation = useNavigation();

  const [count, setCount] = useState(1);

  const [category, setCategory] = useState<CategoryProps [] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
  const [modalCategoryView, setModalCategoryView] = useState(false);

  const [product, setProduct] = useState<ProductProps [] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [modalProductView, setModalProductView] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      const respose = await api.get('/category')

      setCategory(respose.data);
      setCategorySelected(respose.data[0])
    }

    loadCategory();
  }, [])

  useEffect(() => {
    async function loadProduct() {
      const respose = await api.get('/category/product', {
        params:{
          category_id: categorySelected?.id
        }
      })

      setProduct(respose.data);
      setProductSelected(respose.data[0])
    }

    loadProduct();
  }, [categorySelected])

  async function handleCloseOrder() {
    try{
      await api.delete('/order', {
        params:{
          order_id: route.params?.order_id
        }
      })

      navigation.goBack();

    }catch(err){
      console.log(err)
    }
  }

  //Contadores
  async function minus(){
    if(count > 0){
      setCount(count-1)
    }
  }
  async function plus(){
    setCount(count+1)
  }

  async function handleOrder() {
    alert("CLICOU!")
  }

  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item);
  }

  function handleChangeProduct(item: CategoryProps){
    setProductSelected(item);
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaTitle}>
            <Text style={styles.title}>
              Mesa {route.params.number}
            </Text>
            <BtnTrash
              onPress={handleCloseOrder}
            />
          </View>  
          
          {
            category.length !== 0 
          ?
            <BtnPicker
              title={categorySelected?.name}
              onPress={ () => setModalCategoryView(true) }
            />
          :
            <Text style={styles.text}>
              Nenhuma categoria cadastrada...
            </Text>
          }

          {
            category.length !== 0 || product.length !== 0
          ?
          <BtnPicker
            title={productSelected?.name}
            onPress={ () => setModalProductView(true) }
          />
          :
            <Text style={styles.text}>
              Nenhuma categoria ou produto cadastrado...
            </Text>
          }

          <View style={styles.areaBtn}>
            <BtnCount 
              minus={minus}
              plus={plus}
              count={count}
            />

            <Button
              onPress={handleOrder}
              title={"Adicionar Item"}
              activeOpacity={0.7}
            />
          </View>

          <View>
            <Text>
              Comentario: colocar Lista de itens como o Botão para finalizar o pedido. 
            </Text>
          </View>

          <Modal
            transparent={true}
            visible={modalCategoryView}
            animationType="fade"
          >
            <ModalPicker
              handleCloseModal={ () => setModalCategoryView(false)}
              options={category}
              selectedItem={handleChangeCategory}
            />
          </Modal>

          <Modal
            transparent={true}
            visible={modalProductView}
            animationType="fade"
          >
            <ModalPicker
              handleCloseModal={ () => setModalProductView(false)}
              options={product}
              selectedItem={handleChangeProduct}
            />
          </Modal>          

        </SafeAreaView>
    </Background>
  );
}