import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  Alert,
} from 'react-native';
import { Background } from '../../components/Background';
import { BtnCount } from '../../components/BtnCount';
import { BtnPicker } from '../../components/BtnPicker';
import { BtnTrash } from '../../components/BtnTrash';
import { Button } from '../../components/Button';
import { ListProduct } from '../../components/ListProduct';
import { ModalPicker } from '../../components/ModalPicker';
import { StackPramsList } from '../../routes/app.routes';
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

  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [count, setCount] = useState(1);
  const [item, setItem] = useState<ItemProps[]>([]);

  const [category, setCategory] = useState<PickerProps [] | []>([]);
  const [categorySelected, setCategorySelected] = useState<PickerProps | undefined>();
  const [modalCategoryView, setModalCategoryView] = useState(false);

  const [product, setProduct] = useState<PickerProps [] | []>([]);
  const [productSelected, setProductSelected] = useState<PickerProps | undefined>();
  const [modalProductView, setModalProductView] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

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

    setItem(oldArray => [...oldArray, data]);
    setCount(1);
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete('/order/item', 
    {
      params:{
        item_id: item_id,
      }
    })

    // Após remover da api, removemos esse item da nossa lista de items
    let removeItem = item.filter( item => {
      return(item.id !== item_id)
    })

    setItem(removeItem)
  }

  async function handleFinishOrder() {    
    Alert.alert(
      "Finalizar Pedido",
      `Você deseja finalizar o pedido da mesa ${route.params.number}?`,
      [
      {
        text: 'Sim',
        onPress: () => handleConfirmFinish(),
      },
      {
        text: 'Não',
        onPress: () => setShowAlert(false),
      }
      ]
    )
  }

  async function handleConfirmFinish(){
    try{
      await api.put('/order', {
        order_id: route.params?.order_id 
      })

      setShowAlert(false);

      navigation.popToTop();

    }catch(err){
      console.log("ERRO AO FINALIZAR, tente mais tarde")
    }
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

          <View style={styles.areaList}>
            <Text style={styles.titleList}>
              Lista de Produtos:
            </Text>

            <ListProduct
              data={item}
              deleteItem={handleDeleteItem}
            />
          </View>

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