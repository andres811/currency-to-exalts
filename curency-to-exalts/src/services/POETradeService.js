/**
 * Created by Andres on 03/07/2017.
 */

import React, {Component} from 'react';
import $ from 'jquery';

export default class POETradeService extends Component {

    static BASE_URL = "http://currency.poe.trade/";
    static GET_CURRENCY_CHANGE_URL = "search?league=%league&online=x&want=%wanted_currency&have=%have_currency";
    static DEFAULT_CURRENCY_WANTED = "6"; // exalted
    static DEFAULT_LEAGUE = "Standard";

    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    static getCurrencyChange(haveCurrencyId, cb, stackSize){
        let url = this.BASE_URL + this.GET_CURRENCY_CHANGE_URL.replace("%league", this.DEFAULT_LEAGUE).replace("%wanted_currency", this.DEFAULT_CURRENCY_WANTED);
        url = url.replace("%have_currency", haveCurrencyId);
        var xmlHttp = new XMLHttpRequest();
        var handleResponse = function (status, response) {
            let offers = $(response).find(".displayoffer");
            for(let offer of offers){
                let buyValue = parseFloat($(offer).attr("data-buyvalue"));
                let sellValue = parseFloat($(offer).attr("data-sellvalue"));
                let stock = parseFloat($(offer).attr("data-stock"));
                if(!stock || stackSize <= stock)
                    return cb(sellValue/buyValue);
            }
        };
        var handleStateChange = function () {
            switch (xmlHttp.readyState) {
                case 0 : // UNINITIALIZED
                case 1 : // LOADING
                case 2 : // LOADED
                case 3 : // INTERACTIVE
                    break;
                case 4 : // COMPLETED
                    handleResponse(xmlHttp.status, xmlHttp.responseText);
                    break;
                default: alert("error");
            }
        };
        xmlHttp.onreadystatechange=handleStateChange;
        xmlHttp.open( "GET", url , true ); // false for synchronous request
        xmlHttp.send( null );

    }
}
