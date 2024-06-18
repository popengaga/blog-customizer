import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontColors,
	contentWidthArr,
	backgroundColors,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ChangeSettings = (newSettings: typeof defaultArticleState) => void;

export const ArticleParamsForm = ({
	changeSettings,
}: {
	changeSettings: ChangeSettings;
}) => {
	const [stateArrowBtn, setStateArrowBtn] = useState(false);
	const [stateBtn, setBtn] = useState(0);
	const [stateFont, setStateFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [stateFontSize, setstateFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [stateColorFont, setStateColorFont] = useState(
		defaultArticleState.fontColor
	);
	const [stateBg, setStateBg] = useState(defaultArticleState.backgroundColor);
	const [stateWidthContent, setStateWidthContent] = useState(
		defaultArticleState.contentWidth
	);
	const sideBar = useRef(null);

	const resetForm = () => {
		changeSettings(defaultArticleState);
		setStateFont(defaultArticleState.fontFamilyOption);
		setstateFontSize(defaultArticleState.fontSizeOption);
		setStateColorFont(defaultArticleState.fontColor);
		setStateBg(defaultArticleState.backgroundColor);
		setStateWidthContent(defaultArticleState.contentWidth);
	};

	const applySettings = (event: SyntheticEvent) => {
		event.preventDefault();

		changeSettings({
			fontFamilyOption: stateFont,
			fontColor: stateColorFont,
			backgroundColor: stateBg,
			contentWidth: stateWidthContent,
			fontSizeOption: stateFontSize,
		});
	};

	function handleClickForm(event: SyntheticEvent) {
		event.stopPropagation();
	}

	useOutsideClickClose({
		isOpen: stateArrowBtn,
		rootRef: sideBar,
		onClose: () => {
			setBtn(stateBtn + 1);
		},
		onChange: () => {
			if (stateBtn === 1) {
				setStateArrowBtn(false);
				setBtn(0);
			}
		},
	});

	return (
		<>
			<ArrowButton
				isOpen={stateArrowBtn}
				click={() => {
					setStateArrowBtn(!stateArrowBtn);
				}}
			/>
			<aside
				ref={sideBar}
				className={clsx(
					styles.container,
					stateArrowBtn ? styles.container_open : ''
				)}>
				<form className={styles.form} onClick={handleClickForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={stateFont}
						options={fontFamilyOptions}
						onChange={(selected) => setStateFont(selected)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='Кто Я, зачем я тут ?'
						selected={stateFontSize}
						options={fontSizeOptions}
						onChange={(selected) => setstateFontSize(selected)}
					/>
					<Select
						title='цвет шрифта'
						selected={stateColorFont}
						options={fontColors}
						onChange={(selected) => setStateColorFont(selected)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={stateBg}
						options={backgroundColors}
						onChange={(selected) => setStateBg(selected)}
					/>
					<Select
						title='ширина контента'
						selected={stateWidthContent}
						options={contentWidthArr}
						onChange={(selected) => setStateWidthContent(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' onClick={applySettings} />
					</div>
				</form>
			</aside>
		</>
	);
};
