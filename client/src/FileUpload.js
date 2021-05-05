import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file   
     // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" }); 
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData(); formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({
                name: res.data.name,
                path: 'http://localhost:4500' + res.data.path
            })
        }).catch(err => console.log(err))
    }

    const showResult = (path) => {
        if(path)
            switch(path.split('.')[1]){
                case 'jpg': case 'jpeg': case 'png': case 'bmp': case 'gif': return <img src={path} alt="img data" />;
                case 'mp4': case 'mpg': case 'webm': case 'mov': case '3gp': return <video src={path} autoPlay controls />;
                default: return <img src={path} alt="img data"/>;
            }
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />                
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">                   
                    Upload
                </button>
                <hr />    
                {showResult(data.path)}
            </div>
        </div>
    );
}
export default FileUpload;