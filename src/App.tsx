import React, { useState } from 'react';
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';

const boardData = {
    id: Date.now() + Math.random() * 2,
    title: '',
    cards: [],
};

function App() {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [target, setTarget] = useState({
        cid: '',
        bid: '',
    });

    // Add card
    const addCard = (title: string, bid: number) => {
        const card = {
            id: Date.now() + Math.random(),
            title,
        };

        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) {
            return;
        }

        const tempBoards = [...boards];
        tempBoards[index].cards.push(card);
        setBoards(tempBoards);
    };

    // Update card
    const updateCard = (cid: number, bid: number, card: IBoard) => {
        const boardIndex = boards.findIndex((item) => item.id === bid);
        if (boardIndex < 0) {
            return;
        }

        const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) {
            return;
        }

        const tempBoards = [...boards];
        tempBoards[boardIndex].cards[cardIndex] = card;
        setBoards(tempBoards);
    };

    // Remove card
    const removeCard = (cid: number, bid: number) => {
        const boardIndex = boards.findIndex((item) => item.id === bid);
        if (boardIndex < 0) {
            return;
        }

        const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) {
            return;
        }

        const tempBoards = [...boards];
        tempBoards[boardIndex].cards.splice(cardIndex, 1);
        setBoards(tempBoards);
    };

    // Add board
    const addBoard = (title: string) => {
        setBoards([
            ...boards,
            {
                id: Date.now() + Math.random(),
                title: title,
                cards: [],
            },
        ]);
    };

    // Update board
    const updateBoard = (bid: number, board: IBoard) => {
        const boardIndex = boards.findIndex((item) => item.id === bid);
        if (boardIndex < 0) {
            return;
        }

        const tempBoards = [...boards];
        tempBoards[boardIndex] = board;
        setBoards(tempBoards);
    };

    // Remove board
    const removeBoard = (bid: number) => {
        const tempBoards = boards.filter((item) => item.id !== bid);
        setBoards(tempBoards);
    };

    // Handle Drag End
    const handleDragEnd = (cid: number, bid: number) => {
        let source_boardIndex, source_cardIndex, target_boardIndex, target_cardIndex;

        source_boardIndex = boards.findIndex((item) => item.id === bid);
        if (source_boardIndex < 0) {
            return;
        }

        source_cardIndex = boards[source_boardIndex].cards?.findIndex((item) => item.id === cid);
        if (source_cardIndex < 0) {
            return;
        }

        target_boardIndex = boards.findIndex((item: any) => item.id === target.bid);
        if (target_boardIndex < 0) {
            return;
        }

        target_cardIndex = boards[target_boardIndex].cards?.findIndex(
            (item: any) => item.id === target.cid
        );
        if (target_cardIndex < 0) {
            return;
        }

        const tempBoards = [...boards];
        const tempCard = tempBoards[source_boardIndex].cards[source_cardIndex];

        tempBoards[source_boardIndex].cards.splice(source_cardIndex, 1);
        tempBoards[target_boardIndex].cards.splice(target_cardIndex, 0, tempCard);

        setBoards(tempBoards);
    };

    // Handle Drag Enter
    const handleDragEnter = (cid: string, bid: string) => {
        setTarget({
            cid,
            bid,
        });
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="px-6 py-4 border-b mb-6">
                <h1 className="text-2xl font-bold">Kanban App</h1>
            </div>
            <div className="px-6">
                <div className="flex items-start gap-6">
                    {boards.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            updateBoard={updateBoard}
                            removeBoard={removeBoard}
                            addCard={addCard}
                            updateCard={updateCard}
                            removeCard={removeCard}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                        />
                    ))}
                    <Editable
                        text="Add Board"
                        buttonText="Add Board"
                        icon="add"
                        onSubmitFn={(value: string) => addBoard(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
