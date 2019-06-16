import React from 'react';
import ReactDOM from 'react-dom';
import {default as ScrimMixin} from '../../../src/react/mixins/mixins/scrim_mixin';
import {default as mixin} from '../../../src/react/mixins';

describe('ScrimMixin', () => {
  let Component;

  beforeEach(() => {
    class Klass extends mixin(React.Component).with(ScrimMixin) {
      render() {
        return <div className="component"/>;
      }
    }
    Component = Klass;
  });

  describe('when there is no document', () => {
    it('does not throw an exception', () => {
      expect(() => {
        ReactDOM.render(<Component getDocument={() => undefined}/>, root);
      }).not.toThrow();
    });
  });
});