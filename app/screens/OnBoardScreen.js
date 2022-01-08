import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";

import Pager from "../components/ViewPager";
import ViewPageContext from "../contexts/ViewPageContext";

export default function OnBoardingScreen() {
  const [position, setPosition] = useState(0); //滚动页面当前位置state

  return (
    <ViewPageContext.Provider
      value={{ position: position, setPosition: setPosition }}>
      {/* 传递context给Pager组件 */}
      <SafeAreaView style={styles.container}>
        <View style={styles.skipView}>
          <Button title='跳过' color='#265AE8' />
        </View>
        <Pager style={styles.pagerView} />
        <View style={styles.selector}>
          <View style={position === 0 ? styles.select : styles.circle}></View>
          <View style={position === 1 ? styles.select : styles.circle}></View>
          <View style={position === 2 ? styles.select : styles.circle}></View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>登陆</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ViewPageContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  skipView: {
    alignSelf: "flex-end",
    marginTop: 30,
    marginRight: 10,
    width: 78,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  selector: {
    flexDirection: "row",
    alignSelf: "center",
  },
  select: {
    width: 2,
    height: 2,
    borderRadius: 10,
    padding: 3,
    margin: 3,
    backgroundColor: "#265AE8",
  },
  circle: {
    width: 2,
    height: 2,
    borderRadius: 10,
    padding: 3,
    margin: 3,
    backgroundColor: "#9FA3A9",
  },
  buttonView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "35%",
    paddingRight: "35%",
    letterSpacing: 5.0,
    backgroundColor: "#265AE8",
    borderRadius: 10,
    overflow: "hidden",
  },
});
