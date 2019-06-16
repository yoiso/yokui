import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setProps} from '../../support/jest-helpers';
import {TextFilter} from '../../../src/react/text-filter';

describe('TextFilter', () => {
  let data, filter, renderFilteredData, subject;

  beforeEach(() => {
    data = ['apple', 'banana', 'actuator'];
    filter = jasmine.createSpy('filter').and.returnValue(data);
    renderFilteredData = jasmine.createSpy('renderFilteredData')
      .and.returnValue(<ul>{data.map((v, i) => <li key={i}>{v}</li>)}</ul>);
    subject = ReactDOM.render(<TextFilter {...{
      data,
      filter,
      renderFilteredData
    }}/>, root);
  });

  it('renders a filter icon', () => {
    expect('.text-filter > .grid .col:eq(0)').toHaveClass('col-fixed');
    expect('.text-filter > .grid .col:eq(0) svg.icon-filter_list').toExist();
  });

  it('renders a text input', () => {
    expect('.text-filter > .grid .col:eq(1) input').toExist();
    expect('.text-filter > .grid .col:eq(1) input').toHaveAttr('value', '');
  });

  it('gives the text input a default placeholder', () => {
    expect('.text-filter > .grid .col:eq(1) input').toHaveAttr('placeholder', 'Filter...');
  });

  it('renders the count column', () => {
    expect('.text-filter > .grid .col:eq(2)').toHaveClass('col-fixed');
    expect('.text-filter > .grid .col:eq(2)').toHaveText(`${data.length} / ${data.length}`);
  });

  it('renders the unfiltered count', () => {
    expect('.text-filter > .grid .col:eq(2) .unfiltered-count').toHaveText(data.length);
  });

  it('filters the data', () => {
    expect(filter).toHaveBeenCalledWith(data, '');
  });

  it('renders the filtered count', () => {
    expect('.text-filter > .grid .col:eq(2) .filtered-count').toHaveText(data.length);
  });

  it('calls the renderFilteredData callback', () => {
    expect(renderFilteredData).toHaveBeenCalledWith(data);
  });

  it('renders the filtered object', () => {
    expect($('.text-filter > ul li').length).toBe(3);
    expect('.text-filter > ul li:eq(0)').toHaveText('apple');
    expect('.text-filter > ul li:eq(1)').toHaveText('banana');
    expect('.text-filter > ul li:eq(2)').toHaveText('actuator');
  });

  describe('when custom placeholder text is given', () => {
    beforeEach(() => {
      subject::setProps({filterPlaceholderText: 'Your text here...'});
    });

    it('gives the text input the custom placeholder', () => {
      expect('.text-filter > .grid .col:eq(1) input').toHaveAttr('placeholder', 'Your text here...');
    });
  });

  describe('when entering filter text', () => {
    let filtered;

    beforeEach(() => {
      filtered = ['apple', 'actuator'];
      filter.and.returnValue(filtered);
      renderFilteredData.and.returnValue(<ul>{filtered.map((v, i) => <li key={i}>{v}</li>)}</ul>);
      $('input').val('a').simulate('change');
    });

    it('renders the text in the input field', () => {
      expect('input').toHaveAttr('value', 'a');
    });

    it('filters the data', () => {
      expect(filter).toHaveBeenCalledWith(data, 'a');
    });

    it('displays the correct filtered count', () => {
      expect('.text-filter > .grid .col:eq(2) .filtered-count').toHaveText(filtered.length);
      expect('.text-filter > .grid .col:eq(2)').toHaveText(`${filtered.length} / ${data.length}`);
    });

    it('calls the renderFilteredData callback', () => {
      expect(renderFilteredData).toHaveBeenCalledWith(filtered);
    });

    it('renders the filtered object', () => {
      expect($('.text-filter > ul li').length).toBe(2);
      expect('.text-filter > ul li:eq(0)').toHaveText('apple');
      expect('.text-filter > ul li:eq(1)').toHaveText('actuator');
    });

    describe('when there are no results', () => {
      beforeEach(() => {
        filter.and.returnValue([]);
        subject::setProps({data: []});
      });

      describe('and emptyState is given', () => {
        beforeEach(() => {
          subject::setProps({
            data: [],
            emptyState: (<p id="wompwomp">No results</p>)
          });
        });
        it('renders the emptyState', () => {
          expect('#wompwomp').toExist();
        });
      });

      describe('and no emptyState is given', () => {
        it('calls the renderFilteredData callback with empty data', () => {
          expect(renderFilteredData).toHaveBeenCalledWith([]);
        });
      });
    });
  });
});