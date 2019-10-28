import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./airtable/actions/actions.js";
import styled from "styled-components";
import Roadmap from "./components/Roadmap/Roadmap";

const colorMint = "#21b778";
const colorPaprika = "#d83d03";
const colorAcai = "#0078a1";
const colorChia = "#737373";
const colorCardomom = "#555555";
const colorSalt = "#f6f6f6";
const colorPeppercorn = "#252525";

const AppCont = styled.div`
  min-height: 100vh;
  font-family: "Muli", "Helvetica", sans-serif;
`;

const HeaderCont = styled.div`
  width: 100vw;
  height: 80px;
  background-color: ${colorPeppercorn};
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: "Muli Light", "Helvetica", sans-serif;
  font-size: 24px;
  margin: 0;
  padding: 0;
  color: ${colorSalt};
`;

const Logo = styled.div`
  background-image: url("/vault_logo_onblack.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 150px;
  height: 60px;
  margin-top: 10px;
`;

const ControlsCont = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Generator = styled.button`
  font-family: inherit;
  width: 90px;
  margin: 16px;
  padding: 8px;
  font-size: 12px;
  color: inherit;
  background-color: transparent;
  border: 1px solid ${colorPaprika};
`;

const Loader = styled.div`
  font-family: inherit;
  width: 90px;
  margin: 16px;
  padding: 8px;
  font-size: 12px;
  color: inherit;
  background-color: transparent;
  border: none;
`;

const Password = styled.input.attrs(props => ({ type: "password" }))``;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: false
    };
  }

  roadmapBtnClick() {
    const { fetchRoadmap } = this.props;
    // const { password } = this.state;
    // password === process.env.REACT_APP_INTERNAL_PASSWORD && fetchRoadmap();
    fetchRoadmap();
  }

  checkPassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { roadmap, isLoading } = this.props;
    // console.log(`is loading: ${isLoading}\nroadmap: `);
    // !!roadmap && console.log(roadmap);

    return (
      <AppCont>
        <HeaderCont>
          <Logo />
          <Title>Solo Product Roadmap</Title>
          <div style={{ width: "150px" }} />
        </HeaderCont>
        {!isLoading ? (
          !roadmap && (
            <ControlsCont>
              <Password onChange={e => this.checkPassword(e)} />
              <Generator
                onClick={() => {
                  this.roadmapBtnClick();
                }}
              >
                Make
              </Generator>
            </ControlsCont>
          )
        ) : (
          <ControlsCont>
            <Loader>loading</Loader>
          </ControlsCont>
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

// notes from chris & design pow wow

// parrallax could be cool, e.g. plane is shifting with clouds / icons in top

// gradient of brand orange for bg?
