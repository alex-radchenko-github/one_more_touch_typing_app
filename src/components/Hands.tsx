import classNames from 'classnames';
import React from 'react';
import styles from './hands.module.css';

export type Hand = 'left' | 'right';
export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export interface HandProps {
	type: Hand;
	highlightedFingers: Finger[];
}

interface FingersProps {
	hands: HandProps[];
}

const Fingers: React.FC<FingersProps> = ({ hands }) => {
	const fingers: Finger[] = ['pinky', 'ring', 'middle', 'index', 'thumb']; // Базовый порядок пальцев
	
	return (
		<div className={styles.hands}>
			{hands.map((hand, i) => {
				// Определяем порядок пальцев в зависимости от типа руки
				const order = hand.type === 'right' ? [...fingers].reverse() : fingers;
				
				return (
					<div 
						key={i} 
						className={classNames(styles.hand, {
							[styles.left_hand]: hand.type === 'left',
							[styles.right_hand]: hand.type === 'right'
						})}
						data-label={hand.type === 'left' ? 'Left' : 'Right'}
					>
						{order.map((finger, index) => (
							<div
								key={finger}
								className={classNames(
									styles.finger,
									styles[`finger${hand.type === 'right' ? 5 - index : index + 1}`],
									{
										[styles.highlighted]: hand.highlightedFingers.includes(finger)
									}
								)}
							/>
						))}
						<div className={classNames(styles.dorsal, {
							[styles.left_dorsal]: hand.type === 'left',
							[styles.right_dorsal]: hand.type === 'right'
						})}></div>
					</div>
				);
			})}
		</div>
	);
};

export default Fingers;
