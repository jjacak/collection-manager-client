import { FieldProps, getIn, ErrorMessage } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';

const SelectFormField: React.FC<
	FieldProps & {
		label?: string;
		options: Array<{ label: string; value: string }>;
	}
> = ({ field, form, label, options, ...props }) => {
	
	return (
		<Form.Group className="mb-3">
			{label && <Form.Label htmlFor={field.name}>{label}</Form.Label>}
			<Form.Select {...field} {...props}>
            <option hidden value='' disabled></option>
				{options.map((o) => {
					return (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					);
				})}
			</Form.Select>
			<ErrorMessage name={field.name} />
		</Form.Group>
	);
};

export default SelectFormField;
