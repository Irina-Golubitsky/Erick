import React, { Component } from 'react';


class IntakesD extends Component {

    constructor(props) {
        super(props)   
        this.state = {
            records: []
        }
    }

    componentDidMount() {
    //     var headers = {
    //         'QB-Realm-Hostname': 'arashlaw.quickbase.com',
    //       'User-Agent': '{User-Agent}',
    //       'Authorization': 'QB-USER-TOKEN b7c3vd_m9e3_0_d8z459x75p332cz9g5dn6jss3n',
    //       'Content-Type': 'application/json'
    //   }
      
      
    //   fetch('https://api.quickbase.com/v1/reports?tableId=bsckevgt3',
    //     {
    //       method: 'GET',
    //       headers: headers,
    //     })
    //     .then(response => response.json())
    //   .then(records => {
    //     this.setState({
    //         records: records
    //     })
    // })
    // .catch(error => console.log(error))
    

var headers = {
    'QB-Realm-Hostname': 'arashlaw.quickbase.com',
  'User-Agent': '{User-Agent}',
  'Authorization': 'QB-USER-TOKEN b7c3vd_m9e3_0_d8z459x75p332cz9g5dn6jss3n',
  'Content-Type': 'application/json'
}
var body = {"from":"bsckevgt3","select":[8,17,127],"where":"{'1'.OAF.'2/1/22'}AND{'1'.OBF.'2/31/22'}","groupBy":[{"fieldId":8,"grouping":"equal-values"}],"options":{"skip":0,"compareWithAppLocalTime":false}}

const xmlHttp = new XMLHttpRequest();
xmlHttp.responseType = 'json';
xmlHttp.open('POST', 'https://api.quickbase.com/v1/records/query', true);
for (const key in headers) {
xmlHttp.setRequestHeader(key, headers[key]);
}
xmlHttp.onreadystatechange = function() {
if (xmlHttp.readyState === XMLHttpRequest.DONE) {
  console.log(xmlHttp.response);
}
};


           xmlHttp.send(JSON.stringify(body));
     


    }
      
      


    renderListing() {
        let recordList = [];
        
        this.state.records.map(record => {
            return recordList.push(<li key={record.id}>{record.name}</li>)
        })

        return recordList;
    }

    render() {
        return (
            <ul>
                {this.renderListing()}
            </ul>
        );
    }
}

export default IntakesD ;