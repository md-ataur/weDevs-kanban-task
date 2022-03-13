import React, { useState } from 'react';
import { Calendar, CheckSquare, Lock, MoreHorizontal, Trash2, Unlock } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import UpdateCard from '../UpdateInfo/UpdateCard';
import './Card.css';

const Card = (props: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [lock, setLock] = useState(true);

    return (
        <>
            {showModal && (
                <UpdateCard
                    card={props?.card}
                    onClose={() => setShowModal(false)}
                    boardId={props.boardId}
                    updateCard={props.updateCard}
                />
            )}
            <div
                className="card bg-white border mb-4 px-2 py-3"
                draggable={lock}
                onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
            >
                <div className="card-top mb-4 flex justify-between">
                    <div onClick={() => setShowModal(true)} className="cursor-pointer font-medium">
                        {props?.card?.title}
                    </div>
                    <div className="cursor-pointer" onClick={() => setShowDropdown(true)}>
                        <MoreHorizontal />
                        {showDropdown && (
                            <div className="relative">
                                <Dropdown onClose={() => setShowDropdown(false)}>
                                    <div className="flex">
                                        <span className="mr-1" onClick={() => setLock(!lock)}>
                                            {!lock ? (
                                                <Lock className="w-4 text-gray-600" />
                                            ) : (
                                                <Unlock className="w-4 text-gray-600" />
                                            )}
                                        </span>
                                        <span
                                            onClick={() =>
                                                props.removeCard(props.card?.id, props?.boardId)
                                            }
                                        >
                                            <Trash2 className="w-4 text-red-600" />
                                        </span>
                                    </div>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex text-gray-500">
                    <div className="flex-1 flex items-center">
                        <span className="card-date mr-1">
                            <Calendar />
                        </span>
                        <span>12 Mar</span>
                    </div>
                    <div className="flex items-center">
                        <span className="card-task mr-1">
                            <CheckSquare />
                        </span>
                        <span>1/3</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
