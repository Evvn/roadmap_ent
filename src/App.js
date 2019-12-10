import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./airtable/actions/actions.js";
import styled from "styled-components";
import Roadmap from "./components/Roadmap/Roadmap";
import GoogleLogin from "react-google-login";
// import { gapi } from "gapi-script";

// https://developers.google.com/identity/sign-in/web/reference#users
// gapi.auth2.ClientConfig
// hosted_domain	string	The G Suite domain to which users must belong to sign in. This is susceptible to modification by clients, so be sure to verify the hosted domain property of the returned user. Use GoogleUser.getHostedDomain() on the client, and the hd claim in the ID Token on the server to verify the domain is what you expected.
// You must request the 'email' scope when using this parameter alongside fetch_basic_profile: false.

// GoogleUser.getHostedDomain()
// Get the user's G Suite domain if the user signed in with a G Suite account.

// Returns
// String	The user's G Suite domain

const colorMint = "#21b778";
const colorSaffron = "#f05e2f";
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
  font-family: "Muli", "Helvetica", sans-serif;
  font-weight: 400;
  font-size: 18px;
  margin: 0;
  padding: 0;
  color: ${colorSalt};
`;

const Logo = styled.div`
  background-image: url("vault_logo_onblack.png");
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
  border: 1px solid ${colorSaffron};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: 0 1px 3px rgba(216, 61, 3, 0.32),
      0 1px 2px rgba(216, 61, 3, 0.24);
  }
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

const Password = styled.input.attrs(props => ({ type: "password" }))`
  font-family: inherit;
  width: 150px;
  margin: 16px;
  padding: 8px;
  font-size: 12px;
  color: inherit;
  background-color: transparent;
  border: 1px solid ${colorSaffron};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: 0 1px 3px rgba(216, 61, 3, 0.32),
      0 1px 2px rgba(216, 61, 3, 0.24);
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: false,
      isSignedIn: false
    };
  }

  roadmapBtnClick() {
    const { fetchRoadmap } = this.props;
    const { password } = this.state;
    password === process.env.REACT_APP_INTERNAL_PASSWORD && fetchRoadmap();
    // fetchRoadmap();
  }

  checkPassword = e => {
    this.setState({ password: e.target.value });
  };

  responseGoogle = response => {
    const { fetchRoadmap } = this.props;
    if (response.error) {
      console.error(response.error);
      return;
    }
    console.log(response);
    response.getHostedDomain() === "vaultintel.com" && fetchRoadmap();
  };

  // componentDidMount = () => {
  //   gapi.load("auth2", () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id:
  //         "887187479000-5re53rsg8emlnottg5rar5te1lvln8jv.apps.googleusercontent.com"
  //     });
  //   });
  // };

  render() {
    const { roadmap, isLoading } = this.props;
    console.log(`is loading: ${isLoading}\nroadmap: `);
    !!roadmap && console.log(roadmap);

    return (
      <AppCont>
        <HeaderCont>
          <Logo />
          <Title>Solo Product Roadmap</Title>
          <div style={{ width: "150px" }}>
            <div>
              <span
                style={{
                  border: `1px solid ${colorSaffron}`,
                  width: "12px",
                  marginRight: "5px",
                  display: "inline-block"
                }}
              />
              <span>done</span>
            </div>
            <div>
              <span
                style={{
                  border: `1px dashed ${colorSaffron}`,
                  width: "12px",
                  marginRight: "5px",
                  display: "inline-block"
                }}
              />
              <span>in progress</span>
            </div>
            <div>
              <span
                style={{
                  border: `1px solid ${colorChia}`,
                  width: "12px",
                  marginRight: "5px",
                  display: "inline-block"
                }}
              />
              <span>not started</span>
            </div>
          </div>
        </HeaderCont>
        {!isLoading ? (
          !roadmap && (
            <ControlsCont>
              <GoogleLogin
                clientId="887187479000-5re53rsg8emlnottg5rar5te1lvln8jv.apps.googleusercontent.com"
                buttonText="Vault Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              {/* //   <Password onChange={e => this.checkPassword(e)} />
            //   <Generator
            //     onClick={() => {
            //       this.roadmapBtnClick();
            //     }
            //   >
            //     Go!
            //   </Generator> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

// notes from chris & design pow wow

// parrallax could be cool, e.g. plane is shifting with clouds / icons in top

// gradient of brand orange for bg?
