import React from "react";
import List from "./List";
import store from "../Store";
import { formatRelativeDate } from "../helpers";

export default class HistoryList extends React.Component {
  constructor() {
    super();

    this.state = {
      historyList: [],
    };
  }
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    const { historyList } = this.state;
    const { onClick } = this.props;

    return (
      <List
        data={historyList}
        onClick={onClick}
        hasDate
        onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
      />
    );
  }
}
