import { Form } from 'react-bootstrap';
import { FieldProps, getIn, ErrorMessage } from 'formik';
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

const TextareaMarkdown: React.FC<{label?:string}> = ({
	...props
}) => {
	const mdParser = new MarkdownIt();
	// function handleEditorChange({ html, text }) {
    //     console.log('handleEditorChange', html, text);
    //   }

	return (
		<Form.Group className="mb-3">
			<Form.Label>{props.label}</Form.Label>
			
			<MdEditor
				style={{ height: '500px' }}
				renderHTML={(text) => mdParser.render(text)}
                // onChange={handleEditorChange}
				{...props}
				
			/>

		</Form.Group>
	);
};

export default TextareaMarkdown;
