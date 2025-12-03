import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/ckeditor.css";

const PostReCreate = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setSlug(
            value
                .toLowerCase()
                .trim()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);

        images.forEach((img) => {
            formData.append("images[]", img);
        });

        const res = await fetch("http://127.0.0.1:8000/api/posts", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("Post Created:", data);
    };

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <h2>Create New Post</h2>

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="input"
                    style={{ width: "100%", marginBottom: "15px" }}
                />

                {/* Slug */}
                {/* <label>Slug</label>
                <input
                    type="text"
                    value={slug}
                    className="input"
                    readOnly
                    style={{ width: "100%", marginBottom: "15px" }}
                /> */}

                {/* CKEditor */}
                <label>Content</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                        setContent(editor.getData());
                    }}
                />
                <br />

                {/* Image Upload */}
                {/* <label>Upload Images</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImages([...e.target.files])}
                /> */}

                <br /><br />

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostReCreate;
