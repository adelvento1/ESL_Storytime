import React from 'react';
import ProgressBar from "react-scroll-progress-bar";
import Storys from '../assets/Storys.js';
import { NavLink } from "react-router-dom";
import DefinitionCard from '../components/DefinitionCard.js'

class StoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            story: Storys[this.props.location.pathname.substr(1)],
            storyText: "",
            loaded: false,
            loadedDefinitions: []
        }
    }
    /**
     * Splits a string into an array of words using the space character
     */
    async storyToArray(fileName) {
        let text = await fetch(fileName.Text).then(r => r.text())
        text = text.split(" ");
        this.setState({
            storyText: text,
            loaded: true
        })
    }

    /**
     * Checks whether a word is the new paragraph signal or not 
     */
    isParagraph(word) {
        if (word === "/n") { return true; }
        else { return false; }
    }

    async printWordDef(word) {
        let wordName = word;
        document.getElementById("defaultText").innerHTML = "";
        console.log(typeof word)
        console.log(wordName.includes(","))
        if (wordName.includes(`,`) || 
        wordName.includes(`:`) ||
        wordName.includes(`?`) || 
        wordName.includes(`-`) || 
        wordName.includes(`1`) || 
        wordName.includes(`'`) || 
        wordName.includes(`"`) || 
        wordName.includes(`)`) ||
        wordName.includes(`.`) ||
        wordName.includes(`(`)) {
            wordName = wordName.replace(`:`, "");
            wordName = wordName.replace(`?`, "");
            wordName = wordName.replace(`-`, "");
            wordName = wordName.replace(`1`, "");
            wordName = wordName.replace(`'`, "");
            wordName = wordName.replace(`"`, "");
            wordName = wordName.replace(`,`, "");
            wordName = wordName.replace(`(`, "");
            wordName = wordName.replace(`)`, "");
            wordName = wordName.replace(`.`, "");

        }
        let newDefinitions = this.state.loadedDefinitions.concat(wordName)
        if(newDefinitions.length > 3){
            newDefinitions.shift()
        }
        this.setState({
            loadedDefinitions: newDefinitions
        })
    }

    render() {
        if (this.state.loaded === false) {
            this.storyToArray(this.state.story)
            return (
                <div>Loading...</div>
            )
        } else {
            let wordArray = this.state.storyText
            let cardArray = this.state.loadedDefinitions
            return (
                <div>
                    <div>
                        <ProgressBar bgcolor="#A3F6A0" duration="1" />
                    </div>
                    <ul className="header w3-button w3-black">
                        <li ><NavLink to="/"> Bookshelf &#x21e6;</NavLink></li>
                    </ul>
                    <div className="rightPane" id="rightPane">
                        <h1 id="defaultText">
                            <br />  Click on any word and the definition will appear here. <br />  <br /> Haga clic en cualquier palabra y la definición aparecerá aquí.
                        </h1>
                        <div>
                            {
                                  cardArray.map((value, index) => {
                                    return <DefinitionCard key={index} word={value}></DefinitionCard>
                                })
                            }
                        </div>
                    </div>
                    <button className="w3-button w3-black topButton" onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }); }}> &#x21e7; </button>
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
                                        return <p key={index}/>
                                        // return <img src={this.state.Illustrations}></img>
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default StoryPage;