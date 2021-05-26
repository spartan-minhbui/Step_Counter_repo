import React from 'react';
import {StyleSheet,View,Dimensions,Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import {
    Avatar,
    Title,
    Text,
  } from 'react-native-paper';
const HomeStack = createStackNavigator();
import firebase from '../components/FirebaseConfig'
var width = Dimensions.get('window').width;

function UpdateProfileStack({navigation}){
    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }
    const user = firebase.auth().currentUser;
    const [target, setTarget] = React.useState('1200');
    const [data, setData] = React.useState({
        name:'',
        phone: '',
        email:'',
        goal:''
    })
    const onHandleUpdateProfile = () =>{
        if(data.email.toLowerCase()==user.email.toLowerCase()){
            Alert.alert(
                'Opps!','Email is same as your current email!',
                [
                    {text:'Ok', onPress:()=>{setData({...data,email:''})}}
                ]
            )
        }
        else{
            user.updateEmail(data.email.toLowerCase()).then(() => {
                // Update successful.
                Alert.alert(
                    'Successfull!','',
                    [
                        {text:'Go to Profile', onPress:()=>{navigation.navigate('Profile')}}
                    ]
                )
            }).catch((error) => {
                // An error happened.
                if(error.message == "This operation is sensitive and requires recent authentication. Log in again before retrying this request."){
                    Alert.alert(
                        'Opps!',error.message,
                        [
                            {text:'Ok',onPress:()=>signOutUser()}
                        ]
                    )
                }
                else{
                    Alert.alert(
                        'Opps!',error.message,
                        {text:'Ok'}
                    )
                }
                
            });
        }
        
    }
    return(
        <View style = {{flex:1, alignItems:'center',backgroundColor:'#FAF0E6'}}>
            <View style={[styles.tag,{flex:1.3,flexDirection:'row',alignItems:'center'}]}>
                <Avatar.Image 
                    source={{ 
                        uri: 'https://api.adorable.io/avatars/80/abott@adorable.png', 
                    }}
                    size={70}
                    style={{marginLeft:10}}
                />
                <Title style={styles.title}>{user.displayName}</Title>
            </View>
            <View style={[styles.tag,{flex:4}]}>
                <View style = {{flex:3,marginTop:40}}>
                    <View style={{flex:1}} >
                        <TextInput
                            mode="outlined"
                            label={user.phoneNumber?user.phoneNumber:"Add phone number"}
                            style = {styles.input}
                            clearButtonMode = 'always'
                            onChangeText={(val)=>setData({...data,phone:val})}
                            placeholder= {user.phoneNumber?user.phoneNumber:"Add phone number"}
                        />
                    </View>
                    <View style={{flex:1}} >
                        <TextInput
                            mode="outlined"
                            label={user.email}
                            style = {styles.input}
                            secureTextEntry={false}
                            clearButtonMode = 'always'
                            onChangeText={(val)=>{setData({...data,email:val})}}
                            placeholder={user.email}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput
                            mode="outlined"
                            label="Goal"
                            secureTextEntry={false}
                            style = {styles.input}
                            clearButtonMode = 'always'
                            onChangeText={(val)=>setData({...data,goal:val})}
                            placeholder="Goal"
                        />
                    </View>
                </View>
                <View style = {{flex:1,alignItem:'center', flexDirection:'row'}}>
                    <Button onPress ={() => onHandleUpdateProfile()} color ='#3498DB' >
                        <Text style={{color:"#3498DB"}}>Confirm</Text>
                    </Button>
                    <Button onPress ={() => navigation.navigate('Profile')} color ='red' >
                        <Text style={{color:"red"}}>Cancel</Text>
                    </Button>
                </View>
            </View>
        </View>
        
    );
};

export default function UpdateProfileScreen({navigation}) {
	return (
		
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#CC9999',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="ProfileSc" component={UpdateProfileStack} options={{
            title:'Profile',
            headerLeft: () => (
                <Icon.Button name="account-circle" size={25} backgroundColor="#CC9999" onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            
            }} />
        </HomeStack.Navigator>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tag:{
        margin:8,
        backgroundColor:'white',
        width: '95%',
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: -5,
            height: 6,
        },
        shadowOpacity: 0.23,
        elevation: 4,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        alignItems: 'center',
    },
    userInfoSpec: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft:10
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 20,
      flex:1,
      alignItems:'center'
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
    input:{
		height: 50,
		marginLeft:width/10,
		marginRight:width/10,
	},
  });