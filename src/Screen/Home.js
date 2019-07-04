import React, { Component } from "react";
import {
  Container,
  Header,
  Input,
  Item,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
  Fab
} from "native-base";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Modal
} from "react-native";

// import connect to connect with redux store
import { connect } from "react-redux";

// import action
import { getNotes, deleteNotes } from "../public/redux/action/notes";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerIcon: <Icon name="home" style={{ color: "#000000" }} />
  };

  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // fetch data by dispatching an action from redux
  fetchData = () => {
    this.props.dispatch(getNotes());
  };

  componentDidMount = () => {
    this.fetchData();
    // axios.get('https://randomuser.me/api?results=10')
    //     .then(response => {
    //         console.log(response.data.results)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
  };
  // componentWillUnmount = () => {
  //   clearTimeout();
  // }

  // key extractor for FlatList with data from randomusers
  _keyExtractor = (item, index) => item.id;
  deleteNotes = (id) => {
    this.props.dispatch(deleteNotes(id));
  }

  
  

  renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={()=> Alert.alert(
        'Delete Note',
        'Are you sure will you delete this note',
        [
          {text: 'Cancel'},
          {text:'Ok', onPress:() => this.deleteNotes(item.id)},
        ],
        {cancelable: false},
      )}

      onPress={() => this.props.navigation.navigate("Edit", item)}
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            item.category.toLowerCase() == "personal"
              ? "#FF92A9"
              : item.category.toLowerCase() == "work"
              ? "#C0EB6A"
              : item.category.toLowerCase() == "wishlist"
              ? "#FAD06C"
              : "#2FC2DF"
        }
      ]}
    >
      <Text style={styles.itemDate}>{item.created_at}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text numberOfLines={6} style={styles.itemText}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  render() {
    console.warn(this.props.data)
    return (
      <Container>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Thumbnail small source={require("../Asset/img/a.jpg")} />
            </Button>
          </Left>
          <Body style={{ flex: 1, alignItems: "center" }}>
            <Title style={{ color: "#000000" }}>App Note</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Thumbnail
                  square
                  source={require("../Asset/img/sort.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableHighlight>
            </Button>
          </Right>
        </Header>

        {/* Modal Sort */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
            style={{ flex: 1 }}
          >
            <View style={styles.modalSort}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>ASCENDING</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>DESCENDING</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </Modal>

        <Header searchBar rounded style={styles.headerSearch}>
          <Item>
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <FlatList
            data={this.props.notes.data}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            style={styles.gridView}
            numColumns={2}
          />
        </Content>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#FFFCFC" }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate("Note")}
        >
          <Icon name="md-add" style={{ color: "#000000" }} />
        </Fab>
      </Container>
    );
  }
}

// map state to props to referring data in store
const mapStateToProps = state => {
  return {
      notes: state.notes
      // auth: state.auth
  }
}

// connect with redux,first param is map and second is component
export default connect(mapStateToProps)(Home)


const styles = StyleSheet.create({
  modalSort: {
    borderRadius: 5,
    marginTop: 55,
    right: 20,
    padding: 10,
    backgroundColor: "#fcfcfc",
    alignSelf: "flex-end",
    position: "absolute",
    elevation: 7
  },
  headerSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    elevation: 7
  },
  container: {
    flex: 1,
    marginVertical: 20
  },
  itemContainer: {
    justifyContent: "flex-start",
    borderRadius: 5,
    height: 136,
    margin: 10,
    flex: 1,
    elevation: 10
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / 2 // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  gridView: {
    marginTop: 20,
    flex: 1
  },

  itemDate: {
    alignSelf: "flex-end",
    marginRight: 5,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 14
  },
  itemTitle: {
    alignSelf: "baseline",
    marginLeft: 5,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 20
  },
  itemCategory: {
    alignSelf: "baseline",
    marginLeft: 5,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 14
  },
  itemText: {
    alignSelf: "baseline",
    marginLeft: 5,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 14
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
