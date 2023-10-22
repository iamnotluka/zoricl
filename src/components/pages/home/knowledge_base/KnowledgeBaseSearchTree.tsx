import React, { useState } from 'react';
import { MarkdownSection } from '../../../MarkdownSection';

type TreeNode = {
    [key: string]: TreeNode | string;
  };
  
  type TreeItemProps = {
    name: string;
    children?: TreeNode;
    onClick: (path: string) => void;
    path: string;
  };
  const TreeItem: React.FC<TreeItemProps> = ({ name, children, onClick, path }) => {
    return (
      <div>
        <div onClick={() => onClick(path)}>
          {name}
        </div>
        {children && (
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(children).map(([key, value]) => (
              <TreeItem
                key={key}
                name={key}
                children={typeof value === 'string' ? undefined : value}
                onClick={onClick}
                path={`${path}/${key.toLowerCase().replace(/ /g, '-')}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  type SearchTreeProps = {
    data: TreeNode;
  };
  
  const KnowledgeBaseSearchTree: React.FC<SearchTreeProps> = ({ data }) => {
    const [currentPath, setCurrentPath] = useState('');
  
    const handleItemClick = (path: string) => {
      setCurrentPath(path);
    };
  
    return (
      <div>
        {Object.entries(data).map(([key, value]) => (
          <TreeItem
            key={key}
            name={key}
            children={typeof value === 'string' ? undefined : value}
            onClick={handleItemClick}
            path={`/${key.toLowerCase().replace(/ /g, '-')}`}
          />
        ))}
        <div>
            {currentPath.split('/').pop() + '\n'}
            {currentPath.endsWith('.txt') ? <MarkdownSection markdownFileName={currentPath.split('/').pop()}/> : currentPath}
        </div>
      </div>
    );
  };
  
  export default KnowledgeBaseSearchTree;