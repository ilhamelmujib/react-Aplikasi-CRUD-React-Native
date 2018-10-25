import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';
import ShowStudent from './ShowStudent'

const App = createStackNavigator({
  ShowScreen: { screen:ShowStudent  },
});

export class SaveStudent extends Component{
  
    static navigationOptions = {
      title : 'SaveStudent',
    };


    constructor(props){
      super(props);
      

      this.state = {
        textInputStudentName: '',
        textInputStudentClass: '',  
        textInputStudentPhoneNumber: '',
        textInputStudentEmail: '',
        navigate: this.props.navigation
      }
    }

    render() {
      const { navigate } = this.props.navigation;
      return (
        <Container>
        <Header />
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

           <Button rounded block info style={{ marginTop : 10 }} 
           onPress={() =>
              navigate('ShowStud', { name: 'D' })
            }>
               <Text style={{ fontSize : 15, fontWeight : 'bold' }}>Show</Text>
           </Button>
        </Content>
      </Container>
      );
    }

    insertRecord = () => {
     fetch('https://192.168.43.158/crud-native/InsertStudentData.php', {
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
         }).catch((error) => {
           console.error(error);
         });

    }

    selectRecord = () =>
     {
       
     }


}

export default SaveStudent;


//  MyNewProject = StackNavigator(

//   {
//     //First : {screen : this},
//     Second: {  Alert:alert("JOO") }


//   });
