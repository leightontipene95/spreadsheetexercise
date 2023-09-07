const spreadSheetContainer = document.querySelector("#spreadsheet-container")
const refreshButton = document.querySelector("#refresh-button")


const ROWS = 101
const COLUMNS = 101
const spreadsheet = []
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


class Cell{
    constructor(isHeader, disabled, data, row, column, rowName, columnName,cellID){
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.column = column
        this.rowName = rowName
        this.columnName = columnName
        this.cellID = cellID

        

    }
}

refreshButton.onclick = function(e){
    // console.log('spreadsheet',spreadsheet);
    newSpreadSheet()
    renderSpreadSheet()
    checkForFormulas()

}

function checkForFormulas() {
    for (let i = 0; i < spreadsheet.length; i++) {
      for (let i2 = 0; i2 < spreadsheet[i].length; i2++) {
  
        const cell = spreadsheet[i][i2];
  
        if (typeof cell.data === 'string') { // Check if it's a string
          const toInt = parseInt(cell.data);
  
          if (!isNaN(toInt)) {
            console.log(toInt);
          }
          if (cell.data.includes('=sum')) {
            console.log("SUM");
          }

          if (cell.data.includes('+')) {
            console.log("ADDITION");
          }
          if (cell.data.includes('-')) {
            console.log("SUBTRACTION");
          }
        }
      }
    }
  }

newSpreadSheet()
renderSpreadSheet()

function newSpreadSheet() {
  for (let r = 0; r < ROWS; r++) {
    let spreadsheetRow = [];
    for (let c = 0; c < ROWS; c++) {

        isHeader = false
        disabled = false
        let cellData = ""
        
        if(c === 0){
            isHeader = true
            disabled = true;
            cellData = r
        }
        if(r === 0){
            disabled = true
            isHeader = true
            cellData = alphabet[c-1]
            if(c > 26 && c <53){
                c2 = 0
                cellData = alphabet[c2]+ " " + alphabet[c-27]
        
                
            }
            // if(c > 53 && c < 79){
            //     c2 = 0
            //     cellData = alphabet[c2]+ " " + alphabet[c-27]
        
                
            // }
           
        }
        if(c === 0 && r === 0){
            cellData = ""
        }
        rowName = r
        columnName = alphabet [c-1]
        cellID = columnName + rowName



        const cell = new Cell(isHeader, disabled,cellData, c, r, rowName,  columnName, cellID)
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
}

function createCellElement (cell){
    const cellElement = document.createElement("input")
    cellElement.className = "cell"
        cellElement.value = cell.data
    cellElement.disabled = cell.disabled

    if(cell.isHeader){
        cellElement.classList.add('headerCell')
    }

    cellElement.onclick = () => handleCellClick(cell)
    cellElement.onchange = (e) => handleOnChange(e.target.value, cell)
    return cellElement
}

function handleCellClick(cell) {
    console.log(typeof cell.data)

        if(typeof cell.data === 'string'){
        console.log("THIS IS A STRING")
    }

}




function handleOnChange(data2, cell){
    cell.data = data2
    // console.log(cell.data)

    if (cell.data === "123"){
        console.log("CORRECT", typeof cell.data)
        cell.value = "CHANGED"
    }

//     if(typeof cell.data === 'string'){
//         console.log("THIS IS A STRING")
//     }

//     console.log(parseInt(cell.data))
//     if (isNaN( parseInt(cell.data))){
//         console.log("THIS IS NAN")
//     }
    


}



function renderSpreadSheet(){
    for (let i = 0; i < spreadsheet.length; i++){
        const rowContainerElement = document.createElement("div")
        rowContainerElement.className = "cell-row"
        for (let i2 = 0; i2 < spreadsheet[i].length; i2++){
            
            const cell = spreadsheet[i][i2]
            // if (!cell.data){
            //     console.log("EMPTY")
            // } else{
            //     console.log("NOT EMPTY")
            // }

        
            
            rowContainerElement.append(createCellElement(cell))
        }
        spreadSheetContainer.append(rowContainerElement)
    }
    console.log('spreadsheet ', spreadsheet)
}

