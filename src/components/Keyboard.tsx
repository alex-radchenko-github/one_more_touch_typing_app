import React from 'react';

type VirtualKeyboardProps = {
	currentChar: string;
};


export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ currentChar }) => {
	const keys = "abcdefghijklmnopqrstuvwxyz".split('');
	
	return (
		<div className="keyboard">
			{keys.map((key, index) => (
				<div key={index} className={`key ${currentChar === key ? 'highlight' : ''}`}>
					{key}
				</div>
			))}
		</div>
	);
};
