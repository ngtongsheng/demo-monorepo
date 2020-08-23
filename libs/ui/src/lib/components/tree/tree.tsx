import React, { FunctionComponent, useState, useCallback } from 'react';
import classNames from 'classnames';
import { TreeNode } from '../../ui-interfaces';
import './tree.scss';

export interface TreeProps {
  node: TreeNode;
  defaultIsActive?: boolean;
  onSelect?: Function;
  currentSelectedPath?: string;
}

export const Tree: FunctionComponent<TreeProps> = ({
  node,
  defaultIsActive = false,
  onSelect,
  currentSelectedPath,
}) => {
  const [isActive, setIsActive] = useState<boolean>(defaultIsActive);
  const { children, path, label } = node;
  const isChildren = !!children?.length;

  const treeClassNames = classNames('tree', {
    'is-active': isActive,
  });

  const iconClassNames = classNames('fas', {
    'fa-caret-down': isActive,
    'fa-caret-right': !isActive,
  });

  const treeHeaderClassNames = classNames('tree-header', {
    'is-current': currentSelectedPath === path,
  });

  const handleClick = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const handleSelect = useCallback(
    (event: { target: string }) => {
      if (!onSelect) {
        return;
      }

      onSelect(event.target);
    },
    [onSelect]
  );

  return (
    <div className={treeClassNames}>
      <div key={path} className="tree-node">
        <div className={treeHeaderClassNames}>
          {isChildren && (
            <span className="icon is-small" onClick={handleClick}>
              <i className={iconClassNames}></i>
            </span>
          )}
          <div
            className="tree-label"
            onClick={() => handleSelect({ target: path })}
          >
            <span>{label}</span>
          </div>
        </div>
        {isChildren &&
          children.map((child) => {
            const { path } = child;
            return (
              <Tree
                key={path}
                node={child}
                onSelect={onSelect}
                currentSelectedPath={currentSelectedPath}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Tree;
