import React, { Component } from 'react';
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ShowStudent extends Component {

    constructor(props) { 
  
      super(props);
  
      this.state = {
  
        isLoading: true
  
      }
    }


  
    static navigationOptions =
    {
       title: 'ShowStudent',
    };
  
    componentDidMount() {
      
         return fetch('https://reactnativecode.000webhostapp.com/Student/ShowAllStudentsList.php')
           .then((response) => response.json())
           .then((responseJson) => {
             let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
             this.setState({
               isLoading: false,
               dataSource: ds.cloneWithRows(responseJson),
             }, function() {
               // In this block you can do something with new state.
             });
           })
           .catch((error) => {
             console.error(error);
           });
       }
      
       GetStudentIDFunction=(student_id,student_name, student_class, student_phone_number, student_email)=>{
  
            // this.props.navigation.navigate('Third', { 
  
            //   ID : student_id,
            //   NAME : student_name,
            //   CLASS : student_class,
            //   PHONE_NUMBER : student_phone_number,
            //   EMAIL : student_email
  
            // });
  
       }
  
       ListViewItemSeparator = () => {
         return (
           <View
             style={{
               height: .5,
               width: "100%",
               backgroundColor: "#000",
             }}
           />
         );
       }
  
       render() {
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
            </View>
          );
        }
     
        return (
     
          <View style={styles.MainContainer_For_Show_StudentList_Activity}>
     
            <ListView
     
              dataSource={this.state.dataSource}
     
              renderSeparator= {this.ListViewItemSeparator}
     
              renderRow={ (rowData) => <Text style={styles.rowViewContainer} 
  
                        onPress={this.GetStudentIDFunction.bind(
                          this, rowData.student_id,
                           rowData.student_name, 
                           rowData.student_class, 
                           rowData.student_phone_number, 
                           rowData.student_email
                           )} > 
  
                        {rowData.student_name} 
                        
                        </Text> }
     
            />
     
          </View>
        );
      }
  
  }