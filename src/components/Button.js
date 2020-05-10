import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Text, ActivityIndicator, View} from 'react-native';


export default class TFTButton extends PureComponent {
  render() {
    let {style, title, onPress, isLoading, disabled, disabledUI, textStyle, bold, value, icon, grey, row, text, isrightAligned = false} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        style={[isrightAligned ? styles.leftAlignedContainer : styles.container, style, disabledUI ? styles.disabled : {}, grey ? styles.grey : {}, isrightAligned ? { width: 120 } : row ? {flex: 1} : {width: '100%'}]}
        onPress={onPress}>
        {icon != null && <View style={styles.icon}>{icon}</View>}
        {isLoading && <ActivityIndicator color="white" style={styles.spinner} />}
        <Text style={[styles.buttonText, textStyle, bold ? styles.btnStyle : {}, grey ? styles.greyText : {}]}>{title}</Text>
        {value != null && <Text style={styles.value}>{value}</Text>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      height: 50,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4d004d',
      flexDirection: 'row',
      shadowColor: 'black',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 3,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  spinner: {
    marginRight: 10,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  value: {
    position: 'absolute',
    right: 20,
    top: 15,
    fontSize: 10,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  grey: {
    backgroundColor: '#a6a6a6',
  },
  greyText: {
    color: '#4d004d',
  },
  leftAlignedContainer: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4d004d',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    left: 250
  },
  btnStyle: {
    fontSize: 16, 
    fontWeight: 'bold'
  }
});
