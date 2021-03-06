import React from 'react';
import {withList, registerComponent} from "meteor/vulcan:core";
import Inventory from '../../../modules/inventory/collection.js'
import styled from 'styled-components'
import {Quantity} from '../../common/presentational-components/inputs/Quantity.js'
import {Price} from '../../common/presentational-components/Price.js'
import {borderRadius, boxShadow, transition, boxSizing, fontSmoothing} from '../../../stylesheets/style.utils.js';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import withCart from '../../../containers/withCart';

const FlipContainer = styled.div`
  position: relative;
  perspective: 1000px;
  min-width: 400px;
  min-height: 100px;
  margin-bottom: 20px;
`;

const Flipper = styled.div.attrs({
    $transform: props => props.flipped
})`
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  transform: ${props => props.$transform}
`;

const ResultBox = styled.div`
  margin-bottom:20px;
  height:95px;
  width:400px;
  background: #f5f3ed;
  justify-content:space-between;
  align-items: center;
  padding:20px;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")}
`;

const Front = ResultBox.extend`
  z-index: 2;
  transform: rotateY(0deg);
`;

const Back = ResultBox.extend`
  transform: rotateY(180deg);
`;


const AddRemove = styled.div`
  position: absolute;
  top:-10px;
  height:25px;
  width:25px;
  justify-content:center;
  align-items: center;
  font-size:17px;
  color: white;
  cursor: pointer;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.39)")};
  ${borderRadius("50%")}
`;

const Add = AddRemove.extend`
  background: orangered;
  right:-10px;
  &:hover {
    background: #e23e00;
  }
`;

const Remove = AddRemove.extend`
  background: ${props => props.theme.buttonSecondary};
  left:-10px;
  &:hover {
    background: ${props => props.theme.primaryBackground};
  }
`;

const Added = styled.div.attrs({
    $height: props => props.added
})`
  width:100%;
  height: ${props => props.$height};
  position: absolute;
  top:0;
  left: 0;
  background: ${props => props.theme.buttonPrimary};
  color: white;
  align-items: center;
  justify-content:center;
  overflow: hidden;
  ${borderRadius("5px")}
  ${transition("all", ".25s")}
`;


const AddButton = styled.button`
  padding:10px;
  min-width: 100px;
  background: ${props => props.theme.buttonSecondary};;
  ${borderRadius("5px")}

  &:hover {
    background: ${props => props.theme.buttonSecondaryHighlight};
  }
`;

const Input = styled.input`
    border: thin solid lightgray;
    width: 100px;
    padding: 5px;
    text-align: center;
    ${borderRadius("5px")};
`;


class SearchResult extends React.Component {

    constructor(props) {
        super(props);
        this.flip = this.flip.bind(this);
        this.add = this.add.bind(this);
        this.state = {
            flipped: "rotateY(0deg)",
            added: "0px",
            qty: 0
        }
    }

    flip(e) {
        this.setState({flipped: "rotateY(180deg)"})
    }

    add(e) {
        if (this.state.qty) {
            let component = {...this.props.component, qty: this.state.qty};
            this.props.updateCart(component); //passed in through "withCart" container (containers/withCart)
            NotificationManager.success("There is a new item in your cart", "Item Added", 5000);
        } else {
            alert('Please add a quantity')
        }
    }


    componentWillReceiveProps(n) {
        // console.log(n);
    }


    render() {
        const {itemName, itemNumber, accountCode, customerRelation, externalItemNumber, mfm} = this.props.component;
        return (
            <ExpansionPanel style={{width: "800px"}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>{itemName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="flex-column full-width">
                        <Typography>
                            <div className="flex-row"><b>Item number: </b> {itemNumber}</div>
                            <div className="flex-row"><b>Account code: </b> {accountCode}</div>
                            <div className="flex-row"><b>Customer relation: </b> {customerRelation}</div>
                            <div className="flex-row"><b>External item number: </b> {externalItemNumber}</div>
                            <div className="flex-row"><b>MFM: </b> {mfm}</div>
                        </Typography>

                        <div className="flex-row full-width justify-end">
                            <Input type="number" value={this.state.qty} className="space-right"
                                   onChange={(e) => this.setState({qty: e.target.value})}/>
                            <AddButton onClick={this.add}>Add</AddButton>
                        </div>
                    </div>


                </ExpansionPanelDetails>
                <NotificationContainer/>

            </ExpansionPanel>
        )
    }
}

/*
 App.propTypes = {
 connected: React.PropTypes.bool,
 loading: React.PropTypes.bool,
 likes: React.PropTypes.number,
 friends: React.PropTypes.number
 };*/

registerComponent('SearchResult', withCart(SearchResult));
/*<FlipContainer key={itemNumber}>
                <Flipper flipped={this.state.flipped}>

                    <Front className="flex-row">
                        <div className="flex-column">
                            <b>{itemName}</b>
                            <span>{itemNumber}</span>
                        </div>

                        <Price className="flex-column">
                            <span>100 NKr</span>
                        </Price>

                        <Add className="flex-column" onClick={this.flip}>
                            <b>+</b>
                        </Add>
                    </Front>

                    <Back className="flex-row">
                        <Added className="flex-column" added={this.state.added}>
                            <h3 style={{margin:0}}>ADDED</h3>
                            <span>{itemName}</span>
                        </Added>

                        <div className="flex-column">
                            <b>Enter a quantity</b>
                            <Quantity />
                        </div>

                        <Price className="flex-column">
                            <AddButton onClick={this.add}>Add</AddButton>
                        </Price>

                        <Remove className="flex-column" onClick={this.flip}>
                            <b>-</b>
                        </Remove>
                    </Back>

                </Flipper>
            </FlipContainer>*/