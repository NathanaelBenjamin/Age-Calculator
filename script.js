const submitButton = document.querySelector(".submit");
const dayOfBirth = document.getElementById("day-of-birth");
const monthOfBirth = document.getElementById("month-of-birth");
const yearOfBirth = document.getElementById("year-of-birth")
const currentYear = new Date( ).getFullYear( );
const currentDay = new Date( ).getDate( )
const output = document.getElementById("output-message");

const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthIndex = new Date( ).getMonth( );

let daysOfTheMonth = [ ];
for(day = 1; day <= 31; day++ ){
    daysOfTheMonth.push(day);
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault( );

    //INDICES.
    const selectedMonth = monthsOfTheYear[monthOfBirth.selectedIndex];
    const currentMonth = monthsOfTheYear[currentMonthIndex];
    const selectedDay = daysOfTheMonth[dayOfBirth.selectedIndex]

    //CONDITIONALS
    if(yearOfBirth.value != 0 && yearOfBirth.value <= currentYear && monthsOfTheYear.includes(selectedMonth) && selectedDay){
        let age = currentYear - yearOfBirth.value;

        if(selectedMonth == "September" || selectedMonth == "April" || selectedMonth == "June" || selectedMonth == "November"){
            daysOfTheMonth.pop( );
        }
        
        else if(selectedMonth == "February"){
            if(yearOfBirth.value % 4 == 0){
                daysOfTheMonth.length = 29;
            }

            else{
                daysOfTheMonth.length = 28;
            }
        }

        else{
            daysOfTheMonth.length = 31;
        }

        
        //CALCULATING THE REMAINING MONTHS BEFORE ANOTHER BIRTHDAY.
        const userMonthIndex = monthsOfTheYear.findIndex(month => month === selectedMonth);
        if(userMonthIndex > currentMonthIndex){ //meaning the last birthday was in the previous year.
            age = currentYear - yearOfBirth.value - 1;
            let remainingMonths = (11 - userMonthIndex) + (currentMonthIndex + 1);
            
            printOutput(age, remainingMonths);
        }

        else if(currentMonthIndex > userMonthIndex || currentMonthIndex == userMonthIndex){
            remainingMonths = (currentMonthIndex - userMonthIndex);
            
            printOutput(age, remainingMonths);
        }

        yearOfBirth.classList.remove("error");
        dayOfBirth.classList.remove("error");''
        monthOfBirth.classList.remove("error");
        const small = document.querySelector("small");

        small.style.display = "none";
    }

    else{
        yearOfBirth.classList.toggle("error");
        dayOfBirth.classList.toggle("error");''
        monthOfBirth.classList.toggle("error");
        const small = document.querySelector("small");

        small.style.display = "inline-block";
    }

});

const printOutput = (age, monthDifference) => {
    if(age <= 1){
        output.innerText = `You are ${age} year and ${monthDifference} months old.`
    }
    
    else if(monthDifference <= 1){
        output.innerText = `You are ${age} years and ${monthDifference} month old.`
    }

    else{
        output.innerText = `You are ${age} years and ${monthDifference} months old.`
    }
}