//Cover Art
import peterRabbitCover from '../assets/PeterRabbit/Cover.jpg';
import tortHareCover from '../assets/TortoiseAndHare/Cover.jpg';
import littleRedHenCover from '../assets/RedHen/Cover.jpg';
import theBlackCatCover from '../assets/BlackCat/Cover.jpg';
import RedDeathCover from '../assets/RedDeath/Cover.jpg';
//Story Texts
import PeterRabbitText from '../assets/PeterRabbit/PeterRabbitText.txt';
import Tortoise_and_the_HareText from '../assets/TortoiseAndHare/Tortoise_and_the_HareText.txt';
import Little_Red_HenText from '../assets/RedHen/Little_Red_HenText.txt';
import The_Black_CatText from '../assets/BlackCat/The_Black_CatText.txt';
import The_Black_DeathText from '../assets/RedDeath/The_Black_DeathText.txt';

let PeterRabbit = {
    Text: PeterRabbitText,
    SearchTerms: ['children', 'rabbit', 'peter', 'peter rabbit', 'childrens', 'potter', 'beatrix potter', 'bunny', 'early', 'easy', 'early readers'],
    Cover: peterRabbitCover,
    Title: 'PeterRabbit',
    Illustrations: [require('../assets/PeterRabbit/Illustrations/peterRabbitImage.jpg')]
}

let Tortoise_and_the_Hare = {
    Text: Tortoise_and_the_HareText,
    SearchTerms: ['tortoise', 'turtle', 'tortoise and the hare', 'hare', 'race', 'children', 'childrens', 'rabbit', 'bunny', 'early', 'easy', 'early readers'],
    Cover: tortHareCover,
    Title: 'Tortoise_and_the_Hare',
    Illustrations: []
}


let Little_Red_Hen = {
    Text: Little_Red_HenText,
    SearchTerms: ['hen', 'red', 'chicken', 'the little red hen', 'little red hen', 'children', 'childrens', 'early', 'easy', 'early readers'],
    Cover: littleRedHenCover,
    Title: 'Little_Red_Hen',
    Illustrations: []
}

let The_Black_Cat = {
    Text: The_Black_CatText,
    SearchTerms: ['cat', 'black cat', 'edgar allen poe', 'the black cat', 'poe', 'advanced readers'],
    Cover: theBlackCatCover,
    Title: 'The_Black_Cat',
    Illustrations: []
}

let The_Masque_Of_The_Red_Death = {
    Text: The_Black_DeathText,
    SearchTerms: ['death', 'black death', 'edgar allen poe', 'the masque of the red death', 'poe', 'the mask of the red death', 'advanced readers'],
    Cover: RedDeathCover,
    Title: 'The_Masque_Of_The_Red_Death',
    Illustrations: []
}

export default {
    PeterRabbit: PeterRabbit,
    Tortoise_and_the_Hare: Tortoise_and_the_Hare,
    Little_Red_Hen: Little_Red_Hen,
    The_Black_Cat: The_Black_Cat,
    The_Masque_Of_The_Red_Death: The_Masque_Of_The_Red_Death
}