import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Icon,Spinner } from 'native-base';
import { StyleSheet,TouchableOpacity, View, Alert, Platform, ListView, ActivityIndicator } from 'react-native';

import { createStackNavigator } from 'react-navigation';

class MainActivity extends Component {

  static navigationOptions =
  {
     title: 'Input Student',
  };

constructor(props) {
   super(props)
   this.state = {
     textInputStudentName: '',
     textInputStudentClass: '',
     textInputStudentPhoneNumber: '',
     textInputStudentEmail: '',
     isLoading: false

   }
 }

 insertRecord = () =>{
  this.setState({
    isLoading: true
  });
      fetch('https://testbataks.000webhostapp.com/crud-react/InsertStudentData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_name : this.state.textInputStudentName,
        student_class : this.state.textInputStudentClass,
        student_phone_number : this.state.textInputStudentPhoneNumber,
        student_email: this.state.textInputStudentEmail
      })

      }).then((response) => response.json())
          .then((responseJson) => {
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
            this.setState({
              isLoading: false
            });
          }).catch((error) => {
            Alert.alert(error);
            this.setState({
              isLoading: false
            });
          });
}

selectRecord = () =>
  {
    this.props.navigation.navigate('Second');
    
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

    <Container>
        <Content style={{ padding : 20 }}>
          <Form>
          <Item rounded style={{ marginTop : 10 }}>
            <Icon active name='user' type="FontAwesome" style={{ paddingLeft : 20 ,fontSize: 20}}/>
            {/* <Icon type="FontAwesome" name="home" /> */}
            <Input placeholder='Name' 
            onChangeText={ TextInputValue => this.setState({ textInputStudentName : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='link' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Class'
            onChangeText={ TextInputValue => this.setState({ textInputStudentClass : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='call' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Phone' keyboardType="number-pad"
            onChangeText={ TextInputValue => this.setState({ textInputStudentPhoneNumber : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='ios-mail' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Email' keyboardType="email-address"
            onChangeText={ TextInputValue => this.setState({ textInputStudentEmail : TextInputValue }) }/>
          </Item>
          </Form>

           <Button rounded block info style={{ marginTop : 10 }} onPress={this.insertRecord}>
               <Text style={{ fontSize : 15, fontWeight : 'bold' }}>Save</Text>
           </Button>

           <Button rounded block primary style={{ marginTop : 10 }} 
           onPress={ this.selectRecord }>
               <Text style={{ fontSize : 15, fontWeight : 'bold' }}>Show</Text>
           </Button>
        </Content>
      </Container>
           
   );
 }
}

    class ShowStudentListActivity extends Component {

      constructor(props) { 
        super(props);
        this.state = {
          isLoading: true
        }
      }
      static navigationOptions =
      {
        title: 'Show Student List',
      };

      componentDidMount() {
          return fetch('https://testbataks.000webhostapp.com/crud-react/ShowAllStudentsList.php')
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
              this.props.navigation.navigate('Third', { 
                ID : student_id,
                NAME : student_name,
                CLASS : student_class,
                PHONE_NUMBER : student_phone_number,
                EMAIL : student_email
              });
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
                dataSource      = { this.state.dataSource }
                renderSeparator = { this.ListViewItemSeparator }
                renderRow       = { (rowData) => 
                 
                <TouchableOpacity style   = {{ backgroundColor : 'white', padding : 10 }}
                                  onPress = { this.GetStudentIDFunction.bind(
                                    this, rowData.student_id,
                                    rowData.student_name, 
                                    rowData.student_class, 
                                    rowData.student_phone_number, 
                                    rowData.student_email
                                    )} >
                    <Text style = { styles.rowViewContainer } > 
                      {rowData.student_name} 
                    </Text> 

                    {/* <Text style = {{ color : 'red' }}> {rowData.student_email} </Text> */}

                 </TouchableOpacity>
                
              }
              />
            </View>
          );
        }

    }

class EditStudentRecordActivity extends Component {
  
  constructor(props) {
       super(props)
       this.state = {
         TextInput_Student_ID: '',
         textInputStudentName: '',
         textInputStudentClass: '',
         textInputStudentPhoneNumber: '',
         textInputStudentEmail: '',
         isLoading: false

       }
    
     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_Student_ID : this.props.navigation.state.params.ID,
        textInputStudentName: this.props.navigation.state.params.NAME,
        textInputStudentClass: this.props.navigation.state.params.CLASS,
        textInputStudentPhoneNumber: this.props.navigation.state.params.PHONE_NUMBER,
        textInputStudentEmail: this.props.navigation.state.params.EMAIL,
      })

     }
  
    static navigationOptions =
    {
       title: 'Edit Student',
    };

    updateRecord = () =>{
      this.setState({
        isLoading: true
      });
            fetch('https://testbataks.000webhostapp.com/crud-react/UpdateStudentRecord.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              student_id : this.state.TextInput_Student_ID,
              student_name : this.state.textInputStudentName,
              student_class : this.state.textInputStudentClass,
              student_phone_number : this.state.textInputStudentPhoneNumber,
              student_email: this.state.textInputStudentEmail
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
                  this.setState({
                    isLoading: false
                  });

                }).catch((error) => {
                  this.setState({
                    isLoading: false
                  });
                  console.error(error);
                });
      
      }


    deleteRecord = () =>{
          fetch('https://testbataks.000webhostapp.com/crud-react/DeleteStudentRecord.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id : this.state.TextInput_Student_ID
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
            this.setState({
              isLoading: false
            });
            this.props.navigation.navigate('First');

        
          }).catch((error) => {
            this.setState({
              isLoading: false
            });
             console.error(error);
             this.props.navigation.navigate('First');

          });


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

          <Container>
        <Content style={{ padding : 20 }}>
          <Form>
          <Item rounded style={{ marginTop : 10 }}>
            <Icon active name='user' type="FontAwesome" style={{ paddingLeft : 20 ,fontSize: 20}}/>
            {/* <Icon type="FontAwesome" name="home" /> */}
            <Input placeholder='Name' value={this.state.textInputStudentName}
            onChangeText={ TextInputValue => this.setState({ textInputStudentName : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='link' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Class' value={this.state.textInputStudentClass}
            onChangeText={ TextInputValue => this.setState({ textInputStudentClass : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='call' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Phone' keyboardType="number-pad" value={this.state.textInputStudentPhoneNumber}
            onChangeText={ TextInputValue => this.setState({ textInputStudentPhoneNumber : TextInputValue }) }/>
          </Item>
          <Item rounded style={{ marginTop : 5 }}>
            <Icon active name='ios-mail' style={{ paddingLeft : 20 }}/>
            <Input placeholder='Email' keyboardType="email-address" value={this.state.textInputStudentEmail}
            onChangeText={ TextInputValue => this.setState({ textInputStudentEmail : TextInputValue }) }/>
          </Item>
          </Form>

           <Button rounded block info style={{ marginTop : 10 }} onPress={this.updateRecord}>
               <Text style={{ fontSize : 15, fontWeight : 'bold' }}>Update</Text>
           </Button>

           <Button rounded block warning style={{ marginTop : 10 }} 
           onPress={ this.deleteRecord }>
               <Text style={{ fontSize : 15, fontWeight : 'bold' }}>Delete</Text>
           </Button>
        </Content>
      </Container>
              
      );
    }

}

export default MyNewProject = createStackNavigator(

  {

    First: { screen: MainActivity },

    Second: { screen: ShowStudentListActivity },

    Third: { screen: EditStudentRecordActivity }

  });

const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    
    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});