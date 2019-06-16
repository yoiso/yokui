import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {Image} from '../../../src/react/images';

describe('Image', () => {
  const renderComponent = props => ReactDOM.render(
    <Image src="http://placehold.it/20x20" {...props} />, root);

  it('adds classname, id, style to the component', () => {
    const result = renderComponent({className: 'foo', id: 'bar', style: {color: 'red'}});
    const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'foo');

    expect(component).not.toBeNull();
    expect(component.hasAttribute('id')).toBe(true);
    expect(component.getAttribute('id')).toEqual('bar');
    expect(component.style.color).toEqual('red');
  });

  describe('when responsive', () => {
    it('adds the image-responsive class to the image', () => {
      const result = renderComponent({responsive: true});
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img');
      expect(component).not.toBeNull();
      expect(component).toHaveClass('img-responsive');
    });

    describe('when the href is set', () => {
      it('wraps the image in an link', () => {
        const result = renderComponent({responsive: true, href: 'http://google.com'});
        const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'a');
        expect(component).not.toBeNull();
      });
    });

    it('adds the gutter class to the row', () => {
      const result = renderComponent({responsive: true});
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img');
      expect(component).not.toBeNull();
      expect(component.hasAttribute('src')).toBe(true);
      expect(component.getAttribute('src')).toEqual('http://placehold.it/20x20');
    });
  });

  it('when responsive is set to be false does not add the image-responsive class to the image', () => {
    const result = renderComponent({responsive: false});
    const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img');
    expect(component).not.toHaveClass('img-responsive');
  });
});
