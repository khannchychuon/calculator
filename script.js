const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
let input = "";

for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value == "clear") {
      input == "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "blankSpace") {
      input = input.slice(-1, 0);
      display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
      let result = eval(input);
      display_output.innerHTML = CleanOutput(result);
    } else if (value == "bracket") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else {
      input += value;
      display_input.innerHTML = CleanInput(input);
    }
  });
}
function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = '<span class = "operator">x</span>';
    } else if (input_array[i] == "/") {
      input_array[i] = '<span class = "operator">/</span>';
    } else if (input_array[i] == "+") {
      input_array[i] = '<span class = "operator">+</span>';
    } else if (input_array[i] == "-") {
      input_array[i] = '<span class = "operator">-</span>';
    } else if (input_array[i] == "(") {
      input_array[i] = '<span class = "bracket">(</span>';
    } else if (input_array[i] == ")") {
      input_array[i] = '<span class = "bracket">)</span>';
    } else if (input_array[i] == "%") {
      input_array[i] = '<span class = "percentage">%</span>';
    }
  }
  return input_array.join("");
}
function CleanOutput(output) {
  let output_string = output.toString();
  let deicmal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.slice(i, 0, ",");
    }
  }
  if (deicmal) {
    output_array.push(".");
    output_array.push(deicmal);
  }
  return output_array.join("");
}
function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "." && last_input == ".") {
    return false;
  }
  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }
}
