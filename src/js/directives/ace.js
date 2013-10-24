'use strict';

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

                $scope.$watch("md.src", function () {
                    if (!$scope.md.lastEditFromAce) {
                        editor.setValue($scope.md.src);
                        $timeout(function() { editor.resize(); }, 500);
                        editor.gotoLine(0, 0, false);
                        editor.focus();
                    }
                });

                editor.on('change', function () {
                    $timeout(function() {
                        $scope.md.src = editor.getValue();
                        $scope.md.lastEditFromAce = true;
                    });
                });

                var cursorRow = 0;
                session.selection.on('changeCursor', function(e) {
                    var cursor = editor.getCursorPosition();
                    if (cursor.row !== cursorRow) {
                        cursorRow = cursor.row;
                        var lines = session.getLines(0, session.getLength());
                        var currentLine = lines[cursor.row];

                        if (currentLine.length > 0) {
                                 if (currentLine[0] === "#") { currentLine = currentLine + "<span id='currentLine' />"; }
                            else if (currentLine[0] === "<") { currentLine = currentLine + "<span id='currentLine' />"; }
                            else if (currentLine[0] === "*") { currentLine = currentLine + "<span id='currentLine' />"; }
                            else                             { currentLine = "<span id='currentLine' />" + currentLine; }
                        }
                        else { currentLine = "<span id='currentLine' />\n"}

                        lines[cursor.row] = currentLine;

                        $timeout(function() {
                            $scope.md.src = _.reduce(lines, function(memo, line){ return memo + line + "\n"; }, "");
                            $scope.md.lastEditFromAce = true;
                        });
                    }
                });
            }
        }
    });
