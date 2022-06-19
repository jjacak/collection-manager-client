import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { MultiSelect} from 'react-multi-select-component';

const options = [
	{ label: 'wine', value: 'wine' },
	{ label: 'fantasy', value: 'fantasy' },
	{ label: 'whisky', value: 'whisky' },
	{ label: 'rock', value: 'rock' },
	{ label: 'rare', value: 'rare' },
];
export type TagsType = {
	label: string;
	value: string;
};
const Autocomplete: React.FC<{ preselected?: string[]; ref: any }> = forwardRef(
	(props, ref) => {
		const [selected, setSelected] = useState<TagsType[]|[]>([]);

		useEffect(() => {
			if (!props.preselected) {
				return;
			}
			const preselectedTags = props.preselected.map((t) => {
				return { label: t, value: t };
			});
			setSelected(preselectedTags);
		}, [props.preselected]);
		useImperativeHandle(
			ref,
			() => ({
				getTags: () => {
					return selected;
				},
			}),
			[selected]
		);

		return (
			<MultiSelect
				options={options}
				value={selected}
				onChange={setSelected}
				labelledBy="Select"
				isCreatable
				hasSelectAll={false}
			/>
		);
	}
);

export default Autocomplete;
