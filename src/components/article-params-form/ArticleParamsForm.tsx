import { SyntheticEvent, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { UseAsideOutsideClickClose } from 'src/hooks/useAsideOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setCurrentState: (params: ArticleStateType) => void;
	defaultArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	setCurrentState,
	defaultArticleState,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [filterState, setFilterState] =
		useState<ArticleStateType>(defaultArticleState);

	/**
	 * Переключение видимости формы
	 */
	function toggle() {
		setIsMenuOpen(!isMenuOpen);
	}

	/**
	 * Применение выбранных настроек
	 * @param evt
	 */
	function onSubmit(evt: SyntheticEvent) {
		evt.preventDefault();
		setCurrentState(filterState);
	}

	/**
	 * Сброс формы к настройкам по умолчанию
	 */
	function onReset() {
		setCurrentState(defaultArticleState);
		setFilterState(defaultArticleState);
	}

	/**
	 * Запись измененной опции в состояние фильтра
	 * @param option Наименование параметра
	 * @param value Значение параметра
	 */
	const handleChange = (option: keyof ArticleStateType, value: OptionType) => {
		setFilterState({ ...filterState, [option]: value });
	};

	UseAsideOutsideClickClose({
		asideRef,
		isMenuOpen,
		setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={filterState.fontFamilyOption}
						onChange={(option) =>
							handleChange('fontFamilyOption', option)
						}></Select>

					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={filterState.fontSizeOption}
						name='fontSize'
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>

					<Separator />

					<Select
						options={fontColors}
						selected={filterState.fontColor}
						title='Цвет шрифта'
						onChange={(option) => handleChange('fontColor', option)}
					/>

					<Select
						options={backgroundColors}
						selected={filterState.backgroundColor}
						title='Цвет фона'
						onChange={(option) => handleChange('backgroundColor', option)}
					/>

					<Select
						options={contentWidthArr}
						selected={filterState.contentWidth}
						title='Ширина контена'
						onChange={(option) => handleChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
