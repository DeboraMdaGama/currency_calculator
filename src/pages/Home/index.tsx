import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Alert} from 'react-native';

import Picker from '../../components/Picker';
import { styles } from './styles';
import api from '../../services/api';

export default function Home() {
  const [moedas, setMoedas] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState('');
  const [moedaBValor, setMoedaBValor] = useState('');

  const [valorMoeda, setValorMoeda] = useState('0');
  const [valorConvertido, setValorConvertido] = useState('0');

  useEffect(()=>{
    async function loadMoedas(){
      const response = await api.get('all');
      
      let arrayMoedas:Array<Object> = []
      Object.keys(response.data).map((key:string)=>{
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })
      
      setMoedas(arrayMoedas);
      setLoading(false);


    }

    loadMoedas();
  }, []);


  async function converter(){
    if(moedaSelecionada === null || parseFloat(moedaBValor) === 0){
      Alert.alert('Por favor selecione uma moeda.');
      return;
    }
    
    //USD-BRL ele devolve quanto é 1 dolar convertido pra reais
    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    //console.log(response.data[moedaSelecionada].ask);

    const resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor)

    //Aqui ele fecha o teclado
    Keyboard.dismiss();


  }
 
  if(loading){
   return(
   <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
    <ActivityIndicator color="#FFF" size={45} />
   </View>
   )
 }else{
  return (
    <View style={styles.container}>
 
      <View style={styles.areaMoeda}>
       <Text style={styles.titulo}>Selecione sua moeda</Text>
       <Picker moedas={moedas} onChange={ (moeda:string) => setMoedaSelecionada(moeda) } />
      </View>
 
      <View style={styles.areaValor}>
       <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
       <TextInput
       placeholder="EX: 150"
       style={styles.input}
       keyboardType="numeric"
       onChangeText={ (valor:string) => setMoedaBValor(String(valor)) }
       />
      </View>
 
     <TouchableOpacity style={styles.botaoArea} onPress={converter}>
       <Text style={styles.botaoTexto}>Converter</Text>
     </TouchableOpacity>
 
      {parseFloat(valorConvertido) !== 0 && (
      <View style={styles.areaResultado}>
        <Text style={styles.valorConvertido}>
            {valorMoeda} {moedaSelecionada}
        </Text>
        <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 } ]}>
          Corresponde a
        </Text>
        <Text style={styles.valorConvertido}>
          {valorConvertido}
        </Text>
      </View>
      )}
 
    </View>
   );
 }

}
