import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Text, ScrollView, View} from 'react-native';

export default class TabBar extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = [];
    this.scrollX = 0;
    if (this.props.labels && this.props.labels[0]) {
      this.value = this.props.labels[0].key;
    }
  }

  handleScroll = event => {
    let {contentOffset} = event.nativeEvent;
    this.scrollX = contentOffset.x;
  };
  containerLayout() {
    this.container.measure((fx, fy, wd, ht, px, py) => {
      this.LEFT = px;
    });
  }

  measureScollView(event) {
    this.scrollWidth = event.nativeEvent.layout.width;
  }

  componentWillReceiveProps(nextProps) {
    if (this.value != nextProps.value) {
      this.value = nextProps.value;
      const index = this.props.labels.findIndex(o => o.key == nextProps.value);
      if (index >= 0) this.autoscroll(index);
    }
  }

  autoscroll(index) {
    let next = index < this.props.labels.length - 1 ? index + 1 : index;
    let prev = index == 0 ? 0 : index - 1;

    this.ref[next].measure((fx, fy, wd, ht, px, py) => {
      let x = wd + px + this.scrollX - this.LEFT;
      if (x > this.scrollWidth) {
        this.scrollView.scrollTo({x: x - this.scrollWidth, y: 0, animate: true});
      }
    });
    this.ref[prev].measure((fx, fy, wd, ht, px, py) => {
      let x = px - this.LEFT;
      if (x < 0) {
        this.scrollView.scrollTo({x: this.scrollX + x, y: 0, animate: true});
      }
    });
  }

  onChange(value, index) {
    this.value = value;
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.labels.length <= 3) return;
    this.autoscroll(index);
  }

  renderTabs(isScroll) {
    let {labels, value} = this.props;
    if (labels.length > 0 && labels.find(o => o.key == value) == null) {
      value = labels[0].key;
      this.props.onChange(value);
    }
    return labels.map((item, idx) => (
      <TouchableOpacity
        ref={e => (this.ref[idx] = e)}
        style={[styles.tab, !isScroll ? {flex: 1} : {}, idx > 0 ? {marginLeft: 15} : {}]}
        key={idx}
        onPress={() => this.onChange(item.key, idx)}>
        <Text numberOfLines={1} style={[styles.label, item.key == value ? {fontSize: 15, fontWeight: 'bold'} : {}]}>
          {item.title}
        </Text>
        {item.key == value && <View style={styles.indicator} />}
      </TouchableOpacity>
    ));
  }

  render() {
    let {labels} = this.props;
    return (
      <View style={styles.container} onLayout={() => this.containerLayout()} ref={e => (this.container = e)} style={styles.container}>
        {labels.length > 3 ? (
          <ScrollView
            style={{backgroundColor: 'red'}}
            onLayout={event => this.measureScollView(event)}
            ref={e => (this.scrollView = e)}
            onScroll={this.handleScroll}
            scrollEventThrottle={10}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {this.renderTabs(true)}
          </ScrollView>
        ) : (
          <View style={styles.row}>{this.renderTabs(false)}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#4d004d'
  },
  tab: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#4d004d'
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 2,
  },
  indicator: {
    height: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
});
