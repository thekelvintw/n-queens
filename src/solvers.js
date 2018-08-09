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
  var solution = undefined;
  var myBoard = new Board({n: n});
  
  var testAddRook = function(currRow) {
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        return;
      }
      myBoard.togglePiece(currRow, i);
      if (!myBoard.hasAnyRooksConflicts()) {
        if (n === currRow + 1) {
          solution = myBoard.getRows();
        } else {
          testAddRook(currRow + 1);
        }
      }
      myBoard.togglePiece(currRow, i);
    }
  };
  
  testAddRook(0);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var myBoard = new Board({n: n});
  
  var testAddRook = function(currRow) {
    for (var i = 0; i < n; i++) {
      myBoard.togglePiece(currRow, i);
      if (!myBoard.hasAnyRooksConflicts()) {
        if (n === currRow + 1) {
          solutionCount++;
        } else {
          testAddRook(currRow + 1);
        }
      }
      myBoard.togglePiece(currRow, i);
    }
  };
  
  testAddRook(0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var myBoard = new Board({n: n});

  var testAddQueen = function (currentRow) {
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        return;
      }
      myBoard.togglePiece(currentRow, i);
      if (!myBoard.hasAnyQueensConflicts()) {
        if (n === currentRow + 1 ) {     
          solution = myBoard.getRows();     
        }
        testAddQueen(currentRow + 1);   
      }
      myBoard.togglePiece(currentRow, i);      
    }
  };

  testAddQueen(0);

  if (!solution) {
    solution = myBoard.getRows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (n === 0) {
    solutionCount = 1;
  }
  var myBoard = new Board({n: n});

  var testAddQueen = function(currRow) {
    for (var i = 0; i < n; i++) {
      myBoard.togglePiece(currRow, i);
      if (!myBoard.hasAnyQueensConflicts()) {
        if (n === currRow + 1) {
          solutionCount++;
        } else {
          testAddQueen(currRow + 1);
        }
      }
      myBoard.togglePiece(currRow, i);
    }
  };
  
  testAddQueen(0);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
