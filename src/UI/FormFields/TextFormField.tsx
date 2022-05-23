import { Form, InputGroup, Button } from "react-bootstrap"
import { FieldProps, getIn, ErrorMessage } from "formik";
import React from "react";


const TextFormField: React.FC<FieldProps&{label?:string; addonText?:string, addonOnClick?:any}> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
<Form.Group className="mb-3">
						<Form.Label htmlFor={field.name}>{props.label}</Form.Label>
				<InputGroup>
        {props.addonText && <Button onClick = {props.addonOnClick} variant="outline-secondary" >
      {props.addonText}
    </Button>}
        <Form.Control
						  {...field}
              {...props}
              isInvalid={!!errorText}
             
             
						/>
        </InputGroup>
						<ErrorMessage name={field.name} />
					</Form.Group>
  );
};

export default TextFormField