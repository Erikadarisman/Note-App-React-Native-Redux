import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Picker,
  Form,
  Icon,
  Button,
  Thumbnail,
  Content,
  Input,
  Textarea,
  Label
} from "native-base";
import { connect } from "react-redux";
// import dummycategory from '../Asset/Items';
import { getCategories } from "../public/redux/action/notes";


class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
    }
    
  }


  componentDidMount(){
    this.props.dispatch(getCategories());
  }


  dummycategory = () => {
    let dummydata = []
    for(let i = 0; i < dummycategory.length; i++){
      dummydata.push(
          <Picker.Item key={i} label={dummycategory[i].category} value={dummycategory[i].category}/>
      )
    }
    return dummydata;

  }

  render() {
    console.log('xxxxxxxxxxxxxx');
    console.log(this.props.notes);
    
    return (
      <Container>
        <Header style={{ backgroundColor: "#ffffff" }}>

          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" style={{ color: "#000000" }} />
            </Button>
          </Left>

          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "#000000" }}>Add Note</Title>
          </Body>

          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Thumbnail
                source={require("../Asset/img/check.png")}
                style={{ width: 25, height: 25 }}
              />
            </Button>
          </Right>

        </Header>

        <Content>
            <Form>
                <Input placeholder="ADD TITLE..." placeholderIconColor='#ecf0f1' style={styles.textStyle}/>
                <Textarea rowSpan={12} placeholder="ADD DESCRIPTION..."style={styles.textAreaStyle}/>
                <Label style={styles.labelstyle}>Category</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select Category"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={styles.pickerStyle}
                  onValueChange={(selectedCategory) => this.setState({selectedCategory})}
                  selectedValue={this.state.selectedCategory}
                  >
                  {Object.keys(this.props.notes.category).map(key => (
                <Picker.Item
                  key={key}
                  label={this.props.notes.category[key].name}
                  value={this.props.notes.category[key].id}
                />
              ))}
                </Picker>
            </Form>
        </Content>
        
      </Container>
    );
  }
}

const mapsStageToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapsStageToProps)(Note);

const styles = StyleSheet.create({
  textStyle: {
      width: '80%',
      paddingLeft: 15,
      marginLeft:'10%',
      fontSize: 20,
      lineHeight: 27,
      marginTop: 10

  },
  textAreaStyle: {
      width: '80%',
      paddingLeft: 15,
      marginLeft:'10%',
      fontSize: 20,
      lineHeight: 27,
      marginTop: 10
  },
  pickerStyle: {
      width: '50%',
      marginLeft: '10%'
  },
  labelstyle:{
      fontSize: 19, 
      fontWeight:"600", 
      color:'#000000',
      marginLeft: '10%',
      marginTop: 10
  }

});
