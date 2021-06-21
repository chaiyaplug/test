import React, { Component } from 'react';
import {FlatList, Text, ScrollView, StyleSheet, View,Button,SafeAreaView,TextInput, ListView  } from 'react-native';
// import firebasedb1 from './database/firebasedb'
import firebase from 'firebase/app'
import 'firebase/firestore'
// import ignoreWarnings from 'react-native-ignore-warnings';

// ignoreWarnings('Setting a timer');
import {Platform, InteractionManager} from 'react-native';
import { ListItem } from 'react-native-elements'
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  // ... // more items
]



const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {//สุดยอดสคลิป ไว้แก้ดัก ไม่ให้เกิด error timeout https://github.com/firebase/firebase-js-sdk/issues/97
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
const FlatListBasics = () => {
  return (
    <View >
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
    </View>
  );
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
        isloading:true,
        Userarr:[]

    }

   
    // const datauser=document.querySelector("datauser1")
    const firebaseConfig = {
      apiKey: "AIzaSyAAzmZKF-HHUJwQj9jyiaEWFIQ_3MexdcA",
      authDomain: "ttest-faedd.firebaseapp.com",
      databaseURL: "https://ttest-faedd-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "ttest-faedd",
      storageBucket: "ttest-faedd.appspot.com",
      messagingSenderId: "924557979276",
      appId: "1:924557979276:web:49258872d35031fd7695a9",
      measurementId: "G-929NVF3KPG"
    };
    if(!firebase.apps.length){//ไม่ต้องการให้พบ error duplicate ใส่ if เข้าไป
    firebase.initializeApp(firebaseConfig);
  }
    this.datanew={}
   this.showconsole=this.showconsole.bind(this)
   this.Adduser=this.Adduser.bind(this)
    // this.dbRef = firebasedb1.firestore().collection("userid").doc('test')
    // this.storeUser=this.storeUser.bind()
// dbRef
  }
  showconsole(){
    console.log(this.state.Userarr)

}
  async Adduser() {
                    // this.dbRef.collection("userid").doc('test').add({
                    //   test111: "Tokyo"
                 
                    


                     const dbh =    firebase.firestore();
                dbh.collection("characters").doc("mario").set({
                  employment: "plumber",
                  outfitColor: "red",
                  specialAttack: "fireball"
                })
  }
  getUser(){
    // firebase.initializeApp(firebaseConfig);
     
    const dbh =    firebase.firestore();
const users= dbh.collection("users").doc
    users.get()
                      .then((snapshot)=>{
                        const userarr=[]
                                            snapshot.forEach((doc)=>{
                                                
                                              const {username,password}=doc.data()
                                                
                                              userarr.push({
                                                key:doc.id,
                                                // test:111,
                                                username,
                                                // telephone.p[],
                                                password
                                              })
                                                console.log(userarr)
                                              // this.tempDataarray=[...this.tempDataarray,
                                              //   {username:doc().username,
                                              // password:doc.data().password}
                                            // ]
                                              
                                                              // if(doc.data()){
                                                              //   console.log(doc.data())
                                                               
                                                              //   // this.getuser2(doc)
                                                              this.setState(
                                                                    {...Userarr,
                                                                      Userarr,
                                                                      isloading:false

                                                                    }

                                                              )
                                                              }

                                                                  

                                            )

                      })

    

  }
  //  getuser2(doc2){
  //   const listdata=[]

  //   append()
  //   "

  // }



  render() {
   

    return(
    <SafeAreaView  style={{marginTop:100,display:'flex'}}>
      <View>
      {
    list.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: l.avatar_url } }}
        title={l.name}
        subtitle={l.subtitle}
        bottomDivider
      />
    ))
  }
        <Button title="แอทข้อมูล" onPress={this.Adduser}/>
       
        <Button title="แสดงข้อมูล" onPress={this.getUser}/>
        <Button title="แสดง console" onPress={this.showconsole}/>
        <Text >username:</Text>
        <TextInput style={{borderColor:"red",borderRadius:50,fontSize:20,borderWidth:1,margin:12}}/>
        <Text >password:</Text>
        <TextInput style={{borderColor:"red",borderRadius:50,fontSize:20,borderWidth:1,margin:12}}/>
        
          <FlatListBasics/>
          {/* render */}
                 {/* <ul>
                        {this.datauser.data.map((datatest)=>
                          <li key={datatest.id}>
                            {datatest.active}
                          {datatest.password}
                           {datatest.username}
                            </li>


                        )

                         
          }</ul> */}
          {this.state.Userarr.map((item,i)=>{
     
     <ListItem key={i}>
     <ListItem.Content>
               <ListItem.Title>{item.username}</ListItem.Title>
               <ListItem.Subtitle>{item.password}</ListItem.Subtitle>
             </ListItem.Content>

     </ListItem>
      })}

      </View>
    </SafeAreaView >
    )
  }
}
export default App