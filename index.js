const board = document.querySelector('#puzzle')
const solveBtn = document.querySelector('#solve-btn')
const squares = 81 
const submission = []



// inputs starting at 0, ending at 9 
for(let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    board.appendChild(inputElement)
};



// submitting values from the input
const values = () => {
   const inputs = document.querySelectorAll('input')
   inputs.forEach(input => {
    if(input.value) {
        submission.push(input.value)
    } else {
        submission.push('.')
    }
   })
   console.log(submission)
}



const popValues = (isSolvable, solution) => {
    const input = document.querySelectorAll('input')
    if(isSolvable && solution) {
        input.forEach((input, i) => {
            input.value = solution[i]
        })
    }

    }



const solve = async () => {
    values()
    const data = submission.values('')
    console.log('data', data)
    const axiosOptions = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '289e6bb006msh7c75491b5f576bfp1e2117jsn19d840dae45d',
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: JSON.stringify({
            puzzle: '2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3'
        })
    };


    async function fetchData() {
        try {
            const response = await axios(axiosOptions);
            console.log(response.data);
            popValues(response.data.solvable, response.data.solution)
        } catch (error) {
            console.error(error);
        }
    }

    await fetchData(); // Call the async function here
};

// event listener for the solve button
solveBtn.addEventListener('click', solve);

  // event listener for the solve button 
  solveBtn.addEventListener('click', solve)
