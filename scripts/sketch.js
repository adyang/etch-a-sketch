$(document).ready(function() {
	var getSquareBorderLength = function() {
		var tempSquare =$('<div class="square"></div>').hide().appendTo("body");
		var borderLengthWithUnit = tempSquare.css('border-width');
		tempSquare.remove();
		return parseInt(borderLengthWithUnit);
	}
	
	var createGrid = function(numSquaresPerSide) {
		var gridLength = $('#sketch-container').width(); // Assume square
		var totalBorderLength = 2 * getSquareBorderLength() * numSquaresPerSide;
		var squareLength = (gridLength - totalBorderLength) / numSquaresPerSide;
		var totalNumSquares = numSquaresPerSide * numSquaresPerSide;
		for (var i = 0; i < totalNumSquares; i++) {
			var sqDiv = $('<div class="square"></div>');
			$('#sketch-container').append(sqDiv);
			sqDiv.height(squareLength);
			sqDiv.width(squareLength);
		}	
	}
	
	var clearGrid = function() {
		$('#sketch-container').empty();
	}
	
	// Initial grid
	var initialSquaresPerSide = 16;
	createGrid(initialSquaresPerSide);
	
	// For creation of new grid
	$('#new-grid-button').click(function() {
		var numSquaresPerSide = prompt("How many squares per side to make new grid?");
		
		while (numSquaresPerSide !== null && !$.isNumeric(numSquaresPerSide)
			&& !(parseInt(numSquaresPerSide) > 0)) {
			numSquaresPerSide = prompt("Please enter a valid positive integer for "
									 + "the number of squares per side.");
		}
		if (numSquaresPerSide !== null) {
			clearGrid();
			createGrid(parseInt(numSquaresPerSide));
		}
	});
	
	// For hovering animation
	var activateSquare = function() {
		$(this).addClass('hover');
	}
	var deactivateSquare = function() {
		$(this).removeClass('hover');
	}
	$(document).on('mouseenter', '.square', activateSquare);
	$(document).on('mouseleave', '.square', deactivateSquare);
});