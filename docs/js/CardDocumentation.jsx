"use strict";

import React, {Component} from 'react';
import {Card} from 'belle';
import Code from './Code';

export default class CardDocumentation extends Component {

  render() {
    return <Card>

      <h2 id="card" style={ {marginTop: 0, marginBottom: 40} }>Card</h2>

      <Card style={{ borderTop: '1px solid #f2f2f2' }}>
        Add any content here like paragraphs, images or other components …
      </Card>

      <i>Note</i>: The card is designed to work on non-white areas. To provide a
      nice appearance on white areas please change the box-shadow or borders.

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <p>
        Any property valid for a HTML div like
        <span style={ {color: 'grey'} }> style, id, className, …</span>
      </p>

      <h3>More Examples</h3>

      <p>Card with a full-width image</p>

      <Card style={{ borderTop: '1px solid #f2f2f2' }}>
        <img src="../images/ngorongoro_caldera_small.jpg"
             width="560"
             style={{
               marginLeft: -40,
               marginRight: -40
             }}/>
      </Card>

      <Code value={ imageCodeExample } style={ {marginTop: 40} } />

    </Card>;
  }
}

const basicCodeExample = `<!-- basic card example -->
<Card style={{ borderTop: '1px solid #f2f2f2' }}>
  Add any content here like paragraphs, images or other components …
</Card>`;

const imageCodeExample = `<!-- image card example -->
<Card style={{ borderTop: '1px solid #f2f2f2' }}>
  <img src="images/ngorongoro_caldera_small.jpg"
       width="560"
       style={{
         marginLeft: -40,
         marginRight: -40
       }}/>
</Card>`;