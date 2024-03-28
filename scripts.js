


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
let beginLineLength = 0

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
  beginLineLength = megaEnd.x - megaStart.x


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
  // generateFractal() //REMOVE IN FINAL VERSION
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
    // generateFractal() //REMOVE IN FINAL VERSION
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

const reversePythagoras = (a,b,c) => {
  // hypotenuse = (a.lineLength/totalLineLength)*a.lineLength 

  console.log("Hypotenuse: " + hypotenuse)
  if (once == true) {
    angle = (a.angleRelative)
  }
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
  // if (c == false) {
  //   newX = newX * Math.cos(angle + a.angleRelative) - newY * Math.sin(angle + a.angleRelative)
  //   newY = newX * Math.sin(angle) + newY * Math.cos(angle)
  // } else {
    newX = newX * Math.cos(angle) - newY * Math.sin(angle)
    newY = newX * Math.sin(angle) + newY * Math.cos(angle)
  // }
    console.log("Second math; newX: " + newX + " newY: " + newY)


}


function rotatePointAroundPivot(p, pivot, angleDegrees) {
  // Convert angle to radians
  const angleRadians = angleDegrees * (Math.PI / 180);

  // Translate point to origin
  const translatedX = p.x - pivot.x;
  const translatedY = p.y - pivot.y;

  // Rotate point
  const rotatedX = translatedX * Math.cos(angleRadians) - translatedY * Math.sin(angleRadians);
  const rotatedY = translatedX * Math.sin(angleRadians) + translatedY * Math.cos(angleRadians);

  // Translate point back
  const finalX = rotatedX + pivot.x;
  const finalY = rotatedY + pivot.y;

  return { x: finalX, y: finalY };
}

// Usage:
const P = { x: 5, y: 5 };
const C = { x: 1, y: 1 };
const angleDegrees = 90; // Rotate 90 degrees

const rotatedPoint = rotatePointAroundPivot(P, C, angleDegrees);


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
  megaI = 0
  for (i = 0; i < depth; i++) {
    for (j = megaI; j < pointList.length - 1; j++) {
      for (i = 0; i < pointList.length - 1; i++) {
        if (once == true) {
          //hypotenuse calculations are currently off.
          //right now it sets them before rotating, which makes the end line
          //shorter than needed
          //get length of modified starting line and divide by 
          //length of initial two point line
          hypotenuse = (pointList[j].lineLength/beginLineLength)
          if (megaPointList.length == 0) {
            megaPointList.push(ultraMegaStart)
          } else {
            megaPointList.push(megaPointList[megaPointList.length-1])
            // console.log('pushing new stuiff')
          }
          reversePythagoras(pointList[i],pointList[i+1], once)
          once = false
  
          // continue
        } else {
          reversePythagoras(pointList[i],pointList[i+1], once)
        }
        
        //create new point that is inserted into mega point list with these values
        // console.log(pointList[i].lineLength)
        // console.log((pointList[i].lineLength/totalLineLength)*pointList[i].lineLength)
  
        console.log("pointlist[i]: " + pointList[i].angleStatic)
  
        // console.log(pointList[i].x + "[x,y]" + pointList[i].y)

        //create new point in full list here
        //THIS AREA WILL KEEP REGENERATING THE SAME POINTS PLEASE FIX?
        megaPointList[i+1] = {
          x : newX + megaPointList[i].x,
          y : newY + megaPointList[i].y,
          angleRelative : pointList[j].angleRelative + pointList[j].angleRelative,
          angleStatic : pointList[j].angleStatic + pointList[j].angleStatic,
          lineLength : (pointList[j].lineLength/beginLineLength)*pointList[j].lineLength
        };
  

        //draw path from the last point to the new point
        c.beginPath();
        c.moveTo(megaPointList[j].x, megaPointList[j].y)
        c.lineTo(megaPointList[j+1].x, megaPointList[j+1].y)
        c.stroke()
        console.log("Final; newX: " + megaPointList[i+1].x + " newY: " + megaPointList[i+1].y)
      }
      // megaI = megaPointList - 1

      // c.beginPath();
      // c.moveTo(megaPointList[megaPointList.length-1].x, megaPointList[megaPointList.length-1].y)
      // megaPointList.push(pointList[j])
      // c.lineTo(megaPointList[megaPointList.length-2].x, megaPointList[megaPointList.length-2].y)
      // c.stroke()
      //THIS STUFF DOES NOTHING???
    }
    once = true







  }
    
}


//DEBUGGING NOTES BELOW



//all but the very first point are rotating perfectly.
// when perfectly horizontal from point 1 to 2 everything works flawlessly




//AI NOTE
//To maintain the relative rotation, we should not rotate the points again
//after scaling. Instead, we scale first and then rotate the entire set so
//that the line from the first duplicated point to 
//the last duplicated point aligns with the line from
// the first to the second original point.




//if the second angle is equal to or less than the first angle then
//the final point no longer lines up as intended

// first angle is set to 135 when it should be set to 90?
//then when it reaches 91 it flips 180 degrees around


//maybe the first point breaks because its getting double
//the amount of angle adjustment it needs?
//like, all the angles the angles get an angle adjustment of
// angle #1, but the first angle gets it twice cause it gets the full pass
//and the indivual pass???? maybe


//OR MAYBE its because once the angles goes from 1 to 0 and keeps going
//it flips to become negatiev and THAT is the issue??
