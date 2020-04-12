import React, { Component } from 'react'
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import StoryText from './StoryText.js';

class Bookshelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyList: this.initialBookStack(),
            filterStoryList: this.initialBookStack()
        }
    }
/**
 * Pushes the path of the page we are going to to said page
 * @param {*} path 
 */
    nextPath(path) {
        this.props.history.push(path);
    }
/**
 * At Bookshelf mount - deletes buttons from past storybook if they exist and loads the default bookshelf
 */
    componentDidMount() {
        this.deleteButtons();
    }
/**
 * Deletes buttons from last story clicked on
 */
    deleteButtons() {
        var wordBtns = document.getElementsByClassName('btn');
        while (wordBtns[0]) {
            wordBtns[0].parentNode.removeChild(wordBtns[0]);
        }
    }
/**
 * Sets up the initial array of default books for the bookshelf
 */
    initialBookStack() {
        let loadedBooks = []
        for (var i = 0; i < Object.keys(StoryText).length; i++) {
            loadedBooks.push(Object.keys(StoryText)[i])
        }
        return loadedBooks;
    }
/**
 * filters through which books are displayed based on the text typed into the search bar and each books SearchTerms
 * @param {*} input 
 */
    filter(input) {
        let storyObject;
        let searchInput;
        let outputArray = [];
        if (input.target.value !== "") {
            for (var i = 0; i < Object.keys(StoryText).length; i++) {
                storyObject = Object.keys(StoryText)[i]
                for (var j = 0; j < StoryText[storyObject].SearchTerms.length; j++) {
                    searchInput = input.target.value.toLowerCase();
                    
                    if (StoryText[storyObject].SearchTerms[j].includes(searchInput) && !(outputArray.some(output => output == storyObject))) {
                        outputArray = outputArray.concat(StoryText[storyObject].Title)
                    }
                }
            }
        } else {
            outputArray = outputArray.concat(this.initialBookStack());
        }
        if (outputArray != []) {
            this.setState({
                filterStoryList: outputArray
            })
        } else {
            //Figure out a way to display 'Sorry we dont seem to have that. Please try another keyword or title.'
        }
    }

    render() {
        let bookArray = this.state.filterStoryList
        return (
            <div >
                <ul className="Mainheader" >
                    <img src={logo} className="logo"></img>
                    <h2>Words to Stories </h2>
                    <h4>ESL and Vocab Learning made Easy!</h4>
                    <img src={search} style={{ height: '20px' }}></img>
                    <input type="text" className="input" onChange={this.filter.bind(this)} placeholder="Search..." />
                </ul>
                <div className='bookshelf'>
                    {
                        /**
                         * Creates the elements to display the book covers on screen for each book
                         */
                        bookArray.map((value, index) => {
                            let path = '/' + value;
                            return <img key={index} className='bookCover' src={StoryText[value].Cover} onClick={() => this.nextPath('/' + value)} />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Bookshelf;