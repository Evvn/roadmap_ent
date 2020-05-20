import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./airtable/actions/actions.js";
import styled from "styled-components";
import Roadmap from "./components/Roadmap/Roadmap";
import { GoogleLogin, GoogleLogout, useGoogleLogin } from "react-google-login";
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
  z-index: 15;
`;

const Title = styled.h1`
  font-family: "Muli", "Helvetica", sans-serif;
  font-weight: 400;
  font-size: 20px;
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

const VaultButton = styled.button`
  font-size: 10px;
  padding: 4px 8px;
  font-family: inherit;
  border: 1px solid ${colorSaffron};
  background-color: transparent;
  outline: none;
  color: ${colorSalt};
`;

const Password = styled.input.attrs((props) => ({ type: "password" }))`
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
      signedIn: false,
    };
  }

  responseGoogle = (response) => {
    const { fetchRoadmap } = this.props;

    this.setState({ signedIn: true });

    if (response.error) {
      console.error(response.error);
      return;
    }
    // console.log(response);
    response.getHostedDomain() === "vaultintel.com" && fetchRoadmap();
  };

  logout = () => {
    this.setState({ signedIn: false });
    window.location.reload(false);
  };

  // DEV ONLY
  componentDidMount = () => {
    if (process.env.REACT_APP_ENV !== "prod") {
      this.props.fetchRoadmap();
    }
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
    const { signedIn } = this.state;
    const { roadmap, isLoading, roadmapGrouped } = this.props;

    console.log(`is loading: ${isLoading}\nroadmap: `);
    !!roadmap && console.log(roadmap);

    return (
      <AppCont>
        <HeaderCont>
          <Logo />
          <Title>Vault Enterprise Roadmap</Title>
          <div style={{ width: "150px", fontSize: "12px" }}>
            {!!roadmap && (
              <>
                {signedIn && (
                  <GoogleLogout
                    onLogoutSuccess={this.logout}
                    render={(renderProps) => (
                      <VaultButton
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Log out
                      </VaultButton>
                    )}
                  />
                )}
                <div>
                  <span
                    style={{
                      border: `1px solid ${colorSaffron}`,
                      width: "12px",
                      marginRight: "5px",
                      display: "inline-block",
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
                      display: "inline-block",
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
                      display: "inline-block",
                    }}
                  />
                  <span>not started</span>
                </div>
              </>
            )}
          </div>
        </HeaderCont>
        {!isLoading ? (
          !roadmap && (
            <ControlsCont>
              <GoogleLogin
                clientId="887187479000-5re53rsg8emlnottg5rar5te1lvln8jv.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                render={(renderProps) => (
                  <VaultButton
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Vault log in
                  </VaultButton>
                )}
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
        <Roadmap roadmap={roadmap} roadmapGrouped={roadmapGrouped} />
      </AppCont>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const mapStateToProps = (state) => ({
  roadmap: state.airtable.roadmap,
  roadmapGrouped: state.airtable.roadmapGrouped,
  isLoading: state.airtable.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// notes from chris & design pow wow

// parrallax could be cool, e.g. plane is shifting with clouds / icons in top

// gradient of brand orange for bg?
