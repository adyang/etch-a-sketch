$(document).ready(function() {
	var getCssValueFromStyleSheet = function(selectorClass, cssPropertyName) {
		var tempDiv = $('<div class="' + selectorClass + '"></div>').hide().appendTo("body");
		var cssValue = tempDiv.css(cssPropertyName);
		tempDiv.remove();
		return cssValue;
	}
	
	var getSquareBorderLength = function() {
		return parseInt(getCssValueFromStyleSheet("square", "border-width"));
	}
	
	var createGrid = function(numSquaresPerSide) {
		var gridLength = $('#sketch-container').width(); // Assume square
		var totalBorderLength = 2 * getSquareBorderLength() * numSquaresPerSide;
		var squareLength = (gridLength - totalBorderLength) / numSquaresPerSide;
		var totalNumSquares = numSquaresPerSide * numSquaresPerSide;
		var sqDiv = "";
		for (var i = 0; i < totalNumSquares; i++) {
			sqDiv += '<div class="square"></div>'; 
		}
		$('#sketch-container').append($(sqDiv));
		$('.square').height(squareLength);
		$('.square').width(squareLength);
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
	var getRandomColorForHover = function() {
		var red = Math.floor(Math.random() * 256);
		var green = Math.floor(Math.random() * 256);
		var blue = Math.floor(Math.random() * 256);
		var rgbStr = "rgb(" + red + ", " + green + ", " + blue + ")";
		return rgbStr;
	}
	var activateSquare = function() {
		// $(this).addClass('hover');
		$(this).stop();
		$(this).css("background-color", getRandomColorForHover());
		$(this).css({
			"-webkit-transition": "all 0s ease",
			"-moz-transition": "all 0s ease",
			"-o-transition": "all 0s ease",
			"transition": "all 0s ease"
		});
	}
	var deactivateSquare = function() {
		// $(this).removeClass('hover');
	}
	$(document).on('mouseenter', '.square', activateSquare);
	$(document).on('mouseleave', '.square', deactivateSquare);
});