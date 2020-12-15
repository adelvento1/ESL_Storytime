import React from 'react';
import key from '../assets/key.js';

class DefinitionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word: "",
            loaded: false,
            definition: "",
            grammer: ""
        }
    }
    /**
     * Takes in a word and fetches its data from the dictionary api, then returns it 
     */
    async getDef(word) {
        let url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`
        let response = await fetch(url);
        return await response.json();
    }

    isParagraph(word) {
        if (word === "/n") { return true; }
        else { return false; }
    }

    /**
     * Takes in word from button, gets data and then shows data for word name and definition to user
     */
    async printWordDef(word) {
        let data = await this.getDef(word);
        console.log(data)
        let firstDefinition = "";
        let firstGrammer = "";

        for(let i = 0; i < data.length; i++){
            if(data[i].meta !== undefined && data[i].shortdef.length !== 0){
                firstDefinition = data[i].shortdef;
                firstGrammer = data[i].fl;
                break;
            }
        }
        if(firstDefinition === ""){
            firstDefinition = ["This word is not found in the dictionary, this could be because it is a name or a word that was created by the author, or it is the past tense of another word."]
        }

        this.setState({
            word: word,
            definition: firstDefinition,
            loaded: true,
            grammer: firstGrammer
        })
    }

    render() {
        if (this.state.loaded === false || (this.state.word !== this.props.word)) {
            this.printWordDef(this.props.word)
            return (
                <div>Loading...</div>
            )
        } else {
            let defintionArray = this.state.definition
            return (
                <div>
                    <div className="w3-card-4 defCard">
                        <header className="w3-container">
                            <button className="moreBtn" onClick={() => alert("more detailed information")}> + </button>
                            <h3>{this.props.word} <span> ( {this.state.grammer} )</span></h3>
                        </header>
                        <div className="w3-container">
                            {
                                defintionArray.map((value, index) => {
                                    return <p key={index}>{value}</p>
                                })
                            }
                        </div>

                    </div>
                </div>
            );
        }
    }
}
export default DefinitionCard;