import React from "react";
import styled from "styled-components";

const colorMint = "#21b778";
const colorSaffron = "#f05e2f";
const colorAcai = "#0078a1";
const colorChia = "#737373";
const colorCardomom = "#555555";
const colorSalt = "#f6f6f6";
const colorPoppy = "#aaaaaa";
const colorPeppercorn = "#252525";
const cardBackground = colorPeppercorn;
const cardOutline = colorPoppy;
const completeConnector = colorChia;
const incompleteConnector = colorChia;
const borderWidth = "1px";
const doneBorder = `${borderWidth} solid ${colorSaffron}`;
const underwayBorder = `${borderWidth} dashed ${colorSaffron}`;
const incompleteBorder = `${borderWidth} solid  ${colorChia}`;

const RoadmapCont = styled.div`
  white-space: nowrap;
  padding-top: 100px;
`;

const Theme = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 8px;
  min-width: 165px;
  max-width: 165px;
  white-space: pre-wrap;
`;

const ThemeTitle = styled.h2`
  font-family: "Muli", "Helvetica", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  padding: 10px;
  border-radius: 5px;
  color: inherit;
  background-color: ${cardBackground};
  /* border: ${borderWidth} solid ${cardOutline}; */
  text-align: center;
  min-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Segment = styled.div`
  width: max-content;
  border-top: 1px solid #404040;
  color: ${colorChia};
  z-index: -999;
  padding-top: 25px;

  /* 
  &:nth-of-type(even) {
    background-color: #212121;
  } */

  span {
    position: absolute;
    left: 15px;
    margin-top: -5px;
  }
`;

const Epic = styled.div`
  background-color: ${cardBackground};
  font-size: 12px;
  min-width: 125px;
  /* max-width: 125px; */
  white-space: pre-wrap;
  color: ${colorSalt};
  padding: 10px;
  margin: 25px auto;
  border-radius: 5px;
  z-index: 5 !important;

  &.orangeHover {
    /* Material box shadow */
    box-shadow: 0 1px 3px rgba(216, 61, 3, 0.32),
      0 1px 2px rgba(216, 61, 3, 0.24);
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 5px 15px 3px rgba(216, 61, 3, 0.35);
    }
  }

  &.greyHover {
    /* Material box shadow */
    box-shadow: 0 1px 3px rgba(115, 115, 115, 0.32),
      0 1px 2px rgba(115, 115, 115, 0.24);
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 5px 15px 3px rgba(115, 115, 115, 0.35);
    }
  }
`;

const Logo = styled.div`
  background-image: url("vault_logo_onblack.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 250px;
  height: 110px;
  margin: 30px auto 130px auto;
`;

const HoverEpic = styled.div`
  width: 200px;
  color: ${colorCardomom};
  background-color: #f6f6f6;
  border: ${borderWidth} solid ${colorChia};
  border-radius: 5px;
  white-space: pre-wrap;
  position: absolute;
  padding: 5px;
  font-size: 8px;
  box-shadow: 0 4px 11px 3px rgba(115, 115, 115, 0.35);
`;

const HoverEpicTitle = styled.p`
  font-size: 12px;
`;

const HoverEpicField = styled.p`
  font-size: 10px;
`;

// Start Roadmap Class---------------------------------------------------------------------------------------------

class Roadmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEpic: false,
      x: false,
      y: false,
      linesDrawn: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.onResize, true);
  };

  onResize = () => {
    // remove lines first
    document.querySelector("#svg-canvas").innerHTML = "";
    this.drawLines();
  };

  componentDidUpdate = () => {
    const { roadmap } = this.props;
    const { linesDrawn } = this.state;
    // draw connecting lines if the epics are drawn in
    if (linesDrawn === false) {
      roadmap && this.drawLines();
    }
  };

  createSVG = () => {
    let svg = document.querySelector("#svg-canvas");
    if (null === svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "svg-canvas");
      svg.setAttribute(
        "style",
        "position:absolute;top:0px;left:0px;z-index:-1;"
      );
      svg.setAttribute("width", document.body.scrollWidth);
      svg.setAttribute("height", document.body.scrollHeight);
      svg.setAttributeNS(
        "http://www.w3.org/2000/xmlns/",
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink"
      );
      document.body.appendChild(svg);
    }
    return svg;
  };

  drawCurvedLine = (x1, y1, x2, y2, color, tension) => {
    let svg = this.createSVG();
    let shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let delta = (x2 - x1) * tension;
    let hx1 = x1 + delta;
    let hy1 = y1;
    let hx2 = x2 - delta;
    let hy2 = y2;
    let path =
      "M " +
      x1 +
      " " +
      y1 +
      " C " +
      hx1 +
      " " +
      hy1 +
      " " +
      hx2 +
      " " +
      hy2 +
      " " +
      x2 +
      " " +
      y2;
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", "1px");
    shape.setAttribute(null, "style", { zIndex: 99 });
    svg.appendChild(shape);
  };

  drawLines = () => {
    const { roadmap } = this.props;
    Object.values(roadmap).map((e) => {
      this.drawLine(
        document
          .querySelector(`#${e.id.replace(/[^a-zA-Z ]/g, "")}`)
          .getBoundingClientRect(),
        document
          .querySelector(`#${e.epics[0].id.replace(/[^a-zA-Z ]/g, "")}`)
          .getBoundingClientRect(),
        completeConnector
      );

      this.drawLine(
        document.querySelector(`#roadmapLogo`).getBoundingClientRect(),
        document
          .querySelector(`#${e.id.replace(/[^a-zA-Z ]/g, "")}`)
          .getBoundingClientRect(),
        completeConnector
      );

      return e.epics.map((epic, i) => {
        const color =
          epic.fields["dev status"] === "Done" ||
          epic.fields["dev status"] === "Underway"
            ? completeConnector
            : incompleteConnector;
        return i < e.epics.length - 1
          ? this.drawLine(
              document
                .querySelector(`#${epic.id.replace(/[^a-zA-Z ]/g, "")}`)
                .getBoundingClientRect(),
              document
                .querySelector(
                  `#${e.epics[i + 1].id.replace(/[^a-zA-Z ]/g, "")}`
                )
                .getBoundingClientRect(),
              color
            )
          : "";
      });
    });
    return this.setState({ linesDrawn: true });
  };

  drawLine = (p1, p2, color) => {
    // console.log("p1:");
    // console.log(p1);
    // console.log("p2:");
    // console.log(p2);
    this.drawCurvedLine(
      p1.x + p1.width / 2,
      p1.y + p1.height,
      p2.x + p2.width / 2,
      p2.y,
      color,
      0.0
    );
  };

  addHoverEpic = (epic, x, y) => {
    this.setState({ hoverEpic: epic, x, y }, () => {});
  };

  removeHoverEpic = (epic) => {
    this.setState({ hoverEpic: false, x: false, y: false });
  };

  drawEpics = (epics) => {
    return (
      <Theme>
        {epics.map((epic, i) => {
          // if (!epic.fields["external visibility"]) {
          //   return "";
          // }

          const sprints = epic.fields["sprints"] ? epic.fields["sprints"] : "";
          const releaseQ = epic.fields["Proposed Release Quarter"]
            ? epic.fields["Proposed Release Quarter"]
            : "";

          let style =
            releaseQ === "Released"
              ? {
                  border: doneBorder,
                  // borderWidth: "2px",
                  // color: "#252525"
                  // backgroundColor: "rgba(240, 94, 47, 1)"
                }
              : sprints !== ""
              ? {
                  border: underwayBorder,
                  // borderRight: `4px solid ${colorMint}`,
                  // borderBottom: `4px solid ${colorMint}`,
                  // color: "#252525"
                  // backgroundColor: "rgba(240, 94, 47, .7)"
                }
              : {
                  border: incompleteBorder,
                  // borderWidth: "2px"
                  // color: "#252525"
                  // backgroundColor: "rgba(240, 94, 47, .3)"
                };

          return (
            <Epic
              className={
                sprints === "Done" || sprints === "Underway"
                  ? "orangeHover"
                  : "greyHover"
              }
              key={i}
              style={style}
              id={epic.id.replace(/[^a-zA-Z ]/g, "")}
              onMouseEnter={(e) => {
                this.addHoverEpic(epic, e.pageX, e.pageY);
              }}
              onMouseLeave={() => {
                this.removeHoverEpic(epic);
              }}
            >
              {/* {epic.fields.priority} -  */}
              {epic.fields.epic}
              {/* {epic.fields.summary} */}
            </Epic>
          );
        })}
      </Theme>
    );
  };

  drawThemes = (roadmap) => {
    return Object.values(roadmap).map((theme, i) => {
      return (
        <Theme key={i}>
          <ThemeTitle id={theme.id.replace(/[^a-zA-Z ]/g, "")}>
            {theme.theme}
            {/* - {theme.epics.length} */}
          </ThemeTitle>
          {/* {this.drawEpics(theme.epics)} */}
        </Theme>
      );
    });
  };

  drawHoverEpic = () => {
    const { hoverEpic, x, y } = this.state;
    let mouseStyle = { left: `${x + 50}px`, top: `${y - 150}px` };
    // if mouse style is greater than half way, show to left
    // console.log(document.body.scrollWidth);
    if (mouseStyle.left - 400 > document.body.scrollWidth) {
      mouseStyle.left = mouseStyle.left - 300;
    }
    // console.log(mouseStyle.left);

    const f = hoverEpic.fields;
    const propRelease = !!f["proposed release"]
      ? new Date(Date.parse(f["proposed release"]))
      : "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <HoverEpic style={mouseStyle}>
        <HoverEpicTitle>{f.epic}</HoverEpicTitle>
        {/* <HoverEpicField>
          proposed release:{" "}
          {!!propRelease
            ? `${propRelease.getDate()} ${
                months[propRelease.getMonth()]
              } ${propRelease.getFullYear()}`
            : "TBD"}
        </HoverEpicField> */}
        <HoverEpicField>
          Proposed Release:{" "}
          {!!f["Proposed Release Quarter"]
            ? f["Proposed Release Quarter"]
            : "TBD"}
        </HoverEpicField>
        <HoverEpicField>
          R&D Status:{" "}
          {!!f["r&d progress"] ? `${f["r&d progress"] * 100}%` : "TBD"}
        </HoverEpicField>
        <HoverEpicField>
          Design Status:{" "}
          {!!f["design status"] ? `${f["design status"] * 100}%` : "TBD"}
        </HoverEpicField>
      </HoverEpic>
    );
  };

  render() {
    const { roadmap, roadmapGrouped } = this.props;
    const { hoverEpic, drawThis } = this.state;
    !!roadmap && console.log(roadmap);
    !!roadmapGrouped && console.log(roadmapGrouped);

    let releasedEmpty = false;
    let q1Empty = false;
    let q2Empty = false;
    let q3Empty = false;
    let q4Empty = false;
    let plannedEmpty = false;
    let themeCounter = Object.keys(roadmap).length;

    let emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.released.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          releasedEmpty = true;
        }
      });
    emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.q1.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          q1Empty = true;
        }
      });
    emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.q2.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          q2Empty = true;
        }
      });
    emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.q3.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          q3Empty = true;
        }
      });
    emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.q4.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          q4Empty = true;
        }
      });
    emptyCounter = 0;
    !!roadmapGrouped &&
      Object.values(roadmapGrouped.planned.themes).forEach((theme) => {
        if (theme.epics.length === 0) {
          emptyCounter++;
        }
        if (emptyCounter === themeCounter) {
          plannedEmpty = true;
        }
      });

    return (
      <RoadmapCont id="roadmapcont">
        {!!roadmap && <Logo id="roadmapLogo" />}
        {!!hoverEpic && this.drawHoverEpic()}
        {this.drawThemes(roadmap)}
        {!!roadmapGrouped && (
          <>
            {!releasedEmpty && (
              <Segment className={"releasedSeg"}>
                <span>Released</span>
                {Object.values(roadmapGrouped.released.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
            {!q1Empty && (
              <Segment className={"q1fy20Seg"}>
                <span>Q1 CY20</span>
                {Object.values(roadmapGrouped.q1.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
            {!q2Empty && (
              <Segment className={"q2fy20Seg"}>
                <span>Q2 CY20</span>
                {Object.values(roadmapGrouped.q2.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
            {!q3Empty && (
              <Segment className={"q3fy20Seg"}>
                <span>Q3 CY20</span>
                {Object.values(roadmapGrouped.q3.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
            {!q4Empty && (
              <Segment className={"q4fy20Seg"}>
                <span>Q4 CY20</span>
                {Object.values(roadmapGrouped.q4.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
            {!plannedEmpty && (
              <Segment className={"plannedSeg"}>
                <span>Planned</span>
                {Object.values(roadmapGrouped.planned.themes).map((theme) => {
                  return this.drawEpics(theme.epics);
                })}
              </Segment>
            )}
          </>
        )}
      </RoadmapCont>
    );
  }
}

export default Roadmap;
