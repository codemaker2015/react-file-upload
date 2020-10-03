# How to upload files in React with NodeJS & Express

## Developing specific Backend server
First, we’re developing a submit API the usage of NodeJS & express, which enables us to upload the documents like (pics, pdf, etc) to the backend server.
#### Setup the backend project
permit’s setup the node.js backend undertaking by means of going for walks the subsequent commands one at a time.
```
mkdir server
cd server
npm init -y
```
#### Putting in applications
Now, we want to put in four packages that are express, explicit-fileupload,cors and nodemon.
Run the below command to install applications.
``` 
npm i express express-fileupload cors nodemon
```
Now open the fileupload folder in your favorite code editor and create a brand new document referred to as server.js. 
```
// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// file upload api
app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})
app.listen(4500, () => {
    console.log('server is running at port 4500');
})
```
In the above code, we first imported 3 applications that are specific, explicit-fileupload and cors, subsequent we created express software via invoking express() function.
##### Our post API course is /upload.

we’re putting files within the public folder in order that we need to create a public folder inner our backend assignment.
##### Including scripts
To run and restarting the server we’re the usage of the nodemon, open your package.json add the subsequent code to scripts item.
#### Adding scripts
To run and restarting the server we are using the nodemon, open your package.json add the following code to scripts object.
```
"server": "nodemon server.js"
```
Now start the backend server by running npm start server command in your terminal.

## Build React App
let’s create the brand new react app through strolling the following command.
```
npx create-react-app client
```
Now exchange your contemporary running listing by using running the beneath command.
```
cd client
```
#### Installing Axios library
We also want to put in the Axios http customer library that’s used to make the http requests.
```
npm i axios
```
#### Creating document upload thing
Open the react-fileupload folder on your favorite code editor and create a brand new report known as fileupload.js within the src folder.
Now upload the following code.
```
// fileupload.js
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
        console.log(file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
        }).catch(err => console.log(err))}
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
            {/* displaying received video*/}
            {data.path && <video src={data.path} autoPlay controls />}
            </div>
        </div>
    );
}
export default FileUpload;
```
In the above code, we have used react hooks to manage the state and we have two functions which are handleChange and uploadFile.
The handleChange function is invoked once a user selected the file.
The uploadFile() function is used to upload the file to our /upload api.
There is also a progress bar, which shows how much amount of the file is uploaded and also we are displaying the image once a response comes from the server. 
#### Adding css styles
Add the following styles to your App.css file.
```
.App {
    margin: 2rem auto;
    max-width: 800px;
}

img{
  width: 500px;
  height: 500px;
  object-fit: contain;
}

.progessBar{
  height: 1rem;
  width: 0%;
  background-color: rgb(68, 212, 231);
  color: white;
  padding:2px
}

.file-upload{

  box-shadow: 2px 2px 2px 2px #ccc;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  font-size: 1rem;
}

input , div , button{
  margin-top: 2rem;
}

.upbutton{
   width: 5rem;
   padding: .5rem;
   background-color: #2767e9;
   color: aliceblue;
   font-size: 1rem;
   cursor: pointer;
}
```
Now import the FileUpload component inside the App.js file.
```
// App.js
import React from 'react';
import FileUpload from './fileupload';
import './App.css';
function App() {
  return (
    <div className="App">
      <FileUpload />
    </div >
  );
}
export default App;
```
Start the react app by running `npm start`.
#### Testing react file upload component
Let’s test our FileUpload component by uploading a sample video file.