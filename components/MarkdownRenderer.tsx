import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let listItems = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2 pl-4 text-slate-400">
                    {listItems.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            );
            listItems = [];
        }
    }

    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            if (!inCodeBlock) {
                flushList();
                elements.push(
                    <pre key={`code-${index}`} className="bg-gray-900 text-sm text-cyan-300 p-3 my-2 rounded-md overflow-x-auto">
                        <code>{codeBlockContent.trim()}</code>
                    </pre>
                );
                codeBlockContent = '';
            }
            return;
        }

        if (inCodeBlock) {
            codeBlockContent += line + '\n';
            return;
        }

        if (line.startsWith('* ') || line.startsWith('- ')) {
            // Process bold and italics within list items
            const formattedItem = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
            const safeItem = DOMPurify.sanitize(formattedItem);
            listItems.push(<span dangerouslySetInnerHTML={{__html: safeItem}} />);
            return;
        }

        flushList();
        
        if (line.startsWith('### ')) {
            elements.push(<h3 key={index} className="text-lg font-semibold text-slate-200 mt-4 mb-2">{line.substring(4)}</h3>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={index} className="text-xl font-semibold text-white mt-4 mb-2">{line.substring(3)}</h2>);
        } else if (line.startsWith('# ')) {
            elements.push(<h1 key={index} className="text-2xl font-bold text-white mt-4 mb-2">{line.substring(2)}</h1>);
        } else {
            // Process bold and italics in paragraphs
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
            const safeLine = DOMPurify.sanitize(formattedLine);
            elements.push(<p key={index} className="text-slate-300 my-2" dangerouslySetInnerHTML={{__html: safeLine}}/>);
        }
    });

    flushList(); // Make sure any trailing list items are rendered

    return elements;
  };

  return <div className="prose prose-invert max-w-none">{renderContent()}</div>;
};

export default MarkdownRenderer;
