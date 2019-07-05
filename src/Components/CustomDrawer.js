/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { List, ListItem } from "native-base";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  Text,
  TextInput,
  FlatList
} from "react-native";

//library imports
import { Container, Content, Header, Body, Button } from "native-base";

import { connect } from "react-redux";
import {
  postCategories,
  getCategory,
  deleteCategories
} from "../public/redux/action/categories";

// import action
import { categoryNotes } from "../public/redux/action/notes";

class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      page: 1,
      modalVisible: false
    };
  }

  fetchData = () => {
    this.props.dispatch(getCategory());
  };

  componentDidMount = () => {
    this.fetchData();
  };

  //validasi category
  addCategory = () => {
    if (this.state.name != "") {
      let dataCategories = {
        name: this.state.name,
        image: this.state.image
      };
      this.props.dispatch(postCategories(dataCategories));
    } else {
      Alert.alert("Field note or title cannot empty");
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _keyExtractor = (item, index) => item.id.toString();

  deleteCategories = id => {
    this.props.dispatch(deleteCategories(id));
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.dispatch(categoryNotes(item.name));
        this.props.navigation.closeDrawer();
      }}
      onLongPress={() =>
        Alert.alert(
          "Delete Category",
          "Are you sure will you delete this category",
          [
            { text: "Cancel" },
            { text: "Ok", onPress: () => this.deleteCategories(item.id) }
          ],
          { cancelable: false }
        )
      }
    >
      <Button
        iconLeft
        transparent
        onLongPress={() =>
          Alert.alert(
            "Delete Category",
            "Are you sure will you delete this category",
            [
              { text: "Cancel" },
              { text: "Ok", onPress: () => this.deleteCategories(item.id) }
            ],
            { cancelable: false }
          )
        }
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 25, height: 25, marginRight: 5 }}
        />
        <Text style={{ color: "black", fontSize: 17 }}>{item.name}</Text>
      </Button>
    </TouchableOpacity>
  );

  render() {
    return (
      <Container>
        <Header style={styles.drawerHeader}>
          <Body style={{ alignItems: "center" }}>
            <Image
              style={styles.drawerImage}
              source={require("../Asset/img/a.jpg")}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "#000000",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: 23,
                paddingTop: 10
              }}
            >
              Shaloom Razade
            </Text>
          </Body>
        </Header>
        <Content>
          <View style={{ marginTop: 30, paddingLeft: 30 }}>
            <FlatList
              data={this.props.categories.data}
              numColumns={1}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderItem}
            />
            <Button
              iconLeft
              transparent
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <TouchableOpacity />
              <Image
                source={require("../Asset/img/add.png")}
                style={{ width: 25, height: 25, marginRight: 5 }}
              />
              <Text style={{ color: "black", fontSize: 17 }}>Add Category</Text>
            </Button>
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(51,51,51,0.8)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0
                }}
              />
              <View
                style={{
                  width: "70%",
                  height: 150,
                  textAlign: "center",
                  alignSelf: "center",
                  position: "relative",
                  backgroundColor: "white",
                  borderRadius: 5,
                  elevetion: 3
                }}
              >
                <View>
                  <TextInput
                    onChangeText={name => this.setState({ name })}
                    placeholder="add category"
                    placeholderColor="#eee"
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      paddingLeft: 20,
                      borderBottomColor: "#2ED1A2",
                      borderBottomWidth: 2
                    }}
                  />
                </View>
                <View>
                  <TextInput
                    onChangeText={image => this.setState({ image })}
                    placeholder="add url image"
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      paddingLeft: 20,
                      borderBottomColor: "#2ED1A2",
                      borderBottomWidth: 2
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "flex-end"
                  }}
                >
                  <List>
                    <ListItem noBorder>
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                          this.addCategory();
                        }}
                        style={{ marginRight: 20 }}
                      >
                        <Text style={{ color: "#000", fontWeight: "600" }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                      >
                        <Text style={{ color: "#000", fontWeight: "600" }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  </List>
                </View>
              </View>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const mapsStageToProps = state => {
  return {
    categories: state.categories
  };
};
export default connect(mapsStageToProps)(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  drawerHeader: {
    height: 200,
    backgroundColor: "white"
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});
