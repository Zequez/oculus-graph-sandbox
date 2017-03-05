import * as React from 'react';

interface InputProps {
  value: string;
  className: string;
  label: string;
  onChange(value: string): void;
}

export default class Input extends React.Component<InputProps, null> {
  onChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(ev.currentTarget.value);
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange}/>
      </div>
    );
  }
}