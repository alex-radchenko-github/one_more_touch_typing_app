import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './StaticKeyboard.css'
import {fingerGroups} from "./fingerGroups.ts";

interface ButtonTheme {
	class: string;
	buttons: string;
}

// @ts-ignore
const StaticKeyboard = ({activeKeys, shiftActive}) => {
	// Добавляем пробел в activeKeys, если текущий символ - пробел
	const processedActiveKeys = activeKeys.includes(' ') 
		? [...activeKeys, '{space}'] 
		: activeKeys;

	const activeKeysString = processedActiveKeys.includes(' ') 
		? processedActiveKeys.join(" ") + " {space}"
		: processedActiveKeys.join(" ");

	console.log('Active Keys:', activeKeys);
	console.log('Processed Active Keys:', processedActiveKeys);
	console.log('Active Keys String:', activeKeysString);

	const layoutName = shiftActive ? "shift" : "default";
	
	// Формирование тем для buttonTheme
	const themes: ButtonTheme[] = [
		...Object.entries(fingerGroups).reduce((acc: ButtonTheme[], [keys]) => {
			const keyArray = keys.split(' ');
			if (keyArray.some(key => processedActiveKeys.includes(key))) {
				acc.push({
					class: 'groupByFinger',
					buttons: keys
				});
			}
			return acc;
		}, []),
		{
			class: "hg-highlight",
			buttons: activeKeysString
		},
		// Добавляем выделение Shift только для заглавных букв, не для пробела
		...(shiftActive && !activeKeys.includes(' ') ? [{
			class: "hg-highlight",
			buttons: "{shift}"
		}] : [])
	];
	
	return (
		<div className="kb">
			<Keyboard
				layoutName={layoutName}
				layout={{
					default: ["` 1 2 3 4 5 6 7 8 9 0 - = {delete}", "{tab} q w e r t y u i o p [ ] \\", "{lock} a s d f g h j k l ; ' {enter}", "{shift} z x c v b n m , . / {shift}", "{space}"],
					shift: ["~ ! @ # $ % ^ & * ( ) _ + {delete}", "{tab} Q W E R T Y U I O P { } |", "{lock} A S D F G H J K L : \" {enter}", "{shift} Z X C V B N M < > ? {shift}", "{space}"]
				}}
				display={{
					'{space}': '⎵',  // Добавляем символ пробела
					'{shift}': '⇧'   // Добавляем символ Shift
				}}
				buttonTheme={themes}
				disableButtonHold={true}
				preventMouseDownDefault={true}
				stopMouseDownPropagation={true}
				stopMouseUpPropagation={true}
			/>
		</div>
	);
};

export default StaticKeyboard;
