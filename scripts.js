


let canvas = document.getElementById("canvas")
let main = document.getElementById("main-container")
const c = canvas.getContext('2d')
let pointList = []
let pressedDown = false
let firstPress = true
let clickedPoint
let pointClicked = false
let deleting = false





canvas.width = (window.innerWidth*9)/10;
canvas.height = (window.innerHeight*7.5)/10;  
rect = canvas.getBoundingClientRect()
let megaStart = {
  x : (canvas.width/10),
  y : canvas.height/2
}
let megaEnd = {
  x : (canvas.width/10)*9,
  y : canvas.height/2
}
let midPoint = {
  x : (canvas.width/10)*5,
  y : canvas.height/2,
  radius : 10
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
  console.log(megaStart.x)
  console.log(megaEnd.x)
  
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
      y : pos.y
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
  num = num.value * 50;
  console.log(num);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillRect(10, 10, num, num);
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