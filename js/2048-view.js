(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var View = TFE.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    this.showPieces(this.game.board.grid)
  };

  View.prototype.bindEvents = function() {
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    $("button").on("click", this.restartGame.bind(this));
    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.restartGame = function() {
    location.reload();
  }

  View.prototype.render = function () {
    this.updateGrid(this.game.board.grid);
  };

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      this.game.move(View.KEYS[event.keyCode])
    } else {
      // some other key was pressed; ignore.
    }
  };


  View.prototype.setupBoard = function() {
    var $container = $("<div>");
    $container.addClass("container");

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var $square = $("<div>");
        $square.addClass("square")
        $square.attr("data-pos", [i,j]);
        $container.append($square)
      }
    }
    this.$el.append($container)
  };

  View.prototype.showPieces = function(grid) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (grid[i][j] !== null)    {
          this.showPiece([i,j], grid)
        }
      }
    }
  };

  View.prototype.showPiece = function(pos, grid) {
    var $square = $('.square[data-pos="'+pos+'"]')
    // $square.addClass("piece");
    var $piece = $("<div>")
    $piece.html(grid[pos[0]][pos[1]].val) //the number for the text
    $piece.addClass("piece");
    $square.append($piece);
  }
})();
