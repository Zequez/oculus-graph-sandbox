import * as React from 'react';
import axios from 'axios';
import './App.css';
import { GRAPH_ENDPOINT } from '../config';
import { prettify, payloadDecoder, prettifyQuery, generatePayload } from '../utils';
import Input from './Input';

/*class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}*/

interface State {
  result: string[];
  query: string;
  accessToken: string;
  runningQuery: boolean;
}

export default class App extends React.Component<null, State> {
  state: State = {
    result: [],
    query: '',
    accessToken: '',
    runningQuery: false
  };

  decodePayload = () => {
    let { query } = this.state;
    let result = payloadDecoder(query);

    let queries = JSON.parse(result.queries);

    for (let key in queries) {
      query = prettifyQuery(queries[key].q);
    }

    this.setState({
      accessToken: result.access_token,
      query: query
    });
  }

  changeAccessToken = (accessToken: string) => {
    this.setState({accessToken});
  }

  changeQuery = (ev: React.SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({query: ev.currentTarget.value});
  }

  runQuery = () => {
    this.setState({runningQuery: true});
    let { query, accessToken } = this.state;
    axios.post(GRAPH_ENDPOINT, generatePayload(accessToken, query))
      .then((response) => {
        let result;
        if (typeof response.data === 'object') {
          result = [response.data];
        } else {
          result =
            response.data.split('\n').map((val: string) => JSON.parse(val));
        }
        this.setState({result: result, runningQuery: false});
      })
      .catch((error) => {
        this.setState({runningQuery: false, result: ['Network error']});
        throw error;
      });
  }

  render () {
    let { result, query, accessToken, runningQuery } = this.state;

    return (
      <div>
        <h1>Oculus Graph API Sandbox</h1>
        <div className="OculusSandbox">
          <p>
            To obtain an <strong>access token</strong> for the Oculus Graph API:
          </p>
          <ol>
            <li>
              <strong>
                Don't do it unless you trust this website, as the access token gives
                you full control of the Oculus account.</strong> The
              token is sent directly to the Oculus servers from here, and it's not stored anywhere.
            </li>
            <li>Login on the <a href="https://www.oculus.com/">Oculus Website</a></li>
            <li>Right click the page and select "View Page Source" (on Chrome)</li>
            <li>Search with Ctrl+F for "accessToken"</li>
            <li>Copy the long string of characters next to "accessToken"</li>
            <li>Paste it in the box below</li>
          </ol>

          <Input
            onChange={this.changeAccessToken}
            value={accessToken}
            className="OculusSandbox__AccessToken"
            label="Access Token"
          />
          <textarea
            value={query}
            onChange={this.changeQuery}
            className="OculusSandbox__query"
          />
          
          <div className='OculusSandbox__actions'>
            <button onClick={this.runQuery} disabled={runningQuery}>
              Run Query
            </button>
            <button onClick={this.decodePayload}>
              Decode Payload
            </button>
          </div>
          <p>
            The "decode payload" button is to extract the
            graph query and access token from a payload
            sent to the server (likely from an official client)
          </p>
          <code>
            {result.map((v) => prettify(v)).join('\n\n')}
          </code>
        </div>
      </div>
    );
  }
}