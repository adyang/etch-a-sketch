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
	var numSquaresPerSide = 16;
	createGrid(numSquaresPerSide);
	
	// For creation of new grid
	$('#new-grid-button').click(function() {
		numSquaresPerSide = prompt("How many squares per side to make new grid?");
		
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
	
	// For changing modes
	var currMode = "black";
	$('#black-sketch-button').click(function() {
		currMode = "black";
		clearGrid();
		createGrid(numSquaresPerSide);
	});
	$('#color-sketch-button').click(function() {
		currMode = "color";
		clearGrid();
		createGrid(numSquaresPerSide);
	});
	$('#black-inc-button').click(function() {
		currMode = "black-increment";
		clearGrid();
		createGrid(numSquaresPerSide);
		$('.square').css({
				"-webkit-transition": "all 0s",
				"-moz-transition": "all 0s",
				"-o-transition": "all 0s",
				"transition": "all 0s"
			});
		$('.square').css("background-color", "rgba(0, 0, 0, 0)");
	});
	$('#flicker-button').click(function() {
		currMode = "flicker";
		clearGrid();
		createGrid(numSquaresPerSide);
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
		if (currMode === "color") {
			$(this).stop();
			$(this).css("background-color", getRandomColorForHover());
			$(this).css({
				"-webkit-transition": "all 0s",
				"-moz-transition": "all 0s",
				"-o-transition": "all 0s",
				"transition": "all 0s"
			});
		} else if (currMode === "black-increment") {
			var currBgColor = $(this).css("background-color");
			var alpha = parseFloat(currBgColor.substring(14));
			if (alpha < 1.0) {
				alpha += 0.1;
			} else {
				alpha = 1.0;
			}
			var newBgColor = "rgba(0, 0, 0, " + alpha + ")";
			$(this).css("background-color", newBgColor);
		} else {
			$(this).addClass('hover');
		}
	}
	var deactivateSquare = function() {
		if (currMode === "flicker") {
			$(this).removeClass('hover');
		}
	}
	$(document).on('mouseenter', '.square', activateSquare);
	$(document).on('mouseleave', '.square', deactivateSquare);
});