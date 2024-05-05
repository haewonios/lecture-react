import React from "react";
import List from "./List";
import store from "../Store";

export default class KeywordList extends List {
  componentDidMount() {
    const data = store.getKeywordList();

    this.setState({ data });
  }

  renderItem(item, index) {
    return (
      <>
        <span className="number">{index + 1}</span>
        <span>{item.keyword}</span>
      </>
    );
  }
}
