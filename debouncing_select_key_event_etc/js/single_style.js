const js_singles = Array.from(document.querySelectorAll(".js_single"));
const notice_id = document.getElementById("notice_id");

const reset = () => {
    // 활성화 되어 있는 input reset
    const ones = Array.from(document.querySelectorAll(".on"));
    for(let i=0; i<ones.length; i++){
        if(ones[i].classList.contains("on")) {
            ones[i].classList.remove("on");
        }
    }
    // 활성화 되어 있는 list reset
    const alList = Array.from(document.querySelectorAll(".listExample"));
    for(let j=0; j<alList.length; j++){
        if(alList.length>0 && alList[j].classList.contains("active")) {
            alList[j].classList.remove("active");
        }
    }
}

js_singles.forEach((input)=>{
    input.addEventListener("click", (event)=>{
        const target = event.target;
        notice_id.value = target.getAttribute("id");

        reset();
        
        // input 활성화
        target.classList.add("on");
        
        // list 나타냄
        const wrap = target.closest(".wrapItems");
        const list = wrap.querySelector(".listExample");
        list.classList.add("active");
    });
});