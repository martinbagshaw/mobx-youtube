import * as React from 'react';
import { Classes, Tag } from '@blueprintjs/core';

export const Tags = ({ tags }): JSX.Element => (
  <React.Fragment>
    {tags && tags.length && (
      <React.Fragment>
        <h3 className={Classes.HEADING}>Tags</h3>
        <div className="tag-container">
          {tags.map((i: string, idx: number) => (
            <Tag key={idx} minimal>
              {i}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    )}
  </React.Fragment>
);
