import * as yup from 'yup';

const YupSchemaGenerator = (schema, formData) => {
	const { name, validation, validationType } = formData;
	if (!yup[validationType]) {
		return schema;
	}
	let validator = yup[validationType]();
	const { params, type } = validation;
	if (!validator[type]) {
		return;
	}

	validator = validator[type](params);
	// const temp = yup.object({ [name]: validator });
	// schema = schema.concat(temp);
	schema[name] = validator;
	return schema;
	
};

export default YupSchemaGenerator;
