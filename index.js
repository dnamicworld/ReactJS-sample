import React, { Component } from 'react';
import snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import SoundManager from '../../../utils/SoundManager';
import _ from 'lodash';

import perfectPairsSVG from './perfect-pairs.svg';
import perfectPairsOnSVG from './perfect-pairs-on.svg';
import suitEmUpSVG from './suit-em-up.svg';
import suitEmUpOnSVG from './suit-em-up-on.svg';
import luckyLuckySVG from './lucky-lucky.svg';
import luckyLuckyOnSVG from './lucky-lucky-on.svg';
import busterBlackjackSVG from './buster-blackjack.svg';
import busterBlackjackOnSVG from './buster-blackjack-on.svg';

require('./style.scss');

const chip1 = require('./img/chip-1.png');
const chip5 = require('./img/chip-5.png');
const chip25 = require('./img/chip-25.png');
const chip100 = require('./img/chip-100.png');
const chip500 = require('./img/chip-500.png');
const chip1000 = require('./img/chip-1000.png');

const bets = {
  PerfectPairs : chip1,
  SuitEmUp     : chip1,
  LuckyLucky   : chip1,
  Buster       : chip1,
};

let firstProps;

export default class SideBets extends Component {

  static propTypes = {
    canBet           : React.PropTypes.bool,
    barHeight        : React.PropTypes.number,
    barWidth         : React.PropTypes.number,
    sideBets         : React.PropTypes.object,
    position         : React.PropTypes.number,
    currentBet       : React.PropTypes.number,
    addSideBet       : React.PropTypes.func,
    chipValue        : React.PropTypes.number,
    currentTime      : React.PropTypes.number,
    gameMode         : React.PropTypes.string,
    betBehindView    : React.PropTypes.bool,
    betBehindSideBet : React.PropTypes.object,
    sideBetLimits    : React.PropTypes.array,
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.cleanSideDOM(this.refs.PerfectPairs);
    this.cleanSideDOM(this.refs.SuitEmUp);
    this.cleanSideDOM(this.refs.LuckyLucky);
    this.cleanSideDOM(this.refs.Buster);
    const sideBetsLeftRef = this.refs.sideBetsLeft.getDOMNode();
    sideBetsLeftRef.style.left = `${this.props.barWidth * 0.805}px`;
    sideBetsLeftRef.style.top = `${this.props.barHeight * -0.7}px`;
    sideBetsLeftRef.style.height = `${this.props.barHeight}px`;
    sideBetsLeftRef.style.width = `${this.props.barWidth * 0.275}px`;

    const sideBetsRightRef = this.refs.sideBetsRight.getDOMNode();
    sideBetsRightRef.style.right = `${this.props.barWidth * 0.805}px`;
    sideBetsRightRef.style.top = `${this.props.barHeight * -0.7}px`;
    sideBetsRightRef.style.height = `${this.props.barHeight}px`;
    sideBetsRightRef.style.width = `${this.props.barWidth * 0.275}px`;

    const perfectPairsContent = Snap.parse(perfectPairsSVG.content);
    snap('#PerfectPairs').append(perfectPairsContent);

    const suitEmUpContent = Snap.parse(suitEmUpSVG.content);
    snap('#SuitEmUp').append(suitEmUpContent);

    const luckyLuckyContent = Snap.parse(luckyLuckySVG.content);
    snap('#LuckyLucky').append(luckyLuckyContent);

    const busterBlackjackContent = Snap.parse(busterBlackjackSVG.content);
    snap('#Buster').append(busterBlackjackContent);

    const PerfectPairs = this.refs.PerfectPairs.getDOMNode();
    PerfectPairs.style.marginTop = `${this.props.barHeight * 0.13}px`;
    PerfectPairs.style.marginLeft = `${this.props.barWidth * 0.010}px`;

    const PerfectPairsChip = this.refs.PerfectPairsChip.getDOMNode();
    PerfectPairsChip.style.marginTop = `${this.props.barHeight * 0.35}px`;
    PerfectPairsChip.style.marginLeft = `${this.props.barWidth * 0.035}px`;
    PerfectPairsChip.style.width = `${this.props.barWidth * 26 / 382.8}px`;

    const suitEmUp = this.refs.SuitEmUp.getDOMNode();
    suitEmUp.style.marginTop = `${this.props.barHeight * 0.43}px`;
    suitEmUp.style.marginLeft = `${this.props.barWidth * 0.02}px`;

    const SuitEmUpChip = this.refs.SuitEmUpChip.getDOMNode();
    SuitEmUpChip.style.marginTop = `${this.props.barHeight * 0.60}px`;
    SuitEmUpChip.style.marginLeft = `${this.props.barWidth * 0.043}px`;
    SuitEmUpChip.style.width = `${this.props.barWidth * 26 / 382.8}px`;

    const luckyLucky = this.refs.LuckyLucky.getDOMNode();
    luckyLucky.style.marginTop = `${this.props.barHeight * 0.43}px`;
    luckyLucky.style.marginRight = `${this.props.barWidth * 0.02}px`;

    const luckyLuckyChip = this.refs.LuckyLuckyChip.getDOMNode();
    luckyLuckyChip.style.marginTop = `${this.props.barHeight * 0.60}px`;
    luckyLuckyChip.style.marginLeft = `${this.props.barWidth * 0.022}px`;
    luckyLuckyChip.style.width = `${this.props.barWidth * 26 / 382.8}px`;

    const buster = this.refs.Buster.getDOMNode();
    buster.style.marginTop = `${this.props.barHeight * 0.14}px`;
    buster.style.marginRight = `${this.props.barWidth * 0.010}px`;

    const busterChip = this.refs.BusterChip.getDOMNode();
    busterChip.style.marginTop = `${this.props.barHeight * 0.32}px`;
    busterChip.style.marginLeft = `${this.props.barWidth * 0.019}px`;
    busterChip.style.width = `${this.props.barWidth * 26 / 382.8}px`;
  }

  shouldComponentUpdate (nextProps) {
    let nexttSideBets;
    let componentUpdate = false;
    if (_.has(this.props.sideBets, 'PerfectPairs')) {
      nexttSideBets = nextProps.sideBets;
    }else if (_.has(this.props.betBehindSideBet, 'PerfectPairs')) {
      nexttSideBets = nextProps.betBehindSideBet;
    }
    // For some reason nexttSideBets comes undefined for a few seconds, that's why this hack
    if (nexttSideBets && !_.isEqual(firstProps, nexttSideBets)) {
      componentUpdate = true;
      firstProps = nexttSideBets;
    }
    return componentUpdate;
  }

  componentDidUpdate () {
    this.refreshSvg();
  }

  render () {
    let PerfectPairs;
    let SuitEmUp;
    let LuckyLucky;
    let Buster;
    let playerSideBets;
    if (_.has(this.props.sideBets, 'PerfectPairs')) {
      playerSideBets = this.props.sideBets;
    }else if (_.has(this.props.betBehindSideBet, 'PerfectPairs')) {
      playerSideBets = this.props.betBehindSideBet;
    }
    if (playerSideBets) {
      PerfectPairs = playerSideBets.PerfectPairs.bet;
      SuitEmUp = playerSideBets.SuitEmUp.bet;
      LuckyLucky = playerSideBets.LuckyLucky.bet;
      Buster = playerSideBets.Buster.bet;
    }
    // Below: displays the win message for each sidebet when necessary.
    let perfectPairsMsg = 'none';
    let suitEmUpMsg = 'none';
    let luckyLuckyMsg = 'none';
    let busterMsg = 'none';
    if (!_.isEqual(playerSideBets, {}) && playerSideBets) {
      if (playerSideBets.PerfectPairs.status) {
        perfectPairsMsg = 'block';
      }
      if (playerSideBets.SuitEmUp.status) {
        suitEmUpMsg = 'block';
      }
      if (playerSideBets.LuckyLucky.status) {
        luckyLuckyMsg = 'block';
      }
      if (playerSideBets.Buster.status) {
        busterMsg = 'block';
      }
    }
    const showPerfectPairs = PerfectPairs > 0 ? 'visible' : 'hidden';
    const showLuckyLucky = LuckyLucky > 0 ? 'visible' : 'hidden';
    const showSuitEmUp = SuitEmUp > 0 ? 'visible' : 'hidden';
    const showBuster = Buster > 0 ? 'visible' : 'hidden';
    const viewBoxVal  = '0 0 75 75';
    return (
      <div>
        <div ref="sideBetsLeft" className="side-bets">
          <div onMouseEnter={this.hoverEffect.bind(this, 'PerfectPairs', true)}
               onMouseLeave={this.hoverEffect.bind(this, 'PerfectPairs', false)}
               onClick={this.placeSideBet.bind(this, 'PerfectPairs')}
               className="hvr-float-shadow">
            <div className="winMessage winMessagePP" style={{display : perfectPairsMsg}}>Win</div>
            <div ref="PerfectPairsChip" className="current-betSide-perfectPairs prevent-select" style={{ visibility : showPerfectPairs }}>
              <img src={bets.PerfectPairs} width="100%"/>
              <p>{PerfectPairs}</p>
            </div>
            <svg id="PerfectPairs" ref="PerfectPairs" className="side-bet" viewBox={viewBoxVal}></svg>
          </div>

          <div onMouseEnter={this.hoverEffect.bind(this, 'SuitEmUp', true)}
               onMouseLeave={this.hoverEffect.bind(this, 'SuitEmUp', false)}
               onClick={this.placeSideBet.bind(this, 'SuitEmUp')}
               className="hvr-float-shadow">
               <div className="winMessage winMessageSEU" style={{display : suitEmUpMsg}}>Win</div>
            <div ref="SuitEmUpChip" className="current-betSide-suitEmUp prevent-select" style={{ visibility : showSuitEmUp }}>
              <img src={bets.SuitEmUp} width="100%"/>
              <p>{SuitEmUp}</p>
            </div>
            <svg id="SuitEmUp" ref="SuitEmUp" className="side-bet" viewBox={viewBoxVal}></svg>
          </div>
        </div>

        <div ref="sideBetsRight" className="side-bets">
          <div onMouseEnter={this.hoverEffect.bind(this, 'LuckyLucky', true)}
               onMouseLeave={this.hoverEffect.bind(this, 'LuckyLucky', false)}
               onClick={this.placeSideBet.bind(this, 'LuckyLucky')}
               className="hvr-float-shadow">
            <div className="winMessage winMessageLL" style={{display : luckyLuckyMsg}}>Win</div>
            <div ref="LuckyLuckyChip" className="current-betSide-luckyLucky prevent-select" style={{visibility : showLuckyLucky }}>
              <img src={bets.LuckyLucky} width="100%"/>
              <p>{LuckyLucky}</p>
            </div>
            <svg id="LuckyLucky" ref="LuckyLucky" className="side-bet" viewBox={viewBoxVal}></svg>
          </div>

          <div onMouseEnter={this.hoverEffect.bind(this, 'Buster', true)}
               onMouseLeave={this.hoverEffect.bind(this, 'Buster', false)}
               onClick={this.placeSideBet.bind(this, 'Buster')}
               className="hvr-float-shadow">
            <div className="winMessage winMessageBB" style={{display : busterMsg}}>Win</div>
            <div ref="BusterChip" className="current-betSide-checkTwOneTh prevent-select" style={{ visibility : showBuster }}>
              <img src={bets.Buster} width="100%"/>
              <p>{Buster}</p>
            </div>
            <svg id="Buster" ref="Buster" className="side-bet" viewBox={viewBoxVal}></svg>
          </div>
        </div>
      </div>
    );
  }

  cleanSideDOM (ref) {
    const DOMNode = ref.getDOMNode();
    DOMNode.style.width = `${this.props.barWidth * 44 / 382.8}px`;
    DOMNode.style.filter = '';
    DOMNode.innerHTML = '';
  }

  placeSideBet (sideBet) {
    if (this.props.currentTime !== 0) {
      const sideBetLimit = _.find(this.props.sideBetLimits, (limit) => {
        return limit.name === sideBet;
      });
      const sideBetMax = (sideBetLimit) ? parseFloat(sideBetLimit.sideMax, 10) : 0;

      if (
        (this.props.canBet === true && this.props.currentBet > 0) &&
        ((this.props.sideBets[sideBet].bet + this.props.chipValue) <= sideBetMax)
      ) {
        this.props.sideBets[sideBet].bet = this.props.sideBets[sideBet].bet + this.props.chipValue;
        this.refs[sideBet].getDOMNode().style.filter = 'url(#glow-filter)';
        this.props.addSideBet({
          sideBet  : sideBet,
          sideBets : this.props.sideBets,
        });
        this.setChip(sideBet, this.props.sideBets[sideBet].bet);
      } else if (
        (this.props.betBehindView) &&
        ((this.props.betBehindSideBet[sideBet].bet + this.props.chipValue) <= sideBetMax)
      ) {// bet behind player can bet even if there's no bet on his spot
        this.props.betBehindSideBet[sideBet].bet = this.props.betBehindSideBet[sideBet].bet + this.props.chipValue;
        this.props.addSideBet({
          sideBet  : sideBet,
          sideBets : this.props.betBehindSideBet,
        });
        this.setChip(sideBet, this.props.betBehindSideBet[sideBet].bet);
      } else {
        this.notAllowedTo(sideBet);
      }
    } else {
      this.notAllowedTo(sideBet);
    }
  }

  notAllowedTo (sideBet) {
    SoundManager.play('notAllowedTo');
    this.refs[sideBet].getDOMNode().classList.add('animated', 'pulse');
    setTimeout(() => {
      this.refs[sideBet].getDOMNode().classList.remove('animated', 'pulse');
    }, 500);
  }

  setChip (sideBet, amount) {
    if (amount >= 1000) {
      bets[sideBet] = chip1000;
    }else if (amount < 1000 && amount >= 500) {
      bets[sideBet] = chip500;
    }else if (amount < 500 && amount >= 100) {
      bets[sideBet] = chip100;
    }else if (amount < 100 && amount >= 25) {
      bets[sideBet] = chip25;
    }else if (amount < 25 && amount >= 5) {
      bets[sideBet] = chip5;
    }else if (amount < 5 && amount > 0) {
      bets[sideBet] = chip1;
    }
  }

  hoverEffect (id, hovered) {
    this.cleanSideDOM(this.refs[id]);
    let isActive = hovered;
    let playerSideBets;
    if (!_.isEqual(this.props.sideBets, {})) {
      playerSideBets = this.props.sideBets;
    }else if (!_.isEqual(this.props.betBehindSideBet, {})) {
      playerSideBets = this.props.betBehindSideBet;
    }
    if (playerSideBets) {
      if (playerSideBets[id].bet > 0) {
        isActive = true;
      }
    }
    const sideBets = {
      PerfectPairs : function hoverPerfectPairs () {
        if (isActive) {
          snap('#PerfectPairs').append(Snap.parse(perfectPairsOnSVG.content));
        }else {
          snap('#PerfectPairs').append(Snap.parse(perfectPairsSVG.content));
        }
      },
      SuitEmUp : function hoverSuitEmUp () {
        if (isActive) {
          snap('#SuitEmUp').append(Snap.parse(suitEmUpOnSVG.content));
        }else {
          snap('#SuitEmUp').append(Snap.parse(suitEmUpSVG.content));
        }
      },
      LuckyLucky : function hoverLuckyLucky () {
        if (isActive) {
          snap('#LuckyLucky').append(Snap.parse(luckyLuckyOnSVG.content));
        }else {
          snap('#LuckyLucky').append(Snap.parse(luckyLuckySVG.content));
        }
      },
      Buster : function hoverBuster () {
        if (isActive) {
          snap('#Buster').append(Snap.parse(busterBlackjackOnSVG.content));
        }else {
          snap('#Buster').append(Snap.parse(busterBlackjackSVG.content));
        }
      },
    };
    sideBets[id]();
  }

  refreshSvg () {
    this.cleanSideDOM(this.refs.PerfectPairs);
    this.cleanSideDOM(this.refs.SuitEmUp);
    this.cleanSideDOM(this.refs.LuckyLucky);
    this.cleanSideDOM(this.refs.Buster);
    let sideBetsObject;
    if (_.has(this.props.sideBets, 'PerfectPairs')) {
      sideBetsObject = this.props.sideBets;
    }else if (_.has(this.props.betBehindSideBet, 'PerfectPairs')) {
      sideBetsObject = this.props.betBehindSideBet;
    }
    if (sideBetsObject) {
      if (sideBetsObject.PerfectPairs.bet === 0) {
        snap('#PerfectPairs').append(Snap.parse(perfectPairsSVG.content));
      } else {
        snap('#PerfectPairs').append(Snap.parse(perfectPairsOnSVG.content));
        this.setChip('PerfectPairs', sideBetsObject.PerfectPairs.bet);
      }

      if (sideBetsObject.SuitEmUp.bet === 0) {
        snap('#SuitEmUp').append(Snap.parse(suitEmUpSVG.content));
      } else {
        snap('#SuitEmUp').append(Snap.parse(suitEmUpOnSVG.content));
        this.setChip('SuitEmUp', sideBetsObject.SuitEmUp.bet);
      }

      if (sideBetsObject.LuckyLucky.bet === 0) {
        snap('#LuckyLucky').append(Snap.parse(luckyLuckySVG.content));
      } else {
        snap('#LuckyLucky').append(Snap.parse(luckyLuckyOnSVG.content));
        this.setChip('luckyLucky', sideBetsObject.LuckyLucky.bet);
      }

      if (sideBetsObject.Buster.bet === 0) {
        snap('#Buster').append(Snap.parse(busterBlackjackSVG.content));
      } else {
        snap('#Buster').append(Snap.parse(busterBlackjackOnSVG.content));
        this.setChip('Buster', sideBetsObject.Buster.bet);
      }
    }
  }
}
