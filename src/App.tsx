import React, {useEffect, useState} from 'react';
import {codeSnippets} from "./codeSnippets";
import CodeDisplay from "./components/CodeDisplay";
import {getFingerGroup} from "./components/fingerGroups.ts";
import {isUpperCase} from "./components/isUpperCase.ts";
import StaticKeyboard from './components/StaticKeyboard.tsx';
import Fingers from './components/Hands.tsx';
import "./App.css"


export const App = () => {
	const [currentCode, setCurrentCode] = useState(codeSnippets.twoSum);
	const [currentIndex, setCurrentIndex] = useState(0);
	
	const [highlights, setHighlights] = useState([
		{index: currentIndex, style: 'current'},
	]);
	
	
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			// console.log(`Key pressed: ${event.key}`);
			if (event.key === ' ' || event.key === 'Backspace') {
				event.preventDefault();
			}
			
			
			// Handle backspace: decrement current index, prevent going below 0
			
			if (!event.shiftKey || (event.shiftKey && event.key !== 'Shift')) {
				
				if (event.key === 'Backspace') {
					if (currentIndex === 0 && highlights.length === 1) {
						return;
					}
					
					const newIndex = Math.max(0, currentIndex - 1);
					setCurrentIndex(newIndex);
					// Update highlights by removing the old current index and ensuring the new current index is highlighted
					setHighlights(highlights.filter(h => h.index !== currentIndex).map(h => {
						if (h.index === newIndex) {
							return {...h, style: 'current'}; // Update the style of the new current index
						}
						return h; // Leave other indices unchanged
					}));
				} else {
					if (event.key === currentCode[currentIndex]) {
						
						const newIndex = currentIndex + 1;
						setCurrentIndex(newIndex);
						// Update all previous highlights to "nostyle" and add new "current" highlight
						setHighlights([
							...highlights.map(item =>
								item.index === currentIndex ? {...item, style: 'nostyle'} : item
							),
							{index: newIndex, style: 'current'}
						]);
						
					} else {
						
						const newIndex = currentIndex + 1;
						setCurrentIndex(newIndex);
						
						setHighlights([
							...highlights.map(item =>
								item.index === currentIndex ? {...item, style: 'error'} : item
							),
							{index: newIndex, style: 'current'}
						]);
						
						
					}
					
				}
			}
			
			
		}
		
		window.addEventListener('keydown', handleKeydown);
		
		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [currentIndex, currentCode, highlights]);
	
	// console.log(highlights)
	// console.log(currentIndex)
	
	
	const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		// @ts-ignore
		setCurrentCode(codeSnippets[event.target.value]);
		setCurrentIndex(0);
		setHighlights([{index: 0, style: 'current'}])
		event.target.blur();
		
	};
	// @ts-ignore
	
	const [handType, finger] = getFingerGroup(currentCode[currentIndex]).split(" ")
	const hands = {
		left: [] as string[],
		right: [] as string[]
	};
	// @ts-ignore
	hands[handType].push(finger);
	
	// @ts-ignore
	// @ts-ignore
	return (
		
		<div>
			
			<select onChange={handleSelectionChange} value={Object.keys(codeSnippets).find(	// @ts-ignore
				key => codeSnippets[key] === currentCode)}>
				{Object.keys(codeSnippets).map(key => (
					<option key={key} value={key}>{key}</option>
				))}
			</select>
			<CodeDisplay
				codeText={currentCode}
				// @ts-ignore
				highlights={highlights}
			/>
			<div className="kbBlock">
				<StaticKeyboard activeKeys={[`${currentCode[currentIndex]}`]}
				                shiftActive={isUpperCase(currentCode[currentIndex])}/>
			
			</div>
			<div>
				
				<Fingers hands={[
					// @ts-ignore
					{type: 'left', highlightedFingers: hands.left},
					// @ts-ignore
					{type: 'right', highlightedFingers: hands.right},
				]}
				/>
			</div>
		</div>
	);
};
