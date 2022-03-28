//Canvas2D MDN = "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"

//canvas setting
const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext('2d');    //canvas 범위내 pixel에 접근 및 컨트롤
const INITIAL_COLOR = "#2c2c2c";

let painting = false;

canvas.width = 700; //canvas 넓이 지정 필요
canvas.height = 700; //canvas 높이 지정 필요

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height); //canvas 배경 색상을 지정 -default-

context.strokeStyle = INITIAL_COLOR; //그려질 선의 색상 -default-
context.fillStyle = INITIAL_COLOR; //그려질 바탕의 색상 -default-
context.lineWidth = 2.5; //그려질 선의 두께 -default-

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);   //클릭을 한 상태에서 유지
    canvas.addEventListener("mouseup", stopPainting);  //클릭 유지를 해제할 시
    canvas.addEventListener("mouseleave", stopPainting);  //캔버스 영역을 마우스 포인터가 벗어날 시
    canvas.addEventListener("click", handleCanvas); //캔버스 영역 클릭 시
    canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭시 발생하는 메뉴 이벤트
}

//canvas clear setting
const clearBtn = document.querySelector("#jsClear");

if(clearBtn){
    clearBtn.addEventListener("click", () => context.clearRect(0,0,canvas.width,canvas.height));
    //.clearRect = canvas 내의 그려진 모든 Pixel 들을 투명한 검은색으로 변경하여 그려진 내용 삭제
}

//canvas save setting
const saveBtn = document.querySelector("#jsSave")

if(saveBtn){
    saveBtn.addEventListener("click", () => {
        const image = canvas.toDataURL("image/png"); //지정된 포맷의 이미지 표현을 포함한 data URL을 반환
        const link = document.createElement("a"); //보이지 않는 가상의 a태그 생성
        link.href = image; //생성된 a태그에 href 속성에 data URL 부여
        link.download = "PaintJS.png"; //저장될 이미지의 파일명 부여
        link.click(); //가상의 a태그를 클릭하도록 하여 a태그가 가지고있는 URL 정보를 사용해 이미지 다운로드
    });
}

//mouse event setting
function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        context.beginPath(); //마우스 위치에 따른 Path 생성
        context.moveTo(x,y);
    }
    else {
        context.lineTo(x,y); // 마우스 클릭 직전까지의 Path와 현재 Path를 연결
        context.stroke();
    }
}

function onMouseUp(event){
    painting = false;
}

function handleCanvas(){
    if(filling) //filling mode 진행중일 때만
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(event){
    event.preventDefault(); //마우스 우클릭 동작에 대한 이벤트 방지

}

//line style setting
const colors = document.querySelectorAll(".jsColor");

function handleColor(event){
    const color = event.target.style.backgroundColor; //타겟 요소의 컬러 정보
    context.strokeStyle = color; //그려질 선의 색상을 선택한 컬러 정보로 변경
    context.fillStyle = color; //그려질 배경의 색상을 선택한 컬러 정보로 변경
}

Array.from(colors).forEach(color => 
    // Array.from(변수); : Object -> Array 변환
    // Ex: HtmlCollection(getElementBy 사용했을 시), NodeList(querySelector 사용했을 시) 형식의 colors 변수를 Array 형식으로 변환
    color.addEventListener("click", handleColor)
);

//brush size setting
const range = document.querySelector("#jsRange");

if(range){
    range.addEventListener("input", handleRange);
}

function handleRange(event){
    const brushSize = event.target.value;
    context.lineWidth = brushSize;
}

//fill mode setting
const modeBtn = document.querySelector("#jsMode");
let filling = false; //fill mode 진행 여부를 확인하기 위한 변수

if(modeBtn){
   modeBtn.addEventListener("click", handleModeBtn);
}

function handleModeBtn(){
    if(filling === true){
        //filling mode가 진행중일 때 다시 modeBtn을 클릭하는 경우 filling mode 해제
        filling = false;
        modeBtn.innerText = "FILL";
    }
    else{
        //filling mode가 진행중이지 않을 때  modeBtn을 클릭하는 경우 filling mode 적용
        filling = true;
        modeBtn.innerText = "PAINT";
    }
}
