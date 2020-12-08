import React, { Component } from 'react'
import logo from '../assets/logo.png';
import Storys from '../assets/Storys.js';
import 'w3-css/w3.css';

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
        for (var i = 0; i < Object.keys(Storys).length; i++) {
            loadedBooks.push(Object.keys(Storys)[i])
        }
        loadedBooks.sort();
        return loadedBooks;
    }
    /**
     * filters through which books are displayed based on the text typed into the search bar and each books SearchTerms
     */
    filter(input) {
        let storyObject;
        let searchInput;
        let outputArray = [];
        if (input.target.value !== "") {
            for (var i = 0; i < Object.keys(Storys).length; i++) {
                storyObject = Object.keys(Storys)[i]
                for (var j = 0; j < Storys[storyObject].SearchTerms.length; j++) {
                    searchInput = input.target.value.toLowerCase();
                    if (Storys[storyObject].SearchTerms[j].includes(searchInput) && !(outputArray.some(output => output === storyObject))) {
                        outputArray = outputArray.concat(Storys[storyObject].Title)
                    }
                }
            }
        } else {
            outputArray = outputArray.concat(this.initialBookStack());
        }
        if (outputArray !== []) {
            outputArray.sort();
            this.setState({
                filterStoryList: outputArray
            })
        } else {
            //Figure out a way to display 'Sorry we dont seem to have that. Please try another keyword or title.'
        }
    }
    filterByReadingLevel(level) {
        let outputArray = [];
        if (level !== null) {
            for (var i = 0; i < Object.keys(Storys).length; i++) {
                for (var j = 0; j < Storys[Object.keys(Storys)[i]].SearchTerms.length; j++) {
                    if (Storys[Object.keys(Storys)[i]].SearchTerms[j] === level) {
                        outputArray = outputArray.concat(Storys[Object.keys(Storys)[i]].Title)
                    }
                }
            }
        }
        else {
            outputArray = this.state.storyList;
        }
        outputArray.sort();
        this.setState({
            filterStoryList: outputArray
        })
    }

    render() {
        let bookArray = this.state.filterStoryList;
        return (
            <div>
                <div class="w3-bar w3-blue">
                    <img class="w3-bar-item logo" src={logo}></img>
                    <h1 class="w3-bar-item"> Stories to <br /> Words </h1>
                    <button class="w3-bar-item w3-button headerItem" onClick={() => { this.filterByReadingLevel(null) }}>Full Bookshelf</button>
                    <button class="w3-bar-item w3-button headerItem" onClick={() => { this.filterByReadingLevel('early readers') }}>Early Readers</button>
                    <button class="w3-bar-item w3-button headerItem" onClick={() => { this.filterByReadingLevel('advanced readers') }}>Advanced Readers</button>
                    <input type="text" class="input w3-bar-item w3-light-gray headerItem" onChange={this.filter.bind(this)} placeholder="I'm searching for..." />
                </div>

                <div class="bookshelf">
                    {
                        /**
                         * Creates the elements to display the book covers on screen for each book
                         */
                        bookArray.map((value, index) => {
                            return <img key={index} class="bookCover" src={Storys[value].Cover} onClick={() => this.nextPath('/' + value)} />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Bookshelf;