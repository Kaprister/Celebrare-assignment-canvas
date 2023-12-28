import React, { useState } from 'react'
import './Home.css';

const Home = () => {

    const [inputField, setInputField] = useState([
        {
        text: '',
        color: 'black',
        size: '16px',
        font: 'serif',
        },
    ]);
    const [fontColor, setFontColor] = useState('black');
    const [fontSize, setFontSize] = useState('16px');
    const [fontStyle, setFontStyle] = useState('serif')
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [history, setHistory] = useState([{inputField, fontColor, fontSize, fontStyle, draggedIndex}]);   // initial state
    const [historyIndex, setHistoryIndex] = useState(0);

    const addInputField = () => {
        // setInputField([...inputField, {text: '', color: fontColor, size: fontSize, font: fontStyle}]);

        const newInputField = [
            ...inputField,
            { text: '', color: fontColor, size: fontSize, font: fontStyle },
          ];
          updateState({ inputField: newInputField });
    };

    

    const handleInputChange = (index, key,  value) => {
        const newInputField = [...inputField];
        newInputField[index][key] = value;
        // setInputField(newInputField);
        updateState({ inputField: newInputField });
    }

    const handleChangeColor = (value) => {
        // setFontColor(value);
        updateState({ fontColor: value });
    }

    const handleChangeFontSize = (value) => {
        // setFontSize(value);
        updateState({ fontSize: value });
    }

    const handleChangeFontStyle = (value) => {
        // setFontStyle(value);
        updateState({ fontStyle: value });
    }

    // darg and drop functions
    const handleDragStart = (index) => (e) => {
        setDraggedIndex(index);
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
      }; 

    const handleDrop = (index) => (e) => {
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const draggedValue = inputField[draggedIndex];

        const newInputField = [...inputField];
        newInputField.splice(draggedIndex, 1);   // Remove the dragged item
        newInputField.splice(index, 0, draggedValue);  // Insert the dragged item at the new position

        // setInputField(newInputField);
        updateState({ inputField: newInputField});
    }

    const allowDrop = (e) => {
        e.preventDefault();
    }

    // undo and redo
    const updateState = (newState) => {
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, {...newState, draggedIndex}]);
        setHistoryIndex(newHistory.length - 1);
        setInputField(newState.inputField || inputField);
        setFontColor(newState.fontColor || fontColor);
        setFontSize(newState.fontSize || fontSize);
        setFontStyle(newState.fontStyle || fontStyle);
        setDraggedIndex(newState.draggedIndex || null);
    };

    const undo = () => {
        if (historyIndex > 0) {
          const previousState = history[historyIndex - 1];
          setHistoryIndex(historyIndex - 1);
          setInputField(previousState.inputField);
          setFontColor(previousState.fontColor);
          setFontSize(previousState.fontSize);
          setFontStyle(previousState.fontStyle);
          setDraggedIndex(previousState.draggedIndex);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
          const nextState = history[historyIndex + 1];
          setHistoryIndex(historyIndex + 1);
          setInputField(nextState.inputField);
          setFontColor(nextState.fontColor);
          setFontSize(nextState.fontSize);
          setFontStyle(nextState.fontStyle);
          setDraggedIndex(nextState.draggedIndex);
        }
      };


  return (
    <div id='wrapper'>
      <h1 id = "heading">CANVAS</h1>

      <div id='main-page'>

      <div id='section1'>

            {
                inputField.map((field, index) => (
                    <input 
                        key={index}
                        draggable
                        onDragStart={handleDragStart(index)}
                        onDragEnd={handleDragEnd}
                        onDrop={handleDrop(index)}
                        onDragOver={allowDrop}
                        type='text'
                        value={field.text}
                        onChange={(e) => handleInputChange(index, 'text', e.target.value)}
                        style={{color: field.color , fontSize: field.size, fontFamily: field.font,
                            border: index === draggedIndex ? '2px dashed #ef0707' : 'none',
                            margin: '5px',
                            padding: '5px',
                        }}
                    />       

                ))
            }


      </div>

      <div id='section2'>
        <div className='sec'>

            <label htmlFor="font" className='fun'>FONT</label>
            <select id="font" className='fun-inside'
                value={fontStyle}
                onChange={(e) => handleChangeFontStyle(e.target.value)}
            >
                <option value="cursive">cursive</option>
                <option value="serif">serif</option>
                <option value="monospace">monospace</option>
                <option value="sans-serif">sans-serif</option>
                <option value=" 'Times New Roman', Times, serif ">Times New Roman</option>
                <option value="fantasy">fantasy</option>
                <option value="Arial, Helvetica, sans-serif">Arial</option>

            </select>

        </div>

        <div className='sec'>
            <label htmlFor="size" className='fun' >SIZE</label>
            <select id="size" className='fun-inside'
                value={fontSize}
                onChange={(e) => handleChangeFontSize(e.target.value)}
             >
                <option value="large">large</option>
                <option value="larger">larger</option>
                <option value="small">small</option>
                <option value="smaller">smaller</option>
                <option value="xx-large">x-large</option>
                <option value="xx-large">xx-large</option>
                <option value="x-small">x-small</option>
                <option value="xx-smaller">xx-smaller</option>
            </select>
        </div>

        <div className='sec' >
            <label htmlFor="color" className='fun' >COLOR</label>
            <select id="color" className='fun-inside'
                value={fontColor}
                onChange={(e) => handleChangeColor(e.target.value)}
            >
                <option value="black">black</option>
                <option value="white">white</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="blue">blue</option>
                <option value="yellow">yellow</option>
                <option value="aqua">aqua</option>
                <option value="orange">orange</option>
            </select>
        </div>

        <div className='history'>
            <div className='add-text'>
                <button className='btn' onClick={undo} disabled={historyIndex === 0} >UNDO</button>
            </div>
            <div className='add-text'>
                <button className='btn' onClick={redo} disabled={historyIndex === history.length - 1} >REDO</button>
            </div>
        </div>

        <div className='add-text'>
            <button className='btn' onClick={addInputField} >ADD TEXT</button>
        </div>

      </div>

      </div>


    </div>
  )
}

export default Home
