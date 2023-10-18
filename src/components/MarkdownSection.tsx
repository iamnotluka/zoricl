import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

interface MarkdownSectionProps {
  markdownFileName: string;
  centralise: boolean;
}

const loadFile = async (markdownFileName: string) => {
  const filePath = process.env.PUBLIC_URL + `/content/${markdownFileName}`;
  
  try {
    const response = await fetch(filePath);

    console.log(response);
    if (!response.ok) {
      throw new Error('Error trying to fetch a file.');
    }

    console.log(await response);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error loading file:', error);
    throw error;
  }
};

export const MarkdownSection: React.FC<MarkdownSectionProps> = ({ markdownFileName, centralise }) => {
  
  const [fileMarkdownData, setFileMarkdownData] = useState<string | null>(null);

  useEffect(() => {
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
  }, [markdownFileName]);

  return (
    <div className={centralise ? "text-align-center" : ""}>
      {fileMarkdownData !== null ? (
        <Markdown>{fileMarkdownData}</Markdown>
      ) : (
        // You can render a loading message or component while fetching the data
        <p>Loading...</p>
      )}
    </div>
  );
};
