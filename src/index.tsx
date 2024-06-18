import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [defaultState, setDefaultState] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultState.fontFamilyOption.value,
					'--font-size': defaultState.fontSizeOption.value,
					'--font-color': defaultState.fontColor.value,
					'--container-width': defaultState.contentWidth.value,
					'--bg-color': defaultState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm changeSettings={setDefaultState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
