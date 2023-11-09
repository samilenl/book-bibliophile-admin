import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import createPost from "./utils/createPost";
import "../../assets/styles/Input.css"
import SelectTopic from "./components/SelectTopic";


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation, FilePondPluginFileValidateType);

const PostCreate = () => {
    const [file, setFile] = useState(null);
    const [topics , setTopics] = useState([])
    const [selectedTopics, setSelectTopics] = useState([])
    const [sending, setSending] = useState(false)
    const title = useRef(null)
    const mainText = useRef(null)

    const handleUpdateFile = (fileItems) => {
      if (fileItems.length > 0) {
        setFile(fileItems[0].file);
      } else {
        setFile(null);
      }
    };

    useEffect(() => {
        const getTopics = async() => {
            const topicRes = await fetch("http://localhost:3000/topics")
            const topicsList = await topicRes.json()
            setTopics(topicsList)
        }
        getTopics()
    }, [])

  return (
    <div>
        <FilePond
            files={file ? [file] : []}
            onupdatefiles={handleUpdateFile}
            allowMultiple={false}
            maxFiles={1}
            name="files"
            className={"filepond"}
            labelIdle='<span class="filepond--label-action">Add Image</span>'
            imagePreviewAnimation={true}
        />
        <label id="input-title-label">
            
            <input type="text" placeholder="Title" id="input-title" ref={title} onClick={()=>{console.log(mainText.current.getContent())}}/>
        </label>
        
        <div className="tinymce-container">
            <Editor
                apiKey='tvt9n2whe444mdcicpbcbmmlqmehpu6rxfwsvp28xjzefbrx'
                onInit={(event, editor) => {mainText.current = editor}}
                init={{
                    placeholder: "Content",
                    plugins: 'ai mentions anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtable advcode tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    skin: "snow",
                    icons: "thin",
                    mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    branding: false,
                }}
                initialValue=""
            />
        </div>

        <div className="choose-topics">
            <p>Topics</p>
            <SelectTopic list={topics} selectedList={selectedTopics} setSelectedList={setSelectTopics} />
        </div>
        

        <button onClick={(e) => {
            e.preventDefault()
            createPost({
                title: title.current.value,
                text: mainText.current.getContent(),
                image: file,
                topics: selectedTopics,
            })
            setSending(true)
        }} className="post-btn">Create</button>
        
        { sending ?
            <div className="spinner-wrapper">
              <div className="spinner">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
              </div>
            </div> 
        : ''}

    </div>
  )
}

export default PostCreate