import { Form } from "react-bootstrap"
import { FieldProps, getIn, ErrorMessage } from "formik";
import React from "react";


const TextFormField: React.FC<FieldProps&{label?:string, istextarea?:boolean}> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
<Form.Group className="mb-3">
						<Form.Label htmlFor={field.name}>{props.label}</Form.Label>
						<Form.Control
						  {...field}
              {...props}
              isInvalid={!!errorText}
              as={props.istextarea?'textarea':undefined}
             
						/>
						<ErrorMessage name={field.name} />
					</Form.Group>



    // <TextField
    //   fullWidth
    //   margin="normal"
    //   helperText={errorText}
    //   error={!!errorText}
    //   {...field}
    //   {...props}
    // />
  );
};

export default TextFormField