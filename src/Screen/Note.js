import React from "react";
import { StyleSheet,Alert } from "react-native";
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
import { postNotes } from "../public/redux/action/notes";

// import dummycategory from '../Asset/Items';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      idCategory: ""
    };
  }

  addNotes = () => {
    if (
      this.state.title != "" &&
      this.state.text != "" &&
      this.state.idCategory != ""
    ) {
      let dataNotes = {
        title: this.state.title,
        text: this.state.text,
        idCategory: this.state.idCategory
      };
      this.props.dispatch(postNotes(dataNotes));
    } else {
      Alert.alert("Field title, note, category cannot empty");
    }
  };

  render() {
    // console.log("XXXXXXXX this.props XXXXXXXXX");
    // console.log(this.props.categories.data);
    // console.log(this.state);

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
            <Button
              transparent
              onPress={() => {
                this.addNotes()
                this.props.navigation.goBack()
              }}
            >
              <Thumbnail
                source={require("../Asset/img/check.png")}
                style={{ width: 25, height: 25 }}
              />
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Input
              onChangeText={title => this.setState({ title })}
              placeholder="ADD TITLE..."
              placeholderIconColor="#ecf0f1"
              style={styles.textStyle}
            />
            <Textarea
              onChangeText={text => this.setState({ text })}
              rowSpan={12}
              placeholder="ADD DESCRIPTION..."
              style={styles.textAreaStyle}
            />
            <Label style={styles.labelstyle}>Category</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select Category"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={styles.pickerStyle}
              selectedValue={this.state.idCategory}
              onValueChange={hasil =>
                this.setState({
                  idCategory: hasil
                })
              }
            ><Picker.item label='select category' value={null}/>
              {this.props.categories.data.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
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
    notes: state.notes,
    categories: state.categories
  };
};

export default connect(mapsStageToProps)(Note);

const styles = StyleSheet.create({
  textStyle: {
    width: "80%",
    paddingLeft: 15,
    marginLeft: "10%",
    fontSize: 20,
    lineHeight: 27,
    marginTop: 10
  },
  textAreaStyle: {
    width: "80%",
    paddingLeft: 15,
    marginLeft: "10%",
    fontSize: 20,
    lineHeight: 27,
    marginTop: 10
  },
  pickerStyle: {
    width: "50%",
    marginLeft: "10%"
  },
  labelstyle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000000",
    marginLeft: "10%",
    marginTop: 10
  }
});
