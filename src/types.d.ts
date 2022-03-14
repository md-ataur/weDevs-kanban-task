interface IBoard {
    id?: number;
    title: string;
    cards: {
        id?: number;
        title: string;
    }[];
}
