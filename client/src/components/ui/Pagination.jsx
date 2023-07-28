import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Button from './common/button/Button';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={'page-item' + (page === currentPage ? ' active' : '')}
            key={'page_' + page}>
            <Button className={'page-link'} handler={() => onPageChange(page)} title={page} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
