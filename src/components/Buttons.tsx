import React, { useState } from 'react';
import Keyboard from './Keyboard.tsx';

interface CodeSnippets {
	[key: string]: string;
}

const codeSnippets: CodeSnippets = {
	'Two Sum (JS)': `function twoSum(nums, target) {...}`,
	'useLocalStorage (JS)': `function useLocalStorage(key, initialValue) {...}`
};

const App: React.FC = () => {
	const [selectedCode, setSelectedCode] = useState<string>(Object.keys(codeSnippets)[0]);
	const [currentPosition, setCurrentPosition] = useState<number>(0);
	const currentChar = codeSnippets[selectedCode][currentPosition];
	
	const handleCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCode(event.target.value);
		setCurrentPosition(0);
	};
	
	return (
		<div className="App">
			<header className="App-header">
				<select value={selectedCode} onChange={handleCodeChange}>
					{Object.keys(codeSnippets).map(key => (
						<option key={key} value={key}>{key}</option>
					))}
				</select>
				<div>
					{codeSnippets[selectedCode].split('').map((char, index) => (
						<span key={index} style={{ color: index === currentPosition ? 'red' : 'black' }}>{char}</span>
					))}
				</div>
				<Keyboard currentChar={currentChar} />
			</header>
		</div>
	);
}

export default App;
