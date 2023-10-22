import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

interface MarkdownSectionProps {
  markdownFileName?: string;
}

const loadFile = async (markdownFileName: string) => {
  const filePath = process.env.PUBLIC_URL + `/content/${markdownFileName}`;
  
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Error trying to fetch a file.');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error loading file:', error);
    throw error;
  }
};

export const MarkdownSection: React.FC<MarkdownSectionProps> = ({ markdownFileName }) => {

  const [fileMarkdownData, setFileMarkdownData] = useState<string | null>(
    markdownFileName ? null : "### Nothing to find here."
  );

  useEffect(() => {
    if (markdownFileName) {
      const fetchData = async () => {
        try {
          const data = await loadFile(markdownFileName);
          setFileMarkdownData(data);
        } catch (error) {
          // Handle the error, e.g., show an error message to the user
          console.error('Error fetching and setting file data:', error);
        }
      };

      fetchData();
    } else {
      setFileMarkdownData("### Nothing to find here.");
    }
  }, [markdownFileName]);

  return (
    <div className="markdown-text">
      {fileMarkdownData !== null ? (
        <Markdown>{fileMarkdownData}</Markdown>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
