import React from 'react';
import StoryText from './StoryText.js';
import { Route, NavLink, HashRouter } from "react-router-dom";

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

    loadStory(story) {
        let wordArray = this.storyToArray(story);
        for (let i = 0; i < wordArray.length; i++) {
            this.makeButton(wordArray[i]);
        }
    }
    
    storyToArray(storyString) {
        return storyString.split(" ");
    }

    makeButton(word) {
        let newButton = document.createElement("input");
        newButton.setAttribute("type", "button");
        newButton.setAttribute("class", "btn");
        newButton.setAttribute("value", word);
        document.body.appendChild(newButton);
    }


    
    render() {
        return (
            <div>
                <div>
                    <ul className="header">
                        <li><NavLink to="/">Bookshelf</NavLink></li>
                    </ul>
                </div>
                
            </div>
        );
    }
}
export default StoryPage;