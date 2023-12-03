document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById("chessboard");
    let selectedPiece = null;

    // Create chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);

            chessboard.appendChild(cell);
        }
    }

    // Initialize chess pieces
    initializeChessPieces();
});

function initializeChessPieces() {
    // Logic to add chess pieces to the board
    // For simplicity, let's add a few pieces as an example
    addPiece(0, 0, '♜');
    addPiece(0, 1, '♞');
    addPiece(0, 2, '♝');
    addPiece(0, 3, '♛');
    addPiece(0, 4, '♚');
    addPiece(0, 5, '♝');
    addPiece(0, 6, '♞');
    addPiece(0, 7, '♜');

    for (let i = 0; i < 8; i++) {
        addPiece(1, i, '♟');
    }

    addPiece(7, 0, '♖');
    addPiece(7, 1, '♘');
    addPiece(7, 2, '♗');
    addPiece(7, 3, '♕');
    addPiece(7, 4, '♔');
    addPiece(7, 5, '♗');
    addPiece(7, 6, '♘');
    addPiece(7, 7, '♖');

    for (let i = 0; i < 8; i++) {
        addPiece(6, i, '♙');
    }
}

function addPiece(row, col, piece) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    const pieceElement = document.createElement("div");
    pieceElement.className = "piece";
    pieceElement.textContent = piece;
    pieceElement.draggable = true;

    pieceElement.addEventListener("dragstart", handleDragStart);
    pieceElement.addEventListener("dragover", handleDragOver);
    pieceElement.addEventListener("drop", handleDrop);

    cell.appendChild(pieceElement);
}

function handleCellClick(event) {
    const clickedCell = event.currentTarget;
    const clickedRow = parseInt(clickedCell.dataset.row);
    const clickedCol = parseInt(clickedCell.dataset.col);

    if (selectedPiece) {
        // Move the selected piece to the clicked cell
        movePiece(selectedPiece, clickedRow, clickedCol);
        selectedPiece = null;
    } else {
        const piece = getPieceAt(clickedRow, clickedCol);
        if (piece) {
            selectedPiece = { row: clickedRow, col: clickedCol };
        }
    }
}

function handleDragStart(event) {
    const piece = event.target;
    const row = parseInt(piece.parentElement.dataset.row);
    const col = parseInt(piece.parentElement.dataset.col);
    event.dataTransfer.setData("text/plain", `${row}-${col}`);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain").split("-");
    const fromRow = parseInt(data[0]);
    const fromCol = parseInt(data[1]);
    const toRow = parseInt(event.currentTarget.dataset.row);
    const toCol = parseInt(event.currentTarget.dataset.col);
    movePiece({ row: fromRow, col: fromCol }, toRow, toCol);
}

function movePiece(from, toRow, toCol) {
    const fromCell = document.querySelector(`.cell[data-row="${from.row}"][data-col="${from.col}"]`);
    const toCell = document.querySelector(`.cell[data-row="${toRow}"][data-col="${toCol}"]`);
    const piece = fromCell.querySelector(".piece");

    if (isMoveValid(from, toRow, toCol)) {
        toCell.appendChild(piece);
    }
}

function isMoveValid(from, toRow, toCol) {
    // Add your logic to check if the move is valid based on chess rules
    // For simplicity, allow any move for now
    return true;
}

function getPieceAt(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    const piece = cell.querySelector(".piece");
    return piece ? piece.textContent : null;
}
