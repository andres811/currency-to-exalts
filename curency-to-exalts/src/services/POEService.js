import React, {Component} from 'react';

class POEService extends Component {

    static BASE_URL = "https://www.pathofexile.com/";
    static CHAR_WINDOW_GET_STASH = "character-window/get-stash-items?accountName=Andres811&tabIndex=0&league=Standard&tabs=1";

    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    static getCurrencyStash(id){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", this.BASE_URL + this.CHAR_WINDOW_GET_STASH , false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText).items;

    }
}

export default POEService;