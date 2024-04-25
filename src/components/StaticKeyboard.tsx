import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './StaticKeyboard.css'
import {fingerGroups} from "./fingerGroups.ts";

// @ts-ignore
const StaticKeyboard = ({activeKeys, shiftActive}) => {
	// console.log(activeKeys)
	const activeKeysString = activeKeys.join(" ");
	const layoutName = shiftActive ? "shift" : "default";
	
	// Формирование тем для buttonTheme
	const themes = Object.entries(fingerGroups).reduce((acc, [keys]) => {
		// Проверка наличия хотя бы одной активной клавиши в группе
		const keyArray = keys.split(' ');
		if (keyArray.some(key => activeKeys.includes(key))) {
			// @ts-ignore
			acc.push({
				class: 'groupByFinger',
				buttons: keys
			});
			// @ts-ignore
			acc.push({
				class: "hg-highlight",
				buttons: activeKeysString
			});
		}
		return acc;
	}, []);
	
	return (
		<div className="kb">
			<Keyboard
				layoutName={layoutName}
				layout={{
					default: ["` 1 2 3 4 5 6 7 8 9 0 - = {delete}", "{tab} q w e r t y u i o p [ ] \\", "{lock} a s d f g h j k l ; ' {enter}", "{shift} z x c v b n m , . / {shift}", "{space}"],
					shift: ["~ ! @ # $ % ^ & * ( ) _ + {delete}", "{tab} Q W E R T Y U I O P { } |", "{lock} A S D F G H J K L : \" {enter}", "{shift} Z X C V B N M < > ? {shift}", "{space}"]
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
