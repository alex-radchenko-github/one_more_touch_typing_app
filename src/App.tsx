import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { codeSnippets } from "./codeSnippets";
import CodeDisplay from "./components/CodeDisplay";
import { getFingerGroup } from "./components/fingerGroups";
import { isUpperCase } from "./components/isUpperCase";
import StaticKeyboard from './components/StaticKeyboard';
import Fingers, { HandProps, Hand, Finger } from './components/Hands';
import "./App.css";

enum HighlightStyle {
	Current = 'current',
	NoStyle = 'nostyle',
	Error = 'error'
}

interface Highlight {
	index: number;
	style: HighlightStyle;
}

export const App: React.FC = () => {
	const [currentCode, setCurrentCode] = useState(codeSnippets.twoSum);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [countErrors, setCountErrors] = useState(0);
	const [highlights, setHighlights] = useState<Highlight[]>([
		{ index: 0, style: HighlightStyle.Current },
	]);
	const [timer, setTimer] = useState(0);
	const [isTimerActive, setIsTimerActive] = useState(false);

	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (event.key === ' ') {
			event.preventDefault();
		}

		if (!isTimerActive && event.key.length === 1 && event.key !== 'Shift') {
			setIsTimerActive(true);
		}

		if (!event.shiftKey || (event.shiftKey && event.key !== 'Shift')) {
			if (event.key === 'Backspace') {
				handleBackspace();
			} else {
				handleCorrectKeyPress(event.key);
			}
		}
	}, [currentIndex, currentCode, highlights, isTimerActive]);

	const handleBackspace = useCallback(() => {
		if (currentIndex === 0 && highlights.length === 1) return;

		const newIndex = Math.max(0, currentIndex - 1);
		setCurrentIndex(newIndex);
		setHighlights(prev => 
			prev.filter(h => h.index !== currentIndex)
				.map(h => h.index === newIndex ? { ...h, style: HighlightStyle.Current } : h)
		);
	}, [currentIndex, highlights]);

	const handleCorrectKeyPress = useCallback((key: string) => {
		const isCorrect = key === currentCode[currentIndex];
		const newIndex = currentIndex + 1;

		setCurrentIndex(newIndex);
		setCountErrors(prev => isCorrect ? prev : prev + 1);

		setHighlights(prev => [
			...prev.map(item => 
				item.index === currentIndex 
					? { ...item, style: isCorrect ? HighlightStyle.NoStyle : HighlightStyle.Error }
					: item
			),
			{ index: newIndex, style: HighlightStyle.Current }
		]);
	}, [currentIndex, currentCode]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	useEffect(() => {
		let interval: number | undefined;
		if (isTimerActive) {
			interval = setInterval(() => setTimer(prev => prev + 1), 1000);
		} else if (!isTimerActive && timer !== 0) {
			clearInterval(interval);
		}
		return () => { if (interval) clearInterval(interval); };
	}, [isTimerActive]);

	const handleSelectionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedSnippet = event.target.value as keyof typeof codeSnippets;
		setCurrentCode(codeSnippets[selectedSnippet]);
		resetState();
		event.target.blur();
	}, []);

	const resetState = useCallback(() => {
		setCurrentIndex(0);
		setHighlights([{ index: 0, style: HighlightStyle.Current }]);
		setCountErrors(0);
		setTimer(0);
		setIsTimerActive(false);
	}, []);

	const currentChar = currentCode[currentIndex];
	const [handType, finger] = getFingerGroup(currentChar).split(" ") as ['left' | 'right', string];
	
	// Определяем руку для пробела на основе предыдущего символа
	const prevChar = currentIndex > 0 ? currentCode[currentIndex - 1] : '';
	const [prevHandType] = prevChar ? getFingerGroup(prevChar).split(" ") as ['left' | 'right', string] : ['left'];
	const oppositeHandType: 'left' | 'right' = prevHandType === 'left' ? 'right' : 'left';
	
	const specialSymbolHands: Record<string, HandProps[]> = {
		'=': [
			{ type: 'right', highlightedFingers: ['pinky' as Finger] },
			{ type: 'left', highlightedFingers: ['pinky' as Finger] }
		]
	};

	const hands: HandProps[] = useMemo(() => {
		// Проверяем специальные символы
		if (specialSymbolHands[currentChar]) {
			return specialSymbolHands[currentChar];
		}

		// Для пробела используем противоположную руку от предыдущего символа
		if (currentChar === ' ') {
			return [{
				type: oppositeHandType,
				highlightedFingers: ['thumb' as Finger]
			}];
		}

		// Для обычных символов
		const primaryHand: HandProps = { 
			type: handType, 
			highlightedFingers: [finger as Finger] 
		};
		
		// Для заглавных букв добавляем вторую руку
		if (isUpperCase(currentChar)) {
			const shiftHand: HandProps = {
				type: handType === 'left' ? 'right' : 'left',
				highlightedFingers: ['pinky' as Finger]
			};
			return [primaryHand, shiftHand];
		}
		
		return [primaryHand];
	}, [currentChar, handType, finger, oppositeHandType]);

	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className="container">
			<div className="sel">
				<select 
					onChange={handleSelectionChange} 
					value={Object.keys(codeSnippets).find(key => codeSnippets[key as keyof typeof codeSnippets] === currentCode)}
				>
					{Object.keys(codeSnippets).map(key => (
						<option key={key} value={key}>{key}</option>
					))}
				</select>
				Errors: {countErrors} Timer: {formatTime(timer)}s
			</div>
			
			<div className="cdWrapper">
				<CodeDisplay
					codeText={currentCode}
					highlights={highlights}
				/>
			</div>
			
			<div className="kbrdHandWrapper">
				<div className="kbBlock">
					<StaticKeyboard 
						activeKeys={[currentChar]}
						shiftActive={isUpperCase(currentChar)}
					/>
				</div>
				<div className="fingers">
					<Fingers hands={hands} />
				</div>
			</div>
		</div>
	);
};
