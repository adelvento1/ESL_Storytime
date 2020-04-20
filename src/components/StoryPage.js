import React from 'react';
import ProgressBar from "react-scroll-progress-bar";
import StoryText from '../assets/StoryText.js';
import { NavLink } from "react-router-dom";
import key from '../assets/key.js';

class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            story: StoryText[this.props.location.pathname.substr(1)]
        }
    }
    /**
     * Splits a string into an array of words using the space character
     */
    storyToArray(storyString) {
        return storyString.split(" ");
    }
    /**
     * Checks whether a word is the new paragraph signal or not 
     */
    isParagraph(word) {
        if (word === "/n") { return true; }
        else { return false; }
    }
    /**
     * Takes in a word and fetches its data from the dictionary api, then returns it 
     */
    async getDef(word) {
        let url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`
        let response = await fetch(url);
        return await response.json();
    }
    /**
     * Takes in word from button, gets data and then shows data for word name and definition to user
     */
    async printWordDef(word) {
        let data = await this.getDef(word);
        let wordName;
        let firstDefinition;
        if (data[0].meta != undefined && data[0].shortdef.length != 0) {
            wordName = data[0].meta.id;
            firstDefinition = data[0].shortdef;
        }
        else {
            wordName = word;
            firstDefinition = "This word is not found in the dictionary, this could be because it is a name or a word that was created by the author, or it is the past tense of another word."
        }
        if (wordName.includes(`:` || `1` || `"` || `'` || `,`)) {
            wordName = wordName.replace(`:`, "");
            wordName = wordName.replace(`1`, "");
            wordName = wordName.replace(`'`, "");
            wordName = wordName.replace(`"`, "");
            wordName = wordName.replace(`,`, "");
        }
        document.getElementById("wordName").innerHTML = wordName;
        document.getElementById("def").innerHTML = "Common Definition: " + firstDefinition;
    }

    render() {
        let wordArray = this.storyToArray(this.state.story.Text);
        return (
            <div>
                <div>
                    <ProgressBar bgcolor="#A3F6A0" duration="1"/>
                 </div>
                <ul class="header w3-button w3-black">
                    <li ><NavLink to="/">Bookshelf</NavLink></li>
                </ul>
                <div className="rightPane">
                    <h3 id="wordName" className="rightPaneText"> Click on a word you dont know and the definition will appear here. <br /> Haz clic en palabra que no sapas y la definición aparecerá aquí </h3>
                    <h5 id="def" className="rightPaneText"></h5>
                </div>
                <div className="mainPane" id="mainPane">
                    <div>
                        {
                            /**
                             * On render - Creates a button for every word in the story string and then makes paragraph changes when the word is a '/n'
                             */
                            wordArray.map((value, index) => {
                                if (this.isParagraph(value) === false) {
                                    return <input key={index} className="btn" type="button" value={value} onClick={() => this.printWordDef(value)}></input>
                                } else {
                                    return <p />
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default StoryPage;