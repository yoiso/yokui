import React, {useState, useEffect, createRef} from 'react';
import classnames from 'classnames';
import {Link, navigate} from 'gatsby';
import elasticlunr, {Index} from 'elasticlunr';
import {Input} from '../../../src/react/inputs';
import '../../stylesheets/search.scss';

elasticlunr.clearStopWords();

const inputRef = createRef();
let searchIndex;

const onWindowKeyDown = evt => {
  if (evt.key !== '/' || !inputRef.current) return;
  const {activeElement: {nodeName, type}} = document;
  if (nodeName === 'INPUT' && type === 'text') return;
  if (nodeName === 'TEXTAREA') return;

  evt.preventDefault();
  inputRef.current.focus();
};

const Search = props => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cursor, setCursor] = useState(0);

  const showResults = focused && query.length > 0 && results.length > 0;

  useEffect(() => {
    window.addEventListener('keydown', onWindowKeyDown);
    return () => window.removeEventListener('keydown', onWindowKeyDown);
  }, []);

  const onInputChange = ({target: {value}}) => {
    searchIndex = searchIndex || Index.load(props.searchIndex);

    setCursor(0);
    setQuery(value);
    setResults(
      searchIndex
        .search(value, {expand: true})
        .map(({ ref }) => searchIndex.documentStore.getDoc(ref))
    );
  };

  const onInputKeyDown = evt => {
    if (!showResults) return;

    switch (evt.key) {
      case 'ArrowDown':
      case 'Down':
        evt.preventDefault();
        setCursor(cursor + 1 >= results.length ? 0 : cursor + 1);
        return;

      case 'ArrowUp':
      case 'Up':
        evt.preventDefault();
        setCursor(cursor - 1 < 0 ? results.length - 1 : cursor - 1);
        return;

      case 'Enter':
        evt.preventDefault();
        setQuery('');
        navigate(results[cursor].route);
        return;

      case 'Escape':
      case 'Esc':
        evt.preventDefault();
        setQuery('');
        return;

      default:
        return;
    }
  };

  const onResultClick = () => {
    setQuery('');
  };

  return (
    <div className="sg-search" role="search">
      <Input
        className="sg-search__input"
        innerRef={inputRef}
        type="search"
        icon="search"
        placeholder="Search..."
        aria-autocomplete="list"
        aria-label="Search style guide pages. Press up and down arrows to choose results, and enter to visit page."
        aria-owns={showResults ? 'sg-search__results' : null}
        aria-activedescendant={showResults ? `sg-search__result-${cursor}` : null}
        value={query}
        onChange={onInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 0)}
        onKeyDown={onInputKeyDown}
      />

      {!focused && (
        <div className="sg-search__press-slash" role="presentation">
          press <span className="sg-search__slash">/</span>
        </div>
      )}

      {showResults && (
        <ul className="sg-search__results" role="listbox" id="sg-search__results">
          {results.map((result, index) => (
            <li
              key={result.id}
              id={`sg-search__result-${index}`}
              className="sg-search__result"
              role="option"
              aria-selected={index === cursor}
            >
              <Link
                to={result.route}
                className={classnames(
                  'sg-search__link',
                  {'sg-search__link--active': index === cursor}
                )}
                onClick={onResultClick}
                tabIndex="-1">
                {result.group} / {result.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
