import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    };

    return (
        <Editor
            apiKey="abvve9gywi907go0ef34byybakll77cqjwhejq0cw59f8dea" // Replace with your TinyMCE API key

            initialValue="<p>Start typing...</p>"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                    readonly:false,
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default MyEditor;
