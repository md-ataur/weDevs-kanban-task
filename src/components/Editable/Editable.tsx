import React, { useState } from 'react';
import { Plus, X } from 'react-feather';

const Editable = (props: any) => {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.text || '');

    // Form submit handler
    const formSubmit = (e: any) => {
        e.preventDefault();
        if (props.onSubmitFn) {
            props.onSubmitFn(inputValue);
            setShowEdit(false);
            setInputValue('');
        }
    };

    return (
        <>
            {showEdit ? (
                <form onSubmit={formSubmit}>
                    <input
                        type="text"
                        className="mb-2 block w-full text-gray-500 rounded-md border border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="flex items-center">
                        <button
                            className="bg-green-600 text-white rounded px-2.5 py-1"
                            type="submit"
                        >
                            {props.buttonText || 'Add'}
                        </button>
                        <span className="cursor-pointer ml-2">
                            <X className="w-5 text-gray-500" onClick={() => setShowEdit(false)} />
                        </span>
                    </div>
                </form>
            ) : (
                <div className="flex">
                    {props.icon === 'add' ? <Plus className="w-5 text-gray-500" /> : null}

                    <p className="cursor-pointer text-gray-600" onClick={() => setShowEdit(true)}>
                        {props.text || 'Add a card'}
                    </p>
                </div>
            )}
        </>
    );
};

export default Editable;
