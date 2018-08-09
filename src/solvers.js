/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var emptyMatrix = new Board({n: n});
  
  var testAddRook = function(board, currRow) {
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        return;
      }
      board.togglePiece(currRow, i);
      if (!board.hasAnyRooksConflicts()) {
        if (n === currRow + 1) {
          // solution = board.rows().slice() DOES NOT WORK?
          solution = board.getRows();
        } else {
          testAddRook(board, currRow + 1);
        }
      }
      board.togglePiece(currRow, i);
    }
  };
  
  testAddRook(emptyMatrix, 0);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var emptyMatrix = new Board({n: n});
  
  var testAddRook = function(board, currRow) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(currRow, i);
      if (!board.hasAnyRooksConflicts()) {
        if (n === currRow + 1) {
          solutionCount++;
        } else {
          testAddRook(board, currRow + 1);
        }
      }
      board.togglePiece(currRow, i);
    }
  };
  
  testAddRook(emptyMatrix, 0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (n === 0) {
    solutionCount = 1;
  }
  var emptyMatrix = new Board({n: n});
  
  var testAddQueen = function(board, currRow) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(currRow, i);
      if (!board.hasAnyQueensConflicts()) {
        if (n === currRow + 1) {
          solutionCount++;
        } else {
          testAddQueen(board, currRow + 1);
        }
      }
      board.togglePiece(currRow, i);
    }
  };
  
  testAddQueen(emptyMatrix, 0);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
