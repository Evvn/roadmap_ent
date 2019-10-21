import React from "react";
import styled from "styled-components";

const RoadmapCont = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  border: 1px dotted #ffc3fc;
  margin: 18px;
`;

const Theme = styled.div`
  display: inline-block;
  vertical-align: top;
  border: 1px dotted #737373;
  margin: 8px;
  max-width: 215px;
  white-space: pre-wrap;
`;

const ThemeTitle = styled.h2`
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-weight: 900;
  font-size: 26px;
  margin: 0;
  padding: 10px;
`;

const Epic = styled.div`
  font-size: 10px;
  max-width: 165px;
  white-space: pre-wrap;
  color: #ffd5fd;
  padding: 8px;
  margin: 20px 8px;
`;

const HoverEpic = styled.div`
  width: 200px;
  background-color: #292929;
  border: 1px dotted #d5f2ff;
  white-space: pre-wrap;
  position: absolute;
  padding: 5px;
  font-size: 8px;
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
      y: false
    };
  }

  addHoverEpic = (epic, x, y) => {
    this.setState({ hoverEpic: epic, x, y }, () => {
      // console.log(this.state);
    });
  };

  removeHoverEpic = epic => {
    this.setState({ hoverEpic: false, x: false, y: false });
  };

  drawEpics = epics => {
    return epics.map((epic, i) => {
      const status = epic.fields["dev status"];
      let style =
        status === "done"
          ? {
              border: "1px solid #BDF9CD"
            }
          : status === "underway"
          ? { border: "1px dotted #BDF9CD" }
          : { border: "1px solid #FB628B" };

      return (
        <Epic
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
          {epic.fields.priority} - {epic.fields.epic}
        </Epic>
      );
    });
  };

  drawThemes = roadmap => {
    return Object.values(roadmap).map((theme, i) => {
      return (
        <Theme key={i}>
          <ThemeTitle>
            {theme.theme} - {theme.epics.length}
          </ThemeTitle>
          {this.drawEpics(theme.epics)}
        </Theme>
      );
    });
  };

  drawHoverEpic = () => {
    const { hoverEpic, x, y } = this.state;
    const mouseStyle = { left: `${x + 50}px`, top: `${y - 150}px` };
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
        <HoverEpicField>
          proposed release:{" "}
          {!!propRelease &&
            `${propRelease.getDate()} ${
              months[propRelease.getMonth()]
            } ${propRelease.getFullYear()}`}
        </HoverEpicField>
        <HoverEpicField>design status: {f["design status"]}</HoverEpicField>
        <HoverEpicField>dev status: {f["dev status"]}</HoverEpicField>
      </HoverEpic>
    );
  };

  render() {
    const { roadmap } = this.props;
    const { hoverEpic } = this.state;
    return (
      <RoadmapCont>
        {!!hoverEpic && this.drawHoverEpic()}
        {this.drawThemes(roadmap)}
      </RoadmapCont>
    );
  }
}

export default Roadmap;
