import React from 'react'
import {Modal, View, StyleSheet} from 'react-native'
import Button from './Button'

export default class ModalCard extends React.Component{

    state={
        visible: false,
    }

    show(){
        this.setState({visible:true})
    }
    hide(){
        this.setState({visible:false})
    }

    onClick(item, index){
        this.hide()

        if ( this.props.onPress ){
            this.props.onPress(item, index)
        }
    }

    render(){
         let {visible} = this.state
        let {buttons, children} = this.props
        return(
            <Modal
                visible={visible}
                transparent
                animationType="fade"
            >
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        {children}
                    </View>
                    <View style={styles.bottom}>
                        {buttons!=null&&buttons.map((item, index)=>
                            <Button 
                                key={index}
                                title={item.title}
                                row
                                onPress={()=>this.onClick(item, index)}
                                style={[styles.button, index>0 ? styles.btnStyle: {}]}
                            />)}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor: 'rgba(248,249,249,0.9)',
        justifyContent: 'center',
        alignItems:'center',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:999
    },
    cardContainer:{
        width: '100%',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal:20,
        paddingVertical:40,
        alignItems:'center'
    },
    bottom:{
        flexDirection:'row',
        width:'100%'
    },
    button:{
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        flex:1
    },
    btnStyle: {
        marginLeft:10
    }
})