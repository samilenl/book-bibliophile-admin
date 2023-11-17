import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import updatePost from "./utils/updatePost";
import SelectTopic from "./components/SelectTopic";
import "../../assets/styles/Input.css"


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation, FilePondPluginFileValidateType);

const PostUpdate = () => {
    const { id } = useParams()
    const [file, setFile] = useState(null);
    const [topics , setTopics] = useState([])
    const [selectedTopics, setSelectTopics] = useState([])
    const [title, setTitle] = useState("")
    const [initialVal, setVal] = useState("")
    const [postStatus, setStatus] = useState(false)
    const mainText = useRef(null)
    const [sending, setSending] = useState(false)


    const handleUpdateFile = (fileItems) => {
      if (fileItems.length > 0) {
        console.log(fileItems)
        setFile(fileItems[0].file);
      } else {
        setFile(null);
      }
    };

    useEffect(() => {
        const getData = async() => {
            const thisPost = await fetch(`https://book-bilbliophile-api.up.railway.app/posts/${id}`)
            const postInfo = await thisPost.json()
            setTitle(postInfo.post.title)
            setVal(postInfo.post.text)
            setStatus(postInfo.post.published)
            setSelectTopics([...postInfo.post.topics])
            const topicRes = await fetch("https://book-bilbliophile-api.up.railway.app/topics")
            const topicsList = await topicRes.json()
            setTopics(topicsList)
        }
        getData()
    }, [id])

  return (
    <div>
        <label htmlFor="post-status" id="post-status-label">Status</label>
        <select name="" id="post-status" defaultValue={postStatus} onChange={(e)=>{setStatus(e.target.value)}}>
          <option value={false}>Private</option>
          <option value={true}>Public</option>
        </select>
        <FilePond
            files={file ? [file] : []}
            onupdatefiles={handleUpdateFile}
            allowMultiple={false}
            maxFiles={1}
            name="files"
            labelIdle='<span class="filepond--label-action">Update Image</span>'
            imagePreviewAnimation={true}
        />
        <label>
            <input type="text" placeholder="Title" id="input-title"  defaultValue={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        </label>
        
        <div className="tinymce-container">
          <Editor
            apiKey='9mbjhhbfkssvbkw2uuqmib5dbsnmshscdg9zxb4z0pxmiz0g'
            onInit={(event, editor) => {mainText.current = editor}}
            init={{
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
            initialValue={initialVal}
          />
        </div>

        <div className="choose-topics">
            <p>Topics</p>
            <SelectTopic list={topics} selectedList={selectedTopics} setSelectedList={setSelectTopics} />
        </div>
        

        <button onClick={ (e) => {
          e.preventDefault()
          updatePost({
            title: title,
            text: mainText.current.getContent(),
            topics: selectedTopics,
            file: file
          }, postStatus, id)
          setSending(true)
        }} 
        className="post-btn">Update</button>

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

export default PostUpdate