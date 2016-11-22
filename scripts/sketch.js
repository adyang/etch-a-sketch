$(document).ready(function() {
	var gridLength = $('#sketch-container').width(); // Assume square
	var numSquaresPerSide = 16;
	var totalBorderLength = 2 * numSquaresPerSide;
	var squareLength = (gridLength - totalBorderLength) / numSquaresPerSide;
	
	var totalNumSquares = numSquaresPerSide * numSquaresPerSide;
	for (var i = 0; i < totalNumSquares; i++) {
		var sqDiv = $('<div class="square"></div>');
		$('#sketch-container').append(sqDiv);
		sqDiv.height(squareLength);
		sqDiv.width(squareLength);
	}
});