export const fingerGroups = {
	"1 q a z ` Q A Z !": "left pinky",
	"2 w s x W S X @": "left ring",
	"3 e d c E D C": "left middle",
	"4 r f v 5 t g b R F V T G B": "left index",
	"6 y h n 7 u j m Y H N U J M": "right index",
	"8 i k , I K": "right middle",
	"9 o l . O L (": "right ring",
	"0 p / - [ ] ) _ + ; : \" ' = P": "right pinky",
	"Space": "right thumb",
	"Enter": "right pinky",
	"Shift": "left pinky",
	"Ctrl": "left pinky",
	"Alt": "left thumb",
	"Cmd/Win": "left thumb",
	"delete": "right pinky",
	"Tab": "left pinky",
	"Caps Lock": "left pinky",
	"Esc": "left pinky",
	"Arrow keys": "right index"
};

export function getFingerGroup(character: string) {
	if (character === " ") {
		return "right thumb"
	} else {
		for (const keys in fingerGroups) {
			if (keys.includes(character)) {
				// @ts-ignore
				return fingerGroups[keys];
			}
		}
		return "right pinky";
	}
	
}
