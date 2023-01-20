import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity as TO
} from 'react-native';
import { styles } from './styles';
import { CategoryProps } from '../../screens/Order';

interface ModalPickerProps{
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps){
        selectedItem(item)
        handleCloseModal();
    }

    const option = options.map((item, index) => (
        <TO 
         style={styles.option}
         key={index}
         onPress={ () => onPressItem(item)} 
        >
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TO>
    ))

    return (
        <TO 
        style={styles.container} 
        onPress={handleCloseModal}
        >
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TO>
    );
}