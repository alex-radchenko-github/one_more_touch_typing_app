import React from 'react';
import styles from './CodeDisplay.module.css'

interface Highlight {
	index: number;
	style: 'current' | 'visited' | 'error' | 'nostyle';
}

interface CodeDisplayProps {
	codeText: string;
	highlights: Highlight[];
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codeText, highlights }) => {
	
		
		
		// Function to render the text with highlights
	const renderTextWithHighlights = () => {
		let elements = [];
		let lastIndex = 0;
		
		highlights.sort((a, b) => a.index - b.index).forEach((highlight, i) => {
			const { index, style } = highlight;
			const before = codeText.substring(lastIndex, index);
			const character = codeText[index];
			// @ts-ignore
			const after = codeText.substring(index + 1);
			let cssStyle = {};
			
			switch (style) {
				case 'current':
					cssStyle = { backgroundColor: 'orange', fontWeight: 'bold' };
					break;
				case 'visited':
					cssStyle = { color: 'purple', textDecoration: 'underline' };
					break;
				case 'error':
					cssStyle = { color: 'red', backgroundColor: 'pink'};
					break;
			}
			
			elements.push(<span key={`before-${i}`}>{before}</span>);
			elements.push(<span key={`char-${i}`} style={cssStyle}>{character}</span>);
			lastIndex = index + 1;
		});
		
		// Add the remaining part of the text after the last highlight
		elements.push(<span key="after-last">{codeText.substring(lastIndex)}</span>);
		
		return <>{elements}</>;
	};
	
	return (
		<div className={styles.codeWrapper}>
			<pre className={styles.pre}>{renderTextWithHighlights()}</pre>
		</div>
	);
};

export default CodeDisplay;
