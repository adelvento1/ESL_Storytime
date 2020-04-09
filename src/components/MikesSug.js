import React from 'react';
import StoryText from './StoryText.js';
import { NavLink } from "react-router-dom";
import key from '../assets/key.js'

const makeSpace = () => (<p />)
const makeButton = (word) => {
   <input
        type="button"
        className="btn"
        onClick={() => getDef(word)}
        value={word}
    ></input>
}

const getDef = async (word) => {
    let url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("wordName").innerHTML = data[0].meta.id
    console.log(data[0].meta.id);
}


const loadStory = (story) => {
    let wordArray = storyToArray(story);
    for (let i = 0; i < wordArray.length; i++) {
        if (isParagraph(wordArray[i]) === false) {
         makeButton(wordArray[i]);
        }
        else {
         makeSpace(wordArray[i]);
        }
    }
}

const storyToArray = (storyString) => {
    return storyString.split(" ");
}

const isParagraph = (word) => {
    if (word === "/n") {return true;}
    else { return false; }
}



class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            story: StoryText[this.props.location.pathname.substr(1)]
        }
    }

    componentDidMount() {
        this.loadStory(this.state.story);
    }
    
    render() {
        return (
            <div>
                    <ul className="header">
                        <li><NavLink to="/">Bookshelf</NavLink></li>
                    </ul>
                    <div className="rightPane">
                        <button onClick={() => this.getDef("apple")}>Press me to test function</button>
                        <h2 id="wordName">Click on a word you dont know and the definition will appear here</h2>
                    </div>
                    <div className="mainPane" id="mainPane"></div>
            </div>
        );
    }
}
export default StoryPage;