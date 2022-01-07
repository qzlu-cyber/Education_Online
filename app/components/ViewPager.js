import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

import OnBoardingSvgOne from "../svgs/OnBoardingSvgOne";
import OnBoardingSvgTwo from "../svgs/OnBoardingSvgTwo";
import OnBoardingSvgThree from "../svgs/OnBoardingSvgThree";

import ViewPageContext from "../contexts/ViewPageContext";

const Pager = () => {
  const currentPosition = useContext(ViewPageContext);
  return (
    <PagerView
      style={styles.viewPager}
      initialPage={0}
      onPageSelected={(e) => {
        currentPosition.setPosition(e.nativeEvent.position);
      }}>
      <View style={styles.page} key='1'>
        <View>
          <OnBoardingSvgOne style={[styles.svg]} />
        </View>
        <View style={styles.slogan}>
          <Text style={styles.sloganOne}>体验更好的学习方式</Text>
          <Text style={styles.sloganTwo}>
            让我们重新感受学习，回归学习的本质
          </Text>
        </View>
      </View>
      <View style={styles.page} key='2'>
        <View>
          <OnBoardingSvgTwo style={styles.svg} />
        </View>
        <View style={styles.slogan}>
          <Text style={styles.sloganOne}>体验更好的学习方式</Text>
          <Text style={styles.sloganTwo}>
            让我们重新感受学习，回归学习的本质
          </Text>
        </View>
      </View>
      <View style={styles.page} key='3'>
        <View>
          <OnBoardingSvgThree style={styles.svg} />
        </View>
        <View style={styles.slogan}>
          <Text style={styles.sloganOne}>体验更好的学习方式</Text>
          <Text style={styles.sloganTwo}>
            让我们重新感受学习，回归学习的本质
          </Text>
        </View>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 4,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  svg: {
    width: 300,
    height: 280,
  },
  slogan: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginTop: 10,
  },
  sloganOne: {
    // fontFamily: 'Plus Jakarta Display',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 26,
    lineHeight: 34,
    color: "#0B121F",
    letterSpacing: 3.0,
    marginBottom: 5,
  },
  sloganTwo: {
    // fontFamily: 'Plus Jakarta Display',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: "#9FA3A9",
  },
  pagerOne: {
    height: 300,
  },
});

export default Pager;
