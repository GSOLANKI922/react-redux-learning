const Factorial = () => {
  let result = 1;

  for (let i = 2; i <= 5; i++) {
    console.log(i, "*", result);

    result = result * i;
  }

 console.log(result, "result");
};

export default Factorial;
