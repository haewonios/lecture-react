import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import store from "./Store";
import Tabs, { TabType } from "./components/Tabs";
import KeywordList from "./components/KeywordList";
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
    };
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) this.handleReset();

    this.setState({ searchKeyword });
  }

  search(searchKeyword) {
    console.log(searchKeyword);
    const searchResult = store.search(searchKeyword);

    this.setState({
      searchKeyword,
      searchResult,
      submitted: true,
    });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    });
  }

  render() {
    const { searchKeyword, submitted, searchResult, selectedTab } = this.state;

    return (
      <>
        <Header title="검색" />
        <div className="container">
          <SearchForm
            value={searchKeyword}
            onChange={(searchKeyword) => this.handleChangeInput(searchKeyword)}
            onSubmit={() => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />
          <div className="content">
            {submitted ? (
              <SearchResult data={searchResult} />
            ) : (
              <>
                <Tabs
                  selectedTab={selectedTab}
                  onChange={(selectedTab) => this.setState({ selectedTab })}
                />
                {selectedTab === TabType.KEYWORD && (
                  <KeywordList onClick={(keyword) => this.search(keyword)} />
                )}
                {selectedTab === TabType.HISTORY && <>최근 검색어 목록</>}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
