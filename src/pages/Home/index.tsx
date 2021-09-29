import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Alert } from 'react-native';

import Picker from '../../components/Picker';
import { styles } from './styles';
import api from '../../services/api';

interface ICurrency {
  key: string,
  label: string,
  value: string
}

export default function Home() {
  const [currency, setCurrency] = useState<ICurrency[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyValue, setCurrencyValue] = useState('');

  const [convertedValue, setConvertedValue] = useState('0');
  const [convertedCurrencyValue, setConvertedCurrencyValue] = useState('0');

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');

      let currencyData: Array<ICurrency> = []
      Object.keys(response.data).map((key: string) => {
        currencyData.push({
          key: key,
          label: key,
          value: key
        })
      })

      setCurrency(currencyData);
      setLoading(false);


    }

    loadMoedas();
  }, []);


  async function converter() {
    if (selectedCurrency === null || parseFloat(currencyValue) === 0) {
      Alert.alert('Por favor selecione uma moeda.');
      return;
    }

    //USD-BRL ele devolve quanto é 1 dolar convertido pra reais
    const response = await api.get(`all/${selectedCurrency}-BRL`);
    //console.log(response.data[moedaSelecionada].ask);

    const resultado = (response.data[selectedCurrency].ask * parseFloat(currencyValue));
    setConvertedCurrencyValue(`R$ ${resultado.toFixed(2)}`);
    setConvertedValue(currencyValue)

    //Aqui ele fecha o teclado
    Keyboard.dismiss();


  }

  function handlePickerValue(currency: string) {
    setSelectedCurrency(currency);
    setConvertedCurrencyValue('0');

  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <Picker currency={currency} onChange={(currency: string) => handlePickerValue(currency)} />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput
            placeholder="EX: 150"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(valor: string) => setCurrencyValue(String(valor))}
          />
        </View>

        <TouchableOpacity style={styles.botaoArea} onPress={converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {parseFloat(convertedCurrencyValue) !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {convertedValue} {selectedCurrency}
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              {convertedCurrencyValue}
            </Text>
          </View>
        )}

      </View>
    );
  }

}
