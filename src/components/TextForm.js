import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function TextForm(props) {
    // converting to uppercase...
    function upperCase(){
        let newText = text.toUpperCase();
        setText(newText);
        if(text.length>0)
            props.showAlert("Text converted to uppercase !!!","warning");
    }

    // converting to lowercase...
    function lowerCase(){
        let newText = text.toLowerCase();
        setText(newText);
        if(text.length>0)
            props.showAlert("Text converted to lowercase !!!","warning");
    }

    // converting to sentencecase...
    function sentencecase() {
        var newText = text.toLowerCase().replace(/(^\s*\w)|([\.\!\?\n]\s*\w)/g,function(c){return c.toUpperCase()});
        setText(newText);
        if(text.length>0)
            props.showAlert("Text converted to sentencecase !!!","warning");
    }

    // copying the text...
    function copy(){
        navigator.clipboard.writeText(text);
        if(text.length>0)
            props.showAlert("Text was copied !!!","warning");
    }

    // clearing the text area...
    function clear(){
        if(text.length>0)
            props.showAlert("Text was cleared !!!","warning");
        let newText = "";
        setText(newText);
    }

    // removing the extra spaces...
    function remSpace(){
        let newText = text.split(/[\s]+/g);
        setText(newText.join(" "));
        if(text.length>0)
            props.showAlert("Extra spaces were removed !!!","warning");
    }

    // handling the situation if changed...
    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const [text,setText] = useState("");


    return (
        <>
            { /* Enteing the text */ }
            <div className="container" style={{color : props.mode==='dark'?'white':'black'}}>
                <h1>{props.heading}</h1>
                <div className="my-3">
                    <textarea className="form-control fs-4" value={text} onChange={handleChange} style={{backgroundColor : props.mode==='dark'?'#5d5d5f':'white',color : props.mode==='dark'?'white':'black'}} rows="3" placeholder="Type or paste your content here..."></textarea>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={sentencecase}>Sentence case</button>
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={upperCase}>Upper Case</button>
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={lowerCase}>Lower Case</button>
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={copy}>Copy to Clipboard</button>
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={clear}>Clear Text</button>
                    <button className="btn btn-primary m-1 m-md-2 m-xl-3" onClick={remSpace}>Remove extra spaces</button>
                </div>
            </div>

            { /* Previewing the text */ }

            <div className="container my-4" style={{color : props.mode==='dark'?'white':'black'}}>
                <h2>Your text summary...</h2>
                <p>Character Count : {text.length} | Word Count : {text.split(/\s+/g).filter((e)=> {return e!=="";}).length} | Line Count : {text.split(/\n+/g).filter((e)=> {return e!=="";}).length}</p>
                <p>Reading Time : {(0.008*text.split(" ").length).toFixed(2)} minutes</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter the text to preview it..."}</p>
            </div>
        </>
    )
}

TextForm.propTypes = {
    heading : PropTypes.string
}

TextForm.defaultProps = {
    heading : "Heading"
}

