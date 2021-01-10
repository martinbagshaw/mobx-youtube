import * as React from 'react';
import { Classes } from '@blueprintjs/core';

export const Category = ({ categoryName }): JSX.Element => (
  <div className="category-container">
    <h3 className={Classes.HEADING}>Category</h3>
    {categoryName}
  </div>
);
