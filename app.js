var matrix = 16; // default matrix size: 16x16. If you change this value, you must change the "style.css" accordingly
var previousMatrixValue = 0;

function updateMatrix(size){
    while (!matrix || isNaN(matrix) || (/^\s*$/).test(matrix)){
        matrix = +prompt("Insert the number of rows/columns you wish (\"e.g. 16\"):"); // 16x16, 18x18, etc
        if (size % matrix !== 0){
            confirm("Your sketchpad's size must be divisible by your matrix's size! Enter a factor (divisor) of your current size: " + size);
            matrix = false;
        }
    }
    
    // enhancing the performance of creating matrixes instead of just simply removing all existent div nodes
    var divs = Math.pow(previousMatrixValue, 2) - Math.pow(matrix, 2);
    if (divs < 0){
        // update the matrix by INSERTING divs
        for (var i=0; i < Math.abs(divs); i++){
            $("#wrapper").append("<div></div>");
        }
    } else {
        if (divs !== 0){ // if it's zero, then there is no need to do remove or insert any div (just go to the next if/else block to see if there is a need to update the sketchpad's size)
            
            // update the matrix by REMOVING divs
            for (var j=0; j < divs; j++){
                $('#wrapper').children('div').last().remove();
            }
        }
    }
    
    $('#wrapper').css({"height": size, "width": size}); // sets the new sketchpad's (#wrapper) size
    $('#wrapper').children('div').css({"height": size / matrix, "width": size / matrix});
}

$(document).ready(function() {
    // creating initial matrix
    for (var a=0; a < matrix*matrix; a++) {
        $("#wrapper").append("<div></div>");
    }
    
    $('#bt-change-size').on('click', function(){
        var size;
        while (!size || isNaN(size) || (/^\s*$/).test(size)){
            size = +prompt("Enter the size you wish the sketchpad should have in pixels (e.g. 800):");
            if (size % matrix !== 0){
                confirm("Your sketchpad's size must be divisible by your matrix's size! Enter a multiple of your current matrix: " + matrix);
                size = false;
            }
        }
        
        previousMatrixValue = matrix; // it must be done in order to avoid changing the matrix (change only the sketchpad's size!)
        // updating the matrix with a new size for sketchpad
        updateMatrix(size);
        
        // clear the matrix's divs
        $('#wrapper').children('div').css("opacity", 0.05);
    });
    
    $('#bt-change-matrix').on('click', function(){
        previousMatrixValue = matrix; // saving the previous matrix value (e.g. 16 if it was a matrix 16x16)
        matrix = 0;
        var size = parseInt($('#wrapper').css("height")); // don't lose the current sketchpad size!
        updateMatrix(size);
        
        // clear the matrix's divs
        $('#wrapper').children('div').css("opacity", 0.05);
    });
    
    // it sets up a hover effect that changes the color of the square when your mouse passes over it, leaving a (pixelated) trail through your grid (matrix) like a pen would
    $('#wrapper').on('mouseenter', 'div', function(){
        var opacity = +$(this).css("opacity");
        opacity += 0.05;
        
        if (opacity < 1){
            $(this).css("opacity", opacity);
        }
    });
    
    // lay full color in a div when it is clicked or empty its color if it was already full
    $('#wrapper').on('click', 'div', function(){
        if (+$(this).css("opacity") > 0.9){
            $(this).css("opacity", 0.05);
        } else {
            $(this).css("opacity", 1);
        }
    });
});