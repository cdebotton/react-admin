"use strict";

import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import serialize from "serialize-javascript";

export default class HTMLDocument extends React.Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
    scripts: PropTypes.array.isRequired,
    styles: PropTypes.array.isRequired,
    snapshot: PropTypes.string
  }

  render() {
    let {
      styles,
      scripts,
      snapshot,
      markup
    } = this.props;

    return (
      <html lang="en">
      <head>
        <title>{ DocumentTitle.rewind() }</title>
        <link
          href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900"
          rel="stylesheet" />
        { styles.map((css, key) => (
          <link
            rel="stylesheet"
            key={ key }
            href={ css } />
        )) }
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: markup }} />
        <script
          id="payload"
          dangerouslySetInnerHTML={{ __html: serialize(snapshot) }} />
        { scripts.map((js, key) => (
          <script
            key={ key }
            src={ js } />
        )) }
      </body>
      </html>
    );
  }
}
