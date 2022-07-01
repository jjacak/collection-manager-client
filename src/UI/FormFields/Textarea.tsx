import { Form, InputGroup, Button } from "react-bootstrap"
import { FieldProps, getIn, ErrorMessage } from "formik";
import React from "react";


const Textarea: React.FC<FieldProps&{label?:string; addontext?:string, addononclick?:any}> = ({
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
            {props.addontext && <Button onClick = {props.addononclick} variant="outline-secondary" >
      {props.addontext}
    </Button>}
						<Form.Control
						  {...field}
              {...props}
              isInvalid={!!errorText}
              as='textarea'
             
						/>
            </InputGroup>
						<ErrorMessage name={field.name} />
					</Form.Group>
  );
};

export default Textarea