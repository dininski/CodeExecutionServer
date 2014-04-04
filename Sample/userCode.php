<?php

function solve() {
    // Read input data
    $X = (float) fgets(STDIN);
    $Y = (float) fgets(STDIN);

    // Solve the problem
    if ($X == 0 && $Y == 0) {
        return 0;
    } else if ($X == 0) {
        return 5;
    } else if ($Y == 0) {
        return 6;
    } else if ($X > 0 && $Y > 0) {
        return 1;
    } else if ($X < 0 && $Y > 0) {
        return 2;
    } else if ($X < 0 && $Y < 0) {
        return 3;
    } else {
        return 4;
    }
}

echo solve();
?>