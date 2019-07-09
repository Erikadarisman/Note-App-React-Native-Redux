import React, { Component } from "react";
import {
  Container,
  Header,
  Input,
  Item,
  Title,
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
  Modal,
  StatusBar
} from "react-native";

// import connect to connect with redux store
import { connect } from "react-redux";

// import action
import {
  getNotes,
  deleteNotes,
  searchNotes,
  pageNotes
} from "../public/redux/action/notes";

import debounce from "lodash.debounce";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sort: "",
      page: 1,
      modalVisible: false,
      refreshing: false
    };
  }

  setDate = (datenote) => {
    let mount = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei','Jun', 'Jul','Agu', 'Sep', 'Okt', 'Nov','Des'];
  
    let date = new Date(datenote)
    let day = date.getDay()+1;
    let Month = date.getMonth();
  
    let fixDate = day+' '+mount[Month]
  
    return fixDate
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // fetch data by dispatching an action from redux
  fetchData = () => {
    this.props.dispatch(getNotes());
    this.setState({
      refreshing: false
    });
  };

  componentDidMount = () => {
    StatusBar.setHidden(false);
    this.fetchData();
  };

  // key extractor for FlatList with data from randomusers
  _keyExtractor = (item, index) => item.id;
  deleteNotes = id => {
    this.props.dispatch(deleteNotes(id));
  };

  sort = (search, sort) => {
    this.setModalVisible(!this.state.modalVisible);
    this.searchNotes(search, sort);
  };

  keyword = keyword => {
    this.setState({ search: keyword });
    this.searchNotes(keyword, this.state.sort);
  };

  searchNotes = (search, sort) => {
    this.props.dispatch(searchNotes(search, sort));
  };

  sortNotes = sort => {
    if (sort == "asc") {
      this.setState({ sort: "asc" });
      this.searchNotes(this.state.search, this.state.sort);
    } else {
      this.setState({ sort: "desc" });
      this.searchNotes(this.state.search, this.state.sort);
    }
  };

  pageNotes = () => {
    if (this.state.page !== this.props.notes.totalPage) {
      let page = this.state.page + 1;
      this.setState({
        page: page
      });
      this.props.dispatch(pageNotes(page,this.state.search,this.state.sort));
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert(
          "Delete Note",
          "Are you sure will you delete this note",
          [
            { text: "Cancel" },
            { text: "Ok", onPress: () => this.deleteNotes(item.id) }
          ],
          { cancelable: false }
        )
      }
      onPress={() => this.props.navigation.navigate("Edit", item)}
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            item.idCategory == "1"
              ? "#FF92A9"
              : item.idCategory == "2"
              ? "#C0EB6A"
              : item.idCategory == "3"
              ? "#FAD06C"
              : "#2FC2DF"
        }
      ]}
    >
      <Text style={styles.itemDate}>{this.setDate(item.created_at)}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>

      <Text style={styles.itemCategory}>
        {item.category == null ? (
          <Text style={styles.itemCategory}>-</Text>
        ) : (
          item.category
        )}
      </Text>
      <Text numberOfLines={6} style={styles.itemText}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  render() {
    
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
                  this.sort(this.state.search, "asc");
                }}
              >
                <Text>ASCENDING</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.sort(this.state.search, "desc");
                }}
              >
                <Text>DESCENDING</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </Modal>

        <Header searchBar rounded style={styles.headerSearch}>
          <Item>
            <Input
              placeholder="Search"
              onChangeText={debounce(this.keyword, 500)}
            />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <FlatList
          data={this.props.notes.data}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          style={styles.gridView}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={this.pageNotes}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.fetchData();
            this.setState({
              page: 1
            });
          }}
        />

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
  };
};

// connect with redux,first param is map and second is component
export default connect(mapStateToProps)(Home);

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
