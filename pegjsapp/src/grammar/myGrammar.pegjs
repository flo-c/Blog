/*
 *  Grammar for simple arithmetic operations such as multiplication and addition
 *  with some integer and float numbers.
 */

start = additive

additive = left:multiplicative space* "+" space* right:additive { return left + right; } / multiplicative

multiplicative = left:primary space* "*" space* right:multiplicative { return left * right; } / primary

primary = number / "(" space* additive:additive space* ")" { return additive; }

number = float / integer

float "a float" = digits1:[0-9]+ "." digits2:[0-9]+ {
    return parseFloat(digits1.join("") + "." + digits2.join(""));
}

integer "an integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

space = [ \t]