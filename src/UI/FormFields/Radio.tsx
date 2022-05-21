import { Form } from 'react-bootstrap';
import { FieldProps} from 'formik';
import React from 'react';

const Radio: React.FC<FieldProps & { label?: string }> = ({
	field,
	form,
	...props
}) => {

	return (
        <Form.Check label = {props.label} type='radio'  {...field}
		{...props} />
	);
};

export default Radio;
