


let canvas = document.getElementById("canvas")
let main = document.getElementById("main-container")
const c = canvas.getContext('2d')
let pointList = []
let pressedDown = false
let firstPress = true
let clickedPoint
let pointClicked = false
let deleting = false
let aLength = 0
let bLength = 0
let cLength = 0
let depth = 1
let totalLineLength = 0
let once = true
let newX = 0
let newY = 0

let megaPointList = []



canvas.width = (window.innerWidth*9)/10;
canvas.height = (window.innerHeight*7.5)/10;  
rect = canvas.getBoundingClientRect()
let megaStart = {
  x : (canvas.width/10),
  y : canvas.height/2,
  angleRelative : 0,
  angleStatic : 0,
  lineLength : 0
}
let megaEnd = {
  x : (canvas.width/10)*9,
  y : canvas.height/2,
  angleRelative : 0,
  angleStatic : 0,
  lineLength : 0
}
let midPoint = {
  x : (canvas.width/10)*5,
  y : canvas.height/2,
  radius : 10
}

let ultraMegaStart = {
  x : (canvas.width/10),
  y : canvas.height/2,
  angleRelative : 0,
  angleStatic : 0,
  lineLength : 0
}
let ultraMegaEnd = {
  x : (canvas.width/10)*9,
  y : canvas.height/2,
  angleRelative : 0,
  angleStatic : 0,
  lineLength : 0
}


const insertBeforeLast = (insert) => {
  pointList.pop() 
  pointList.push(insert)
  pointList.push(megaEnd)
}

const replaceSecondLast = (insert) => {
  pointList.pop() 
  pointList.pop() 
  pointList.push(insert)
  pointList.push(megaEnd)
}




const startFunc = () => {
  
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.beginPath();
  c.moveTo(megaStart.x, megaStart.y)
  c.lineTo(megaEnd.x, megaEnd.y)
  c.stroke()
  // console.log(megaStart.x)
  // console.log(megaEnd.x)
  
  // c.beginPath();
  // c.arc(midPoint.x, midPoint.y, midPoint.radius, 0, 2 * Math.PI);
  // c.stroke();


  pointList.push(megaStart)
  pointList.push(megaEnd)



}
startFunc()



canvas.addEventListener("mouseup", (e) => {
  pressedDown = false
  firstPress = true
  // let point + "" + pointList.length = new Object();
  
  if (pointClicked == true) {
    pointClicked = false
    return
  }
  swapLastTwo()
  pointList.pop()
  console.log(pointList)

})

canvas.addEventListener("mousedown", (e) => {
  deleting = false

  const pos = {
    x: e.clientX - rect.left - 5,
    y: e.clientY - rect.top - 5
  };

  for (i = 0; i < pointList.length; i++) { 
    if (i != 0 && i < pointList.length - 1) {
      if (Math.sqrt((pos.x-pointList[i].x) ** 2 + (pos.y - pointList[i].y) ** 2) < 10) {
        clickedPoint = i
        pointClicked = true
        pressedDown = true
        firstPress = false
        return
      }
    }


  }


  if (firstPress == true) {
    pointList[pointList.length] = {
      x : pos.x,
      y : pos.y,
      angleRelative : 0,
      angleStatic : 0,
      lineLength : 0
    };
    swapLastTwo()
  }
  // midPoint.x = pos.x
  // midPoint.y = pos.y
  firstPress = false
  insertBeforeLast(pointList[pointList.length - 1])
  pressedDown = true
  drawLine()

  // if (Math.sqrt((pos.x-midPoint.x) ** 2 + (pos.y - midPoint.y) ** 2) < 10) {
  //   pressedDown = true
  // } else {
  //   pressedDown = false
  // }
  
});

canvas.addEventListener("mousemove", (e) => {
  
  if (pressedDown == true) {
    const pos = {
      x: e.clientX - rect.left - 5,
      y: e.clientY - rect.top - 5
    };

    if (pointClicked == true) {
      pointList[clickedPoint].x = pos.x
      pointList[clickedPoint].y = pos.y
      
    } else {
      pointList[pointList.length - 3].x = pos.x
      pointList[pointList.length - 3].y = pos.y
    }

    
    // midPoint.x = pos.x
    // midPoint.y = pos.y
    // replaceSecondLast(midPoint)

    drawLine()
  } 
  
});


const drawLine = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (i = 0; i < pointList.length; i++) {
    if (pointClicked == true) {
      tempLength = pointList.length - 1
    } else {
      tempLength = pointList.length - 2
    }
    if (deleting == true) {
      tempLength = pointList.length - 1
    }
    if (i != 0 && i < tempLength) {
      c.beginPath();
      c.arc(pointList[i].x, pointList[i].y, midPoint.radius, 0, 2 * Math.PI);
      c.stroke();
    }


  }

  for (i = 0; i < pointList.length - 1; i++) {
    c.beginPath();
    c.moveTo(pointList[i].x, pointList[i].y)
    c.lineTo(pointList[i + 1].x, pointList[i + 1].y)
    c.stroke()
  }
}


function changeDepth(num) {
  depth = num.value
}

const deletePoint = () => {
  if (pointList.length == 2) {
    console.log("No points to delete!")
    return
  }
  pointList.pop()
  pointList.pop()
  pointList.push(megaEnd)

  deleting = true
  drawLine()
}

const swapLastTwo = () => {
  let oldLast = pointList[pointList.length - 1]
  pointList.pop()
  pointList.pop()
  pointList.push(oldLast)
  pointList.push(megaEnd)
}


const pythagoras = (a,b) => {
  aLength = a.x-b.x
  bLength = a.y-b.y
  cLength = Math.sqrt(aLength**2 + bLength**2)
  // return cLength
}

const reversePythagoras = (a,b) => {
  // hypotenuse = (a.lineLength/totalLineLength)*a.lineLength 
  hypotenuse = (a.lineLength/totalLineLength)

  console.log("Hypotenuse: " + hypotenuse)
  angle = (a.angleRelative)
  // newX = Math.cos(angle)*hypotenuse
  // newY = Math.sin(angle)*hypotenuse
  // console.log("First math; newX: " + newX + " newY: " + newY)
  // console.log("Angle: "+ angle)

  // newX = (newX + a.x)
  // newY = (newY - a.y)
  // console.log("Second math; newX: " + newX + " newY: " + newY)

  // console.log(newX, newY)


  newX = a.x + hypotenuse * (b.x - a.x)
  newY = a.y + hypotenuse * (b.y - a.y)

  newX = newX - a.x
  newY = newY - a.y

  newX = newX * Math.cos(angle) - newY * Math.sin(angle)
  newY = newX * Math.sin(angle) + newY * Math.cos(angle)

}

const angleFinder = (adjacent,opposite) => {
  let thisMath = (Math.atan(opposite/adjacent))
  return thisMath
  // return thisMath - (thisMath * 2)
  // * (180/Math.PI)
  // for degrees
}


const generateFractal = () => {

  //generate initial point angles

  
  // megaPointList.push(ultraMegaStart)

  for (i = 0; i < pointList.length - 1; i++) {
    pythagoras(pointList[i], pointList[i+1])
    if (pointList[i-1] == undefined) {
      console.log('first')
      pointList[i].angleStatic = angleFinder(aLength, bLength)
      pointList[i].angleRelative = angleFinder(aLength, bLength)
      pointList[i].lineLength = cLength
    } else {
      pointList[i].angleStatic = angleFinder(aLength, bLength)
      pointList[i].angleRelative = pointList[i-1].angleStatic - angleFinder(aLength, bLength)
      pointList[i].lineLength = cLength
    }
    // console.log("angleStatic:")
    // console.log(pointList[i].angleStatic)
    // console.log("angleRelative:")
    // console.log(pointList[i].angleRelative)

    totalLineLength += cLength
  }

  ultraMegaStart = pointList[0]
  ultraMegaEnd = pointList[pointList.length-1]

  for (i = 0; i < depth; i++) {
    for (i = 0; i < pointList.length - 1; i++) {
      if (once == true) {
        megaPointList.push(ultraMegaStart)
        once = false
        // continue
      } 
      
      //create new point that is inserted into mega point list with these values
      // console.log(pointList[i].lineLength)
      // console.log((pointList[i].lineLength/totalLineLength)*pointList[i].lineLength)


      reversePythagoras(pointList[i],pointList[i+1])
      console.log("pointlist[i]: " + pointList[i].angleStatic)

      // console.log(pointList[i].x + "[x,y]" + pointList[i].y)
      megaPointList[i+1] = {
        x : newX + megaPointList[i].x,
        y : newY + megaPointList[i].y,
        angleRelative : pointList[i].angleRelative*2,
        angleStatic : pointList[i].angleStatic*2,
        lineLength : (pointList[i].lineLength/totalLineLength)*pointList[i].lineLength
      };



      c.beginPath();
      c.moveTo(megaPointList[i].x, megaPointList[i].y)
      c.lineTo(megaPointList[i+1].x, megaPointList[i+1].y)
      c.stroke()
      console.log("Final; newX: " + megaPointList[i+1].x + " newY: " + megaPointList[i+1].y)

    }
    c.beginPath();
    c.moveTo(megaPointList[megaPointList.length-1].x, megaPointList[megaPointList.length-1].y)
    megaPointList.push(pointList[i])
    c.lineTo(megaPointList[megaPointList.length-1].x, megaPointList[megaPointList.length-1].y)
    c.stroke()
  }
  once = true
}