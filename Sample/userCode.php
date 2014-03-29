<?php

function solve($param) {
    // Read input data
    $X = (float) $param[0];
    $Y = (float) $param[1];

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
?>