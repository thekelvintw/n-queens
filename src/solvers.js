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
  var columnVisited = new Array(n).fill(0);
  
  var testAddRook = function(currRow) {
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        return;
      }
      if (columnVisited[i] === 0) {
        columnVisited[i] = 1;
        myBoard.togglePiece(currRow, i);
        if (n === currRow + 1) {
          solution = myBoard.getRows();
        } else {
          testAddRook(currRow + 1);
        }
        columnVisited[i] = 0;
        myBoard.togglePiece(currRow, i);
      }
    }
  };
  
  testAddRook(0);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var columnVisited = new Array(n).fill(0);

  var testAddRook = function(currRow) {
    var loopOverRow = function (start, end) {
      for (var i = start; i < end; i++) {
        if (columnVisited[i] === 0) {
          columnVisited[i] = 1;
          if (n === currRow + 1) {
            solutionCount++;
          } else {
            testAddRook(currRow + 1);
          }
          columnVisited[i] = 0;
        }
      }
    };

    if (currRow === 0) {
      if (n === 0 || n === 1) {
        loopOverRow(0, n);
      } else {
        loopOverRow(0, Math.floor(n / 2));
        solutionCount *= 2; // Runs on half, double the solution count since it's symmetrical
        if (n % 2 !== 0) {
          loopOverRow(Math.floor((n + 1) / 2 - 1), Math.floor((n + 1) / 2));
        }
      }
    } else {
      loopOverRow(0, n);
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
  var columnVisited = new Array(n).fill(0);
  if (n === 0) {
    var majorVisited = [];
    var minorVisited = [];
  } else {
    var majorVisited = new Array(2 * n - 1).fill(0);
    var minorVisited = new Array(2 * n - 1).fill(0);
  }

  var testAddQueen = function (currRow) {
    for (var i = 0; i < n; i++) {
      if (solution !== undefined) {
        return;
      }
      var majorIndex = myBoard._getFirstRowColumnIndexForMajorDiagonalOn(currRow, i) + n - 1;
      var minorIndex = myBoard._getFirstRowColumnIndexForMinorDiagonalOn(currRow, i);
      if (columnVisited[i] === 0 && majorVisited[majorIndex] === 0 && minorVisited[minorIndex] === 0) {
        columnVisited[i] = 1;
        majorVisited[majorIndex] = 1;
        minorVisited[minorIndex] = 1;
        myBoard.togglePiece(currRow, i);
        
        if (n === currRow + 1) {     
          solution = myBoard.getRows();     
        }
        testAddQueen(currRow + 1);

        columnVisited[i] = 0;
        majorVisited[majorIndex] = 0;
        minorVisited[minorIndex] = 0;
        myBoard.togglePiece(currRow, i);
      }
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
  var solutionCount = 0;
  if (n === 0) {
    solutionCount = 1;
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
  }

  var myBoard = new Board({n: n});
  var columnVisited = new Array(n).fill(0);
  var majorVisited = new Array(2 * n - 1).fill(0);
  var minorVisited = new Array(2 * n - 1).fill(0);

  var testAddQueen = function(currRow) {
    var loopOverRow = function (start, end) {
      for (var i = start; i < end; i++) {
        var majorIndex = myBoard._getFirstRowColumnIndexForMajorDiagonalOn(currRow, i) + n - 1;
        var minorIndex = myBoard._getFirstRowColumnIndexForMinorDiagonalOn(currRow, i);
        if (columnVisited[i] === 0 && majorVisited[majorIndex] === 0 && minorVisited[minorIndex] === 0) {
          columnVisited[i] = 1;
          majorVisited[majorIndex] = 1;
          minorVisited[minorIndex] = 1;

          if (n === currRow + 1) {
            solutionCount++;
          } else {
            testAddQueen(currRow + 1);
          }

          columnVisited[i] = 0;
          majorVisited[majorIndex] = 0;
          minorVisited[minorIndex] = 0;
        }
      }
    };

    if (currRow === 0) {
      if (n === 1) {
        loopOverRow(0, n);
      } else {
        loopOverRow(0, Math.floor(n / 2));
        solutionCount *= 2; // Runs on half, double the solution count since it's symmetrical
        if (n % 2 !== 0) {
          loopOverRow(Math.floor((n + 1) / 2 - 1), Math.floor((n + 1) / 2));
        }
      }
    } else {
      loopOverRow(0, n);
    }

    
  };
  
  testAddQueen(0);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
