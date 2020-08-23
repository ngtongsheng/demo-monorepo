import React, { useEffect, useCallback, useState } from 'react';
import {
  map,
  split,
  zipObj,
  reduce,
  assocPath,
  pipe,
  toPairs,
  is,
} from 'ramda';
import { TreeNode, Tree } from '@demo-monorepo/ui';
import { FolderService } from '@demo-monorepo/service-folder';
import './folders.scss';

const convertPathsToNestedArray = (paths): TreeNode[] => {
  const splitAllSlash = map(split('/'));
  const mergePathsToObject = reduce(
    (output, item: string[]) => assocPath(item, {}, output),
    {}
  );

  const convertArrayToObject = zipObj(['label', 'path', 'children']);
  const mapNestedArrayDeep = (basePath) =>
    pipe(
      toPairs,
      map(([label, path]) => {
        const currentPath = basePath + '/' + label;
        const children = is(Object)(path)
          ? mapNestedArrayDeep(currentPath)(path)
          : [];
        return convertArrayToObject([label, currentPath, children]);
      })
    );

  return pipe(
    splitAllSlash,
    mergePathsToObject,
    mapNestedArrayDeep('')
  )(paths) as TreeNode[];
};

export const Folders = () => {
  const [folders, setFolders] = useState<TreeNode[]>([]);
  const [path, setPath] = useState<string>('/');
  console.log(folders);

  const getFolders = useCallback(async () => {
    const res = await FolderService.getFolders();
    const treeNodes = convertPathsToNestedArray(res);

    setFolders(treeNodes);
  }, []);

  const handleSelect = useCallback(async (event: string) => {
    setPath(event);
  }, []);

  useEffect(() => {
    getFolders();
  }, [getFolders]);

  return (
    <div className="folders">
      <div className="title is-4">Tree view</div>
      <label className="label">Selected path</label>
      <code>{path}</code>

      <div className="folders-container">
        {folders?.map((folder) => (
          <Tree
            node={folder}
            onSelect={handleSelect}
            currentSelectedPath={path}
          />
        ))}
      </div>
    </div>
  );
};

export default Folders;
