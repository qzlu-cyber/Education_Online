/*
 * @Author: 刘俊琪
 * @Date: 2022-01-07 18:52:21
 * @LastEditTime: 2022-01-20 14:11:55
 * @Description: 欢迎页
 */
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import OnBoardingSvgOne from "../svgs/OnBoardingSvgOne";
import OnBoardingSvgTwo from "../svgs/OnBoardingSvgTwo";
import OnBoardingSvgThree from "../svgs/OnBoardingSvgThree";

import ViewPageContext from "../contexts/ViewPageContext";
import AppText from "./AppText";

/**
 * @description: 欢迎页滚动页面
 * @param {*}
 * @return {*}
 */
const Pager = () => {
  const currentPosition = useContext(ViewPageContext); //此context用来记录当前滚动页面的index，以便更新state，从而更新页面滚动指示器
  return (
    <PagerView
      style={styles.viewPager}
      initialPage={0}
      onPageSelected={(e) => {
        currentPosition.setPosition(e.nativeEvent.position); //更新状态
      }}>
      <View style={styles.page} key='1'>
        <View>
          <OnBoardingSvgOne style={[styles.svg]} />
        </View>
        <View style={styles.slogan}>
          <AppText text='体验更好的学习方式' style={styles.sloganOne} />
          <AppText
            text='让我们重新感受学习，回归学习的本质'
            style={styles.sloganTwo}
          />
        </View>
      </View>
      <View style={styles.page} key='2'>
        <View>
          <OnBoardingSvgTwo style={styles.svg} />
        </View>
        <View style={styles.slogan}>
          <AppText text='体验更好的学习方式' style={styles.sloganOne} />
          <AppText
            text='让我们重新感受学习，回归学习的本质'
            style={styles.sloganTwo}
          />
        </View>
      </View>
      <View style={styles.page} key='3'>
        <View>
          <OnBoardingSvgThree style={styles.svg} />
        </View>
        <View style={styles.slogan}>
          <AppText text='体验更好的学习方式' style={styles.sloganOne} />
          <AppText
            text='让我们重新感受学习，回归学习的本质'
            style={styles.sloganTwo}
          />
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
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 26,
    lineHeight: 34,
    color: "#0B121F",
    letterSpacing: 3.0,
    marginBottom: 5,
  },
  sloganTwo: {
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
