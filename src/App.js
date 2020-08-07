import React from "react";

import "./styles.css";

const bankOne = [
  {
    keyCode: 81, //JS event keycode from https:/keycode.info/
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

class DrumInterface extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
  }
  render() {
    return (
      <div
        id={this.props.soundId}
        className="drum-pad"
        onClick={this.playSound}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.soundUrl}
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class DrumPad extends React.Component {
  render() {
    let DrumPad;
    this.props.power
      ? (DrumPad = this.props.currentPadBank.map((drumObj, i, DrumPadArr) => {
          return (
            <DrumInterface
              clipId={DrumPadArr[i].id}
              soundUrl={DrumPadArr[i].url}
              keyTrigger={DrumPadArr[i].keyTrigger}
              keyCode={DrumPadArr[i].keyCode}
              updateDisplay={this.props.updateDisplay}
              power={this.props.power}
            />
          );
        }))
      : (DrumPad = this.props.currentPadBank.map((drumObj, i, DrumPadArr) => {
          return (
            <DrumInterface
              clipId={DrumPadArr[i].id}
              soundUrl="http://tinyurl.com/silentmp3"
              keyTrigger={DrumPadArr[i].keyTrigger}
              keyCode={DrumPadArr[i].keyCode}
              updateDisplay={this.props.updateDisplay}
              power={this.props.power}
            />
          );
        }));
    return <div className="pad-bank">{DrumPad}</div>;
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160), // The Character at 160 is non-brefaking space.
      currentPadBank: bankOne,
      currentPadBankId: "Heater Kit",
      sliderVal: 0.3
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.powerControl = this.powerControl.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  selectBank() {
    if (this.state.power) {
      this.state.currentPadBankId === "Heater Kit"
        ? this.setState({
            currentPadBank: bankTwo,
            display: "Smooth Piano Kit",
            currentPadBankId: "Smooth Piano Kit"
          })
        : this.setState({
            currentPadBank: bankOne,
            display: "Heater Kit",
            currentPadBankId: "Heater Kit"
          });
    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render() {
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: "left"
          }
        : {
            float: "right"
          };
    const clips = [].slice.call(document.getElementsByClassName("clip"));

    clips.forEach((sound) => {
      sound.volume = this.state.sliderVal;
    });
    const powerSlider = this.state.power
      ? {
          float: "right"
        }
      : {
          float: "left"
        };

    return (
      <div className="App">
        <div id="drum-machine" className="inner-container">
          <DrumPad
            power={this.state.power}
            updateDisplay={this.displayClipName}
            currentPadBank={this.state.currentPadBank}
            clipVolume={this.state.sliderVal}
          />

          <div className="controls-container">
            <div className="control">
              <p>Power</p>
              <div onClick={this.powerControl} className="select">
                <div style={powerSlider} className="inner" />
              </div>
            </div>

            <p id="display">{this.state.display}</p>

            <div className="volume-slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={this.state.sliderVal}
                onChange={this.adjustVolume}
              />
            </div>

            <div className="control">
              <p>Bank</p>
              <div onClick={this.selectBank} className="select">
                <div style={bankSlider} className="inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
