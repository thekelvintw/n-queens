
// By Kelvin
findRooksAllSolution = function(){
var solution = undefined;
var emptyMatrix = new Board({n:n})
 
var PutingCheeseRecu = function(board, currentRow){
  for (var i = 0; i < n ; i++) { //i is column
    if(solution !== undefined) {
      return;
    }

    board.rows().togglePiece(currentRow, i);
    if(!board.rows().hasAnyRooksConflicts){
      if (currentRow === n ) { //check is it solution or I have keep moving
          solution = board.getRows()
        }
        PutingCheeseRecu(board, currentRow +1)   
    } else {
      board.rows().togglePiece(currentRow, i)
    }
  }
}


PutingCheeseRecu(emptyMatrix, 0)
retun solution;
}