import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Form } from 'react-bootstrap';

const options = [
	{ label: 'Wine', value: 'wine' },
	{ label: 'Fantasy', value: 'fantasy' },
	{ label: '2000', value: 'strawberry' },
];

const Autocomplete:React.FC<{onSelect:(tags:[])=>void}> = (props) => {
	const [selected, setSelected] = useState([]);

	return (
		<Form.Group>
            <Form.Label>Tags:</Form.Label>
			{/* <pre>{JSON.stringify(selected)}</pre> */}
			<MultiSelect
				options={options}
				value={selected}
				onChange={setSelected}
				labelledBy="Select"
				isCreatable
				hasSelectAll={false}
			/>
		</Form.Group>
	);
};

export default Autocomplete;
