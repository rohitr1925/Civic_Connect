import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap'; // Assuming you're using Bootstrap

const StudentSubjects = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        // Fetch all polls from the backend
        const fetchPolls = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allPolls');
                const userId = getUserId(); // Assuming you have a function to get the user's identifier
                const savedVotes = JSON.parse(localStorage.getItem('votedPolls')) || {};
                const updatedPolls = response.data.map(poll => ({
                    ...poll,
                    voted: savedVotes[userId]?.includes(poll._id)
                }));
                setPolls(updatedPolls);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPolls();
    }, []);

    const getUserId = () => {
        // Implement your logic to get the user's identifier (e.g., from authentication)
        // For now, let's just return a sample user ID
        return 'user123';
    };

    const handleClearVote = (pollId) => {
        const userId = getUserId();
        const savedVotes = JSON.parse(localStorage.getItem('votedPolls')) || {};
        savedVotes[userId] = savedVotes[userId]?.filter(id => id !== pollId);
        localStorage.setItem('votedPolls', JSON.stringify(savedVotes));
        setPolls(polls.map(poll => {
            if (poll._id === pollId) {
                return {
                    ...poll,
                    voted: false
                };
            }
            return poll;
        }));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {polls.length === 0 && <div>No polls available</div>}
            {polls.map(poll => (
                !poll.voted && <RenderPoll key={poll._id} poll={poll} handleClearVote={handleClearVote} />
            ))}
        </div>
    );
};

const RenderPoll = ({ poll, handleClearVote }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [voted, setVoted] = useState(false);
    const [totalVotes, setTotalVotes] = useState(0);
    const [optionsWithVotes, setOptionsWithVotes] = useState([]);

    useEffect(() => {
        calculateVotes(poll);
    }, [poll]);

    const calculateVotes = (pollData) => {
        if (pollData) {
            let total = 0;
            const updatedOptions = pollData.options.map(option => {
                total += option.votes;
                return { ...option };
            });
            setTotalVotes(total);
            setOptionsWithVotes(updatedOptions);
        }
    };

    const handleOptionSelect = async (optionId) => {
        if (!voted) {
            try {
                // const response = await axios.post(`http://localhost:5000/polls/${poll._id}/vote`, {optionId });
                const updatedOptions = optionsWithVotes.map(option => {
                    if (option._id === optionId) {
                        option.votes += 1;
                    }
                    return { ...option };
                });
                setOptionsWithVotes(updatedOptions);
                setTotalVotes(totalVotes + 1);
                setVoted(true);
                const userId = getUserId();
                const savedVotes = JSON.parse(localStorage.getItem('votedPolls')) || {};
                savedVotes[userId] = savedVotes[userId] ? [...savedVotes[userId], poll._id] : [poll._id];
                localStorage.setItem('votedPolls', JSON.stringify(savedVotes));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getUserId = () => {
        // Implement your logic to get the user's identifier (e.g., from authentication)
        // For now, let's just return a sample user ID
        return 'user123';
    };

    return (
        <Container key={poll._id} style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
            <div>
                <h3>{poll.title}</h3>
                {optionsWithVotes.map(option => (
                    <div key={option._id} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>{option.optionText}</span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <div
                                    style={{
                                        width: `${(option.votes / totalVotes) * 100}%`,
                                        height: '20px',
                                        backgroundColor: '#007bff',
                                        borderRadius: '5px'
                                    }}
                                ></div>
                                <span style={{ marginLeft: '5px' }}>{option.votes}</span>
                            </div>
                            {!voted && (
                                <input
                                    type="radio"
                                    id={option._id}
                                    name="option"
                                    value={option.optionText}
                                    disabled={voted}
                                    onChange={() => setSelectedOption(option._id)}
                                />
                            )}
                        </div>
                    </div>
                ))}
                {voted && <p style={{ color: 'green' }}>Thank you for voting!</p>}
                {!voted && (
                    <button
                        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
                        disabled={!selectedOption}
                        onClick={() => handleOptionSelect(selectedOption)}
                    >
                        Vote
                    </button>
                )}
                <button
                    style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}
                    onClick={() => handleClearVote(poll._id)}
                >
                    Clear Vote
                </button>
                <p style={{ marginTop: '10px' }}>Total votes: {totalVotes}</p>
            </div>
        </Container>
    );
};

export default StudentSubjects;
