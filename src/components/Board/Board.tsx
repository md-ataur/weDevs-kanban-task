import React, { useState } from 'react';
import { MoreHorizontal, Trash2 } from 'react-feather';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';
import Editable from '../Editable/Editable';
import UpdateBoard from '../UpdateInfo/UpdateBoard';

const Board = (props: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <UpdateBoard
                    board={props?.board}
                    onClose={() => setShowModal(false)}
                    updateBoard={props.updateBoard}
                />
            )}
            <div className="w-80 border px-3 py-3 bg-gray-100">
                <div className="flex mb-4">
                    <p className="font-medium flex-1">
                        <span onClick={() => setShowModal(true)} className="cursor-pointer">
                            {props.board?.title}
                        </span>
                        <span className="text-gray-500 ml-1">{props.board?.cards?.length}</span>
                    </p>
                    <div className="cursor-pointer" onClick={() => setShowDropdown(true)}>
                        <MoreHorizontal />
                        {showDropdown && (
                            <div className="relative">
                                <Dropdown onClose={() => setShowDropdown(false)}>
                                    <span onClick={() => props.removeBoard(props.board?.id)}>
                                        <Trash2 className="w-4 text-red-600" />
                                    </span>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {props.board?.cards.map((item: IBoard) => (
                        <Card
                            key={item.id}
                            card={item}
                            removeCard={props.removeCard}
                            boardId={props.board?.id}
                            handleDragEnd={props.handleDragEnd}
                            handleDragEnter={props.handleDragEnter}
                            updateCard={props.updateCard}
                        />
                    ))}
                    <Editable
                        text="Add Card"
                        buttonText="Add Card"
                        icon="add"
                        onSubmitFn={(value: string) => props.addCard(value, props.board?.id)}
                    />
                </div>
            </div>
        </>
    );
};

export default Board;
