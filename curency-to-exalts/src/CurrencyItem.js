import React, {Component} from 'react';
import POETradeService from './services/POETradeService';

class CurrencyItem extends Component {

    constructor(data) {
        var currencyData = data.currencyData;
        super();
        this.currencyData = currencyData;
        this.state = {valueForEx: 0};
        this.handleChange = this.handleChange.bind(this);
        this.updateTotal = data.updateTotal;
    }

    static POETradeCurrencyIds = {
        "Cartographer's Chisel": "10",
        "Portal Scroll": "18",
        "Orb of Fusing": "2",
        "Regal Orb": "14",
        "Apprentice Cartographer's Sextant": "45",
        "Journeyman Cartographer's Sextant": "46",
        "Chaos Orb": "4",
        "Gemcutter's Prism": "5",
        "Orb of Chance": "9",
        "Orb of Alteration": "1",
        "Glassblower's Bauble": "21",
        "Orb of Regret": "13",
        "Blessed Orb": "12",
        "Orb of Scouring": "11",
        "Scroll of Wisdom": "17",
        "Armourer's Scrap": "19",
        "Orb of Augmentation": "23",
        "Jeweller's Orb": "8",
        "Orb of Transmutation": "22",
        "Silver Coin": "35",
        "Vaal Orb": "16",
        "Blacksmith's Whetstone": "20",
        "Chromatic Orb": "7",
        "Orb of Alchemy": "3"
    };

    static getPOETradeIdByName (name) {
        for(let _name in this.POETradeCurrencyIds){
            if(name == _name) return this.POETradeCurrencyIds[_name];
        }
        return false;
    }

    componentDidMount() {
        let data = this.currencyData;
        if(data){
            let id = CurrencyItem.getPOETradeIdByName(data.typeLine);
            POETradeService.getCurrencyChange(id, (changeRate)=>{
                this.setState({valueForEx: 1/changeRate});
                this.updateTotal();
            })
        }

        //POETradeService.getCurrencyChange()
    }

    componentWillUnmount() {
    }

    handleChange(event) {
        this.setState({valueForEx: event.target.value});
        this.updateTotal();
    }

    getValueInEx(){
        let data = this.currencyData;
        if(!data || !data.stackSize > 0) return 0.00;
        return  this.state.valueForEx / (data.stackSize || 1);
    }

    render() {
        var data = this.currencyData;
        if(!data || !data.stackSize > 0) return <div className="item"></div>;
        console.log(data);
        this.valueInEx = data.stackSize / (this.state.valueForEx || 1);
        return (
            <div className="item">
                <div className="item-name"><img className="item-img" src={data.icon}/> {data.typeLine}</div>
                <div className="item-qty">{data.stackSize}</div>
                <div className="item-for-exalts"><input type="number" value={this.state.valueForEx.toFixed(0)} onChange={this.handleChange}/></div>
                <div className="item-in-exalts">{this.valueInEx.toFixed(2)}</div>
            </div>
        );
    }
}

export default CurrencyItem;