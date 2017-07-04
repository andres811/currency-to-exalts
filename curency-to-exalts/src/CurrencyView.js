import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';
import POEService from './services/POEService';
import POETradeService from './services/POETradeService';
import CurrencyItem from './CurrencyItem';

class CurrencyView extends Component {

    static SHOWN_CURRENCIES = [
        "Cartographer's Chisel",
        "Portal Scroll",
        "Orb of Fusing",
        "Regal Orb",
        "Apprentice Cartographer's Sextant",
        "Journeyman Cartographer's Sextant",
        "Chaos Orb",
        "Gemcutter's Prism",
        "Orb of Chance",
        "Orb of Alteration",
        "Glassblower's Bauble",
        "Orb of Regret",
        "Blessed Orb",
        "Orb of Scouring",
        "Scroll of Wisdom",
        "Armourer's Scrap",
        "Orb of Augmentation",
        "Jeweller's Orb",
        "Orb of Transmutation",
        "Silver Coin",
        "Vaal Orb",
        "Blacksmith's Whetstone",
        "Chromatic Orb",
        "Orb of Alchemy"
    ];

    constructor() {
        super();
        this.currencyItems = [];
        this.state = {totalInEx: 0.00}
    }

    componentDidMount() {
        this.updateTotal();
    }
    componentWillMount(){
        this.currencies = POEService.getCurrencyStash();
    }

    componentWillUnmount() {
    }

    updateTotal(){
        let total = 0;
        for(let currencyItem of this.currencyItems){
            total += (currencyItem && currencyItem.getValueInEx()) || 0.00;
        }
        this.setState({totalInEx: total});
    }
    render() {
        let self = this;
        return (
            <div className="my-currency">
                <div className="owned-currency">{this.currencies.map((currency)=>{
                    if(CurrencyView.SHOWN_CURRENCIES.indexOf(currency.typeLine) > -1 ){
                        return <CurrencyItem updateTotal={self.updateTotal.bind(this)} currencyData={currency} ref={(currencyItem)=>{this.currencyItems = [];this.currencyItems.push(currencyItem)}}/>
                    }
                })}</div>
                <div className="total-container">
                    <div className="exalted-icon"></div>
                    <div className="total-in-exalts">{this.state.totalInEx.toFixed(2)}</div>
                </div>
            </div>
        );
    }
}

export default CurrencyView;