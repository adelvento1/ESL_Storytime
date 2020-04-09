import React, { Component } from 'react'
import peterRabbitCover from '../assets/peterRabbitCover.jpg';
import tortHareCover from '../assets/TortoiseHareCover.jpg';
import littleRedHenCover from '../assets/littleRedHenCover.jpg';

class Bookshelf extends Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    componentDidMount() {
        var wordBtns = document.getElementsByClassName('btn');
        while (wordBtns[0]) {
            wordBtns[0].parentNode.removeChild(wordBtns[0]);
        }
    }
    
    render() {
        return (
            <div class='bookshelf'>
                <div>
                    <img class='bookCover' src={peterRabbitCover} onClick={() => this.nextPath('/PeterRabbit')} />
                    <img class='bookCover' src={tortHareCover} onClick={() => this.nextPath('Tortoise_and_the_Hare')} />
                    <img class='bookCover' src={littleRedHenCover} onClick={() => this.nextPath('Little_Red_Hen')} />
                </div>
            </div>
        );
    }
}

export default Bookshelf;