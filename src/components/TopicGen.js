import React, { Component } from 'react';

class TopicGen extends Component {
    constructor() {
        super();
        this.state = {
            topic: '',
            count: null,
            addOneTopic: '',
            shownTopics: []
        };
    }

    dataTopics = [
        'Left alone', //
        'Girl finds a stray dog',
        'Tiny fish in the sea',
        "Bunny running for it's life",
        'Am Würstelstand um 4 in der Früh nach der Arbeit',
        'Silently leaving after a One Night Stand',
        'Having people around but still feeling lonely',
        'Sitting at the seaside',
        'Fishing',
        'Reminiscing about the past',
        'Walking alone through magnificent halls',
        'Taking a walk in a peaceful night',
        'Watching children having fun',
        'Having a school lesson with your least favourite teacher',
        'Enjoying your favourite cheese',
        'Being proud of yourself after accomplishing something big',
        'Staring at the ceiling in bed',
        'Sitting on the toilet',
        'Campfire with friends',
        'Thinking about finiteness and mortality',
        'Coming home after a long day'
    ];

    storedArr = [];

    allTopicsNoDuplicates = [];

    allTopicsWithDuplicates = [];

    componentDidMount = () => {
        if (localStorage.getItem('addedTopics') === null) {
            this.setState({
                shownTopics: this.dataTopics
            });
        } else if (localStorage.getItem('addedTopics') !== null) {
            this.storedArr = JSON.parse(localStorage.getItem('addedTopics'));
            this.allTopicsWithDuplicates = [this.storedArr, this.dataTopics];
            this.allTopicsNoDuplicates = this.mergeNoDuplicates(this.allTopicsWithDuplicates);
            console.log(this.allTopicsNoDuplicates);
            this.setState({
                shownTopics: this.allTopicsNoDuplicates
            });
        }
        // this.nextOne();
        // this.startTimer();
    };

    mergeNoDuplicates = arr => {
        return [...new Set([].concat(...arr))];
    };

    nextOne = () => {
        let newRandNum = Math.floor(Math.random() * (120 - 30 + 1) + 30);
        let newRandTopic = this.state.shownTopics[Math.floor(Math.random() * this.state.shownTopics.length)];
        this.setState({
            count: newRandNum,
            topic: newRandTopic
        });
    };

    startTimer = () => {
        this.myInterval = setInterval(() => {
            this.setState({
                count: this.state.count - 1
            });

            if (this.state.count === 0) {
                clearInterval(this.myInterval);
                this.nextOne();
                this.startTimer();
            }
        }, 1000);
    };

    handleClick = e => {
        e.preventDefault();
        this.nextOne();
    };

    handleStart = e => {
        e.preventDefault();
        const startStyle = document.querySelector('.startButton').style;
        startStyle.opacity = 1;
        (function fade() {
            (startStyle.opacity -= 0.1) < 0 ? (startStyle.display = 'none') : setTimeout(fade, 40);
        })();
        this.startTimer();
        this.nextOne();
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const { addOneTopic } = this.state;
        if (localStorage.getItem('addedTopics') === null) {
            this.storedArr.push(addOneTopic);
            localStorage.setItem('addedTopics', JSON.stringify(this.storedArr));
            this.allTopicsNoDuplicates.push(addOneTopic);
            this.setState({
                shownTopics: this.allTopicsNoDuplicates
            });
        } else if (localStorage.getItem('addedTopics') !== null) {
            this.storedArr = JSON.parse(localStorage.getItem('addedTopics'));
            this.storedArr.push(addOneTopic);
            this.allTopicsWithDuplicates = [this.storedArr, this.dataTopics];
            this.allTopicsNoDuplicates = this.mergeNoDuplicates(this.allTopicsWithDuplicates);
            localStorage.setItem('addedTopics', JSON.stringify(this.storedArr));
            this.setState({
                shownTopics: this.allTopicsNoDuplicates
            });
        }
    };

    render() {
        const { count, topic } = this.state;
        return (
            <div>
                <div className='topic-output'>
                    <h2>{topic}</h2>
                </div>
                <div className='line' />
                <div className='countdown'>
                    <h1>{count}</h1>
                </div>
                <button className='skipButton' type='button' onClick={this.handleClick}>
                    Skip
                </button>
                <button className='skipButton startButton' type='button' onClick={this.handleStart}>
                    Start
                </button>
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        New Topic: <input className='inputField' name='addOneTopic' value={this.state.addOneTopic} onChange={this.handleChange} required />
                    </label>
                    <button className='submitButton' type='submit'>
                        Add it
                    </button>
                </form>
            </div>
        );
    }
}

export default TopicGen;
