const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
//괄호 속에 제공한 선택자와 일치하는 문서 내 첫 번째 Element를 반환 일치하는 요소가 없다면 null 반환

let firstOperand = null;
let operator = null;
let previousOperator = null; // 이전 연산자를 저장할 변수
let secondOperand = null; // 두 번째 피연산자를 저장할 변수 추가

// updateDisplay 함수를 forEach 외부로 이동
function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach((eachButton) => {
  //eachButton으로 변수명을 지정했으므로 모든 변수명 일치 시켜야함
  // function 말대신 화살표사용 매개변수에 화살표만 해도함수표현가능
  eachButton.addEventListener("click", () => {
    const text = eachButton.textContent;
    console.log(text);
    //buttons를 foreach 순회해서 eachbutton으로가져오고 텍스트콘텐츠로 가져온것으로 변수명은 텍스트이다
    if (eachButton.classList.contains("number")) {
      //foreach로 순회중인 buttions의 classList 중 number을 contains(확인하는 것 있으면 참인지 없으면 거짓)
      if (operator === null) {
        if (firstOperand === null || firstOperand === "0") {
          firstOperand = text;
        } else {
          firstOperand += text;
        }
        updateDisplay(firstOperand); //괄호안의 값을 화면에 표시함
      } else {
        //연산자가 있는 경우: 두번째 피연산자 입력
        if (secondOperand === null || secondOperand === "0") {
          secondOperand = text;
        } else {
          secondOperand += text;
        }
        updateDisplay(secondOperand);
      }
      //if (display.textContent === "0") {
      //0의 타입 string
      //0 이면
      //중첩 if문 ->// 초기값이 0일때 내가 누른 버튼이 number(클래스명)가 class에 포함된 버튼이라면 display에 보여줘라
      //display.textContent = text;
      //} else {
      //만약 초기값이 0이아닌 숫자라면 내가누를 버튼이 number가 포함된 버튼이라면 그 숫자 뒤에 추가해라(+),0이 아닌경우 숫자 뒤에 다른 숫자를 추가 한다
      //if (초기값 !== 0 && 초기값 === 숫자){숫자 += 내용}=> 조교님 설명
      //display.textContent += text;
      //}
    } else if (text === "C") {
      firstOperand = null;
      secondOperand = null; // secondOperand 값이없음을 명시적으로 표현 - 빈공간에 이름만 줌 누른 숫자가 들어가야함
      operator = null;
      previousOperator = null;
      updateDisplay("0");
    } else if (text === ".") {
      if (operator === null) {
        if (!firstOperand.includes(".")) {
          //includes 현재 디스플레이에 소수점있는지 확인하는 조건문 -> !display이므로 화면에 소수점이
          //없을 경우에만 if문에 있는 식을 실행한다
          firstOperand += ".";
          //화면에 소수점을 추가한다 라는 뜻
          updateDisplay(firstOperand);
        }
      } else {
        if (!secondOperand.includes(".")) {
          //includes 현재 디스플레이에 소수점있는지 확인하는 조건문 -> !display이므로 화면에 소수점이
          //없을 경우에만 if문에 있는 식을 실행한다
          secondOperand += ".";
          //화면에 소수점을 추가한다 라는 뜻
          updateDisplay(secondOperand);
        }
      }
    } else if (["+", "-", "*", "/"].includes(text)) {
      //연산자버튼 누르면 계산함
      operator = text; //새로운 연산자 저장하기
      console.log("firstOperand:", firstOperand);
      console.log("operater:", operator);
      // 연산자를 누르면 secondOperand 초기화
      secondOperand = null;
    } else if (text === "=") {
      //=버튼 무르면 계산함
      if (
        operator !== null &&
        firstOperand !== null &&
        secondOperand !== null
      ) {
        const result = calculate(firstOperand, operator, secondOperand);
        updateDisplay(result);
        firstOperand = result; //결과를 첫번째 피연산자로 설정
        operator = null; //연산자 초기화
        secondOperand = null; // secondOperand 초기화
      }
    }
  });
});

function calculate(firstOperand, operator, secondOperand) {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "Error";
  }
}
