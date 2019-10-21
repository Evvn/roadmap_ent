import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./airtable/actions/actions.js";
import styled from "styled-components";
import Roadmap from "./components/Roadmap/Roadmap";

const AppCont = styled.div`
  min-height: 100vh;
  background-color: #212121;
  color: #ffc3fc;
  font-family: "Fira Code", monospace;
`;

const Title = styled.h1`
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-weight: 900;
  font-size: 42px;
  margin: 0;
  padding: 20px;
`;

const Generator = styled.button`
  font-family: inherit;
  margin: 18px;
  width: 90px;
  padding: 8px;
  font-size: 12px;
  color: inherit;
  background-color: transparent;
  border: 1px solid #ffc3fc;
`;

const Loader = styled.button`
  font-family: inherit;
  margin: 18px;
  width: 90px;
  padding: 8px;
  font-size: 12px;
  color: inherit;
  background-color: transparent;
  border: none;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  roadmapBtnClick() {
    const { fetchRoadmap } = this.props;
    fetchRoadmap();
  }

  render() {
    const { roadmap, isLoading } = this.props;
    // console.log(`is loading: ${isLoading}\nroadmap: `);
    // !!roadmap && console.log(roadmap);

    return (
      <AppCont>
        <Title>solo roadmap airtable</Title>
        {!isLoading ? (
          <Generator
            onClick={() => {
              this.roadmapBtnClick();
            }}
          >
            Make
          </Generator>
        ) : (
          <Loader>loading</Loader>
        )}
        <Roadmap roadmap={roadmap} />
      </AppCont>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  roadmap: state.airtable.roadmap,
  isLoading: state.airtable.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
