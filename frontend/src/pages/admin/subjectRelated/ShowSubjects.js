import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import axios from 'axios';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['', '']); // Initial empty options
    const [errorMsg, setErrorMsg] = useState('');

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = index => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleCreatePoll = async () => {
        try {
            const response = await axios.post('http://localhost:5000/createPoll', {
                title,
                options
            });
            console.log(response.data); // Assuming the API returns the created poll
            // You can redirect the admin to another page or show a success message
        } catch (error) {
            setErrorMsg('Failed to create poll. Please try again.');
            console.error(error);
        }
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message] = useState("");

    return (
        <>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }} className="poll-form">
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }} className="form-heading">Create a Poll</h2>
                <div style={{ marginBottom: '20px' }} className="input-group">
                    <label style={{ display: 'block', marginBottom: '5px' }} className="form-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', marginBottom: '10px' }}
                        className="form-input"
                    />
                </div>
                <div style={{ marginBottom: '20px' }} className="input-group">
                    <label style={{ display: 'block', marginBottom: '5px' }} className="form-label">Options:</label>
                    {options.map((option, index) => (
                        <div key={index} className="option">
                            <input
                                type="text"
                                value={option}
                                onChange={e => handleOptionChange(index, e)}
                                style={{ width: 'calc(100% - 80px)', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', marginBottom: '10px' }}
                                className="form-input"
                            />
                            <button
                                onClick={() => removeOption(index)}
                                style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', marginRight: '10px' }}
                                className="remove-button">Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addOption}
                        style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', marginRight: '10px' }}
                        className="add-option-button">Add Option
                    </button>
                </div>
                {errorMsg && <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }} className="error-message">{errorMsg}</div>}
                <button
                    onClick={handleCreatePoll}
                    style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                    className="create-poll-button">Create Poll
                </button>
            </div>
        </>
    );
};

export default ShowSubjects;
