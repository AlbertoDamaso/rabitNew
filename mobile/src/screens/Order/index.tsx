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
import { ListProduct } from '../../components/ListProduct';
import { ModalPicker } from '../../components/ModalPicker';
import { api } from '../../services/api';
import { styles } from './styles';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}

export type PickerProps = {
  id: string;
  name: string;
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: number;
}

type AlertProps = {
  text: string;
  onPress: () => void;
  style: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export function Order() {

  const route = useRoute<OrderRouteProps>();

  const navigation = useNavigation();

  const [count, setCount] = useState(1);
  const [item, setItem] = useState<ItemProps[]>([]);

  const [category, setCategory] = useState<PickerProps [] | []>([]);
  const [categorySelected, setCategorySelected] = useState<PickerProps | undefined>();
  const [modalCategoryView, setModalCategoryView] = useState(false);

  const [product, setProduct] = useState<PickerProps [] | []>([]);
  const [productSelected, setProductSelected] = useState<PickerProps | undefined>();
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

  function handleChangeCategory(item: PickerProps){
    setCategorySelected(item);
  }

  function handleChangeProduct(item: PickerProps){
    setProductSelected(item);
  }

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
    const respose = await api.post('/order/item', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: count
    })

    let data = {
      id: respose.data.id as string,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: count,
    }

    setItem(oldArray => [...oldArray, data])
  }

  async function handleFinishOrder() {    
    alert("CLICOU FINISH!")
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaTitle}>
            <Text style={styles.title}>
              Mesa {route.params.number}
            </Text>
            {item.length === 0 &&(
              <BtnTrash
                onPress={handleCloseOrder}
              />
            )}
          </View>  
          
          {category.length !== 0 
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

          {product.length !== 0
          ?
          <BtnPicker
            title={productSelected?.name}
            onPress={ () => setModalProductView(true) }
          />
          :
            <Text style={styles.text}>
              Nenhum produto cadastrado...
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

          <Text style={styles.titleList}>
            Lista de Produtos:
          </Text>

          <ListProduct
            data={item}
          />

          {item.length !== 0 &&(
            <Button
              onPress={handleFinishOrder}
              title={"Finalizar pedido"}
              activeOpacity={0.7}
            />
          )}
          
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