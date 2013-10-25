'use strict';
/** ACE editor directive */
angular.module('ngBlog.directives')
    .directive('ace', function ($timeout) {
        return {
            restrict: 'A',
            scope: { md: "=md" },
            link: function ($scope, elem, attrs) {
                var editor = ace.edit(elem[0]);
                var session = editor.getSession();
                session.setUseWrapMode(true);
                session.setMode("ace/mode/markdown");
                $scope.md.currentRow = 0;

                $scope.$watch("md.src", function () {
                    if (!$scope.md.lastEditFromAce) {
                        editor.setValue($scope.md.src);
                        $timeout(function() { editor.resize(); }, 500);
                        editor.gotoLine(0, 0, false);
                        editor.focus();
                    }
                });

                function markedLines() {
                    var numLines = session.getLength();
                    var lines = session.getLines(0, numLines);
                    for (var i=0; i<numLines; i++) {
                        if (lines[i].length > 0) {
                                 if (lines[i][0] === "#") { lines[i] = lines[i] + "<span id='row-" + i + "' />"; }
                            else if (lines[i][0] === "<") { lines[i] = lines[i] + "<span id='row-" + i + "' />"; }
                            else if (lines[i][0] === "*") { lines[i] = lines[i] + "<span id='row-" + i + "' />"; }
                            else                          { lines[i] = "<span id='row-" + i + "' />" + lines[i]; }
                        }
                        else { lines[i] = "<span id='row-" + i + "' />\n"; }
                    }
                    return lines;
                }

                editor.on('change', function () {
                    $timeout(function() {
                        $scope.md.src = _.reduce(markedLines(), function(memo, line){ return memo + line + "\n"; }, "");;
                        $scope.md.lastEditFromAce = true;
                    });
                });

                var cursorRow = 0;
                session.selection.on('changeCursor', function(e) {
                    var cursor = editor.getCursorPosition();
                    if (cursor.row !== cursorRow) {
                        cursorRow = cursor.row;
                        $timeout(function() { $scope.md.currentRow = cursor.row;})
                    }
                });
            }
        }
    });
