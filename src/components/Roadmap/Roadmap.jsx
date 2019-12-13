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

class Roadmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEpic: false,
      x: false,
      y: false,
      linesDrawn: false
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
        "position:absolute;top:0px;left:0px;z-index:-10;"
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
    svg.appendChild(shape);
  };

  drawLines = () => {
    const { roadmap } = this.props;
    Object.values(roadmap).map(e => {
      this.drawLine(
        document.querySelector(`#${e.id}`).getBoundingClientRect(),
        document.querySelector(`#${e.epics[0].id}`).getBoundingClientRect(),
        completeConnector
      );

      this.drawLine(
        document.querySelector(`#roadmapLogo`).getBoundingClientRect(),
        document.querySelector(`#${e.id}`).getBoundingClientRect(),
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
              document.querySelector(`#${epic.id}`).getBoundingClientRect(),
              document
                .querySelector(`#${e.epics[i + 1].id}`)
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

  removeHoverEpic = epic => {
    this.setState({ hoverEpic: false, x: false, y: false });
  };

  drawEpics = epics => {
    return epics.map((epic, i) => {
      // if (!epic.fields["external visibility"]) {
      //   return "";
      // }
      const status = epic.fields["dev status"];
      let style =
        status === "Done"
          ? {
              border: doneBorder
              // borderWidth: "2px",
              // color: "#252525"
              // backgroundColor: "rgba(240, 94, 47, 1)"
            }
          : status === "Underway"
          ? {
              border: underwayBorder
              // borderRight: `4px solid ${colorMint}`,
              // borderBottom: `4px solid ${colorMint}`,
              // color: "#252525"
              // backgroundColor: "rgba(240, 94, 47, .7)"
            }
          : {
              border: incompleteBorder
              // borderWidth: "2px"
              // color: "#252525"
              // backgroundColor: "rgba(240, 94, 47, .3)"
            };

      return (
        <Epic
          className={
            status === "Done" || status === "Underway"
              ? "orangeHover"
              : "greyHover"
          }
          key={i}
          style={style}
          id={epic.id}
          onMouseEnter={e => {
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
    });
  };

  drawThemes = roadmap => {
    return Object.values(roadmap).map((theme, i) => {
      return (
        <Theme key={i}>
          <ThemeTitle id={theme.id}>
            {theme.theme}
            {/* - {theme.epics.length} */}
          </ThemeTitle>
          {this.drawEpics(theme.epics)}
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
      "Dec"
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
          proposed release: {!!f["release q"] ? f["release q"] : "TBD"}
        </HoverEpicField>
        <HoverEpicField>
          design status: {!!f["design status"] ? f["design status"] : "TBD"}
        </HoverEpicField>
        <HoverEpicField>
          dev status: {!!f["dev status"] ? f["dev status"] : "TBD"}
        </HoverEpicField>
      </HoverEpic>
    );
  };

  render() {
    const { roadmap } = this.props;
    const { hoverEpic } = this.state;
    // !!roadmap && console.log(roadmap);

    return (
      <RoadmapCont id="roadmapcont">
        {!!roadmap && <Logo id="roadmapLogo" />}
        {!!hoverEpic && this.drawHoverEpic()}
        {this.drawThemes(roadmap)}
      </RoadmapCont>
    );
  }
}

export default Roadmap;
