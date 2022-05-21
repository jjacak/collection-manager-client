import { Formik, Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import SelectFormField from '../UI/FormFields/SelectFormField';
import Button from '../UI/Button';
import { MultiSelect } from 'react-multi-select-component';
import { useState } from 'react';
import Radio from '../UI/FormFields/Radio';
import Textarea from '../UI/FormFields/Textarea';
import YupSchemaGenerator from '../utils/YupSchemaGenerator';

let initialValues = { name: '' };

const AddItemForm = () => {
	const [formFields, setFormFields] = useState([
        {
			name: 'name',
			label: 'Item Name:',
			type: 'text',
			validationType: 'string',
			validation: { type: 'required', params: 'This field is required.' },
		},
		
		{
			name: 'description',
			label: 'Item Description:',
			type: 'textarea',
			validationType: 'string',
			validation: { type: 'required', params: 'This field is required.' },
		},
		{
			name: 'dateeeeeeeee',
			label: 'Item Date:',
			type: 'date',
			validationType: 'date',
			validation: { type: 'required', params: 'This field is required.' },
		},
		{
			name: 'select',
			label: 'Item Select:',
			type: 'radio',
			validationType: 'string',
			validation: { type: 'required', params: 'This field is required.' },
		},
	]);
    const yupSchema = formFields.reduce(YupSchemaGenerator, {});//?
    const schema = yup.object().shape(yupSchema);
   
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
                console.log(schema)
				console.log(values);
                console.log(initialValues)
			}}
			initialValues={initialValues}
		>
			{({ handleSubmit, handleChange }) => (
				<Form
					noValidate
					onSubmit={handleSubmit}
					className="mx-auto mt-5 "
					style={{
						width: '900px',
						maxWidth: '100%',
					}}
				>
					{formFields.map((f, i) => {
						initialValues[f.name as keyof typeof initialValues] = '';

						if (f.type === 'textarea') {
							return (
								<Field
									key={i}
									label={f.label}
									name={f.name}
									component={Textarea}
								/>
							);
						}
						if (f.type === 'radio') {
							return (
								<Form.Group key={i}>
									<Form.Label>{f.label}</Form.Label>
									<Field
										component={Radio}
										label="Yes"
										value="true"
										name={f.name}
										onChange={handleChange}
									/>
									<Field
										component={Radio}
										label="No"
										value="false"
										name={f.name}
										onChange={handleChange}
									/>
                                    <ErrorMessage name={`${f.name}`}/>
								</Form.Group>
							);
						}
						return (
							<Field
								key={i}
								label={f.label}
								type={f.type}
								name={f.name}
								component={TextFormField}
							/>
						);
					})}

					<button type="submit">submit</button>
				</Form>
			)}
		</Formik>
	);
};

export default AddItemForm;
