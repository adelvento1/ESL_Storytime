import React from 'react';
import StoryText from './StoryText.js';
import { NavLink } from "react-router-dom";
import key from '../assets/key.js';

class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            story: StoryText[this.props.location.pathname.substr(1)]
        }
    }

    storyToArray(storyString) {
        return storyString.split(" ");
    }

    isParagraph(word) {
        if (word === "/n") { return true; }
        else { return false; }
    }

    async getDef(word) {
        let url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`
        let response = await fetch(url);
        return await response.json();
    }

    async printWordDef(word) {
        let data = await this.getDef(word);
        let wordName;
        let firstDefinition;
        if ((data[0].meta != undefined) && (data[0].shortdef.length != 0)) {
            wordName = data[0].meta.id;
            firstDefinition = data[0].shortdef;
        } else {
            wordName = word;
            firstDefinition = "This word is not found in the dictionary, this could be because it is a name or a word that was created by the author, or it could be because "
        }
        if (wordName.includes(`:` || `1` || `"` || `'` || `,`)) {
            wordName = wordName.replace(`:`, "");
            wordName = wordName.replace(`1`, "");
            wordName = wordName.replace(`'`, "");
            wordName = wordName.replace(`"`, "");
            wordName = wordName.replace(`,`, "");
        }
        console.log(data[0]);
        document.getElementById("wordName").innerHTML = wordName;
        document.getElementById("def").innerHTML = "Common Definition: " + firstDefinition;
    }

    render() {
        let wordArray = this.storyToArray(this.state.story);
        return (
            <div>
                <ul className="header">
                    <li><NavLink to="/">Bookshelf</NavLink></li>
                </ul>
                <div className="rightPane">
                    <h2 id="wordName" className="rightPaneText"> Click on a word you dont know and the definition will appear here. <br/> Haga clic en una palabra que no sabe y la definición aparecerá aquí </h2>
                    <h4 id="def" className="rightPaneText"></h4>
                </div>
                <div className="mainPane" id="mainPane">
                    <div>
                        {
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