import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import styles from './Reader.module.css';
import Controls from './Controls/Controls';
import Counter from './Counter/Counter';
import Publication from './Publication/Publication';

class Reader extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
      }).isRequired,
    ).isRequired,
  };

  state = {
    publicationId: 0,
  };

  componentDidMount() {
    const { history, location } = this.props;
    const { publicationId } = this.state;

    history.push({
      ...location,
      search: `?item=${publicationId + 1}`,
    });

    const parsed = queryString.parse(location.search);
    const idFromQuery = Number(parsed.item - 1);

    if (idFromQuery) {
      this.setState({ publicationId: idFromQuery });
      history.push({
        ...location,
        search: `?item=${idFromQuery + 1}`,
      });
    }
  }

  backwardsPublication = () => {
    this.setState(prevState => {
      return {
        publicationId: prevState.publicationId - 1,
      };
    }, this.handleQuery);
  };

  forwardPublication = () => {
    this.setState(prevState => {
      return {
        publicationId: prevState.publicationId + 1,
      };
    }, this.handleQuery);
  };

  handleControl = ({ target }) => {
    const { name } = target;
    if (name === 'backwards') this.backwardsPublication();
    if (name === 'forward') this.forwardPublication();
  };

  handleQuery = () => {
    const { history, location } = this.props;
    const { publicationId } = this.state;

    history.push({
      ...location,
      search: `?item=${publicationId + 1}`,
    });
  };

  render() {
    const { publicationId } = this.state;
    const { items } = this.props;

    return (
      <div className={styles.reader}>
        <Publication {...items[publicationId]} />
        <Counter
          arrayLength={items.length}
          publicationNumber={publicationId + 1}
        />
        <Controls
          changePublication={this.handleControl}
          publicationId={publicationId}
          arrayLength={items.length}
        />
      </div>
    );
  }
}

Reader.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
  location: PropTypes.shape(PropTypes.object).isRequired,
};

export default Reader;
